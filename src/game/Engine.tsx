import React, {useState} from "react"

// @ts-ignore
import PhysicsWorker from '../worker/physics.worker';
import {
    KeysCapture,
    PlanckjsPhysicsConsumer,
    SyncableComponents,
    SyncComponent,
    useOnWorkerPhysicsUpdate, usePhysicsRef
} from "react-three-physics";
import {Canvas} from "@react-three/fiber";
import styled from "styled-components";
import { Sphere } from "@react-three/drei";
import {PlayerCamera} from "./player/PlayerCamera";
import {Grid} from "./misc/Grid";
import {Player} from "./player/Player";
import {Ship} from "./items/ship/Ship";

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`

const Ball: React.FC<{
    id: string,
}> = ({id}) => {
    const ref = usePhysicsRef(id)
    return (
        <Sphere args={[0.1]} ref={ref}/>
    )
}

const components: any = {
    ball: Ball,
    ship: Ship,
}

export const Engine: React.FC = () => {

    const [worker] = useState(() => {
        return new PhysicsWorker()
    })

    return (
        <StyledContainer>
            <Canvas>
                <PlanckjsPhysicsConsumer stepRate={1000 / 60} worker={worker}>
                    <Grid/>
                    <PlayerCamera/>
                    <KeysCapture/>
                    <SyncableComponents components={components}>
                        <Player/>
                        <SyncComponent id={"test"} componentId={"test"}/>
                    </SyncableComponents>
                </PlanckjsPhysicsConsumer>
            </Canvas>
        </StyledContainer>
    )
}
