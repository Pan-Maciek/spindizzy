import Style from './Style'
import Flat from './objects/Flat'
import Slide from './objects/Slide'

const position0 = new Float32Array([0, 0, 0])

export default class Map {
    constructor(map) {

        this.styleGroups = []
        this.elements = []
        let i

        for (let group of map) {
            let topPoints = [], sidePoints = [], botPoints = []
            this.styleGroups.push({
                botPoints, topPoints, sidePoints,
                style: new Style(group.style)
            })
            for (i = 0; i < group.elements.length; i++) {
                const [type, ...args] = group.elements[i]
                switch (type.toLowerCase()) {
                    case 'flat':
                        var block = new Flat(...args)
                        break
                    case 'slide':
                        var block = new Slide(...args)
                        break
                }
                topPoints.push(...block.top.points)
                sidePoints.push(...block.sides[1].points)
                sidePoints.push(...block.sides[2].points)
                botPoints.push(...block.bottom)
                this.elements.push(block)
            }
        }

        for (i = 0; i < this.styleGroups.length; i++) {
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
    }
}