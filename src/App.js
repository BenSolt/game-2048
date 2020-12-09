import React from 'react';
import { useState } from 'react';
import "./App.scss";
import "./AppMy.scss";

import HTMLActuator from './components/Actuator.js';
import GameManager from './components/GameManager';

function AppGame2() {


    const [add, setAdd] = useState(0);


    document.addEventListener("DOMContentLoaded", function () {
        // Wait till the browser is ready to render the game (avoids glitches)
        window.requestAnimationFrame(function () {
            var manager = new GameManager(4, KeyboardInputManager, HTMLActuator);
        });
    });


    function KeyboardInputManager() {
        this.events = {};

        this.listen();
    }

    KeyboardInputManager.prototype.on = function (event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    };

    KeyboardInputManager.prototype.emit = function (event, data) {
        var callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(function (callback) {
                callback(data);
            });
        }
    };

    KeyboardInputManager.prototype.listen = function () {
        var self = this;

        var map = {
            38: 0, // Up
            39: 1, // Right
            40: 2, // Down
            37: 3, // Left
            75: 0, // vim keybindings
            76: 1,
            74: 2,
            72: 3
        };

        document.addEventListener("keydown", function (event) {
            var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                event.shiftKey;
            var mapped = map[event.which];

            if (!modifiers) {
                if (mapped !== undefined) {
                    event.preventDefault();
                    self.emit("move", mapped);
                }

                // if (event.which === 32) self.restart.bind(self)(event);
            }
        });

        var retry = document.getElementsByClassName("retry-button")[0];
        retry.addEventListener("click", this.restart.bind(this));

        // Listen to swipe events
  
        // var gestures = [Hammer.DIRECTION_UP, Hammer.DIRECTION_RIGHT,
        // Hammer.DIRECTION_DOWN, Hammer.DIRECTION_LEFT];

        // var gameContainer = document.getElementsByClassName("game-container")[0];
        // var handler = Hammer(gameContainer, {
        // var handler = (gameContainer, {    
        //     drag_block_horizontal: true,
        //     drag_block_vertical: true
        // });

        // handler.on("swipe", function (event) {
        //     event.gesture.preventDefault();
        //     var mapped = gestures.indexOf(event.gesture.direction);

        //     if (mapped !== -1) self.emit("move", mapped);
        // });
    };

    KeyboardInputManager.prototype.restart = function (event) {
        event.preventDefault();
        this.emit("restart");
    };


    return (

        <div className="container">
            <div className="heading">
                <h1 className="title">2048</h1>
                <div className="score-container">0</div>
            </div>

            {/* <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p> */}
                
            <div className="game-Middle">
          
            <div className="game-container2">
                <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
                <br/>
                <p><strong className="important">How to play:</strong> Use your 
                <strong className="blue">arrow keys</strong> to move the <strong className="blue">tiles</strong>.
                When two tiles with the same number touch, they <strong>merge into one!</strong></p>
            </div>

           
            <div className="game-container">

                <div className="game-message">
                    <p></p>
                    <div className="lower">
                        <a className="retry-button">Try again</a>
                    </div>
                </div>

                <div className="grid-container">
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell"></div>
                    </div>
                </div>

                <div className="tile-container">

                </div>
            </div>

            </div>
      
            
            {/* <div>
                <p className="game-explanation">
                    <strong className="important">How to play:</strong> Use your <strong className="blue">arrow keys</strong> to move the <strong className="blue">tiles</strong>. When two tiles with the same number touch, they <strong>merge into one!</strong>
                </p>
            </div> */}
           


            {/* <hr></hr> */}
                {/* <p>
                    Created by <a href="http://gabrielecirulli.com" target="_blank">Gabriele Cirulli.</a> Based on <a href="https://itunes.apple.com/us/app/1024!/id823499224" target="_blank">1024 by Veewo Studio</a> and conceptually similar to <a href="http://asherv.com/threes/" target="_blank">Threes by Asher Vollmer.</a>
                </p> */}
</div> 


    )
}
export default AppGame2