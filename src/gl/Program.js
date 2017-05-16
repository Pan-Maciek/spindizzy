import { createShader } from './Shader'
import Attribute from './Attribute'
import Uniform from './Uniform'

/** Appends Attributes and Uniforms from source to target.
 * 
 * @param {Object} target 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLProgram} program 
 * @param {String} source
 */
const appendAU = (target, gl, program, source) => {
    
    gl.useProgram(program)

    const regex = /^(attribute|uniform)\s+(\w+)\s+(\w+)\s*;/gm
    let temp
    while (temp = regex.exec(source)) {
        const [, type, varType, name] = temp
        if (target[name]) continue
        switch (type) {
            case 'attribute':
                target[name] = new Attribute(gl, program, name, varType)
                break
            case 'uniform':
                target[name] = new Uniform(gl, program, name, varType)
                break
        }
    }
}

export default class Program {

    /** Creates Program.
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl, ...shaders) {

        const program = gl.createProgram()

        for (let i = 0; i < shaders.length; i++) { // creating and attaching shaders
            if (typeof shaders[i] === 'string')
                shaders[i] = createShader(gl, shaders[i])
            gl.attachShader(program, shaders[i])
        }

        gl.linkProgram(program) // linking program
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { // checking for linking errors
            console.error(`Failed to link program: ${gl.getProgramInfoLog(program)}`)
            gl.deleteProgram(program)
            gl.deleteShader(fragment)
            gl.deleteShader(vertex)
            return null
        }

        gl.validateProgram(program) // validating program
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {// checking for errors
            console.error(`Program validation failed: ${gl.getProgramInfoLog(program)}`)
            gl.deleteProgram(program)
            gl.deleteShader(fragment)
            gl.deleteShader(vertex)
            return null
        }

        const fullSource = shaders.reduce((source, obj) => {
            if (typeof obj === 'string') return source + obj + '\n'
            else return source + obj.source + '\n'
        }, '')
        // appending atributes and uniforms
        appendAU(this, gl, program, fullSource)

        this.__program__ = program
        this.gl = gl
        this.shaders = shaders
    }

    /** Set program as active. */
    use() {
        this.gl.useProgram(this.__program__)
    }

    /** Set all properties of pprogram at once. */
    set(obj) {
        for (let name in obj) {
            this[name].set(obj[name])
        }
    }

    /** Call gl.drawArrays. */
    draw(n, mode = 'POINTS') {
        this.gl.drawArrays(this.gl[mode.toUpperCase()], 0, n)
    }
}