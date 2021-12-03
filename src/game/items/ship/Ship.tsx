import { Box } from "@react-three/drei"
import React, {useEffect} from "react"

export const Ship: React.FC<{
    x: number,
    y: number,
}> = ({x, y}) => {

    return (
        <group position={[x, y, 0]}>
            <Box args={[1, 1, 1]}/>
        </group>
    )
}
