import {displayInformation, drawGoal} from "./viewer/DrawEngine.js";
import {BallEngine} from "./viewer/BallEngine.js";
import {initializeGeneticAlgorithm, updatePopulationGeneticAlgorithm} from "./model/geneticAlgorithmEngine.js";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    //We initialise the genetic algorithm
    initializeGeneticAlgorithm();

    //We begin the loop
    loop();
}

function loop() {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //We need to reset the whole canvas and set the animation frame
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //We carry out an iteration of the algorithm
    const [generation, avg_fitness] = updatePopulationGeneticAlgorithm(new BallEngine(ctx))

    //We draw the box the balls should land in
    drawGoal(ctx)

    //We display the information about the current generation and the average fitness
    displayInformation(ctx, generation, avg_fitness)
}
