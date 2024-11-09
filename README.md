# Game of Life

This is a simulation of John Conway's game of life.

The game evolves over time and is determined by its initial state and requires no further input.

The game's state is updated based on these simple rules:
- When and empty cell has 3 immediate neighbors, a new LIFE is born.
- When a "live" or non-empty cell has 2 or 3 immediate neighbors, it stays alive.
- When a "live" or non-empty cell has less than 2 immediate neighbors, it DIES of loneliness.
- When a "live" or non-empty cell has more than 3 immediate neighbors, it DIES of overcrowding.

Here is a visual demo of what that looks like:

![visual-demo](./assets/images/game-of-life-demo.gif)

The cells on the edges look at the opposite edges when determining their and their neighbors new state, ie: for a grid which is 4x4 a cell at the end will look at a neighbor in the start position.

1 in the first row will look to its left, bottom-left, bottom, bottom-right, right, top-left, top-right, and top (**the last row 1**)

| 0 | 0 | 0 | 1 |
|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 1 |


# How to run the app?

This app was created with the help of [Expo](https://expo.dev)

Make sure to follow the installation instructions on their website and then just run the following:

```bash
   npx expo start
```

To view the app in a browser, simply press `w` while it is running.

In the output, you'll also find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo