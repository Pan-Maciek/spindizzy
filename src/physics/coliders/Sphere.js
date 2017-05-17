import Vec3 from '../../math/Vec3'

export default class Sphere {

    /** 
     *
     * @param {Vec3} p center of Sphere
     * @param {Number} r radius
     */
    constructor(p, r) {
        this.p = p
        this.r = r
    }

    distanceTo(plane) {
        const v = Vec3.sub(this.p, plane.p)
        const distance = plane.norm.dot(v) - this.r
        return [Math.abs(distance), Math.sign(distance)]
    }
}