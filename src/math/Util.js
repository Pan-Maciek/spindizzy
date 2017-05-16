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