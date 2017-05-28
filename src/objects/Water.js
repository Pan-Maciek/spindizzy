import { shape } from '../Shape'
import Plane from '../physics/coliders/Plane'
import Vec3 from '../math/Vec3'
import Settings from '../Settings'

const s = 1 + Settings.blocksSpacing

export default class Water {

    constructor(position, height, width) {

        this.position = new Vec3((-position[1] - .5) * s, (-position[0] - .5) * s, -position[2])

        this.top = shape([
            [0, 0, 0],
            [width * s, 0, 0],
            [width * s, height * s, 0],
            [0, height * s, 0]
        ])
    }
    
    draw(bp, gl) {
        bp.position.set(this.position)
        bp.vert.set(this.top)
        bp.color.set(this.style.top.fill)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

}