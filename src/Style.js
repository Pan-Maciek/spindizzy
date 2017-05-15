class Color extends Float32Array {
    constructor(r, g, b) {
        super(3)
        this[0] = r / 255
        this[1] = g / 255
        this[2] = b / 255
    }
}

export default class Style {
    constructor(style) {
        this.top = {
            fill: new Color(...style.top.fill),
            stroke: new Color(...style.top.stroke)
        }
        this.sides = {
            fill: new Color(...style.sides.fill),
            stroke: new Color(...style.sides.stroke)
        }
    }
}