import { shape } from '../Shape'
import Vec3 from '../math/Vec3'
import Style from '../Style'
import Sphere from '../physics/coliders/Sphere'

export default class Player {
    constructor(position) {
        this.sphere = new Sphere(new Vec3(0, 0, -5), .8)

        this.top = shape([
            [-.3, -.3, -1.6],
            [.3, -.3, -1.6],
            [.3, .3, -1.6],
            [-.3, .3, -1.6]
        ])

        this.sides = [
            shape([[.3, -.3, -1.6],
            [0, 0, -.8],
            [-.3, -.3, -1.6]]),

            shape([[.3, .3, -1.6],
            [0, 0, -.8],
            [.3, -.3, -1.6]]),

            shape([[-.3, .3, -1.6],
            [0, 0, -.8],
            [.3, .3, -1.6]]),

            shape([[-.3, -.3, -1.6],
            [0, 0, -.8],
            [-.3, .3, -1.6]])
        ]

        this.style = new Style({
            top: {
                fill: [255, 255, 255],
                stroke: [140, 8, 75]
            },
            sides: {
                fill: [64, 21, 207],
                stroke: [140, 8, 75]
            }
        })
        this.force = new Vec3(0, 0, 0)
    }
    draw(bp, gl) {
        bp.position.set(this.sphere.p)

        bp.vert.set(this.top.points)
        bp.color.set(this.style.top.fill)
        gl.drawArrays(gl.TRIANGLES, 0, this.top.points.length / 3)
        bp.color.set(this.style.top.stroke)
        gl.drawArrays(gl.LINE_LOOP, 0, this.top.points.length / 3)

        for (let i = 0; i < 4; i++) {
            bp.vert.set(this.sides[i].points)
            bp.color.set(this.style.sides.fill)
            gl.drawArrays(gl.TRIANGLES, 0, this.sides[i].points.length / 3)
            bp.color.set(this.style.sides.stroke)
            gl.drawArrays(gl.LINE_LOOP, 0, this.sides[i].points.length / 3)
        }
    }
    update(blocks) {
        this.sphere.p.add(new Vec3(0, 0, .1))
        this.sphere.p.add(this.force)
        var data = blocks.elements[0].topPlane.intersect(this.sphere)

        if (data[1] > 0 && data[0] < this.sphere.r) {
            this.sphere.p.sub(Vec3.scale(blocks.elements[0].topPlane.norm, data[0]))
        }
    }
}
