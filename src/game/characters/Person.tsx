import React, {useEffect} from "react"
import {useAddBody} from "react-three-physics";
import {useWorld} from "../../worker/WorkerApp";
import {Circle, Vec2} from "planck";

export const Person: React.FC = () => {
    const world = useWorld()
    const addBody = useAddBody()
    const id = 'person'
    useEffect(() => {
        const body = world.createBody({
            type: "dynamic",
            linearDamping: 3,
        })
        body.createFixture({
            friction: 0.5,
            restitution: 0.1,
            shape: Circle(0.1),
        } as any)
        body.setPosition(new Vec2((Math.random() * 5) - 2.5, (Math.random() * 5) - 2.5))
        addBody(id, body)
        return () => {
            world.destroyBody(body)
        }
    }, [])
    return (
        <>

        </>
    )
}
