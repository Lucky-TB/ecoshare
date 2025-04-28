"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Impact Tree component that grows based on user's impact score
function ImpactTree({ impactScore = 50 }) {
  const treeRef = useRef<THREE.Group>(null)
  const leavesRef = useRef<THREE.InstancedMesh>(null)

  // Normalize impact score (0-100) to tree growth (0-1)
  const growth = Math.min(impactScore / 100, 1)

  useEffect(() => {
    if (!treeRef.current || !leavesRef.current) return

    // Update tree based on impact score
    treeRef.current.scale.set(growth, growth * 1.5, growth) // Taller growth for more tree-like appearance

    // Update leaves
    const count = Math.floor(growth * 150) // Increased leaf count
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4()

      // Create a more natural tree crown shape
      const heightPercent = Math.random()
      const radius = (1 - heightPercent) * 2 * growth // Wider at bottom, narrower at top
      const height = heightPercent * 4 * growth + 1 // Distribute leaves vertically

      const theta = Math.random() * Math.PI * 2
      const x = Math.sin(theta) * radius
      const z = Math.cos(theta) * radius
      const y = height

      // Random rotation for natural look
      const rotationX = Math.random() * Math.PI
      const rotationY = Math.random() * Math.PI
      const rotationZ = Math.random() * Math.PI

      // Varied leaf sizes
      const scale = (0.15 + Math.random() * 0.2) * growth

      matrix.compose(
        new THREE.Vector3(x, y, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(rotationX, rotationY, rotationZ)),
        new THREE.Vector3(scale, scale, scale)
      )

      leavesRef.current.setMatrixAt(i, matrix)
    }

    leavesRef.current.instanceMatrix.needsUpdate = true
    leavesRef.current.count = count
  }, [growth])

  // Gentle swaying animation
  useFrame(({ clock }) => {
    if (treeRef.current) {
      const time = clock.getElapsedTime()
      treeRef.current.rotation.x = Math.sin(time * 0.5) * 0.02
      treeRef.current.rotation.z = Math.cos(time * 0.3) * 0.02
    }
  })

  return (
    <group position={[0, -1, 0]}> {/* Center the tree in the scene */}
      {/* Tree trunk and branches */}
      <group ref={treeRef}>
        {/* Main trunk */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
          <meshStandardMaterial color="#5D4037" roughness={0.8} />
        </mesh>

        {/* Primary branches */}
        {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => (
          <group key={i} position={[0, 1.2, 0]} rotation={[0.3, angle, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
              <meshStandardMaterial color="#5D4037" roughness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Secondary branches */}
        {[0, Math.PI/3, Math.PI*2/3, Math.PI, Math.PI*4/3, Math.PI*5/3].map((angle, i) => (
          <group key={i} position={[0, 1.8, 0]} rotation={[0.5, angle, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.1, 0.8, 8]} />
              <meshStandardMaterial color="#5D4037" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Leaves */}
      <instancedMesh ref={leavesRef} args={[undefined, undefined, 150]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial
          color="#2E7D32"
          roughness={0.6}
          metalness={0.1}
        />
      </instancedMesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial color="#795548" roughness={1} />
      </mesh>
    </group>
  )
}

export default function ImpactVisualization({ impactScore = 50 }) {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [4, 4, 4], fov: 50 }}
        className="bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800"
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ImpactTree impactScore={impactScore} />
        <OrbitControls
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
