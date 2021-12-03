import React, {useEffect} from "react"
import {SyncComponent} from "react-three-physics";
import {useWorld} from "../../../worker/WorkerApp";
import {Box, Circle, Vec2} from "planck";

export const LgShip: React.FC = () => {

    const x = -1
    const y = -1

    const world = useWorld()

    useEffect(() => {
        const body = world.createBody({
            type: 'static',
        })
        body.setPosition(new Vec2(x, y))
        const circleShape = Circle(2)
        body.createFixture({
            isSensor: true,
            shape: circleShape,
        } as any)
        body.createFixture({
            shape: Box(0.5, 0.5),
        } as any)
        return () => {
            world.destroyBody(body)
        }
    }, [])

    return (
        <>
            <SyncComponent id={'ship'} componentId={"ship"} x={x} y={y}/>
        </>
    )
}
