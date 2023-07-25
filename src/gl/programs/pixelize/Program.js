import Program from '../../Program'

import vertex from './vertex.glsl?raw'
import fragment from './fragment.glsl?raw'
import Settings from '../../../Settings'

const pos = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
const tex = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])

export default class PixelFilter extends Program {
    constructor(gl, canvas) {
        super(gl, vertex, fragment)

        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, Settings.pixelResolution, Settings.pixelResolution, 0,
            gl.RGBA, gl.UNSIGNED_BYTE, null)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

        const depthBuffer = gl.createRenderbuffer()
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, Settings.pixelResolution, Settings.pixelResolution)

        const frameBuffer = gl.createFramebuffer()
        this.frameBuffer = frameBuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer)

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, depthBuffer)

        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.activeTexture(gl.TEXTURE0)

        this.use()
        this.position.set(pos)
        this.texcoord.set(tex)

        this.texture.set(texture)
        this.canvas = canvas
    }
    begin() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer)
        this.gl.viewport(0, 0, Settings.pixelResolution, Settings.pixelResolution)
    }
    end() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        this.gl.useProgram(this.__program__)
        this.position.set(pos)

        this.draw(6, 'TRIANGLES')
    }
}