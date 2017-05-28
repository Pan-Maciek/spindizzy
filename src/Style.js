import Color from './gl/Color'

export default class Style {
    constructor(style) {
        this.top = {
            fill: new Color(...style.top.fill),
            stroke: new Color(...style.top.stroke)
        }
        let fill = new Color(...style.sides.fill)
        this.sides = {
            fill,
            fillLight: Color.avg(fill, this.top.fill).mul(220 / 255),
            stroke: new Color(...style.sides.stroke)
        }

    }
}