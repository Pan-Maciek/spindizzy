export default class Color extends Float32Array {
    constructor(r, g, b) {
        super(3)
        this[0] = r / 255
        this[1] = g / 255
        this[2] = b / 255
    }
    static avg(color1, color2) {
        
        return new Color(
            (color1[0] + color2[0]) / 2 * 220,
            (color1[1] + color2[1]) / 2 * 220,
            (color1[2] + color2[2]) / 2 * 220
        )
    }
}