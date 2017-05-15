import Program from '../../Program'

import Vertex from './Vertex.glsl'
import Fragment from './Fragment.glsl'

export default gl => new Program(gl, Vertex, Fragment)