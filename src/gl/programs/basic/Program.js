import Program from '../../Program'

import Vertex from './Vertex.glsl'
import Fragment from './Fragment.glsl'

/** Basic Program.
 * Flat color.
 * Projection matrix.
 * Position.
 */
export default gl => new Program(gl, Vertex, Fragment)