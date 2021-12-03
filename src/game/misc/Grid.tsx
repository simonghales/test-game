import React from "react"

export const Grid: React.FC = () => {
    return (
        <gridHelper rotation={[Math.PI / 2, 0, 0]} args={[256, 256, '#606060', '#909090']}/>
    )
}
