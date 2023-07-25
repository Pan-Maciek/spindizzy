import Mat4 from './math/Mat4'
import { degToRad } from './math/Util'
import Player from './entities/Player'

import BasicProgram from './gl/programs/basic/Program'
import PixelProgram from './gl/programs/pixelize/Program'
import Settings from './Settings'
import Resources, { waitForResources } from './Resources'

const cos = Math.cos(degToRad(Settings.projectionAngle))
const sin = Math.sin(degToRad(Settings.projectionAngle))

const frameTime = Settings.frameTime


var meter = new FPSMeter()

export default function Game({ width, height }) {
    const aspectX = width < height ? 1 : height / width
    const aspectY = width < height ? width / height : 1
    const aspect = new Mat4(
        aspectX, 0, 0, 0,
        0, aspectY, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    )
    const projection = new Mat4(
        -cos, cos, 0, 0,
        -sin, -sin, -1, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    const projectionMatrix = aspect.mul(projection).zoom(0.1)

    // initializing webgl
    const canvas = <canvas width={width} height={height} />

    const gl = canvas.getContext('webgl')
    if (!gl) {
        return <div>Sadly your browser does not support webgl :/</div>
    }

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.viewport(0, 0, width, height)

    // creating programs
    const bp = BasicProgram(gl) // basicProgram
    
    if (Settings.pixelFilter) {
        var pp = new PixelProgram(gl, canvas) // PixelizeProgram
    }

    bp.use()
    bp.projection.set(projectionMatrix)

    const state = {
        map: null,
        mapE: 0,
        mapN: 0,
        player: new Player([0, 0, 0]),
        setMap (n, e) {
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
        }
    }

    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'a': // a
                state.player.move[1] = -.3
                break
            case 'd': // d
                state.player.move[1] = .3
                break
            case 's': // s
                state.player.move[0] = .3
                break
            case 'w': // w
                state.player.move[0] = -.3
        }
    })
    window.addEventListener('keyup', e => {
        switch (e.key) {
            case 'a': // a
            case 'd': // d
                state.player.move[1] = 0
                break
            case 's': // s
            case 'w': // w
                state.player.move[0] = 0
                break
        }
    })

    const update = (dt) => {
        if (state.map && state.map.update)
            state.map.update(state, dt)
        state.player.update(state.map, dt, state)
    }

    if (Settings.pixelFilter) {
        var draw = () => {
            pp.begin()
            bp.use()

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            if (state.map && state.map.elements.length) state.map.draw(bp, gl)

            state.player.draw(bp, gl)

            pp.end()
        }
    } else {
        var draw = () => {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            if (state.map && state.map.elements.length) state.map.draw(bp, gl)

            state.player.draw(bp, gl)
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

    const start = () => {
        running = true
        requestAnimationFrame((time) => {
            lastTime = time
            requestAnimationFrame(gameLoop)
        })
    }

    waitForResources().then(() => {
        state.setMap(0, 0)
        start()
    })

    return canvas;
}