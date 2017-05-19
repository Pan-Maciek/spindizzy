/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// export default {
//     pixelFilter: true,
//     pixelResolution: 340, // px
//     frameTime: 30, // ms
//     projectionAngle: 28,
//     keys: {
//         fire: 'space',
//         top: 'W',
//         left: 'A',
//         bottom: 'S',
//         rigth: 'D'
//     },
//     blocksSpacing: 0.06, // %
//     zoom: 1
// }


/* harmony default export */ __webpack_exports__["a"] = {
    pixelFilter: false,
    frameTime: 30, // ms
    projectionAngle: 28,
    keys: {
        fire: 'space',
        top: 'W',
        left: 'A',
        bottom: 'S',
        rigth: 'D'
    },
    blocksSpacing: 0.02, // %
    zoom: 1
};

// export default {
//     pixelFilter: false,
//     frameTime: 30, // ms
//     projectionAngle: 28,
//     keys: {
//         fire: 'space',
//         top: 'W',
//         left: 'A',
//         bottom: 'S',
//         rigth: 'D'
//     },
//     blocksSpacing: .2, // %
//     zoom: 1
// }

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Class representing a 3d vector. */
class Vec3 extends Float32Array {

    constructor(x = 0, y = 0, z = 0) {
        super(3)
        this[0] = x
        this[1] = y
        this[2] = z
    }

    /** Adds v to this vector.
     * @param {Vec3} v
     * @param {Vec3} out Specify target to store operation results.
     * @version 0.0.1
     */
    add(v, out = this) {
        out[0] = this[0] + v[0]
        out[1] = this[1] + v[1]
        out[2] = this[2] + v[2]
        return out
    }

    /** Substracts v from this vector.
     * @param {Vec3} v
     * @param {Vec3} out Specify target to store operation results.
     * @version 0.0.1
     */
    sub(v, out = this) {
        out[0] = this[0] - v[0]
        out[1] = this[1] - v[1]
        out[2] = this[2] - v[2]
        return out
    }

    /** Returns a new Vec3 with the same x, y and z values as this one.
     * @returns {Vec3}
     * @version 0.0.1
     */
    clone() {
        return new Vec3(this[0], this[1], this[2])
    }

    /** Copies the values of the passed vector to this Vec3.
     * @param {Vec3|Number[]} input
     * @returns {Vec3}
     * @version 0.0.1
     */
    copy(input) {
        this[0] = input[0]
        this[1] = input[1]
        this[2] = input[2]
        return this
    }

    dot(v) {
        return this[0] * v[0] + this[1] * v[1] + this[2] * v[2]
    }

    corss(v, out = this) {
        const temp = new Vec3
        temp[0] = +(this[1] * v[2] - this[2] * v[1])
        temp[1] = -(this[0] * v[2] - this[2] * v[0])
        temp[2] = +(this[0] * v[1] - this[1] * v[0])
        return out.copy(temp)
    }

    /** Computes the distance from this vector to v.
     * @param {Vec3|Number[]} v
     * @version 0.0.1
     */
    distanceTo(v) {
        return Math.hypot(this[0] - v[0], this[1] - v[1], this[2] - v[2])
    }

    scale(s, out = this) {
        out[0] = this[0] * s
        out[1] = this[1] * s
        out[2] = this[2] * s
    }

    get length() {
        return Math.hypot(this[0], this[1], this[2])
    }

    normalize(out = this) {
        const length = this.length
        out[0] = this[0] / length
        out[1] = this[1] / length
        out[2] = this[2] / length
        return out
    }

    static sub(v1, v2) {
        return v1.sub(v2, new Vec3)
    }

    static add(v1, v2) {
        return v1.add(v2, new Vec3)
    }

