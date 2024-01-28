import { getRandomInt } from "../util";

type Direction = "up" | "right" | "down" | "left";

export class Game {
  private field: (number | null)[];
  private getNextCell: Record<Direction, (cell: number) => number | null>;

  constructor(width: number, height: number) {
    this.field = new Array(width * height);

    this.getNextCell = {
      up: (cell) => (cell < width ? null : cell - width),
      right: (cell) => ((cell + 1) % width === 0 ? null : cell + 1),
      down: (cell) => (this.field.length - width <= cell ? null : cell + width),
      left: (cell) => (cell % width === 0 ? null : cell - 1),
    };
  }

  start() {
    this.field.fill(null);
    this.initRandomCell();

    return Array.from(this.field);
  }

  private initRandomCell() {
    const insertOptions = this.field.reduce<number[]>((indices, cell, i) => {
      if (cell !== null) {
        return indices;
      }

      indices.push(i);
      return indices;
    }, []);

    // The game always has free cells after move
    const cell = insertOptions[getRandomInt(0, insertOptions.length - 1)];
    this.field[cell] = 2;
  }

  private move(cell: number, dir: Direction) {
    let currentCell = cell;
    let nextCell = this.getNextCell[dir](currentCell);

    // moving the cell to the first cell with value or field border
    while (nextCell !== null && this.field[nextCell] === null) {
      currentCell = nextCell;
      nextCell = this.getNextCell[dir](nextCell);
    }

    this.field[currentCell] = this.field[cell];

    if (cell !== currentCell) {
      this.field[cell] = null;
    }

    // we hit the wall or we hit another cell, but can not merge
    if (nextCell === null || this.field[nextCell] !== this.field[currentCell]) {
      return;
    }

    this.field[nextCell]! *= 2;
    this.field[currentCell] = null;
  }

  swipe(dir: Direction) {
    const isLoopReverse = dir === "right" || dir === "down";

    for (
      let cell = isLoopReverse ? this.field.length : 0;
      isLoopReverse ? cell >= 0 : cell < this.field.length;
      isLoopReverse ? (cell -= 1) : (cell += 1)
    ) {
      if (this.field[cell] !== null) {
        this.move(cell, dir);
      }
    }

    return Array.from(this.field);
  }
}
