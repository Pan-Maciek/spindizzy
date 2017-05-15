import { drawShape, shape } from '../shape'
import Vec3 from '../math/Vec3'
import Settings from '../Settings'

const s = 1 + Settings.blocksSpacing

export default class Slide {

    constructor(position, height, heights, renderSides = true) {

        this.position = new Vec3(-position[1] * s, -position[0] * s, -position[2])
        this.renderSides = renderSides
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
            x, y + 1, z,
            x + 1, y + 1, z,
            x + 1, y + 1, z,
            x + 1, y, z
        ]
    }

    draw(bp, gl) {
        bp.position.set(this.position)

        this.top.draw(bp, this.style.top, gl)

        this.sides[1].draw(bp, this.style.sides, gl)
        this.sides[2].draw(bp, this.style.sides, gl)
    }
}
