# Spindizzy
This is a remake of old atari 800 game spindizzy.  
To find more info about original game take a look [here](https://en.wikipedia.org/wiki/Spindizzy_(video_game)).

## Before you start

* node and modules  
If you want to build project you have to have `node` installed because project is splited into multiple files which are joined using `webpack`.  
If you already have node installed you just have to write npm install while beeing in project directory to install alll neaded modules.

* http-server  
Please make sure you have some http server avaliable.  
If not i highly recomend `npm instal -g http-server`

## Project structure

* build  
here you will find build project file `main.bundle.js`

* src  
here you can find all code responsible for game

    * entities  
    in brieff all things that moves
    * gl  
    webgl wrapper

        * programs  
        all glsl code and js wrappers

    * math
    * net  
    ajax communication
    * objects  
    all static blocks

* static  
here you can find all static files like `.html`, `.css`

    * resources  
    here you can find all dynamicly loaded game resources like maps
    * style  
    here you can find all `.css` stylesheets


## Building project

To build project simply write `npm build` while beeing in project directory.

If you want to modify files more often use `npm start` then project will automaticly rebuild after saving.