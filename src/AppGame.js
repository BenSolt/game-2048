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


        // --Ball movement--
        var dx = 1;
        var dy = -1;

        var paddleHeight = 20;
        var paddleWidth = 75;
        var paddleX = (canvas.width - paddleWidth) / 2;
        var paddleY = (canvas.height - paddleHeight) / 2;

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

        ///////////////////SCORE
        var score = 0;

        function drawScore() {
            ctx.font = "22px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText("Score: "+score, 8, 20);
        }

        //////////////////// MOVE PADDLE
 

        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
                rightPressed = true;
            }
            else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
                leftPressed = true;
            }

            else if (e.key === "ArrowUp") {
                upPressed = true;
            }
            else if (e.key === "ArrowDown") {
                downPressed = true;
            }


            else if (e.key === "v") {
                spacebarPressed = true;
            }

           
        }

        function keyUpHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
                rightPressed = false;
            }
            else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
                leftPressed = false;
            }
          
            else if (e.key === "ArrowUp") {
                upPressed = false;
            }
            else if (e.key === "ArrowDown") {
                downPressed = false;
            }

            // else if (e.key === "v") {
            //     spacebarPressed = false;
            // }

        }

     
        /////////////// END MOVE PADDLE


        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPaddle();
            // drawBall();
            drawScore();
 

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            }
            else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    if (y = y - paddleHeight) {
                        dy = -dy;
                    }
                }
            }

        // MOVE PADDLE
            if (rightPressed && paddleX < canvas.width - paddleWidth) {       
                // Paddle Speed
                paddleX += 2;
            }
            else if (leftPressed && paddleX > 0) {
                // Paddle Speed
                paddleX -= 2;
            }
            if (upPressed && paddleY < canvas.height - paddleHeight) {
                // Paddle Speed
                paddleY -= 2;
            }
            else if (downPressed && paddleY > 0) {
                // Paddle Speed
                paddleY += 2;
            }

        // SPACEBAR SHOOT
            else if (spacebarPressed) {
                drawBall()
            }
            x += dx;
            y += dy;
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