    static scale(v, s) {
        return new Vec3(v[0] * s, v[1] * s, v[2] * s)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vec3;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__net_remote__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Map__ = __webpack_require__(13);



const __PRIMISSES__ = []
const load = (resourceName, url, appendTo = __RESOURCES__.maps) => {
    const prom = __WEBPACK_IMPORTED_MODULE_0__net_remote__["a" /* default */].json({ url })
    __PRIMISSES__.push(prom.then(json => {
        appendTo[resourceName] = new __WEBPACK_IMPORTED_MODULE_1__Map__["a" /* default */](json)
    }))
    return prom
}

const __RESOURCES__ = {
    maps: {}
}

load('0000', `${location.href}/resources/maps/map0000.json`)
load('0100', `${location.href}/resources/maps/map0100.json`)
load('0001', `${location.href}/resources/maps/map0001.json`)
load('0002', `${location.href}/resources/maps/map0002.json`)
load('0010', `${location.href}/resources/maps/map0010.json`)
load('0020', `${location.href}/resources/maps/map0020.json`)
load('0102', `${location.href}/resources/maps/map0102.json`)
load('testmap', `${location.href}/resources/maps/testmap.json`)

const waitForResources = () => Promise.all(__PRIMISSES__)
/* harmony export (immutable) */ __webpack_exports__["a"] = waitForResources;


/* harmony default export */ __webpack_exports__["b"] = __RESOURCES__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(0);


const s = 1 + __WEBPACK_IMPORTED_MODULE_0__Settings__["a" /* default */].blocksSpacing

class Shape {
    constructor(points, v) {
        if (!v) v = [0, 0, 0]
        else v = [v[0] - .5, v[1] - .5, v[2]]
        if (points.length === 3) {
            this.points = new Float32Array([
                points[0][0] + v[0] * s, points[0][1] + v[1] * s, points[0][2] + v[2],
                points[1][0] + v[0] * s, points[1][1] + v[1] * s, points[1][2] + v[2],
                points[2][0] + v[0] * s, points[2][1] + v[1] * s, points[2][2] + v[2]
            ])
        } else {
            this.points = new Float32Array([
                points[0][0] + v[0] * s, points[0][1] + v[1] * s, points[0][2] + v[2],
                points[1][0] + v[0] * s, points[1][1] + v[1] * s, points[1][2] + v[2],
                points[2][0] + v[0] * s, points[2][1] + v[1] * s, points[2][2] + v[2],
                points[2][0] + v[0] * s, points[2][1] + v[1] * s, points[2][2] + v[2],
                points[3][0] + v[0] * s, points[3][1] + v[1] * s, points[3][2] + v[2],
                points[0][0] + v[0] * s, points[0][1] + v[1] * s, points[0][2] + v[2]
            ])
        }
    }
}
/* unused harmony export default */


const shape = (points, t) => new Shape(points, t)
/* harmony export (immutable) */ __webpack_exports__["a"] = shape;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Color extends Float32Array {
    constructor(r, g, b) {
        super(3)
        this[0] = r / 255
        this[1] = g / 255
        this[2] = b / 255
    }
}

class Style {
    constructor(style) {
        this.top = {
            fill: new Color(...style.top.fill),
            stroke: new Color(...style.top.stroke)
        }
        this.sides = {
            fill: new Color(...style.sides.fill),
            stroke: new Color(...style.sides.stroke)
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Style;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shader__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Attribute__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Uniform__ = __webpack_require__(17);




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
                target[name] = new __WEBPACK_IMPORTED_MODULE_1__Attribute__["a" /* default */](gl, program, name, varType)
                break
            case 'uniform':
                target[name] = new __WEBPACK_IMPORTED_MODULE_2__Uniform__["a" /* default */](gl, program, name, varType)
                break
        }
    }
}

class Program {

    /** Creates Program.
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl, ...shaders) {

        const program = gl.createProgram()

        for (let i = 0; i < shaders.length; i++) { // creating and attaching shaders
            if (typeof shaders[i] === 'string')
                shaders[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shader__["a" /* createShader */])(gl, shaders[i])
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Program;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const __SIZE__ = Object.freeze({
    vec2: 2,
    vec3: 3,
    vec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16,
})

const typeSize = type => __SIZE__[type]
/* harmony export (immutable) */ __webpack_exports__["a"] = typeSize;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_Vec3__ = __webpack_require__(1);


class Plane {

    /**
     * NOTE: Points musnt be colinear!
     *
     * @param {Vec3} A point at plane
     * @param {Vec3} B point at plane
     * @param {Vec3} C point at plane
     */
    constructor(A, B, C) {

        const v1 = __WEBPACK_IMPORTED_MODULE_0__math_Vec3__["a" /* default */].sub(B, A)
        const v2 = __WEBPACK_IMPORTED_MODULE_0__math_Vec3__["a" /* default */].sub(C, A)

        this.norm = v1.corss(v2).normalize()
        
        this.p = A

    }

