import React, {MutableRefObject, useLayoutEffect, useRef} from "react"
import {PerspectiveCamera} from "@react-three/drei";
import {Object3D, Vector3} from "three";
import {useFrame} from "@react-three/fiber";
import {proxy, ref, useSnapshot} from "valtio";
import {lerp} from "../../utils/numbers";

export const cameraStateProxy = proxy<{
    playerRef: null | MutableRefObject<Object3D>
}>({
    playerRef: null,
})

export const setPlayerRef = (playerRef: MutableRefObject<Object3D>) => {
    cameraStateProxy.playerRef = ref(playerRef)
    return () => {
        cameraStateProxy.playerRef = null
    }
}

let x = 0
let y = 0
let amount = 0

export const PlayerCamera: React.FC = () => {
    const groupRef = useRef<Object3D>()
    const ref = useRef<any>()
    useLayoutEffect(() => {
        ref.current.up.set(0,0,1)
        ref.current.lookAt(new Vector3())
    }, [])

    const playerRef = useSnapshot(cameraStateProxy).playerRef

    useFrame((state, delta) => {
        if (!playerRef) return
        if (!playerRef.current) return
        if (!groupRef.current) return
        x = playerRef.current.position.x
        y = playerRef.current.position.y
        amount = delta * 50
        amount = amount > 1 ? 1 : amount
        x = lerp(groupRef.current?.position.x ?? x, x, delta)
        y = lerp(groupRef.current?.position.y ?? y, y, delta)
        groupRef.current?.position.set(x, y, groupRef.current?.position.z ?? 0)
    })

    return (
        <group ref={groupRef}>
            <PerspectiveCamera ref={ref} makeDefault position={[10, -10, 20]} fov={12} />
        </group>
    )
}
