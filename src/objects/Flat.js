import { drawShape, shape } from '../shape'
import Vec3 from '../math/Vec3'
import Settings from '../Settings'

const s = 1 + Settings.blocksSpacing

export default class Flat {

    constructor(position, height, renderSides = true) {

        this.position = new Vec3(-position[1] * s, -position[0] * s, -position[2])
        this.renderSides = renderSides

        this.sides = [
            shape([
                [1, 0, -height],
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, -height]
            ], this.position), shape([
                [1, 1, -height],
                [1, 1, 0],
                [1, 0, 0],
                [1, 0, -height]
            ], this.position), shape([
                [1, 1, -height],
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, -height]
            ], this.position), shape([
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
            x, y + 1, z,
            x + 1, y + 1, z,
            x + 1, y + 1, z,
            x + 1, y, z
        ]
    }

    draw(bp, gl) {
        bp.position.set(this.position)

        this.sides[1].draw(bp, this.style.sides, gl)
        this.sides[2].draw(bp, this.style.sides, gl)

        this.top.draw(bp, this.style.top, gl)
    }
}