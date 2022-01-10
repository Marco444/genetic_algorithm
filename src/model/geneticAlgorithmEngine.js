import Ball from "./Ball.js";

const NUM_GENES = 250;
const POPULATION_SIZE = 100;
const MUTATION_RATE = 0.02;

let avg_fitness = 0;
let generation = 0;
let population = [];

/** we update the population by drawing the current population **/
export function updatePopulationGeneticAlgorithm(ballEngine) {

    for (let i = 0; i < POPULATION_SIZE; i++) {
        population[i].update();
        ballEngine.draw(population[i])
    }

    if (population[0].index === NUM_GENES)
        nextGen()

    return [generation, avg_fitness]
}

/** initialises the population **/
export function initializeGeneticAlgorithm() {
    for (let i = 0; i < POPULATION_SIZE; i++)
        population.push(new Ball(395, 25));
}

/** we get all the candidates for the next population based on their fitness  **/
function getCandidates() {
    const candidates = [];

    let total_fitness = 0;
    for (let i = 0; i < POPULATION_SIZE; i++) {
        population[i].calcFitness();
        total_fitness += population[i].fitness;

        //We push into the candidates the previous' populations citizens
        //proportional to a factor of their fitness, this is the
        //natural selection process per se
        for (let j = 0; j < (2 ** (population[i].fitness * 10)); j++)
            candidates.push(population[i]);

    }

    avg_fitness = total_fitness / POPULATION_SIZE;
    return candidates;
}

/** We generate a baby's genes based upon dad and mom's genes and random mutation.
 * Most of the time the Math.random() will give a value higher than the MUTATION_RATE, thus
 * we will put half of the time dad's genes and other half mom's genes. But in a few cases
 * we will add a random gene in our baby, accounting for mutations that occur in reproduction **/
function getBabyGenes(mom, dad) {
    const babyGenes = [];

    for (let j = 0; j < NUM_GENES; j++) {
        if (Math.random() < MUTATION_RATE) babyGenes.push([Math.random() - 0.5, Math.random() - 0.5]);
        else if (j % 2) babyGenes.push(dad.genes[j]);
        else babyGenes.push(mom.genes[j]);
    }
    return babyGenes;
}

/** we receive a list of candidates and then we generate a new citizen, which we will call a baby,
 *  based upon two random citizens from the candidates, which we will call mom and dad**/
function reproduceFrom(candidates) {
    const newPopulation = [];

    for (let i = 0; i < POPULATION_SIZE; i++) {
        const dad = candidates[Math.floor(Math.random() * candidates.length)];
        const mom = candidates[Math.floor(Math.random() * candidates.length)];
        const baby = new Ball(395, 25);

        baby.setGenes(getBabyGenes(mom, dad));
        newPopulation.push(baby)
    }

    return newPopulation;
}

/** We create a new generation of the population **/
export function nextGen() {

    //We update the generation
    generation++;

    //We get the candidates for the next generation
    const candidates = getCandidates();

    //We create a new population from the candidates and replace previous generation with current
    population = reproduceFrom(candidates);
}
