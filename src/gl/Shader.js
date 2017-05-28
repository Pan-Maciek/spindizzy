/** Create webgl shader.
 *
 * @param {WebGLRenderingContext} gl 
 * @param {String} source
 * @returns {WebGLShader}
 * 
 */
export const createShader = (gl, source) => {

    const type = /gl_Position/.test(source)
        ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER

    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)

    gl.compileShader(shader) // compiling shader
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { // checking for comiplation errors
        console.error(`An error occurred while compiling the shader: ${gl.getShaderInfoLog(shader)}`)
        console.error('Shader source:\n', source)
        gl.deleteShader(shader)
        return null
    }

    shader.source = source
    return shader
}