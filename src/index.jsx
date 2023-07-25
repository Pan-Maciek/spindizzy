import { render } from "solid-js/web";
import Game from "./Game";

render(() => <Game width={800} height={800} />, document.getElementById("game"));
