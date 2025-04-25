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
    treeRef.current.scale.set(growth, growth, growth)

    // Update leaves
    const count = Math.floor(growth * 100)
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4()

      // Position leaves around branches
      const theta = Math.random() * Math.PI * 2
      const radius = 0.5 + Math.random() * 1.5 * growth
      const height = (Math.random() * 2 - 0.5) * growth * 3 + 1

      const x = Math.sin(theta) * radius
      const z = Math.cos(theta) * radius
      const y = height

      // Random rotation
      const rotationX = Math.random() * Math.PI
      const rotationY = Math.random() * Math.PI
      const rotationZ = Math.random() * Math.PI

      // Random scale based on growth
      const scale = 0.2 + Math.random() * 0.3 * growth

      matrix.compose(
        new THREE.Vector3(x, y, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(rotationX, rotationY, rotationZ)),
        new THREE.Vector3(scale, scale, scale),
      )

      leavesRef.current.setMatrixAt(i, matrix)
    }

    leavesRef.current.instanceMatrix.needsUpdate = true
    leavesRef.current.count = count
  }, [growth])

  // Gentle animation
  useFrame(({ clock }) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <group>
      {/* Tree trunk and branches */}
      <group ref={treeRef}>
        {/* Main trunk */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.4, 1, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* First level branches */}
        <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 1, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.8, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 1, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 1, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 1, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* Second level branches */}
        <mesh position={[0.7, 1.2, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <cylinderGeometry args={[0.08, 0.15, 0.7, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        <mesh position={[-0.7, 1.2, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <cylinderGeometry args={[0.08, 0.15, 0.7, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        <mesh position={[0, 1.2, 0.7]} rotation={[Math.PI / 6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.15, 0.7, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        <mesh position={[0, 1.2, -0.7]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.15, 0.7, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
      </group>

      {/* Leaves as instanced mesh for performance */}
      <instancedMesh ref={leavesRef} args={[undefined, undefined, 100]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.5} />
      </instancedMesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={1} />
      </mesh>
    </group>
  )
}

export default function ImpactVisualization({ impactScore = 50 }) {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ImpactTree impactScore={impactScore} />
        <OrbitControls enableZoom={true} minDistance={3} maxDistance={10} enablePan={false} />
      </Canvas>
    </div>
  )
}
