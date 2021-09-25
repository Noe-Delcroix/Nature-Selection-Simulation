Created on : 02/08/2019

# Evolutionary System of steering vehicles

This project's aim is to simulate the behaviors of a group a vehicles that try to eat to survive while avoid obstacles in order to reproduce and pass their genes to the next generation.

## How it works

Each vehicle is represented by a small triangle. It's health level corresponds to it's color (white is full life, black is dead).
Once a vehicle has no more life, it dies. However if it lives for enough time, it might reproduce, passing its genes to its children, with a small random chance of mutation.
The end goal of this simulation is to have a population of vehicles that eat green dot to gain health and survive while also avoiding the red ones that damages them.

This projects runs on JavaScript using the p5.js library.
Try it online here : https://editor.p5js.org/Noway/full/25cVKBdZk
