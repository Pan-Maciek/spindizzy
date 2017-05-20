import remote from './net/remote'
import Map from './Map'

const __PROMISSES__ = [
    new Promise((resolve) => {
        window.addEventListener('load', resolve)
    })
]
const load = (resourceName, url, appendTo = __RESOURCES__.maps) => {
    url = location.href + url.match(/\.?\/?(.*)/)[1]

    if (/\.json$/.test(url)) {
        const prom = remote.json({ url })
        __PROMISSES__.push(prom.then(json => {
            appendTo[resourceName] = new Map(json)
        }))
        return prom
    } else if (/\.(?:mp3)$/.test(url)) {
        const prom = new Promise((resolve) => {
            const audio = new Audio(url)
            resolve()
            appendTo[resourceName] = audio
        })
        __PROMISSES__.push(prom)
        return prom
    }
}

const loadMap = ID => {
    load(ID, `./resources/maps/map${ID}.json`)
}

const __RESOURCES__ = {
    maps: {},
    sounds: {}
}

loadMap('0000')
loadMap('0001')
loadMap('0002')
loadMap('0010')
loadMap('0020')
loadMap('0100')
loadMap('0102')
loadMap('0200')
loadMap('0201')
loadMap('0300')
loadMap('1000')
loadMap('1002')
loadMap('2000')
loadMap('2001')
loadMap('3000')
loadMap('3001')
load('testmap', './resources/maps/testmap.json')

load('diamond', './resources/sound/diamond.mp3', __RESOURCES__.sounds)

export const waitForResources = () => Promise.all(__PROMISSES__)

export default __RESOURCES__
window.r = __RESOURCES__