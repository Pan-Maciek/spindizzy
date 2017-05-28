import { avg } from '../math/Util'

export default class Color extends Float32Array {
    /** Creates new Color.
     * 
     * @param {Number} r Range <0; 255> default is 0.
     * @param {Number} g Range <0; 255> default is 0.
     * @param {Number} b Range <0; 255> default is 0.
     */
    constructor(r = 0, g = 0, b = 0) {
        super(3)
        if (arguments[3] === true) {
            this[0] = r
            this[1] = g
            this[2] = b
        } else {
            this[0] = r / 255
            this[1] = g / 255
            this[2] = b / 255
        }
    }

    /** Returns new Color created from avg of passed colors.
     * 
     * @param {...(Color|Float32Array|Array<Number>)} colors
     * @returns {Color}
     *
     */
    static avg(...colors) {
        const n = colors.length

        let rSum = 0
        let gSum = 0
        let bSum = 0

        for (const [r, g, b] of colors) {
            rSum += r
            gSum += g
            bSum += b
        }

        return new Color(
            (rSum) / n,
            (gSum) / n,
            (bSum) / n,
            true
        )
    }

    /** Returns random color. You can specify maximum value per component.
     * 
     * @param {Number=} r Range <0;1>
     * @param {Number=} g Range <0;1>
     * @param {Number=} b Range <0;1>
     * @returns {Color}
     *
     */
    static random(r = 1, g = 1, b = 1) {
        return new Color(Math.random() * r, Math.random() * g, Math.random() * b, true)
    }

    /** Multiplies each component of color by passed value(s).
     * 
     * @param {Number} r  Range <0;1>
     * @param {Number=} g Range <0;1> default r value.
     * @param {Number=} b Range <0;1> default r value.
     * @returns {Color}
     *
     */
    mul(r, g = r, b = r) {
        this[0] *= r
        this[1] *= g
        this[2] *= b

        return this
    }
}
