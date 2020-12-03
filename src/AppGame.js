import React from 'react';
import { useEffect, useState } from 'react';
import './AppGame.css';

function AppGame() {

    window.onload = function () {

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);


        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var ballRadius = 10;
        var x = canvas.width / 2;
        var y = canvas.height - 30;

        // Directions
        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
        // Shoot
        var spacebarPressed = false;



        var paddleHeight = 20;
        var paddleWidth = 75;
        var paddleX = (canvas.width - paddleWidth) / 2;

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#FF0000";
            
            ctx.fill();
            ctx.closePath();
        }

//////////////////// MOVE PADDLE
        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            }
            else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            }
            else if (e.key === "Up" || e.key === "ArrowUp") {
                upPressed = true;
            }
            else if (e.key === "Down" || e.key === "ArrowDown") {
                downPressed = true;
            }
            else if (e.key === "Spacebar") {
                spacebarPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = false;
            }
            else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = false;
            }
            
            else if (e.key === "Up" || e.key === "ArrowUp") {
                upPressed = false;
            
            }
            else if (e.key === "Down" || e.key === "ArrowDown") {
                downPressed = false;
            }
            else if (e.key === "Spacebar") {
                spacebarPressed = false;
            }
        }
/////////////// END MOVE PADDLE


        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPaddle();
            drawBall();

// MOVE PADDLE
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                // Paddle Speed
                paddleX += 2;
            }
            else if (leftPressed && paddleX > 0) {
                // Paddle Speed
                paddleX -= 2;
            }
            else if (upPressed && paddleX > 0) {
                // Paddle Speed
                paddleX += 2;
            }
            else if (downPressed && paddleX > 0) {
                // Paddle Speed
                paddleX -= 2;
            }
        }

        var interval = setInterval(draw, 10);
    }

    return (
        <div>
            <canvas id="myCanvas" width="480" height="320"></canvas>
        </div>
    )
}

export default AppGame;