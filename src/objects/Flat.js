import { shape } from '../Shape'
import Plane from '../physics/coliders/Plane'
import Vec3 from '../math/Vec3'
import Settings from '../Settings'

const s = 1 + Settings.blocksSpacing

export default class Flat {

    constructor(position, height) {
        this.height = height
        this.position = new Vec3(-position[1], -position[0], -position[2])

        this.sides = [
            shape([ // back left
                [1, 0, -height],
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, -height]
            ], this.position), shape([ // fron left
                [1, 1, -height],
                [1, 1, 0],
                [1, 0, 0],
                [1, 0, -height]
            ], this.position), shape([ // fron right
                [1, 1, -height],
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, -height]
            ], this.position), shape([ // back right
                [0, 1, -height],
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, -height]
            ], this.position)
        ]

        this.top = shape([
            [0, 0, -height],
            [1, 0, -height],
            [1, 1, -height],
            [0, 1, -height]
        ], this.position)

        const [x, y, z] = this.position
        this.bottom = [
            (x - .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y - .5) * s, z
        ]

        this.topPlane = new Plane(
            new Vec3(0, 0, -height + this.position[2]),
            new Vec3(1, 0, -height + this.position[2]),
            new Vec3(1, 1, -height + this.position[2])
        )

        this.sidePlanes = [
            new Plane( // back left
                new Vec3(1, 0, -height),
                new Vec3(1, 0, 0),
                new Vec3(0, 0, 0)
            ),
            
            new Plane( // fron left
                new Vec3(1, 1, -height),
                new Vec3(1, 1, 0),
                new Vec3(1, 0, 0)
            ),
            
            new Plane( // fron right
                new Vec3(1, 1, -height),
                new Vec3(1, 1, 0),
                new Vec3(0, 1, 0)
            ),

            new Plane( // back right
                new Vec3(0, 1, -height),
                new Vec3(0, 1, 0),
                new Vec3(0, 0, 0)
            )
        ]

    }
}