import Vec3 from '../../math/Vec3'

export default class Plane {

    /**
     * NOTE: Points musnt be colinear!
     *
     * @param {Vec3} A point at plane
     * @param {Vec3} B point at plane
     * @param {Vec3} C point at plane
     */
    constructor(A, B, C) {

        const v1 = Vec3.sub(B, A)
        const v2 = Vec3.sub(C, A)

        this.norm = v1.corss(v2).normalize()
        
        this.p = A

    }

    intersect(sphere) {
        const v = Vec3.sub(sphere.p, this.p)
        const distance = this.norm.dot(v) - sphere.r
        return [Math.abs(distance), Math.sign(distance)]
    }

}