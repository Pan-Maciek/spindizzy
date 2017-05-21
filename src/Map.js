import Style from './Style'
import Flat from './objects/Flat'
import Slide from './objects/Slide'
import Arrow from './objects/Arrow'
import Diamond from './entities/Diamond'
import Color from './gl/Color'
import Water from './objects/Water'

const position0 = new Float32Array([0, 0, 0])

export default class Map {

    constructor(map) {

        this.styleGroups = []
        this.elements = []
        this.selfDrawn = []
        this.entities = []
        this.mapBackround = false

        for (let group of map) {
            if (group.extra) {
                this.mapBackround = new Color(...group.mapBackround)
                continue
            }


            let topPoints = [], sidePoints = [], botPoints = [], lightSidePoints = []
            const style = new Style(group.style)
            this.styleGroups.push({ botPoints, topPoints, sidePoints, style, lightSidePoints })
            for (var i = 0; i < group.elements.length; i++) {
                const [type, ...args] = group.elements[i]
                switch (type.toLowerCase()) {
                    case 'flat':
                        var block = new Flat(...args)
                        break
                    case 'slide':
                        var block = new Slide(...args)
                        break
                    case 'arrow':
                        var block = new Arrow(...args)
                        block.style = style
                        this.selfDrawn.push(block)
                        continue
                    case 'diamond':
                        var block = new Diamond(...args)
                        block.style = style
                        this.entities.push(block)
                        continue
                    case 'water':
                        var block = new Water(...args)
                        block.style = style
                        this.selfDrawn.push(block)
                        continue
                }
                topPoints.push(...block.top)
                sidePoints.push(...block.sides[1])
                sidePoints.push(...block.sides[0])
                lightSidePoints.push(...block.sides[2])
                lightSidePoints.push(...block.sides[3])
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
            this.styleGroups[i].lightSidePoints = new Float32Array(this.styleGroups[i].lightSidePoints)
            this.styleGroups[i].lightSidelength = this.styleGroups[i].lightSidePoints.length / 3
        }
    }

    update(game, dt) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(game, dt)
        }
    }

    draw(bp, gl) {

        for (var i = 0; i < this.styleGroups.length; i++) {
            bp.position.set(position0)
            if (this.styleGroups[i].toplength === 0) continue
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


            bp.vert.set(this.styleGroups[i].lightSidePoints)

            bp.color.set(this.styleGroups[i].style.sides.fillLight)
            gl.drawArrays(gl.TRIANGLES, 0, this.styleGroups[i].lightSidelength)

            bp.color.set(this.styleGroups[i].style.sides.stroke)
            gl.drawArrays(gl.LINES, 0, this.styleGroups[i].lightSidelength)

            bp.vert.set(this.styleGroups[i].botPoints)
            gl.drawArrays(gl.LINES, 0, this.styleGroups[i].botlength)

        }
        for (var i = 0; i < this.selfDrawn.length; i++) {
            this.selfDrawn[i].draw(bp, gl)
        }
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(bp, gl)
        }
    }
}