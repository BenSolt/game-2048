import React from 'react';
import grid from './components/Grid.js';
import './2048.css';


function AppGame2048() {

    grid.init();

    document.addEventListener("keyup", function (e) {
        let direction = null;

        if (e.key === 38) {
            direction = "UP";
        } else if (e.key === 39) {
            direction = "RIGHT";
        } else if (e.key === 40) {
            direction = "DOWN";
        } else if (e.key === 37) {
            direction = "LEFT";
        }


        if (direction !== null) {
            grid.slide(direction);
        }

        return false;
    });


    return (
        <div>
            <div class="wrapper">
                <div class="grid">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
        </div>
    )
}
export default AppGame2048;