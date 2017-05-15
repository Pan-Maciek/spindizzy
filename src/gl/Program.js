import { createFragmentShader, createVertexShader } from './Shader'
import Attribute from './Attribute'
import Uniform from './Uniform'

const appendAU = (target, gl, program, source) => {
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

    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl, ...shaders) {

        const program = gl.createProgram()
        for (let i = 0; i < shaders.length; i++) {
            if (typeof shaders[i] === 'string') {
                if (/gl_Position/.test(shaders[i])) // test if source is vertex shader
                    shaders[i] = createVertexShader(gl, shaders[i])
                else
                    shaders[i] = createFragmentShader(gl, shaders[i])
            }
            gl.attachShader(program, shaders[i])
        }
        gl.linkProgram(program)

        // checking for errors
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(`Failed to link program: ${gl.getProgramInfoLog(program)}`)
            gl.deleteProgram(program)
            gl.deleteShader(fragment)
            gl.deleteShader(vertex)
            return null
        }

        // checking for errors
        gl.validateProgram(program)
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error(`Failed to link program: ${gl.getProgramInfoLog(program)}`)
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
        gl.useProgram(program)
        appendAU(this, gl, program, fullSource)

        this.__program__ = program
        this.gl = gl
        this.shaders = shaders
    }

    use() {
        this.gl.useProgram(this.__program__)
    }

    set(obj) {
        for (let name in obj) {
            this[name].set(obj[name])
        }
    }
    draw(n, mode = 'POINTS') {
        this.gl.drawArrays(this.gl[mode.toUpperCase()], 0, n)
    }
}