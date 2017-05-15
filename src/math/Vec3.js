/** Class representing a 3d vector.
 * @version 0.0.2
 */
export default class Vec3 extends Float32Array {

    constructor(x = 0, y = 0, z = 0) {
        super(3)
        this[0] = x
        this[1] = y
        this[2] = z
    }

    /** Adds v to this vector.
     * @param {Vec3} v
     * @param {Vec3} out Specify target to store operation results.
     * @version 0.0.1
     */
    add(v, out = this) {
        out[0] = this[0] + v[0]
        out[1] = this[1] + v[1]
        out[2] = this[2] + v[2]
        return out
    }

    /** Substracts v from this vector.
     * @param {Vec3} v
     * @param {Vec3} out Specify target to store operation results.
     * @version 0.0.1
     */
    sub(v, out = this) {
        out[0] = this[0] - v[0]
        out[1] = this[1] - v[1]
        out[2] = this[2] - v[2]
        return out
    }

    /** Returns a new Vec3 with the same x, y and z values as this one.
     * @returns {Vec3}
     * @version 0.0.1
     */
    clone() {
        return new Vec3(this[0], this[1], this[2])
    }

    /** Copies the values of the passed vector to this Vec3.
     * @param {Vec3|Number[]} input
     * @returns {Vec3}
     * @version 0.0.1
     */
    copy(input) {
        this[0] = input[0]
        this[1] = input[1]
        this[2] = input[2]
        return this
    }

    dot(v) {
        return this[0] * v[0] + this[1] * v[1] + this[2] * v[2]
    }

    corss(v, out = this) {
        const temp = new Vec3
        temp[0] = +(this[1] * v[2] - this[2] * v[1])
        temp[1] = -(this[0] * v[2] - this[2] * v[0])
        temp[2] = +(this[0] * v[1] - this[1] * v[0])
        return out.copy(temp)
    }

    /** Computes the distance from this vector to v.
     * @param {Vec3|Number[]} v
     * @version 0.0.1
     */
    distanceTo(v) {
        return Math.hypot(this[0] - v[0], this[1] - v[1], this[2] - v[2])
    }

    scale(s, out = this) {
        out[0] = this[0] * s
        out[1] = this[1] * s
        out[2] = this[2] * s
    }

    get length() {
        return Math.hypot(this[0], this[1], this[2])
    }

    toFloat32Array() {
        return new Float32Array([this[0], this[1], this[2]])
    }

    normalize(out = this) {
        const length = this.length
        out[0] = this[0] / length
        out[1] = this[1] / length
        out[2] = this[2] / length
        return out
    }

    static sub(v1, v2) {
        return v1.sub(v2, new Vec3)
    }

    static add(v1, v2) {
        return v1.add(v2, new Vec3)
    }

    static scale(v, s) {
        return new Vec3(v[0] * s, v[1] * s, v[2] * s)
    }

}