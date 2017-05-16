import Game from './Game'
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