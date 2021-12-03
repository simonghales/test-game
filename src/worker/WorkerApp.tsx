import React, {createContext, useContext, useEffect, useState} from "react"
import {
    KeysConsumer,
    PlanckjsPhysicsProvider,
    SyncableComponents, SyncComponent,
    useAddBody,
    useIsKeyPressed,
    useOnPhysicsUpdate
} from "react-three-physics";
import {Body, Box, Circle, Vec2, World} from "planck";
import {Person} from "../game/characters/Person";
import {rotateVector, vectorToAngle} from "../utils/angles";
import {LgShip} from "../game/items/ship/LgShip";

// e-69,d-68,a-65,w-87

export const KEYS = {
    RIGHT: ['68', '39'],
    LEFT: ['65', '37'],
    UP: ['87', '38'],
    DOWN: ['83', '40'],
}

const Wall: React.FC = () => {

    const world = useWorld()

    useEffect(() => {
        const body = world.createBody({
            type: "static",
        })
        body.createFixture({
            shape: Box(1, 10),
        } as any)
        body.setPosition(new Vec2(-5, 0))
        return () => {
            world.destroyBody(body)
        }
    }, [])

    return null

}

const Ball: React.FC<{
    id: string,
}> = ({id}) => {
    const world = useWorld()
    const addBody = useAddBody()
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
            <SyncComponent id={id} componentId={"ball"}/>
        </>
    )
}

let right = false
let left = false
let up = false
let down = false
let xDir = 0
let yDir = 0
let angle = 0

const v2 = new Vec2(0, 0)

const Test: React.FC<{
    id?: string,
}> = ({id}) => {

    const world = useWorld()

    const addBody = useAddBody()

    const [storedBody, setStoredBody] = useState<Body | null>(null)

    useEffect(() => {
        const bodyDef: any = {
            type: "dynamic",
            linearDamping: 40,
            angularDamping: 0.1,
            allowSleep: false,
            fixedRotation: true,
        }

        const body = world.createBody(bodyDef)

        body.setPosition(new Vec2(0, 0))

        const circleShape = Circle(0.2)

        // const fixture =
        body.createFixture({
            density: 50,
            shape: circleShape,
        } as any)

        setStoredBody(body)

        const remove = addBody('test', body)

        return () => {
            remove()
            world.destroyBody(body)
        }
    }, [])

    const isKeyPressed = useIsKeyPressed()

    useOnPhysicsUpdate((delta: number) => {

        if (!storedBody) return

        right = isKeyPressed(KEYS.RIGHT)
        left = isKeyPressed(KEYS.LEFT)
        up = isKeyPressed(KEYS.UP)
        down = isKeyPressed(KEYS.DOWN)
        xDir = right ? 1 : left ? -1 : 0
        yDir = up ? 1 : down ? -1 : 0

        v2.set(xDir, yDir)
        rotateVector(v2, 45)
        v2.normalize()
        v2.mul(delta * 5)

        storedBody.applyLinearImpulse(v2, new Vec2(0, 0))

        // storedBody.setLinearVelocity(v2)

    })

    return null
}

const syncableComponents = {
    test: Test,
}

const WorldContext = createContext<{
    world: World,
}>(null!)

export const useWorld = () => {
    return useContext(WorldContext).world
}

export const WorkerApp: React.FC<{
    worker: Worker
}> = ({worker}) => {

    const [world] = useState(() => new World())

    return (
        <WorldContext.Provider value={{
            world,
        }}>
            <PlanckjsPhysicsProvider stepRate={1000 / 60} worker={worker} world={world}>
                <KeysConsumer>
                    <SyncableComponents components={syncableComponents}>
                        <Wall/>
                        <Person/>
                        <LgShip/>
                        <Ball id={'ball-a'}/>
                        <Ball id={'ball-b'}/>
                        <Ball id={'ball-c'}/>
                        <Ball id={'ball-d'}/>
                        <Ball id={'ball-e'}/>
                        <Ball id={'ball-f'}/>
                    </SyncableComponents>
                </KeysConsumer>
            </PlanckjsPhysicsProvider>
        </WorldContext.Provider>
    )
}

/*

todo - on frame, if next physics step is happening soon, trigger physics update to happen now, and tweak worker loop

// so, time since last physics update is 15ms~ physic updates are every 17ms, it's within a few ms, so trigger it to occur now

 */
