import { typeSize } from './types.js'

export default class Attribute {

    /** Creates attribute.
     *
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {String} name attribute name
     * @param {String} type attribute type
     *
     */
    constructor(gl, program, name, type) {

        this.gl = gl
        this.name = name
        this.size = typeSize(type)
        this.type = type
        this.__buffer__ = gl.createBuffer()
        this.__location__ = gl.getAttribLocation(program, name)

    }

    /** Sets value of curent attribute and enables it.
     *
     * NOTE: Remember to use program.
     * @param {Float32Array} value
     * @returns {void}
     *
     */
    set(value) {
        this.gl.enableVertexAttribArray(this.__location__)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.__buffer__)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, value, this.gl.STATIC_DRAW)
        this.gl.vertexAttribPointer(this.__location__, this.size, this.gl.FLOAT, false, 0, 0)
    }

}