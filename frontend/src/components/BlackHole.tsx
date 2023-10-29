import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import useMediaQuery from '@mui/material/useMediaQuery';

const BlackHole = () => {

    const blackHole = useGLTF("./blackHole/scene.gltf")

    return (
        <mesh>
            <hemisphereLight
                intensity={1}
                groundColor="white"
            />
            <ambientLight />
            <directionalLight color="orange" position={[0, 30, 5]} />
            <directionalLight color="orange" position={[0, 300, -600]} />
            <pointLight position={[5, 20, 0]} />
            <pointLight position={[-5, 20, 0]} />
            <primitive
                object={blackHole.scene}
                scale={0.9}
                rotation={[0, 0, 0]}
                position-y={0}
                position-x={0}
            />
        </mesh>
    )
}


const BlackHoleCanvas = () => {
    const isSuperSmall = useMediaQuery('(max-width:480px)');

    return (
        <Canvas
            shadows
            frameloop="demand"
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-9, (isSuperSmall ? 8 : 0), 7],
            }}
            style={{ background: 'rgba(00, 00, 00, 0.1)' }}
        >
            <Suspense>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={-1.1}
                    enableZoom={false}
                    enableRotate={false} 
                    enableDamping={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 3.5}
                    minPolarAngle={0}
                />
                <BlackHole />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default BlackHoleCanvas