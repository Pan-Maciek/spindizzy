import { typeSize } from './types'

export default class Uniform {

    /** Creates Uniform.
     * 
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {String} name
     * @param {String} type
     * 
     */
    constructor(gl, program, name, type) {
        
        this.gl = gl
        this.name = name
        
        this.size = typeSize(type)
        this.type = type

        this.__location__ = this.gl.getUniformLocation(program, name)
        this.__program__ = program
    }

    /** Sets value of curent attribute and enables it.
     * 
     *  NOTE: Remember to use program.
     * @param {Float32Array|Mat4|Vec3|Vec4|Color} value 
     * @returns {void}
     *
     */
    set(value) {
        switch (this.size) {
            case 3:
                this.gl.uniform3fv(this.__location__, value)
                break
            case 4:
                this.gl.uniform4fv(this.__location__, value)
                break
            case 16:
                this.gl.uniformMatrix4fv(this.__location__, false, value)
                break
        }
    }
}