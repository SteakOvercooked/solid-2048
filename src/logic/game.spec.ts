import { Game } from "./game";

describe("Game Logic", () => {
  it("flows as intended", () => {
    const game = new Game(4, 4);

    game.start();
    expect(game["field"].filter((cell) => cell !== null)).toHaveLength(1);

    game["field"] = new Array(16).fill(null);
    game["field"][0] = 4;
    game["field"][2] = 2;

    // [4] [ ] [2] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]

    game.swipe("left");

    // [4] [2] [ ] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]

    expect(game["field"][0]).toBe(4);
    expect(game["field"][1]).toBe(2);
    expect(game["field"][2]).toBeNull();

    game["field"][3] = 2;

    // [4] [2] [ ] [2]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]

    game.swipe("right");

    // [ ] [ ] [ ] [8]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]

    expect(game["field"][0]).toBeNull();
    expect(game["field"][1]).toBeNull();
    expect(game["field"][2]).toBeNull();
    expect(game["field"][3]).toBe(8);

    game["field"][15] = 2;
    game["field"][5] = 4;
    game["field"][13] = 4;

    // [ ] [ ] [ ] [8]
    // [ ] [4] [ ] [ ]
    // [ ] [ ] [ ] [ ]
    // [ ] [4] [ ] [2]

    game.swipe("up");

    // [ ] [8] [ ] [8]
    // [ ] [ ] [ ] [2]
    // [ ] [ ] [ ] [ ]
    // [ ] [ ] [ ] [ ]

    expect(game["field"][1]).toBe(8);
    expect(game["field"][3]).toBe(8);
    expect(game["field"][7]).toBe(2);
  });
});
