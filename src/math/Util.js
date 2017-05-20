import Vec3 from './Vec3'
const __PI180__ = Math.PI / 180
const __180PI__ = 180 / Math.PI

/** Convert degrees to radians.
 * @param {Number} deg degrees
 * @returns {Number}
 */
export const degToRad = deg => deg * __PI180__

/** Convert radians to degrees.
 * @param {Number} deg radians
 * @returns {Number}
 */
export const radToDeg = deg => deg * __180PI__

export const approach = (goal, current, dt) => {

    const distance = goal - current

    if (distance > dt)
        return current + dt
    if (distance < -dt)
        return current - dt

    return goal
}

const v010 = new Vec3(0, 1, 0)
const v100 = new Vec3(1, 0, 0)

export const side = (p1, p2) => {
    const dx = p1[0] - p2[0]
    const dy = p1[1] - p2[1]

    if (dy > dx) {
        if (dy > -dx) return v010
        else return v100
    } else {
        if (dy > -dx) return v100
        else return v010
    }
}