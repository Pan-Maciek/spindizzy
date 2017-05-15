const _PI180_ = Math.PI / 180
const _180PI_ = 180 / Math.PI

/** Convert degrees to radians.
 * @param {Number} deg degrees
 * @returns {Number}
 */
export const degToRad = deg => deg * _PI180_

/** Convert radians to degrees.
 * @param {Number} deg radians
 * @returns {Number}
 */
export const radToDeg = deg => deg * _180PI_