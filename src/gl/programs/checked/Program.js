import Program from '../../Program'

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export default gl => new Program(gl, vertex, fragment)