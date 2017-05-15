import Mat4 from './math/Mat4'
import { degToRad } from './math/Util'
import Player from './entities/Player'

import BasicProgram from './gl/programs/basic/Program'
import PixelProgram from './gl/programs/pixelize/Program'
import Settings from './Settings'

const cos = Math.cos(degToRad(Settings.projectionAngle))
const sin = Math.sin(degToRad(Settings.projectionAngle))

const frameTime = Settings.frameTime

const projectionMatrix = new Mat4(
    -cos, cos, 0, 0,
    -sin, -sin, -1, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
).zoom(0.1)

var meter = new FPSMeter()

export default function Game({
    appendTo = document.body,
    control = window
}) {

    const canvas = document.createElement('canvas')

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
        const div = document.createElement('div')
        div.innerHTML = 'Sadly your browser does not support webgl :/'
        appendTo.appendChild(div)
        return
    }
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    appendTo.appendChild(canvas)

    control.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case 65: // a
                move[0] = .1
                break
            case 68: // d
                move[0] = -.1
                break
            case 83: // s
                move[1] = -.1
                break
            case 87: // w
                move[1] = .1
        }
    })
    control.addEventListener('keyup', e => {
        switch (e.keyCode) {
            case 65: // a
            case 68: // d
                move[0] = 0
                break
            case 83: // s
            case 87: // w
                move[1] = 0
                break
        }
    })
    let move = [0, 0]

    let w = canvas.width = appendTo.clientWidth
    let h = canvas.height = appendTo.clientHeight

    const bp = BasicProgram(gl) // basicProgram
    const pp = new PixelProgram(gl, canvas) // PixelizeProgram


    bp.use()
    bp.set({ projection: projectionMatrix })

    let i = 0, length
    this.map = null

    this.player = new Player([0, 0, 0])
    gl.clearColor(64 / 255, 21 / 255, 207 / 255, 1)

    let acc = 0, lastTime, neadRedraw = true, running = false

    const update = () => {

    }

    const draw = () => {
        bp.use()
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        pp.begin()

        if (this.map) this.map.draw(bp, gl)

        this.player.draw(bp, gl)
        pp.end()
    }

    const gameLoop = (time) => {
        if (!running) return
        requestAnimationFrame(gameLoop)

        meter.tickStart()
        acc += time - lastTime
        lastTime = time

        neadRedraw = acc > frameTime
        while (acc > frameTime) {
            acc -= frameTime
            update()
        }
        if (neadRedraw) draw()

        meter.tick()
    }

    this.start = () => {
        running = true
        requestAnimationFrame((time) => {
            lastTime = time
            requestAnimationFrame(gameLoop)
        })
    }

    this.stop = () => {
        running = false
    }

    this.domElement = canvas
}