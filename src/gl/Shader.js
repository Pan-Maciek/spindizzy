const createShader = (gl, type, source) => {

    const shader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`An error occurred while compiling the shaders: ${gl.getShaderInfoLog(shader)}`)
        gl.deleteShader(shader)
        return null
    }

    shader.source = source
    return shader
}

export const createFragmentShader = (gl, source) =>
    createShader(gl, gl.FRAGMENT_SHADER, source)

export const createVertexShader = (gl, source) =>
    createShader(gl, gl.VERTEX_SHADER, source)