    intersect(sphere) {
        const v = __WEBPACK_IMPORTED_MODULE_0__math_Vec3__["a" /* default */].sub(sphere.p, this.p)
        const distance = this.norm.dot(v) - sphere.r
        return [Math.abs(distance), Math.sign(distance)]
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Plane;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_Mat4__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_Util__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_Player__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gl_programs_basic_Program__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gl_programs_pixelize_Program__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Settings__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;








const cos = Math.cos(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__math_Util__["a" /* degToRad */])(__WEBPACK_IMPORTED_MODULE_5__Settings__["a" /* default */].projectionAngle))
const sin = Math.sin(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__math_Util__["a" /* degToRad */])(__WEBPACK_IMPORTED_MODULE_5__Settings__["a" /* default */].projectionAngle))

const frameTime = __WEBPACK_IMPORTED_MODULE_5__Settings__["a" /* default */].frameTime

const projectionMatrix = new __WEBPACK_IMPORTED_MODULE_0__math_Mat4__["a" /* default */](
    -cos, cos, 0, 0,
    -sin, -sin, -1, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
).zoom(__WEBPACK_IMPORTED_MODULE_5__Settings__["a" /* default */].zoom / 10)

var meter = new FPSMeter()

function Game({
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
    const bp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__gl_programs_basic_Program__["a" /* default */])(gl) // basicProgram

    if (__WEBPACK_IMPORTED_MODULE_5__Settings__["a" /* default */].pixelFilter) {
        var pp = new __WEBPACK_IMPORTED_MODULE_4__gl_programs_pixelize_Program__["a" /* default */](gl, canvas) // PixelizeProgram
    }

    bp.use()
    bp.projection.set(projectionMatrix)

    // initializing DOM
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

    this.player = new __WEBPACK_IMPORTED_MODULE_2__entities_Player__["a" /* default */]([-3, 0, 7])
    gl.clearColor(64 / 255, 21 / 255, 207 / 255, 1)
    
    const update = () => {
        this.player.force[0] = move[0]
        this.player.force[1] = move[1]
        this.player.update(this.map || [{ elements: [] }])
    }

    if (__WEBPACK_IMPORTED_MODULE_5__Settings__["a" /* default */].pixelFilter) {
        var draw = () => {
            pp.begin()
            bp.use()

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            if (this.map) this.map.draw(bp, gl)

            this.player.draw(bp, gl)
            
            pp.end()
        }
    } else {
        var draw = () => {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            if (this.map) this.map.draw(bp, gl)

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
            update()
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

    this.domElement = canvas
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\r\n\r\nuniform vec3 color;\r\n\r\nvoid main() {\r\n    gl_FragColor = vec4(color, 1);\r\n}"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\r\n\r\nattribute vec3 vert;\r\n\r\nuniform vec3 position;\r\nuniform mat4 projection;\r\n\r\nvoid main() {\r\n    gl_Position = projection * vec4(vert + position, 1);\r\n}"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\r\n\r\nvarying vec2 v_texcoord;\r\n\r\nuniform sampler2D texture;\r\n\r\nvoid main() {\r\n  gl_FragColor = texture2D(texture, v_texcoord);\r\n}"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "precision lowp float;\r\n\r\nattribute vec2 position;\r\nattribute vec2 texcoord;\r\n\r\nvarying vec2 v_texcoord;\r\n\r\nvoid main() {\r\n   gl_Position = vec4(position, 0, 1);\r\n   v_texcoord = texcoord;\r\n}"

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Style__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_Flat__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_Slide__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_Arrow__ = __webpack_require__(23);





const position0 = new Float32Array([0, 0, 0])

class Map {

    constructor(map) {

        this.styleGroups = []
        this.elements = []
        this.selfDrawn = []

        for (let group of map) {
            let topPoints = [], sidePoints = [], botPoints = []
            const style = new __WEBPACK_IMPORTED_MODULE_0__Style__["a" /* default */](group.style)
            this.styleGroups.push({ botPoints, topPoints, sidePoints, style })
            for (var i = 0; i < group.elements.length; i++) {
                const [type, ...args] = group.elements[i]
                switch (type.toLowerCase()) {
                    case 'flat':
                        var block = new __WEBPACK_IMPORTED_MODULE_1__objects_Flat__["a" /* default */](...args)
                        break
                    case 'slide':
                        var block = new __WEBPACK_IMPORTED_MODULE_2__objects_Slide__["a" /* default */](...args)
                        break
                    case 'arrow':
                        var block = new __WEBPACK_IMPORTED_MODULE_3__objects_Arrow__["a" /* default */](...args)
                        block.style = style
                        this.selfDrawn.push(block)
                        continue
                }
                topPoints.push(...block.top.points)
                sidePoints.push(...block.sides[1].points)
                sidePoints.push(...block.sides[2].points)
                sidePoints.push(...block.sides[3].points)
                sidePoints.push(...block.sides[0].points)
                botPoints.push(...block.bottom)
                this.elements.push(block)
            }
        }

        for (var i = 0; i < this.styleGroups.length; i++) {
            this.styleGroups[i].topPoints = new Float32Array(this.styleGroups[i].topPoints)
            this.styleGroups[i].toplength = this.styleGroups[i].topPoints.length / 3
            this.styleGroups[i].sidePoints = new Float32Array(this.styleGroups[i].sidePoints)
            this.styleGroups[i].sidelength = this.styleGroups[i].sidePoints.length / 3
            this.styleGroups[i].botPoints = new Float32Array(this.styleGroups[i].botPoints)
            this.styleGroups[i].botlength = this.styleGroups[i].botPoints.length / 3
        }
    }

    draw(bp, gl) {
        for (var i = 0; i < this.styleGroups.length; i++) {
            bp.position.set(position0)
            bp.vert.set(this.styleGroups[i].topPoints)

            bp.color.set(this.styleGroups[i].style.top.fill)
            gl.drawArrays(gl.TRIANGLES, 0, this.styleGroups[i].toplength)

            bp.color.set(this.styleGroups[i].style.top.stroke)
            gl.drawArrays(gl.LINES, 0, this.styleGroups[i].toplength)

            bp.vert.set(this.styleGroups[i].sidePoints)

            bp.color.set(this.styleGroups[i].style.sides.fill)
            gl.drawArrays(gl.TRIANGLES, 0, this.styleGroups[i].sidelength)

            bp.color.set(this.styleGroups[i].style.sides.stroke)
            gl.drawArrays(gl.LINES, 0, this.styleGroups[i].sidelength)

            bp.vert.set(this.styleGroups[i].botPoints)
            gl.drawArrays(gl.LINES, 0, this.styleGroups[i].botlength)

        }
        for (var i = 0; i < this.selfDrawn.length; i++) {
            this.selfDrawn[i].draw(bp, gl)
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_Vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Style__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physics_coliders_Sphere__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Settings__ = __webpack_require__(0);






const s = 1 + __WEBPACK_IMPORTED_MODULE_4__Settings__["a" /* default */].blocksSpacing

class Player {
    constructor(position) {
        this.sphere = new __WEBPACK_IMPORTED_MODULE_3__physics_coliders_Sphere__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1__math_Vec3__["a" /* default */](-position[1], -position[0], -position[2]), .8)

        this.top = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
            [-.3, -.3, -1.6],
            [.3, -.3, -1.6],
            [.3, .3, -1.6],
            [-.3, .3, -1.6]
        ])

        this.sides = [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([[.3, -.3, -1.6],
            [0, 0, -.8],
            [-.3, -.3, -1.6]]),

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([[.3, .3, -1.6],
            [0, 0, -.8],
            [.3, -.3, -1.6]]),

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([[-.3, .3, -1.6],
            [0, 0, -.8],
            [.3, .3, -1.6]]),

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([[-.3, -.3, -1.6],
            [0, 0, -.8],
            [-.3, .3, -1.6]])
        ]

        this.style = new __WEBPACK_IMPORTED_MODULE_2__Style__["a" /* default */]({
            top: {
                fill: [255, 255, 255],
                stroke: [140, 8, 75]
            },
            sides: {
                fill: [64, 21, 207],
                stroke: [140, 8, 75]
            }
        })
        this.force = new __WEBPACK_IMPORTED_MODULE_1__math_Vec3__["a" /* default */](0, 0, 0)
        this.t = 0
    }
    draw(bp, gl) {
        const pos = new __WEBPACK_IMPORTED_MODULE_1__math_Vec3__["a" /* default */](this.sphere.p[0] * s, this.sphere.p[1] * s, this.sphere.p[2])
        bp.position.set(pos)

        // var t = this.t -= 0.1
        // var topPoints = []
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])
        // t += Math.PI / 2
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])
        // t += Math.PI / 2
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])
        // t += Math.PI / 2
        // topPoints.push([Math.cos(t) * 0.4, Math.sin(t) * 0.4, -1.6])

        // this.top = shape(topPoints)

        bp.vert.set(this.top.points)
        bp.color.set(this.style.top.fill)
        gl.drawArrays(gl.TRIANGLES, 0, this.top.points.length / 3)
        bp.color.set(this.style.top.stroke)
        gl.drawArrays(gl.LINE_LOOP, 0, this.top.points.length / 3)

        for (let i = 0; i < 4; i++) {
            bp.vert.set(this.sides[i].points)
            bp.color.set(this.style.sides.fill)
            gl.drawArrays(gl.TRIANGLES, 0, this.sides[i].points.length / 3)
            bp.color.set(this.style.sides.stroke)
            gl.drawArrays(gl.LINE_LOOP, 0, this.sides[i].points.length / 3)
        }
    }
    update(blocks) {
        this.sphere.p.add(new __WEBPACK_IMPORTED_MODULE_1__math_Vec3__["a" /* default */](0, 0, .1))
        this.sphere.p.add(this.force)

        x.innerText = ''
        for (var i = 0; i < blocks.elements.length; i++) {

            if (Math.abs(blocks.elements[i].position[0] - this.sphere.p[0]) > .5) continue
            if (Math.abs(blocks.elements[i].position[1] - this.sphere.p[1]) > .5) continue

            var data = blocks.elements[i].topPlane.intersect(this.sphere)

            if (data[1] > 0 && data[0] < this.sphere.r) {
                let v = (__WEBPACK_IMPORTED_MODULE_1__math_Vec3__["a" /* default */].scale(blocks.elements[i].topPlane.norm, -data[0]))

                x.innerText = v
                this.sphere.p.add(v)
                break
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_js__ = __webpack_require__(6);


class Attribute {

    /** Creates attribute.
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {String} name
     * @param {String} type
     */
    constructor(gl, program, name, type) {

        this.gl = gl
        this.name = name
        this.size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__types_js__["a" /* typeSize */])(type)
        this.type = type
        this.__buffer__ = gl.createBuffer()
        this.__location__ = gl.getAttribLocation(program, name)

    }

    /** Sets value of curent attribute and enables it.
     *  NOTE: Remember to use program.
     * @param {Float32Array} value 
     */
    set(value) {
        this.gl.enableVertexAttribArray(this.__location__)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.__buffer__)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, value, this.gl.STATIC_DRAW)
        this.gl.vertexAttribPointer(this.__location__, this.size, this.gl.FLOAT, false, 0, 0)

    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Attribute;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Create webgl shader.
 *
 * @param {WebGLRenderingContext} gl 
 * @param {String} source
 * @returns {WebGLShader}
 */
const createShader = (gl, source) => {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = createShader;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(6);


class Uniform {

    /** Creates Uniform.
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {String} name
     * @param {String} type
     */
    constructor(gl, program, name, type) {
        
        this.gl = gl
        this.name = name
        
        this.size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* typeSize */])(type)
        this.type = type

        this.__location__ = this.gl.getUniformLocation(program, name)
        this.__program__ = program
    }

    /** Sets value of curent attribute and enables it.
     *  NOTE: Remember to use program.
     * @param {Float32Array} value 
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Uniform;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Program__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vertex_glsl__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vertex_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Vertex_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Fragment_glsl__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Fragment_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Fragment_glsl__);





/** Basic Program.
 * Flat color.
 * Projection matrix.
 * Position.
 */
/* harmony default export */ __webpack_exports__["a"] = gl => new __WEBPACK_IMPORTED_MODULE_0__Program__["a" /* default */](gl, __WEBPACK_IMPORTED_MODULE_1__Vertex_glsl___default.a, __WEBPACK_IMPORTED_MODULE_2__Fragment_glsl___default.a);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Program__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vertex_glsl__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vertex_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vertex_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fragment_glsl__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fragment_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__fragment_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Settings__ = __webpack_require__(0);






const pos = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
const tex = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])

