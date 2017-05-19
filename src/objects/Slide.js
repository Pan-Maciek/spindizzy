import { drawShape, shape } from '../Shape'
import Plane from '../physics/coliders/Plane'
import Vec3 from '../math/Vec3'
import Settings from '../Settings'

const s = 1 + Settings.blocksSpacing

export default class Slide {

    constructor(position, height, heights) {

        this.position = new Vec3(-position[1], -position[0], -position[2])

        this.sides = [
            shape([
                [1, 0, -height - heights[0]],
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, -height - heights[3]],
            ], this.position), shape([
                [1, 1, -height - heights[1]],
                [1, 1, 0],
                [1, 0, 0],
                [1, 0, -height - heights[0]],
            ], this.position), shape([
                [1, 1, -height - heights[1]],
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, -height - heights[2]],
            ], this.position), shape([
                [0, 1, -height - heights[2]],
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, -height - heights[3]],
            ], this.position)
        ]

        this.top = shape([
            [0, 0, -height - heights[3]],
            [1, 0, -height - heights[0]],
            [1, 1, -height - heights[1]],
            [0, 1, -height - heights[2]],
        ], this.position)

        const [x, y, z] = this.position
        this.bottom = [
            (x - .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y - .5) * s, z
        ]


        this.topPlane = new Plane(
            new Vec3(0 + this.position[0] - .5, 0 + this.position[1] - .5, -height - heights[3] + this.position[2]),
            new Vec3(1 + this.position[0] - .5, 0 + this.position[1] - .5, -height - heights[0] + this.position[2]),
            new Vec3(1 + this.position[0] - .5, 1 + this.position[1] - .5, -height - heights[1] + this.position[2])
        )
    }
}
