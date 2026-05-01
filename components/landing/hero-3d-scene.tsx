"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, RigidBody, CuboidCollider, BallCollider } from "@react-three/rapier"
import { Float, Sphere, Box, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { useRef, useMemo, Suspense, useState, useEffect } from "react"
import * as THREE from "three"

// Floating glass card that represents a social media post
function GlassPostCard({ 
  position, 
  rotation = [0, 0, 0],
  delay = 0 
}: { 
  position: [number, number, number]
  rotation?: [number, number, number]
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.15
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + delay) * 0.05
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh 
        ref={meshRef} 
        position={position} 
        rotation={rotation as unknown as THREE.Euler}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        <boxGeometry args={[1.8, 2.4, 0.05]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={0.5}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#1a1a1a"
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
        />
      </mesh>
      {/* Glow effect */}
      <mesh position={position}>
        <boxGeometry args={[1.9, 2.5, 0.01]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.03} />
      </mesh>
    </Float>
  )
}

// Physics-enabled floating sphere particles
function PhysicsParticle({ 
  position, 
  color,
  size = 0.15
}: { 
  position: [number, number, number]
  color: string
  size?: number
}) {
  const [impulseApplied, setImpulseApplied] = useState(false)
  const rigidBodyRef = useRef<any>(null)

  useEffect(() => {
    if (rigidBodyRef.current && !impulseApplied) {
      const randomImpulse = {
        x: (Math.random() - 0.5) * 0.5,
        y: Math.random() * 0.3 + 0.2,
        z: (Math.random() - 0.5) * 0.3
      }
      rigidBodyRef.current.applyImpulse(randomImpulse, true)
      setImpulseApplied(true)
    }
  }, [impulseApplied])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="ball"
      restitution={0.8}
      friction={0.2}
      linearDamping={0.3}
      angularDamping={0.3}
    >
      <Sphere args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </RigidBody>
  )
}

// Ambient floating orbs in background
function AmbientOrb({ 
  position, 
  color, 
  scale = 1 
}: { 
  position: [number, number, number]
  color: string
  scale?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.position.x = position[0] + Math.sin(t * 0.2) * 0.5
      ref.current.position.y = position[1] + Math.sin(t * 0.3) * 0.3
      const pulse = Math.sin(t * 0.5) * 0.15 + 1
      ref.current.scale.setScalar(pulse * scale)
    }
  })

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.08}
        roughness={1}
        metalness={0}
      />
    </Sphere>
  )
}

// Ground for physics
function Ground() {
  return (
    <RigidBody type="fixed" position={[0, -4, 0]}>
      <CuboidCollider args={[50, 0.1, 50]} />
    </RigidBody>
  )
}

// Invisible walls to contain particles
function Walls() {
  return (
    <>
      <RigidBody type="fixed" position={[-8, 0, 0]}>
        <CuboidCollider args={[0.1, 20, 20]} />
      </RigidBody>
      <RigidBody type="fixed" position={[8, 0, 0]}>
        <CuboidCollider args={[0.1, 20, 20]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, -8]}>
        <CuboidCollider args={[20, 20, 0.1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 8]}>
        <CuboidCollider args={[20, 20, 0.1]} />
      </RigidBody>
    </>
  )
}

// Particle system with continuous spawning
function ParticleSystem() {
  const particles = useMemo(() => {
    const items = []
    const colors = ["#6366f1", "#ec4899", "#8b5cf6", "#06b6d4", "#ffffff"]
    for (let i = 0; i < 25; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 6 + 2,
          (Math.random() - 0.5) * 6
        ] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.1 + 0.08
      })
    }
    return items
  }, [])

  return (
    <>
      {particles.map((particle, i) => (
        <PhysicsParticle 
          key={i} 
          position={particle.position} 
          color={particle.color}
          size={particle.size}
        />
      ))}
    </>
  )
}

// Camera animation
function CameraController() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = Math.sin(t * 0.1) * 0.5
    camera.position.y = Math.sin(t * 0.15) * 0.2 + 0.5
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Main scene content
function SceneContent() {
  return (
    <>
      <CameraController />
      
      {/* Minimal lighting for dark aesthetic */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[-10, 5, -5]} intensity={0.3} color="#ec4899" />
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.4} 
        penumbra={1} 
        intensity={0.4} 
        color="#ffffff"
        castShadow
      />
      
      <Environment preset="night" />
      
      {/* Floating glass post cards - story-like arrangement */}
      <GlassPostCard position={[-3.5, 0.5, -2]} rotation={[0.1, 0.3, 0]} delay={0} />
      <GlassPostCard position={[-1.2, 0.8, -1]} rotation={[0, 0.1, 0]} delay={0.5} />
      <GlassPostCard position={[1.2, 0.6, -1.5]} rotation={[0, -0.15, 0]} delay={1} />
      <GlassPostCard position={[3.5, 0.4, -2]} rotation={[-0.05, -0.25, 0]} delay={1.5} />
      
      {/* Background ambient orbs */}
      <AmbientOrb position={[-6, 3, -8]} color="#6366f1" scale={3} />
      <AmbientOrb position={[7, 2, -6]} color="#ec4899" scale={2.5} />
      <AmbientOrb position={[0, 5, -10]} color="#8b5cf6" scale={4} />
      <AmbientOrb position={[-4, -1, -5]} color="#06b6d4" scale={2} />
      <AmbientOrb position={[5, 4, -7]} color="#6366f1" scale={1.8} />
      
      {/* Physics system */}
      <Physics gravity={[0, -1.5, 0]}>
        <ParticleSystem />
        <Ground />
        <Walls />
      </Physics>
    </>
  )
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        style={{ background: "transparent" }}
        shadows
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