class PixelFilter extends __WEBPACK_IMPORTED_MODULE_0__Program__["a" /* default */] {
    constructor(gl, canvas) {
        super(gl, __WEBPACK_IMPORTED_MODULE_1__vertex_glsl___default.a, __WEBPACK_IMPORTED_MODULE_2__fragment_glsl___default.a)

        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].pixelResolution, __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].pixelResolution, 0,
            gl.RGBA, gl.UNSIGNED_BYTE, null)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

        const depthBuffer = gl.createRenderbuffer()
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].pixelResolution, __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].pixelResolution)

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
        this.gl.viewport(0, 0, __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].pixelResolution, __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].pixelResolution)
    }
    end() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        this.gl.useProgram(this.__program__)
        this.position.set(pos)

        this.draw(6, 'TRIANGLES')
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PixelFilter;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Class representing 4x4 Matrix.
 *
 * NOTE: This class extends Float32Array and is ready to pass to webgl.
 */
class Mat4 extends Float32Array {

    constructor(...values) {
        super(16)
        this.set(...values)
    }

    set(...values) {
        this[0] = values[0]
        this[1] = values[4]
        this[2] = values[8]
        this[3] = values[12]
        this[4] = values[1]
        this[5] = values[5]
        this[6] = values[9]
        this[7] = values[13]
        this[8] = values[2]
        this[9] = values[6]
        this[10] = values[10]
        this[11] = values[14]
        this[12] = values[3]
        this[13] = values[7]
        this[14] = values[11]
        this[15] = values[15]
    }

