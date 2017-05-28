import { shape } from '../Shape'
import Vec3 from '../math/Vec3'
import Style from '../Style'
import Sphere from '../physics/coliders/Sphere'
import Settings from '../Settings'
import Color from '../gl/Color'

const s = 1 + Settings.blocksSpacing
import Resources from '../Resources'

const black = new Float32Array([0, 0, 0])

export default class Player {
    constructor(position) {
        this.sphere = new Sphere(new Vec3(-position[1], -position[0], -position[2]), .8)

        this.top = shape([
            [-.5, 0, -0.5],
            [0, -.5, -0.5],
            [.5, 0, -0.5],
            [0, .5, -0.5]
        ])

        this.sides = [
            shape([[.5, 0, -0.5],
            [0, 0, 0],
            [0, -.5, -0.5]]),

            shape([[0, .5, -0.5],
            [0, 0, 0],
            [.5, 0, -0.5]]),

            shape([[-.5, 0, -0.5],
            [0, 0, 0],
            [0, .5, -0.5]]),

            shape([[0, -.5, -0.5],
            [0, 0, 0],
            [-.5, 0, -0.5]]),

            shape([[.5, 0, -0.5],
            [0, 0, -0.9],
            [0, -.5, -0.5]]),

            shape([[0, .5, -0.5],
            [0, 0, -0.9],
            [.5, 0, -0.5]]),

            shape([[-.5, 0, -0.5],
            [0, 0, -0.9],
            [0, .5, -0.5]]),

            shape([[0, -.5, -0.5],
            [0, 0, -0.9],
            [-.5, 0, -0.5]])
        ]

        this.t = 0
        this.collected = false
    }
    draw(bp, gl, style) {
        if (this.collected) return
        const pos = new Vec3(this.sphere.p[0] * s, this.sphere.p[1] * s, this.sphere.p[2])
        bp.position.set(pos)

        for (let i = 0; i < 8; i++) {
            bp.vert.set(this.sides[i])
            bp.color.set(Color.random())
            gl.drawArrays(gl.TRIANGLES, 0, this.sides[i].length / 3)
            bp.color.set(black)
            gl.drawArrays(gl.LINE_LOOP, 0, this.sides[i].length / 3)
        }
    }

    update(game, dt) {
        if (
            !this.collected &&
            this.sphere.p.distanceTo(game.player.sphere.p) < 0.75 &&
            Math.abs(game.player.sphere.p[2] - this.sphere.p[2]) > 0.1
        ) {
            this.collected = true
            Resources.sounds.diamond.play()
        }
    }
}
