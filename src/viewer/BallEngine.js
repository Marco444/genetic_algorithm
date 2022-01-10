
/*
* Works in such a way that we can abstract how the ball is actually drawn in the screen from how it's
* actually implemented in the model. This way we can use the model with different technologies for
* implementing the ui
* */
export class BallEngine {

    constructor(ctx) {
        this.ctx = ctx
    }

    draw(ball) {
        this.ctx.fillStyle = 'rgb(192,243,208)';

        if (ball.done)
            this.ctx.fillStyle = 'rgb(65,166,122)';

        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }
}