    add(m, out = this) {
        out[0] = this[0] + m[0]
        out[1] = this[1] + m[1]
        out[2] = this[2] + m[2]
        out[3] = this[3] + m[3]
        out[4] = this[4] + m[4]
        out[5] = this[5] + m[5]
        out[6] = this[6] + m[6]
        out[7] = this[7] + m[7]
        out[8] = this[8] + m[8]
        out[9] = this[9] + m[3]
        out[10] = this[10] + m[10]
        out[11] = this[11] + m[11]
        out[12] = this[12] + m[12]
        out[13] = this[13] + m[13]
        out[14] = this[14] + m[14]
        out[15] = this[15] + m[15]

        return out
    }

    mul(m, out = this) {

        const temp = new Array(16)
        temp[0] = this[0] * m[0] + this[4] * m[1] + this[8] * m[2] + this[12] * m[3]
        temp[1] = this[0] * m[4] + this[4] * m[5] + this[8] * m[6] + this[12] * m[7]
        temp[2] = this[0] * m[8] + this[4] * m[9] + this[8] * m[10] + this[12] * m[11]
        temp[3] = this[0] * m[12] + this[4] * m[13] + this[8] * m[14] + this[12] * m[15]

        temp[4] = this[1] * m[0] + this[5] * m[1] + this[9] * m[2] + this[13] * m[3]
        temp[5] = this[1] * m[4] + this[5] * m[5] + this[9] * m[6] + this[13] * m[7]
        temp[6] = this[1] * m[8] + this[5] * m[9] + this[9] * m[10] + this[13] * m[11]
        temp[7] = this[1] * m[12] + this[5] * m[13] + this[9] * m[14] + this[13] * m[15]

        temp[8] = this[2] * m[0] + this[6] * m[1] + this[10] * m[2] + this[14] * m[3]
        temp[9] = this[2] * m[4] + this[6] * m[5] + this[10] * m[6] + this[14] * m[7]
        temp[10] = this[2] * m[8] + this[6] * m[9] + this[10] * m[10] + this[14] * m[11]
        temp[11] = this[2] * m[12] + this[6] * m[13] + this[10] * m[14] + this[14] * m[15]

        temp[12] = this[3] * m[0] + this[7] * m[1] + this[11] * m[2] + this[15] * m[3]
        temp[13] = this[3] * m[4] + this[7] * m[5] + this[11] * m[6] + this[15] * m[7]
        temp[14] = this[3] * m[8] + this[7] * m[9] + this[11] * m[10] + this[15] * m[11]
        temp[15] = this[3] * m[12] + this[7] * m[13] + this[11] * m[14] + this[15] * m[15]

        out.set(...temp)

        return out
    }

