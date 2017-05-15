class Shape {
    constructor(points, v) {
        if (points.length === 3) {
            this.points = new Float32Array([
                points[0][0] + v[0], points[0][1] + v[1], points[0][2] + v[2],
                points[1][0] + v[0], points[1][1] + v[1], points[1][2] + v[2],
                points[2][0] + v[0], points[2][1] + v[1], points[2][2] + v[2]
            ])
        } else {
            this.points = new Float32Array([
                points[0][0] + v[0], points[0][1] + v[1], points[0][2] + v[2],
                points[1][0] + v[0], points[1][1] + v[1], points[1][2] + v[2],
                points[2][0] + v[0], points[2][1] + v[1], points[2][2] + v[2],
                points[2][0] + v[0], points[2][1] + v[1], points[2][2] + v[2],
                points[3][0] + v[0], points[3][1] + v[1], points[3][2] + v[2],
                points[0][0] + v[0], points[0][1] + v[1], points[0][2] + v[2]
            ])
        }
    }

    draw(bp, style, gl) {
        bp.vert.set(this.points)
        bp.color.set(style.fill)
        gl.drawArrays(4, 0, this.points.length / 3) // TRIANGLES

        bp.color.set(style.stroke)
        gl.drawArrays(2, 0, this.points.length / 3) // LINE_LOOP
    }
    drawChecked(cp, style, gl) {
        cp.vert.set(this.points)
        cp.color1.set(style.top.fill)
        cp.color2.set(style.sides.fill)
        gl.drawArrays(4, 0, this.points.length / 3) // TRIANGLES

        gl.drawArrays(2, 0, this.points.length / 3) // LINE_LOOP
    }
}

export const shape = (points, t) => {
    return new Shape(points, t)
}