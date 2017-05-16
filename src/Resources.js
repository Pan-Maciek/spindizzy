import remote from './net/remote'
import Map from './Map'

const __PRIMISSES__ = []
const load = (resourceName, url, appendTo = __RESOURCES__.maps) => {
    const prom = remote.json({ url })
    __PRIMISSES__.push(prom.then(json => {
        appendTo[resourceName] = new Map(json)
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

export const waitForResources = () => Promise.all(__PRIMISSES__)

export default __RESOURCES__