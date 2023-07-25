import Program from '../../Program'

import vertex from './vertex.glsl?raw'
import fragment from './fragment.glsl?raw'

export default gl => new Program(gl, vertex, fragment)