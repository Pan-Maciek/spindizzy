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

const loadMaps = (...maps) => {
    for (const map of maps) {
        loadMap(map)
    }
}

const __RESOURCES__ = {
    maps: {},
    sounds: {}
}

loadMaps(
    '0000', '0001', '0002', '0003',
    '0010', '0020',
    '0100', '0102', '0103',
    '0200', '0201',
    '0300', '0301', '0302', '0303',
    '1000', '1002', '1003',
    '2000', '2001',
    '3000', '3001'
)
load('testmap', './resources/maps/testmap.json')

load('diamond', './resources/sound/diamond.mp3', __RESOURCES__.sounds)

export const waitForResources = () => Promise.all(__PROMISSES__)

export default __RESOURCES__
window.r = __RESOURCES__