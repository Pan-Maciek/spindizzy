import { shape } from '../Shape'
import Vec3 from '../math/Vec3'
import Style from '../Style'
import Sphere from '../physics/coliders/Sphere'
import Settings from '../Settings'
import { approach, side } from '../math/Util'

const s = 1 + Settings.blocksSpacing
import { Gravity } from '../physics/const'
import Resources from '../Resources'

export default class Player {
    constructor(position) {
        this.sphere = new Sphere(new Vec3(-position[1], -position[0], -position[2]), .5)

        this.velocity = new Vec3(0, 0, 0)
        this.createShapes()

        this.style = new Style({
            top: {
                fill: [255, 255, 255],
                stroke: [0, 0, 0]
            },
            sides: {
                fill: [64, 21, 207],
                stroke: [0, 0, 0]
            }
        })
        this.targetVelocity = new Vec3(0, 0, 0)
        this.move = new Vec3(0, 0, 0)
        this.t = 0
        this.lastBlockPos = new Vec3(0, 0, 0)
    }

    createShapes() {

        let temp = [1, 2, 3, 4], t = this.t

        for (var i = 0; i < 4; i++) {
            temp[i] = [Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.1]
            t += Math.PI / 2
        }

        this.top = shape(temp)

        this.sides = []
        t = this.t

        temp = [1, [0.5, 0.5, -.9], 3]

        for (var i = 0; i < 4; i++) {
            temp[0] = [Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.1]
            t += Math.PI / 2
            temp[2] = [Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.1]
            this.sides.push(shape(temp))
        }

        const direction = (Math.sign(this.velocity[0]) || 1) * ((-Math.sign(this.velocity[1])) || 1)
        const speed = Math.floor(this.velocity.length * 100) / 75

        if (speed > 0.02) {
            this.t -= speed * direction
        }
    }

    draw(bp, gl) {
        const pos = new Vec3(this.sphere.p[0] * s, this.sphere.p[1] * s, this.sphere.p[2])
        bp.position.set(pos)

        this.createShapes()

        bp.vert.set(this.top)
        bp.color.set(this.style.top.fill)
        gl.drawArrays(gl.TRIANGLES, 0, this.top.length / 3)
        bp.color.set(this.style.top.stroke)
        gl.drawArrays(gl.LINE_LOOP, 0, this.top.length / 3)

        for (let i = 0; i < 4; i++) {
            bp.vert.set(this.sides[i])
            bp.color.set(this.style.sides.fill)
            gl.drawArrays(gl.TRIANGLES, 0, this.sides[i].length / 3)
            bp.color.set(this.style.sides.stroke)
            gl.drawArrays(gl.LINE_LOOP, 0, this.sides[i].length / 3)
        }
    }

    update(blocks, dt, game) {

        this.sphere.p.add(this.velocity)
        var temp = [0, 0, 0]

        for (var i = 0; i < blocks.elements.length; i++) {
            var dx = Math.abs(blocks.elements[i].position[0] - this.sphere.p[0])
            var dy = Math.abs(blocks.elements[i].position[1] - this.sphere.p[1])

            if (dx > 0.5) continue
            if (dy > 0.5) continue

            var topData = blocks.elements[i].topPlane.intersect(this.sphere)
            
            if (topData[1] > 0 && topData[0] < this.sphere.r) {
                var v = (Vec3.scale(blocks.elements[i].topPlane.norm, -topData[0]))

                this.sphere.p.add(v)
                temp[0] -= blocks.elements[i].topPlane.norm[0]
                temp[1] -= blocks.elements[i].topPlane.norm[1]
                temp[2] -= blocks.elements[i].topPlane.norm[2]
                this.lastBlock = blocks.elements[i]
                this.lastMapN = game.mapN
                this.lastMapE = game.mapE
            }

            if (blocks.elements[i].position[2] <= this.sphere.p[2] &&
                blocks.elements[i].position[2] + blocks.elements[i].height > this.sphere.p[2] + this.sphere.r) {

                const vel = Vec3.reflect(this.velocity, side(blocks.elements[i].position, this.sphere.p), 0.9)
                this.sphere.p.sub(this.velocity)
                this.velocity = vel
            }

        }

        // changing maps
        if (this.sphere.p[0] < -4.5) {
            game.mapN += 1
            this.sphere.p[0] = 3.5
            game.setMap(game.mapN, game.mapE)
        } else if (this.sphere.p[0] > 3.5) {
            game.mapN -= 1
            this.sphere.p[0] = -4.5
            game.setMap(game.mapN, game.mapE)
        }
        if (this.sphere.p[1] < -4.5) {
            game.mapE -= 1
            this.sphere.p[1] = 3.5
            game.setMap(game.mapN, game.mapE)
        } else if (this.sphere.p[1] > 3.5) {
            game.mapE += 1
            this.sphere.p[1] = -4.5
            game.setMap(game.mapN, game.mapE)
        }

        this.velocity[0] =
            approach(this.targetVelocity[0] + this.move[0] + Gravity[0] + temp[0], this.velocity[0], dt / 5)
        this.velocity[1] =
            approach(this.targetVelocity[1] + this.move[1] + Gravity[1] + temp[1], this.velocity[1], dt / 5)
        this.velocity[2] =
            approach(this.targetVelocity[2] + this.move[2] + Gravity[2] + temp[2], this.velocity[2], dt / 3)


        if (this.sphere.p[2] > 2.5) {
            this.velocity[0] = 0
            this.velocity[1] = 0
            this.velocity[2] = 0

            this.move[0] = 0
            this.move[1] = 0
            this.move[2] = 0

            this.sphere.p[0] = this.lastBlock.position[0]
            this.sphere.p[1] = this.lastBlock.position[1]
            this.sphere.p[2] = this.lastBlock.position[2] - this.lastBlock.height + this.sphere.r
            game.setMap(this.lastMapN, this.lastMapE)
        }
    }
}
