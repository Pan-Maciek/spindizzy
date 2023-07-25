import Program from '../../Program'

import Vertex from './Vertex.glsl?raw'
import Fragment from './Fragment.glsl?raw'

/** Basic Program.
 *
 * Flat color vec3.
 * Projection matrix.
 * Position vec3.
 *
 */
export default gl => new Program(gl, Vertex, Fragment)