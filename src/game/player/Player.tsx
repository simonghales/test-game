import React, {useEffect} from "react"
import {usePhysicsRef} from "react-three-physics";
import {Sphere} from "@react-three/drei";
import {setPlayerRef} from "./PlayerCamera";

export const Player: React.FC = () => {
    const ref = usePhysicsRef('test')
    useEffect(() => {
        return setPlayerRef(ref as any)
    }, [])
    return (
        <Sphere args={[0.2]} ref={ref}/>
    )
}
