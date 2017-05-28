import Program from '../../Program'

import Vertex from './Vertex.glsl'
import Fragment from './Fragment.glsl'

/** Basic Program.
 *
 * Flat color vec3.
 * Projection matrix.
 * Position vec3.
 *
 */
export default gl => new Program(gl, Vertex, Fragment)