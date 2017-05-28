/** Class representing 4x4 Matrix.
 *
 * NOTE: This class extends Float32Array and is ready to pass to webgl.
 */
export default class Mat4 extends Float32Array {

    constructor(...values) {
        super(16)
        this.set(...values)
    }

    set(...values) {
        this[0] = values[0]
        this[1] = values[4]
        this[2] = values[8]
        this[3] = values[12]
        this[4] = values[1]
        this[5] = values[5]
        this[6] = values[9]
        this[7] = values[13]
        this[8] = values[2]
        this[9] = values[6]
        this[10] = values[10]
        this[11] = values[14]
        this[12] = values[3]
        this[13] = values[7]
        this[14] = values[11]
        this[15] = values[15]
    }

    add(m, out = this) {
        out[0] = this[0] + m[0]
        out[1] = this[1] + m[1]
        out[2] = this[2] + m[2]
        out[3] = this[3] + m[3]
        out[4] = this[4] + m[4]
        out[5] = this[5] + m[5]
        out[6] = this[6] + m[6]
        out[7] = this[7] + m[7]
        out[8] = this[8] + m[8]
        out[9] = this[9] + m[3]
        out[10] = this[10] + m[10]
        out[11] = this[11] + m[11]
        out[12] = this[12] + m[12]
        out[13] = this[13] + m[13]
        out[14] = this[14] + m[14]
        out[15] = this[15] + m[15]

        return out
    }

    mul(m, out = this) {

        const temp = []
        temp.length = 16

        temp[0] = this[0] * m[0] + this[4] * m[1] + this[8] * m[2] + this[12] * m[3]
        temp[1] = this[0] * m[4] + this[4] * m[5] + this[8] * m[6] + this[12] * m[7]
        temp[2] = this[0] * m[8] + this[4] * m[9] + this[8] * m[10] + this[12] * m[11]
        temp[3] = this[0] * m[12] + this[4] * m[13] + this[8] * m[14] + this[12] * m[15]

        temp[4] = this[1] * m[0] + this[5] * m[1] + this[9] * m[2] + this[13] * m[3]
        temp[5] = this[1] * m[4] + this[5] * m[5] + this[9] * m[6] + this[13] * m[7]
        temp[6] = this[1] * m[8] + this[5] * m[9] + this[9] * m[10] + this[13] * m[11]
        temp[7] = this[1] * m[12] + this[5] * m[13] + this[9] * m[14] + this[13] * m[15]

        temp[8] = this[2] * m[0] + this[6] * m[1] + this[10] * m[2] + this[14] * m[3]
        temp[9] = this[2] * m[4] + this[6] * m[5] + this[10] * m[6] + this[14] * m[7]
        temp[10] = this[2] * m[8] + this[6] * m[9] + this[10] * m[10] + this[14] * m[11]
        temp[11] = this[2] * m[12] + this[6] * m[13] + this[10] * m[14] + this[14] * m[15]

        temp[12] = this[3] * m[0] + this[7] * m[1] + this[11] * m[2] + this[15] * m[3]
        temp[13] = this[3] * m[4] + this[7] * m[5] + this[11] * m[6] + this[15] * m[7]
        temp[14] = this[3] * m[8] + this[7] * m[9] + this[11] * m[10] + this[15] * m[11]
        temp[15] = this[3] * m[12] + this[7] * m[13] + this[11] * m[14] + this[15] * m[15]

        out.set(...temp)

        return out
    }

    zoom(v, out = this) {
        out[0] = this[0] * v
        out[1] = this[1] * v
        out[2] = this[2] * v
        out[4] = this[4] * v
        out[5] = this[5] * v
        out[6] = this[6] * v
        out[8] = this[8] * v
        out[9] = this[9] * v
        out[10] = this[10] * v
        return out
    }

}
