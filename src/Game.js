import Mat4 from './math/Mat4'
import { degToRad } from './math/Util'
import Player from './entities/Player'

import BasicProgram from './gl/programs/basic/Program'
import PixelProgram from './gl/programs/pixelize/Program'
import Settings from './Settings'
import Resources from './Resources'

const cos = Math.cos(degToRad(Settings.projectionAngle))
const sin = Math.sin(degToRad(Settings.projectionAngle))

const frameTime = Settings.frameTime

const projectionMatrix = new Mat4(
    -cos, cos, 0, 0,
    -sin, -sin, -1, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
).zoom(Settings.zoom / 10)

var meter = new FPSMeter()

export default function Game({
    appendTo = document.body,
    control = window
}) {

    // initializing webgl
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

    // creating programs
    const bp = BasicProgram(gl) // basicProgram

    if (Settings.pixelFilter) {
        var pp = new PixelProgram(gl, canvas) // PixelizeProgram
    }

    bp.use()
    bp.projection.set(projectionMatrix)

    // initializing DOM
    appendTo.appendChild(canvas)

    control.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case 37: // a
                this.player.move[1] = -.2
                break
            case 39: // d
                this.player.move[1] = .2
                break
            case 40: // s
                this.player.move[0] = .2
                break
            case 38: // w
                this.player.move[0] = -.2
        }
    })
    control.addEventListener('keyup', e => {
        switch (e.keyCode) {
            case 37: // a
            case 39: // d
                this.player.move[1] = 0
                break
            case 40: // s
            case 38: // w
                this.player.move[0] = 0
                break
        }
    })

    let w = canvas.width = appendTo.clientWidth
    let h = canvas.height = appendTo.clientHeight
    gl.viewport(0, 0, w, h)
    window.addEventListener('resize', () => {
        if (appendTo.height !== canvas.height) {
            w = canvas.width = appendTo.clientWidth
            h = canvas.height = appendTo.clientHeight
            gl.viewport(0, 0, w, h)
        }
    })

    let i = 0, length
    this.map = null
    this.mapE = 0
    this.mapN = 0

    this.setMap = (n, e) => {
        this.mapE = e
        this.mapN = n
        let map = ''
        if (n > 0) map += `0${n}`
        else map += `${-n}0`
        if (e > 0) map += `0${e}`
        else map += `${-e}0`


        this.map = Resources.maps[map]

        if (this.map) {
            if (this.map.mapBackround) gl.clearColor(...this.map.mapBackround, 1)
        } else this.map = { elements: [] }

        console.log(map)
    }
    this.setMap(0, 0)

    this.player = new Player([0, 0, 0])

    const update = (dt) => {
        if (this.map && this.map.update)
            this.map.update(this, dt)
        this.player.update(this.map, dt, this)
    }

    if (Settings.pixelFilter) {
        var draw = () => {
            pp.begin()
            bp.use()

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            if (this.map && this.map.elements.length) this.map.draw(bp, gl)

            this.player.draw(bp, gl)

            pp.end()
        }
    } else {
        var draw = () => {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            if (this.map && this.map.elements.length) this.map.draw(bp, gl)

            this.player.draw(bp, gl)

        }
    }

    // varibles for gameLoop - prevent gc, sabelize performance
    let acc = 0, lastTime, neadRedraw = true, running = false

    const gameLoop = (time) => {
        if (!running) return
        requestAnimationFrame(gameLoop)

        meter.tickStart() // fps meter
        acc += time - lastTime
        lastTime = time

        neadRedraw = acc > frameTime
        while (acc > frameTime) {
            acc -= frameTime
            update(frameTime / 1000)
        }
        if (neadRedraw) draw()

        meter.tick() // fps meter
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
    window.player = this.player
    this.domElement = canvas
}