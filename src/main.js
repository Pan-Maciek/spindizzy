import Game from './Game'
import Resources from './Resources'
import { waitForResources } from './Resources'

const game = new Game({
    appendTo: document.getElementById('game'),
    control: window
})

waitForResources().then(() => {
    game.map = Resources.maps['0000']
    game.start()
})