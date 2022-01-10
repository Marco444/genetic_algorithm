
export const GOAL_X_POSITION = 380;
export const GOAL_Y_POSITION = 745;
export const GOAL_WIDTH = 40;
export const GOAL_HEIGHT = 40;

/** we take care of drawing the end-goal**/
export function drawGoal(ctx) {
    ctx.fillStyle = 'rgb(33,232,146)';
    ctx.fillRect(GOAL_X_POSITION, GOAL_Y_POSITION, GOAL_WIDTH, GOAL_HEIGHT);
}

export function displayInformation(ctx, generation, avg_fitness) {
    ctx.fillStyle = "#ffe"
    ctx.font = "15px Arial";
    ctx.fillText("Generation: " + generation.toString(), 15, 45);
    ctx.fillText("Avg fitness: " + avg_fitness.toFixed(2).toString(), 15, 90);
}

