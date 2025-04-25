"use client"

import { useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, type RootState } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const hotspotGroupRef = useRef<THREE.Group>(null)

  // Create hotspots at various locations
  useEffect(() => {
    if (!hotspotGroupRef.current) return

    // Clear existing hotspots
    while (hotspotGroupRef.current.children.length) {
      hotspotGroupRef.current.remove(hotspotGroupRef.current.children[0])
    }

    // Add new hotspots
    const hotspotLocations = [
      { lat: 40.7128, lng: -74.006 }, // New York
      { lat: 51.5074, lng: -0.1278 }, // London
      { lat: 35.6762, lng: 139.6503 }, // Tokyo
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: 37.7749, lng: -122.4194 }, // San Francisco
      { lat: 55.7558, lng: 37.6173 }, // Moscow
      { lat: -22.9068, lng: -43.1729 }, // Rio
      { lat: 28.6139, lng: 77.209 }, // New Delhi
      { lat: 1.3521, lng: 103.8198 }, // Singapore
      { lat: -1.2921, lng: 36.8219 }, // Nairobi
    ]

    hotspotLocations.forEach((location) => {
      // Convert lat/lng to 3D position
      const phi = (90 - location.lat) * (Math.PI / 180)
      const theta = (location.lng + 180) * (Math.PI / 180)

      const x = -(Math.sin(phi) * Math.cos(theta)) * 2.01
      const y = Math.cos(phi) * 2.01
      const z = Math.sin(phi) * Math.sin(theta) * 2.01

      // Create hotspot
      const hotspotGeometry = new THREE.SphereGeometry(0.04, 16, 16)
      const hotspotMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x00ff88),
        transparent: true,
        opacity: 0.8,
      })

      const hotspot = new THREE.Mesh(hotspotGeometry, hotspotMaterial)
      hotspot.position.set(x, y, z)

      // Add pulse effect
      const pulseGeometry = new THREE.SphereGeometry(0.02, 16, 16)
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x00ff88),
        transparent: true,
        opacity: 0.4,
      })

      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
      pulse.scale.set(1, 1, 1)
      pulse.userData = { baseScale: 1, pulseSpeed: 0.5 + Math.random() * 0.5 }
      hotspot.add(pulse)

      if (hotspotGroupRef.current) {
        hotspotGroupRef.current.add(hotspot)
      }
    })
  }, [])

  // Animation
  useFrame(({ clock }: RootState) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07
    }

    // Animate hotspot pulses
    if (hotspotGroupRef.current) {
      hotspotGroupRef.current.children.forEach((hotspot) => {
        hotspot.children.forEach((child) => {
          if (child.userData && child.userData.baseScale) {
            const pulse = Math.sin(clock.getElapsedTime() * child.userData.pulseSpeed) * 0.5 + 1.5
            child.scale.set(pulse, pulse, pulse)
          }
        })
      })
    }
  })

  return (
    <>
      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Earth */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial color="#1E88E5" emissive="#072534" specular="#111111" shininess={10} />
      </mesh>

      {/* Land masses */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshPhongMaterial color="#2E7D32" transparent={true} opacity={0.6} depthWrite={false} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshPhongMaterial color="#0077ff" transparent={true} opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Hotspots group */}
      <group ref={hotspotGroupRef} />

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
    </>
  )
}

export default function HeroGlobe() {
  return (
    <Canvas className="w-full h-full">
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} autoRotate autoRotateSpeed={0.5} />
        <Earth />
      </Suspense>
    </Canvas>
  )
}
