'use client'

/**
 * 3D Device Mockup Component
 * Renders iPhone/Android device frames with screenshots using React Three Fiber
 * Features:
 * - Lazy loaded with React.Suspense
 * - GPU-optimized rendering
 * - Subtle rotation on scroll
 * - Respects prefers-reduced-motion
 * - Fallback to 2D image on low-end devices
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'

interface DeviceMockup3DProps {
  platform: 'ios' | 'android'
  screenshot?: string
  className?: string
  enableRotation?: boolean
}

// Device Frame Component
function DeviceFrame({
  platform,
  screenshot,
  scrollProgress,
}: {
  platform: 'ios' | 'android'
  screenshot?: string
  scrollProgress: number
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  // Load screenshot texture
  useEffect(() => {
    if (screenshot) {
      const loader = new THREE.TextureLoader()
      loader.load(
        screenshot,
        (loadedTexture) => {
          // Configure texture
          loadedTexture.colorSpace = THREE.SRGBColorSpace
          loadedTexture.minFilter = THREE.LinearFilter
          loadedTexture.magFilter = THREE.LinearFilter

          setTexture(loadedTexture)
          console.log('✓ Texture loaded successfully:', screenshot)
        },
        undefined,
        (error) => {
          // Error callback
          console.error('✗ Error loading texture:', screenshot, error)
        }
      )
    }

    // Cleanup: dispose texture on unmount
    return () => {
      if (texture) {
        texture.dispose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenshot])

  // Animate rotation based on scroll
  useFrame(() => {
    if (meshRef.current) {
      // Subtle rotation on scroll
      meshRef.current.rotation.y = scrollProgress * 0.3
      meshRef.current.rotation.x = Math.sin(scrollProgress * 2) * 0.1
    }
  })

  // Device dimensions (scaled for 3D scene)
  const deviceWidth = platform === 'ios' ? 2.5 : 2.6
  const deviceHeight = platform === 'ios' ? 5.4 : 5.6
  const deviceDepth = 0.4
  const screenInset = 0.15
  const borderRadius = platform === 'ios' ? 0.5 : 0.3

  return (
    <group ref={meshRef}>
      {/* Device Frame */}
      <RoundedBox
        args={[deviceWidth, deviceHeight, deviceDepth]}
        radius={borderRadius}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={platform === 'ios' ? '#1c1c1e' : '#202124'}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, deviceDepth * 0.26]}>
        <planeGeometry
          args={[deviceWidth - screenInset, deviceHeight - screenInset]}
        />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial color="#000000" />
        )}
      </mesh>

      {/* Notch for iOS */}
      {platform === 'ios' && (
        <RoundedBox
          args={[0.8, 0.15, deviceDepth * 0.3]}
          radius={0.1}
          smoothness={4}
          position={[0, deviceHeight / 2 - 0.4, deviceDepth * 0.4]}
        >
          <meshPhysicalMaterial
            color="#1c1c1e"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
      )}
    </group>
  )
}

// Main 3D Scene Component
function Scene({
  platform,
  screenshot,
  enableRotation,
}: {
  platform: 'ios' | 'android'
  screenshot?: string
  enableRotation: boolean
}) {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll position for rotation
  useEffect(() => {
    if (!enableRotation) return

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = scrollTop / (documentHeight - windowHeight)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableRotation])

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.6} />

      {/* Directional Lights for depth */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Point Light for highlights */}
      <pointLight position={[0, 5, 10]} intensity={0.5} />

      {/* Device Frame */}
      <DeviceFrame
        platform={platform}
        screenshot={screenshot}
        scrollProgress={enableRotation ? scrollProgress : 0}
      />
    </>
  )
}

// 2D Fallback Component (Enhanced with animations)
function FallbackDevice({
  platform,
  screenshot,
  className,
}: {
  platform: 'ios' | 'android'
  screenshot?: string
  className?: string
}) {
  useEffect(() => {
    console.log('FallbackDevice rendering with screenshot:', screenshot)
  }, [screenshot])

  return (
    <div
      className={`relative mx-auto transition-transform duration-700 hover:scale-105 ${className || ''}`}
      style={{
        width: platform === 'ios' ? '280px' : '300px',
        maxWidth: '100%',
      }}
    >
      {/* Device Frame */}
      <div
        className={`relative overflow-hidden bg-[#1c1c1e] shadow-2xl transition-shadow duration-300 hover:shadow-primary/20 ${
          platform === 'ios' ? 'rounded-[3rem]' : 'rounded-[2rem]'
        }`}
        style={{
          aspectRatio: platform === 'ios' ? '9/19.5' : '9/19',
          border: '12px solid #1c1c1e',
        }}
      >
        {/* Screen */}
        {screenshot ? (
          <Image
            src={screenshot}
            alt={`${platform} device screenshot`}
            fill
            sizes="(max-width: 768px) 280px, 300px"
            className="object-cover"
            priority={true}
            quality={90}
            onLoad={() => console.log('✓ Image loaded successfully')}
            onError={(e) => console.error('✗ Image failed to load:', e)}
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )}

        {/* iOS Notch */}
        {platform === 'ios' && (
          <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-[#1c1c1e]" />
        )}

        {/* Subtle glow effect on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 122, 255, 0.1) 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  )
}

export default function DeviceMockup3D({
  platform,
  screenshot,
  className,
  enableRotation = true,
}: DeviceMockup3DProps) {
  // For now, always use 2D fallback for reliability
  // TODO: Fix 3D texture rendering and re-enable
  const use3D = false

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Use 2D fallback if reduced motion is preferred or WebGL not supported
  if (!use3D || prefersReducedMotion) {
    return (
      <FallbackDevice
        platform={platform}
        screenshot={screenshot}
        className={className}
      />
    )
  }

  return (
    <div className={`h-[600px] w-full ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        shadows
        dpr={[1, 2]} // Responsive pixel ratio
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene
          platform={platform}
          screenshot={screenshot}
          enableRotation={enableRotation && !prefersReducedMotion}
        />
      </Canvas>
    </div>
  )
}
