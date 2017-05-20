import Game from './Game'
import Resources from './Resources'
import { waitForResources } from './Resources'


waitForResources().then(() => {
    const game = new Game({
        appendTo: document.getElementById('game'),
        control: window
    })
    game.map = Resources.maps['0000']
    game.start()
})