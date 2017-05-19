import Settings from '../Settings'
import Vec3 from '../math/Vec3'
const s = 1 + Settings.blocksSpacing

export default class Arrow {

    constructor(position, dir) {

        this.position = new Vec3((-position[1] - .5) * s, (-position[0] - .5) * s, -position[2])

        switch (dir) {
            case 0:
                this.shape = new Float32Array([
                    .5, .1, 0,
                    .1, .5, 0,
                    .9, .5, 0,
                    .4, .5, 0,
                    .4, .9, 0,
                    .6, .9, 0,
                    .6, .5, 0,
                    .4, .5, 0,
                    .6, .9, 0,
                ])
                break
            case 1:
                this.shape = new Float32Array([
                    .1, .5, 0,
                    .5, .1, 0,
                    .5, .9, 0,
                    .5, .4, 0,
                    .9, .4, 0,
                    .9, .6, 0,
                    .5, .6, 0,
                    .5, .4, 0,
                    .9, .6, 0,
                ])
                break
            case 2:
                this.shape = new Float32Array([
                    0.5, 0.9, 0,
                    0.9, 0.5, 0,
                    0.1, 0.5, 0,
                    0.6, 0.5, 0,
                    0.6, 0.1, 0,
                    0.4, 0.1, 0,
                    0.4, 0.5, 0,
                    0.6, 0.5, 0,
                    0.4, 0.1, 0
                ])
                break
            case 3:
                this.shape = new Float32Array([
                    0.9, 0.5, 0,
                    0.5, 0.9, 0,
                    0.5, 0.1, 0,
                    0.5, 0.6, 0,
                    0.1, 0.6, 0,
                    0.1, 0.4, 0,
                    0.5, 0.4, 0,
                    0.5, 0.6, 0,
                    0.1, 0.4, 0
                ])
                break
        }

    }
    draw(bp, gl) {
        bp.position.set(this.position)
        bp.color.set(this.style.sides.fill)
        bp.vert.set(this.shape)
        gl.drawArrays(gl.TRIANGLES, 0, this.shape.length / 3)
    }
}