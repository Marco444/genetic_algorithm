import {GOAL_HEIGHT, GOAL_WIDTH, GOAL_X_POSITION, GOAL_Y_POSITION} from "../viewer/DrawEngine.js";

const NUM_GENES = 250;
const VEL = 25;
const DEFAULT_RADIUS = 5;

export default class Ball {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r = DEFAULT_RADIUS
        this.index = 0;
        this.fitness = 0;
        this.done = false;
        this.setRandomGenes()
    }


    update() {
        if (GOAL_X_POSITION < this.x && GOAL_X_POSITION + GOAL_WIDTH > this.x &&
            GOAL_Y_POSITION < this.y && GOAL_Y_POSITION + GOAL_HEIGHT > this.y) {
            this.done = true;
            this.index++;
        }
        else if (this.index < NUM_GENES) {
            this.x += VEL * this.genes[this.index][0];
            this.y += VEL * this.genes[this.index][1];
            this.index++;
        }
    }

    setGenes(genes) {
        this.genes = genes;
    }

    /** **/
    setRandomGenes() {
        this.genes = [];
        for (let i = 0; i < NUM_GENES; i++) {
            this.genes[i] = [Math.random()-0.5, Math.random()-0.5] // random x,y vector
        }
    }

    calcFitness() {
        const d = Math.sqrt((this.x - 400) ** 2 + (this.y - 765) ** 2);
        this.fitness = Math.max(0, 1 - d / 800);
    }
}
