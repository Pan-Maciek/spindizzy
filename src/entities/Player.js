import { shape } from '../Shape'
import Vec3 from '../math/Vec3'
import Style from '../Style'
import Sphere from '../physics/coliders/Sphere'
import Settings from '../Settings'

const s = 1 + Settings.blocksSpacing

export default class Player {
    constructor(position) {
        this.sphere = new Sphere(new Vec3(-position[1], -position[0], -position[2]), .8)

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
        this.t = 0
    }
    draw(bp, gl) {
        const pos = new Vec3(this.sphere.p[0] * s, this.sphere.p[1] * s, this.sphere.p[2])
        bp.position.set(pos)

        // var t = this.t -= 0.1
        // var topPoints = []
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])
        // t += Math.PI / 2
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])
        // t += Math.PI / 2
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])
        // t += Math.PI / 2
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])

        // this.top = shape(topPoints)

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

        x.innerText = ''
        for (var i = 0; i < blocks.elements.length; i++) {

            if (Math.abs(blocks.elements[i].position[0] - this.sphere.p[0]) > .5) continue
            if (Math.abs(blocks.elements[i].position[1] - this.sphere.p[1]) > .5) continue

            var data = blocks.elements[i].topPlane.intersect(this.sphere)

            if (data[1] > 0 && data[0] < this.sphere.r) {
                let v = (Vec3.scale(blocks.elements[i].topPlane.norm, -data[0]))

                x.innerText = v
                this.sphere.p.add(v)
                break
            }
        }
    }
}