    zoom(v, out = this) {
        out[0] = this[0] * v
        out[1] = this[1] * v
        out[2] = this[2] * v
        out[4] = this[4] * v
        out[5] = this[5] * v
        out[6] = this[6] * v
        out[8] = this[8] * v
        out[9] = this[9] * v
        out[10] = this[10] * v
        return out
    }

    copy(input) { this.set(...input) }
    clone() { return new Mat4(...this) }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mat4;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const __PI180__ = Math.PI / 180
const __180PI__ = 180 / Math.PI

/** Convert degrees to radians.
 * @param {Number} deg degrees
 * @returns {Number}
 */
const degToRad = deg => deg * __PI180__
/* harmony export (immutable) */ __webpack_exports__["a"] = degToRad;


/** Convert radians to degrees.
 * @param {Number} deg radians
 * @returns {Number}
 */
const radToDeg = deg => deg * __180PI__
/* unused harmony export radToDeg */


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const postData = object => {
    if (!object) return null
    let data = ''
    for (var key in object)
        data += `&${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
    return data.substring(1)
}

/** Request data from server.
 * 
 * @param {{url:String, data, method: String}} options
 * @returns {Promise}
 */
const req = (options) => {
    return new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                resolve(xmlHttp.responseText)
        }
        xmlHttp.open(options.method || 'GET', options.url, true)
        xmlHttp.send(postData(options.data))
    })
}

/* harmony default export */ __webpack_exports__["a"] = {

    /** Get data using axaj.
     * 
     * @param {{url:String, data, method: String}} options
     * @returns {Promise}
     */
    get(options) { return req(options) },

    /** Get data  using axaj and parser it using JSON.parse().
     * 
     * @param {{url:String, data, method: String}} options
     * @returns {Promise}
     */
    json(options) { return req(options).then(data => JSON.parse(data)) }
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_Vec3__ = __webpack_require__(1);


const s = 1 + __WEBPACK_IMPORTED_MODULE_0__Settings__["a" /* default */].blocksSpacing

class Arrow {

    constructor(position, dir) {

        this.position = new __WEBPACK_IMPORTED_MODULE_1__math_Vec3__["a" /* default */]((-position[1] - .5) * s, (-position[0] - .5) * s, -position[2])

        switch (dir) {
            case 0:
                this.shape = new Float32Array([
                    .5, .1, 0,
                    .1, .5, 0,
                    .9, .5, 0,
                    .4, .5, 0,
                    .4, .9, 0,
                    .6, .9, 0,
                    .6, .5, 0,
                    .4, .5, 0,
                    .6, .9, 0,
                ])
                break
            case 1:
                this.shape = new Float32Array([
                    .1, .5, 0,
                    .5, .1, 0,
                    .5, .9, 0,
                    .5, .4, 0,
                    .9, .4, 0,
                    .9, .6, 0,
                    .5, .6, 0,
                    .5, .4, 0,
                    .9, .6, 0,
                ])
                break
            case 2:
                this.shape = new Float32Array([
                    0.5, 0.9, 0,
                    0.9, 0.5, 0,
                    0.1, 0.5, 0,
                    0.6, 0.5, 0,
                    0.6, 0.1, 0,
                    0.4, 0.1, 0,
                    0.4, 0.5, 0,
                    0.6, 0.5, 0,
                    0.4, 0.1, 0
                ])
                break
            case 3:
                this.shape = new Float32Array([
                    0.9, 0.5, 0,
                    0.5, 0.9, 0,
                    0.5, 0.1, 0,
                    0.5, 0.6, 0,
                    0.1, 0.6, 0,
                    0.1, 0.4, 0,
                    0.5, 0.4, 0,
                    0.5, 0.6, 0,
                    0.1, 0.4, 0
                ])
                break
        }

    }
    draw(bp, gl) {
        bp.position.set(this.position)
        bp.color.set(this.style.sides.fill)
        bp.vert.set(this.shape)
        gl.drawArrays(gl.TRIANGLES, 0, this.shape.length / 3)
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Arrow;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__physics_coliders_Plane__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_Vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Settings__ = __webpack_require__(0);





const s = 1 + __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].blocksSpacing

class Flat {

    constructor(position, height) {

        this.position = new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](-position[1], -position[0], -position[2])

        this.sides = [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([ // back left
                [1, 0, -height],
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, -height]
            ], this.position), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([ // fron left
                [1, 1, -height],
                [1, 1, 0],
                [1, 0, 0],
                [1, 0, -height]
            ], this.position), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([ // fron right
                [1, 1, -height],
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, -height]
            ], this.position), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([ // back right
                [0, 1, -height],
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, -height]
            ], this.position)
        ]

        this.top = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
            [0, 0, -height],
            [1, 0, -height],
            [1, 1, -height],
            [0, 1, -height]
        ], this.position)

        const [x, y, z] = this.position
        this.bottom = [
            (x - .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y - .5) * s, z
        ]

        this.topPlane = new __WEBPACK_IMPORTED_MODULE_1__physics_coliders_Plane__["a" /* default */](
            new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](0, 0, -height + this.position[2]),
            new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](1, 0, -height + this.position[2]),
            new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](1, 1, -height + this.position[2])
        )
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flat;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__physics_coliders_Plane__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_Vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Settings__ = __webpack_require__(0);





const s = 1 + __WEBPACK_IMPORTED_MODULE_3__Settings__["a" /* default */].blocksSpacing

class Slide {

    constructor(position, height, heights) {

        this.position = new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](-position[1], -position[0], -position[2])

        this.sides = [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
                [1, 0, -height - heights[0]],
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, -height - heights[3]],
            ], this.position), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
                [1, 1, -height - heights[1]],
                [1, 1, 0],
                [1, 0, 0],
                [1, 0, -height - heights[0]],
            ], this.position), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
                [1, 1, -height - heights[1]],
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, -height - heights[2]],
            ], this.position), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
                [0, 1, -height - heights[2]],
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, -height - heights[3]],
            ], this.position)
        ]

        this.top = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* shape */])([
            [0, 0, -height - heights[3]],
            [1, 0, -height - heights[0]],
            [1, 1, -height - heights[1]],
            [0, 1, -height - heights[2]],
        ], this.position)

        const [x, y, z] = this.position
        this.bottom = [
            (x - .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y + .5) * s, z,
            (x + .5) * s, (y - .5) * s, z
        ]


        this.topPlane = new __WEBPACK_IMPORTED_MODULE_1__physics_coliders_Plane__["a" /* default */](
            new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](0 + this.position[0] - .5, 0 + this.position[1] - .5, -height - heights[3] + this.position[2]),
            new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](1 + this.position[0] - .5, 0 + this.position[1] - .5, -height - heights[0] + this.position[2]),
            new __WEBPACK_IMPORTED_MODULE_2__math_Vec3__["a" /* default */](1 + this.position[0] - .5, 1 + this.position[1] - .5, -height - heights[1] + this.position[2])
        )
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Slide;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_Vec3__ = __webpack_require__(1);


class Sphere {

    /** 
     *
     * @param {Vec3} p center of Sphere
     * @param {Number} r radius
     */
    constructor(p, r) {
        this.p = p
        this.r = r
    }

    distanceTo(plane) {
        const v = __WEBPACK_IMPORTED_MODULE_0__math_Vec3__["a" /* default */].sub(this.p, plane.p)
        const distance = plane.norm.dot(v) - this.r
        return [Math.abs(distance), Math.sign(distance)]
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sphere;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Resources__ = __webpack_require__(2);




const game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */]({
    appendTo: document.getElementById('game'),
    control: window
})

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Resources__["a" /* waitForResources */])().then(() => {
    game.map = __WEBPACK_IMPORTED_MODULE_1__Resources__["b" /* default */].maps['0000']
    game.start()
})

/***/ })
/******/ ]);