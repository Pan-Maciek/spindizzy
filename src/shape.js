import Settings from './Settings'

const s = 1 + Settings.blocksSpacing

export default class Shape {
    constructor(points, v) {
        if (!v) v = [0, 0, 0]
        else v = [v[0] - .5, v[1] - .5, v[2]]
        if (points.length === 3) {
            this.points = new Float32Array([
                points[0][0] + v[0] * s, points[0][1] + v[1] * s, points[0][2] + v[2],
                points[1][0] + v[0] * s, points[1][1] + v[1] * s, points[1][2] + v[2],
                points[2][0] + v[0] * s, points[2][1] + v[1] * s, points[2][2] + v[2]
            ])
        } else {
            this.points = new Float32Array([
                points[0][0] + v[0] * s, points[0][1] + v[1] * s, points[0][2] + v[2],
                points[1][0] + v[0] * s, points[1][1] + v[1] * s, points[1][2] + v[2],
                points[2][0] + v[0] * s, points[2][1] + v[1] * s, points[2][2] + v[2],
                points[2][0] + v[0] * s, points[2][1] + v[1] * s, points[2][2] + v[2],
                points[3][0] + v[0] * s, points[3][1] + v[1] * s, points[3][2] + v[2],
                points[0][0] + v[0] * s, points[0][1] + v[1] * s, points[0][2] + v[2]
            ])
        }
    }
}

export const shape = (points, t) => new Shape(points, t)