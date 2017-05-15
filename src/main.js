import Game from './Game'
import { shape } from './shape'
import Player from './entities/Player'
import Map from './Map'
import remote from './net/remote'
import Resources from './Resources'
import { waitForResources } from './Resources'

const game = new Game({
    appendTo: document.getElementById('game'),
    control: window
})
game.start()

waitForResources().then(() => {
    game.map = Resources.maps['0102']
})