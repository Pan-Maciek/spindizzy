import { shape, drawShape } from '../shape'
import Vec3 from '../math/Vec3'
import Style from '../Style'

export default class Player {
    constructor(position) {
        this.position = new Vec3(0, 0, -.5)

        this.top = shape([
            [0, 0, -.8],
            [.6, 0, -.8],
            [.6, .6, -.8],
            [0, .6, -.8]
        ], this.position)

        this.sides = [
            shape([[.6, 0, -.8],
            [.3, .3, 0],
            [0, 0, -.8]], this.position),

            shape([[.6, .6, -.8],
            [.3, .3, 0],
            [.6, 0, -.8]], this.position),

            shape([[0, .6, -.8],
            [.3, .3, 0],
            [.6, .6, -.8]], this.position),

            shape([[0, 0, -.8],
            [.3, .3, 0],
            [0, .6, -.8]], this.position)
        ]

        this.style = new Style({
            top: {
                fill: [255, 0, 0],
                stroke: [255, 255, 255]
            },
            sides: {
                fill: [0, 255, 0],
                stroke: [255, 255, 255]
            }
        })
    }
    draw(bp, gl) {
        bp.position.set(this.position)
        this.top.draw(bp, this.style.top, gl)
        this.sides[0].draw(bp, this.style.sides, gl)
        this.sides[1].draw(bp, this.style.sides, gl)
        this.sides[2].draw(bp, this.style.sides, gl)
        this.sides[3].draw(bp, this.style.sides, gl)
    }
}
