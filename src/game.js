const BinaryFile = require('binary-file');

const gridLoader = (width, height) => async (filename) => {
    const grid = [];
    const file = new BinaryFile(filename, 'r', true);
    await file.open();
    for (let x = 0; x < width; x++) {
        grid[x] = [];
        for (let y = 0; y < height; y++) {
            grid[x][y] = await file.readInt16();
        }
    }
    await file.close();
    return grid;
};

const loadLevel = gridLoader(32, 20);

const loadLevelByName = async (name) => loadLevel(`./GameLevels/${name}.LVL`);

const loadBitmap = gridLoader(20, 20);

const loadBitmapByName = async (name) => loadBitmap(`./Bitmaps/${name}.BMP`);

const translateLevelTile = tileNumber => {
    if (tileNumber > 20) {
        return 'wiseman';
    } else if (tileNumber <= -20) {
        return 'Key';
    } else {
        switch (tileNumber) {
            case 4:
                return 'positive block';
            case 3:
                return 'sealed eye';
            case 2:
                return 'hidden platform';
            case 1:
                return 'platform';
            case 0:
                return 'nothing';
            case -1:
                return 'coins';
            case -2:
                return 'hidden key';
            case -3:
                return 'keyhole';
            case -4:
                return 'negative block';
            case -5:
                return 'sealed platform';
            case -6:
                return 'hidden keyhole';
            case -7:
                return 'open door';
            case -9:
                return 'false platform';
            case -10:
                return 'eye';
            case -11:
                return 'PortalA';
            case 11:
                return 'eleven';
            case -12:
                return 'PortalB';
            case -13:
                return 'LifeUp';
            case -14:
                return 'AttackUp';
        }
    }
};

const tileStrings = {
    'wiseman': 'WM',
    'Key': 'KY',
    'positive block': '+B',
    'sealed eye': 'SE',
    'hidden platform': 'HP',
    'platform': 'PF',
    'nothing': '..',
    'eleven': '11',
    'coins': 'oO',
    'hidden key': 'HK',
    'keyhole': 'KH',
    'negative block': '-B',
    'sealed platform': 'SP',
    'hidden keyhole': 'HH',
    'open door': 'OD',
    'false platform': 'FP',
    'eye': 'EY',
    'PortalA': 'PA',
    'PortalB': 'PB',
    'LifeUp': 'LU',
    'AttackUp': 'AU',
};

const transpose = m => {
    const t = [];
    for (let col = 0; col < m[0].length; col++) {
        t[col] = [];
        for (let row = 0; row < m.length; row++) {
            t[col][row] = m[row][col];
        }
    }
    return t;
};

const gridString = (charTable = id => id) => flipped => transpose(flipped)
    .map(row => row
        .map(charTable)
        .join(' '))
    .join('\n');

const levelString = gridString(tileNumber => tileStrings[translateLevelTile(tileNumber)]);

const printLevel = flipped => console.log(levelString(flipped));

const bitmapString = gridString();

const printBitmap = flipped => console.log(bitmapString(flipped));

const NoOfLevels = 10

/*
COMMON SHARED RGT$, LFT$, UP$, DN$, ESC$, ENTR$, SPC$, Coins, YMAX, XMAX, F1$, F2$, F3$, F4$, F5$, F6$, F7$, F8$, F9$
COMMON SHARED F10$, F11$, NJTimer, YouShouldGo, Warp, World$, WorldsChecked, BuildLevel, ADMISSION, SharedTalk
COMMON SHARED SharedWiseMessage$,  _
SharedMessage$
DIM SHARED GlovePos AS INTEGER
RGT$ = CHR$(0) + "M"
LFT$ = CHR$(0) + "K"
UP$ = CHR$(0) + "H"
DN$ = CHR$(0) + "P"
F1$ = CHR$(0) + ";"
F2$ = CHR$(0) + "<"
F3$ = CHR$(0) + "="
F4$ = CHR$(0) + ">"
F5$ = CHR$(0) + "?"
F6$ = CHR$(0) + "@"
F7$ = CHR$(0) + "A"
F8$ = CHR$(0) + "B"
F9$ = CHR$(0) + "C"
F10$ = CHR$(0) + "D"
ESC$ = CHR$(27)
ENTR$ = CHR$(13)
SPC$ = CHR$(32)
// */
const YMAX = 200
const XMAX = 320
let ADMISSION = 0
/*
KEY 15, CHR$(4) + CHR$(31)
KEY 16, CHR$(0) + CHR$(57)
KEY 17, CHR$(4) + CHR$(19)
KEY(11) ON 'up
KEY(12) ON 'left
KEY(13) ON 'right
KEY(14) ON 'down
KEY(15) ON 'Ctrl+S
KEY(16) ON
SCREEN 7, 0, 0, 1
// */

const screenMap2 = loadLevelByName('LEVEL2');
const screenMap3 = loadLevelByName('LEVEL3');
const screenMap4 = loadLevelByName('LEVEL4');
const screenMap5 = loadLevelByName('LEVEL5');
const screenMap6 = loadLevelByName('LEVEL6');
const screenMap7 = loadLevelByName('LEVEL7');
const screenMap8 = loadLevelByName('LEVEL8');
const screenMap9 = loadLevelByName('LEVEL9');
const screenMap10 = loadLevelByName('LEVEL10');
const screenMap11 = loadLevelByName('LEVEL11');
const bonusLevel = loadLevelByName('BONUSL~1');

// (async () => printLevel(await loadLevelByName('LEVEL2')))();
// (async () => printLevel(await loadLevelByName('LEVEL4')))();
// screenMap2.then(sm => printLevel(sm));
// screenMap2.then(printLevel);

// (async () => printBitmap(await dragonImage))();

const dragonImage = loadBitmapByName('DRAGON');
const ravenImage = loadBitmapByName('RAVEN');
const snakeImage = loadBitmapByName('SNAKE');
const wingedStatueImage = loadBitmapByName('WSTATUE');
const stormyImage = loadBitmapByName('STORMY');
const lightningImage = loadBitmapByName('LIGHTNIN');
const fireImage = loadBitmapByName('FIRE');
const ghostImage = loadBitmapByName('GHOST');
const lifeUpImage = loadBitmapByName('LIFEUP');
const attackUpImage = loadBitmapByName('ATKUP');
const mCloudImage = loadBitmapByName('MCLOUD');
const rCloudImage = loadBitmapByName('RCLOUD');
const lCloudImage = loadBitmapByName('LCLOUD');

// lifeUpImage.then(printBitmap);

const gloveImage = transpose([
    [-1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 8, 15, 8, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 8, 15, 15, 8, -1, -1, -1, -1, -1, -1, -1],
    [8, 8, 15, 15, 15, 8, 8, 8, 8, 8, 8, 8, 8],
    [8, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 8],
    [8, 15, 15, 7, 7, 15, 15, 15, 8, 8, 8, 8, 8],
    [8, 15, 15, 15, 15, 15, 15, 15, 8, -1, -1, -1, -1],
    [8, 15, 15, 7, 7, 15, 15, 15, 8, -1, -1, -1, -1],
    [8, 8, 15, 15, 15, 15, 15, 15, 8, -1, -1, -1, -1],
    [-1, -1, 8, 8, 8, 8, 8, 8, 8, -1, -1, -1, -1]
]);

const portalImage = transpose([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 15, 15, -1, -1, -1, -1],
    [-1, -1, -1, 15, 15, -1, -1, -1, -1, -1],
    [-1, -1, -1, 15, 4, 4, 4, 4, -1, -1],
    [-1, 1, -1, 15, 4, 2, 2, 4, 4, -1],
    [-1, 1, 1, 15, 15, 1, 2, -1, 4, -1],
    [-1, -1, 1, 1, 1, 1, 2, -1, -1, -1],
    [-1, -1, -1, -1, -1, 2, 2, -1, -1, -1],
    [-1, -1, -1, -1, 2, 2, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
]);

const guyImage = transpose([
    [-1, -1, 15, 15, 15, 15, 15, 15, -1, -1, -1],
    [-1, 15, 15, 3, 3, 3, 3, 15, 15, -1, -1],
    [15, 15, 3, 3, 3, 3, 3, 3, 15, 15, -1],
    [15, 3, 3, 3, 15, 3, 15, 3, 3, 15, -1],
    [15, 3, 3, 3, 15, 3, 15, 3, 3, 15, -1],
    [15, 15, 3, 3, 3, 3, 3, 3, 15, 15, -1],
    [-1, 15, 3, 3, 3, 3, 3, 3, 15, -1, -1],
    [-1, -1, 15, 15, 3, 3, 15, 15, -1, -1, -1],
    [-1, 15, 3, 3, 15, 15, 3, 3, 15, -1, -1],
    [-1, 15, 3, 3, 3, 15, 3, 3, 3, 15, -1],
    [-1, 15, 15, 15, 15, 15, 15, 15, 15, 15, -1],
]);

const goblinImage = transpose([
    [-1, 15, -1, -1, -1, -1, -1, 15, -1, -1],
    [-1, 15, 15, -1, -1, -1, 15, 15, -1, -1],
    [-1, 15, 4, 15, 15, 15, 4, 15, -1, -1],
    [-1, 15, 15, 4, 4, 4, 15, 15, -1, -1],
    [-1, 15, 4, 15, 4, 15, 4, 15, -1, -1],
    [-1, 15, 4, 4, 4, 4, 4, 15, -1, -1],
    [-1, -1, 15, 15, 15, 15, 15, -1, -1, -1],
    [-1, 15, 15, 15, 4, 15, 15, 15, -1, -1],
    [-1, -1, -1, 15, 4, 15, -1, -1, -1, -1],
    [-1, -1, 15, 15, 15, 15, 15, -1, -1, -1],
]);

const doorImage = transpose([
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 14, 14, 6, 6],
    [6, 6, 6, 6, 6, 14, 14, 14, 14, 6],
    [6, 6, 6, 6, 6, 14, 14, 14, 14, 6],
    [6, 6, 6, 6, 6, 6, 14, 14, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
]);

const handImage = transpose([
    [-1, 15, 15, -1],
    [15, 3, 3, 15],
    [15, 3, 3, 15],
    [-1, 15, 15, -1],
]);

const eyeImage = transpose([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 15, 15, 15, 15, -1, -1, -1],
    [-1, -1, 15, 1, 1, 1, 1, 15, -1, -1],
    [-1, 15, 1, 1, 1, 15, 15, 1, 15, -1],
    [15, 15, 1, 1, 0, 15, 15, 1, 15, 15],
    [15, 15, 1, 1, 0, 0, 1, 1, 15, 15],
    [-1, 15, 1, 1, 1, 1, 1, 1, 15, -1],
    [-1, -1, 15, 1, 1, 1, 1, 15, -1, -1],
    [-1, -1, -1, 15, 15, 15, 15, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
]);

const swordImage = transpose([
    [-1, -1, -1, 7, -1, -1, -1],
    [-1, -1, 7, 7, 7, -1, -1],
    [-1, -1, 7, 7, 7, -1, -1],
    [-1, -1, 7, 7, 7, -1, -1],
    [-1, -1, 7, 7, 7, -1, -1],
    [-1, -1, 7, 7, 7, -1, -1],
    [-1, -1, 7, 7, 7, -1, -1],
    [-1, -1, -1, 7, -1, -1, -1],
    [15, 15, 15, 15, 15, 15, 15],
    [-1, 15, 15, 15, 15, 15, -1],
    [-1, -1, -1, 15, -1, -1, -1],
    [-1, -1, -1, 15, -1, -1, -1],
]);

const keyholeImage = transpose([
    [-2, -2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -1, -1, -2, -2, -2, -2],
    [-2, -2, -2, -1, -1, -1, -1, -2, -2, -2],
    [-2, -2, -2, -1, -1, -1, -1, -2, -2, -2],
    [-2, -2, -2, -2, -1, -1, -2, -2, -2, -2],
    [-2, -2, -2, -2, -1, -1, -2, -2, -2, -2],
    [-2, -2, -2, -2, -1, -1, -2, -2, -2, -2],
    [-2, -2, -2, -1, -1, -1, -1, -2, -2, -2],
    [-2, -2, -2, -1, -1, -1, -1, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2, -2],
]);

const keyImage = transpose([
    [14, 14, 14, 14, 14, 14, 14, -1, -1, -1],
    [14, -1, -1, -1, -1, -1, 14, -1, -1, -1],
    [14, -1, -1, -1, -1, -1, 14, -1, -1, -1],
    [14, -1, -1, -1, -1, -1, 14, -1, -1, -1],
    [14, 14, 14, 14, 14, 14, 14, -1, -1, -1],
    [-1, -1, 14, 14, -1, -1, -1, -1, -1, -1],
    [-1, -1, 14, 14, -1, -1, -1, -1, -1, -1],
    [-1, -1, 14, 14, 14, 14, -1, -1, -1, -1],
    [-1, -1, 14, 14, -1, -1, -1, -1, -1, -1],
    [-1, -1, 14, 14, 14, 14, 14, -1, -1, -1],
]);

const screenMap1 = transpose([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, -1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -9, -9, 1, 1, 1, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-5, -5, -5, 1, 1, 1, 1, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, 0],
    [-5, -5, -5, -5, -5, -5, -5, -5, -5, 1, 1, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);

/*
'-----------------------------TYPES------------------------------------------

TYPE LOCATION
  x AS INTEGER
  y AS INTEGER
END TYPE

TYPE PLAYER
  x AS INTEGER                        'marks position
  y AS INTEGER
  Health AS INTEGER
  MaxHp AS INTEGER
  AP AS SINGLE                        'Attack points
  DP AS SINGLE                        'Defense points
  Status AS STRING * 4                'Bodily Status; "GOOD" "DEAD" "GONE"...
  Mvmnt AS STRING * 2                 'Jumping Status
  Direc AS STRING * 2                 'Direction Facing
  JTime AS INTEGER                    'Jumping Timer
  ScreenX AS INTEGER
  ScreenY AS INTEGER
END TYPE

TYPE ENEMY
  x AS INTEGER
  y AS INTEGER
  Health AS INTEGER
  AP AS SINGLE
  DP AS SINGLE
  Status AS STRING * 4
  Direc AS STRING * 2
  Race AS STRING * 10
  Item AS STRING * 4
  Intelligence AS INTEGER
  Speed AS SINGLE
  ScreenX AS INTEGER
  ScreenY AS INTEGER
  CanFly AS INTEGER
  NotBounce AS INTEGER
  PlaceHold AS LOCATION
  PlaceVal AS INTEGER
END TYPE

TYPE PERSON
  Speech AS STRING * 200
  Direc AS STRING * 2
END TYPE
// */

const vectorOf = (n, factory) => {
    const vector = [];
    for (let i = 0; i < n; i++) {
        vector[i] = factory();
    }
    return vector;
}

let Guy = {}; // AS PLAYER
let DemoGuy = vectorOf(200, () => ({})); // AS PLAYER
let Enemies = vectorOf(15, () => ({})); // AS ENEMY
let WiseMen = vectorOf(10, () => ({})); // AS PERSON
let PortalAlpha = {}; // AS LOCATION
let PortalBeta = {}; // AS LOCATION

const noOneTemplate = {
    Race: "NO ONE",
    Health: 0,
    Intelligence: 0,
    Speed: 0,
    AP: 0,
    DP: 1,
    CanFly: 0,
    NotBounce: 0,
    Status: "GONE",
    Direc: "",
    Item: ""
};

const goblinTemplate = {
    Race: "GOBLIN",
    Health: 1,
    Intelligence: 5,
    Speed: 3,
    AP: 1,
    DP: 1,
    CanFly: 0,
    NotBounce: 0,
    Status: "GOOD",
    Direc: "UR",
    Item: "01"
};

const ravenTemplate = {
    Race: "RAVEN",
    Health: 3,
    Intelligence: 3,
    Speed: 5,
    AP: 1,
    DP: 1,
    CanFly: -1,
    NotBounce: 0,
    Status: "GOOD",
    Direc: "UR",
    Item: "02"
};

const dragonTemplate = {
    Race: "DRAGON",
    Health: 5,
    Intelligence: 4,
    Speed: 5,
    AP: 2,
    DP: 1,
    CanFly: -1,
    NotBounce: 0,
    Status: "GOOD",
    Direc: "UR",
    Item: "05"
};

const wingedStatueTemplate = {
    ...ravenTemplate,
    Race: "WSTATUE",
    AP: 0,
    DP: -1,
    Item: "X000",
};

const snakeTemplate = {
    Race: "SNAKE",
    Health: 4,
    Intelligence: 3,
    Speed: 5,
    AP: 3,
    DP: 2,
    CanFly: 0,
    NotBounce: 0,
    Status: "GOOD",
    Direc: "UR",
    Item: "003",
};

const stormyTemplate = {
    Race: "STORMY",
    Health: 2,
    Intelligence: 5,
    Speed: 10,
    AP: 1,
    DP: 1,
    CanFly: -1,
    NotBounce: 0,
    Status: "GOOD",
    Direc: "UR",
    Item: "002",
};

const lightningTemplate = {
    Race: "LIGHTNING",
    Health: 3,
    Intelligence: 0,
    Speed: 5,
    AP: 4,
    DP: 1,
    CanFly: 0,
    NotBounce: -1,
    Status: "GOOD",
    Direc: "UR",
    Item: "X000",
};

const fireTemplate = {
    Race: "FIRE",
    Health: 1,
    Intelligence: 0,
    Speed: 10,
    AP: 2,
    DP: -1,
    CanFly: -1,
    NotBounce: -1,
    Status: "GOOD",
    Direc: "UR",
    Item: "X000",
};

const ghostTemplate = {
    Race: "GHOST",
    Health: 1,
    Intelligence: 4,
    Speed: 1,
    AP: 3,
    DP: -1,
    CanFly: -1,
    NotBounce: -1,
    Status: "GOOD",
    Direc: "UR",
    Item: "X000",
};
//---------------------WORDS-OF-WISDOM---------------------------------------
WiseMen[0].Speech = "When time has stopped go to the place ofstrange colors. Create a valley between two <ALT>ernatives. Then speak the name of your destination."
WiseMen[1].Speech = "Nice work on the level."
WiseMen[2].Speech = "Come with me."
WiseMen[3].Speech = "Trying to talk to some blocks changes   their mind about colors."
WiseMen[4].Speech = "If you come from below, you can climb   the edges of blocks."

//----------------------START!!!---------------------------------------------

/*
MainMenu

'--------------------------GOSUBS--------------------------------------------
// */

// from https://www.qbasic.net/en/reference/qb11/Function/MID_.htm
const MID$ = (string, start, length) => string.substring(start, length ? start + length : string.length);
// from https://www.qbasic.net/en/reference/qb11/Function/RIGHT_.htm
const LEFT$ = (string, n) => MID$(string, 0, n);
const RIGHT$ = (string, n) => MID$(string, string.length - n, n);

function LevelRight() {
    Guy.x = Guy.x + 5;
    if (Guy.x > 316) { Guy.x = 315; }
    if (Guy.ScreenX < 30) {
      if (screenMap[Guy.ScreenX + 1][Guy.ScreenY] === -11) {
        Guy.x = (PortalBeta.x + 1) * 10;
        Guy.y = (PortalBeta.y * 10) - 1;
      } else if (screenMap[Guy.ScreenX + 1][Guy.ScreenY] === -12) {
        Guy.x = (PortalAlpha.x + 1) * 10;
        Guy.y = (PortalAlpha.y * 10) - 1;
      }

      if (screenMap[Guy.ScreenX + 1][Guy.ScreenY] > 0) { Guy.x = Guy.x - 5; }
    }
    Guy.Direc = `${Guy.Direc[0]}R`;
    Guy.ScreenX = INT(Guy.x / 10);
    Guy.ScreenY = INT((Guy.y + 1) / 10);
    if (screenMap[Guy.ScreenX][Guy.ScreenY] === -1) {
        Coins = Coins + 1;
        screenMap[Guy.ScreenX][Guy.ScreenY] = 0;
    }
    if (Guy.ScreenX < 30) {
      if (screenMap[Guy.ScreenX][Guy.ScreenY] <= -20 && screenMap[Guy.ScreenX + 1][Guy.ScreenY] <= 0) {
        screenMap[Guy.ScreenX][Guy.ScreenY] = screenMap[Guy.ScreenX][Guy.ScreenY] + 20;
        screenMap[Guy.ScreenX + 1][Guy.ScreenY] = screenMap[Guy.ScreenX + 1][Guy.ScreenY] - 20;
      }
    }
}

function LevelLeft() {
    Guy.x = Guy.x - 5;
    if (Guy.x < 5) { Guy.x = 5; }
    if (Guy.ScreenX > 0) {
      if (screenMap[Guy.ScreenX - 1][Guy.ScreenY] === -11) {
        Guy.x = (PortalBeta.x - 1) * 10;
        Guy.y = (PortalBeta.y * 10) - 1;
      } else if (screenMap[Guy.ScreenX - 1][Guy.ScreenY] === -12) {
        Guy.x = (PortalAlpha.x - 1) * 10;
        Guy.y = (PortalAlpha.y * 10) - 1;
      }
      if (screenMap[INT(Guy.x / 10)][Guy.ScreenY] > 0) { Guy.x = Guy.x + 5; }
    }
    Guy.Direc = `${Guy.Direc[0]}L`;
    Guy.ScreenX = INT(Guy.x / 10);
    Guy.ScreenY = INT((Guy.y + 1) / 10);
    if (screenMap[Guy.ScreenX][Guy.ScreenY] === -1) {
        Coins = Coins + 1;
        screenMap[Guy.ScreenX][Guy.ScreenY] = 0;
    }
    if (Guy.ScreenX > 1) {
      if (screenMap[Guy.ScreenX][Guy.ScreenY] <= -20 && screenMap[Guy.ScreenX - 1][Guy.ScreenY] <= 0) {
        screenMap[Guy.ScreenX][Guy.ScreenY] = screenMap[Guy.ScreenX][Guy.ScreenY] + 20;
        screenMap[Guy.ScreenX - 1][Guy.ScreenY] = screenMap[Guy.ScreenX - 1][Guy.ScreenY] - 20;
      }
    }
    if (Guy.ScreenX > 0) {
      if (screenMap[Guy.ScreenX + 1][Guy.ScreenY] <= -20 && screenMap[Guy.ScreenX][Guy.ScreenY] <= 0) {
        screenMap[Guy.ScreenX + 1][Guy.ScreenY] = screenMap[Guy.ScreenX + 1][Guy.ScreenY] + 20;
        screenMap[Guy.ScreenX][Guy.ScreenY] = screenMap[Guy.ScreenX][Guy.ScreenY] - 20;
      }
    }
}

function LevelJump() {
  if (Guy.JTime > 0 && Guy.Mvmnt !== "DN") {
    if (Guy.y > 10) {
      if (screenMap[Guy.ScreenX][Guy.ScreenY - 1] === -11) {
        Guy.x = PortalBeta.x * 10;
        Guy.y = ((PortalBeta.y - 1) * 10) - 1;
      } else if (screenMap[Guy.ScreenX][Guy.ScreenY - 1] === -12) {
        Guy.x = PortalAlpha.x * 10;
        Guy.y = ((PortalAlpha.y - 1) * 10) - 1;
      }
      if (screenMap[Guy.ScreenX][Guy.ScreenY - 1] <= 0 || RIGHT$(STR$(Guy.x), 1) === "5" && screenMap[Guy.ScreenX + 1][Guy.ScreenY - 1] <= 0) {
        Guy.y = Guy.y - 5;
      }
      Guy.Mvmnt = "UP";
    }
  }
    Guy.ScreenX = INT(Guy.x / 10);
    Guy.ScreenY = INT((Guy.y + 1) / 10);
    if (screenMap[Guy.ScreenX][Guy.ScreenY] === -1) {
        Coins = Coins + 1;
        screenMap[Guy.ScreenX][Guy.ScreenY] = 0;
    }
}

function Down() {
  if (screenMap[Guy.ScreenX][Guy.ScreenY] === -7) {
      YouShouldGo = 1;
  }
}
/*
Save:
        SCREEN 12
        INPUT "FileName"; FileName$
        FileName$ = UCASE$(FileName$)
        if (RIGHT$(FileName$, 4) !== ".LVL") { FileName$ = FileName$ + ".LVL"
        SCREEN 7, 0, 0, 1
        OPEN "C:/BASIC/GAME/CUSTOM~1/" + FileName$ FOR RANDOM AS #1 LEN = LEN(screenMap)
          RecordNumber = 1
          for (let x0 = 0; x0 <= 31; x0++) {
            for (let y0 = 0; y0 <= 19; y0++) {
              PUT #1, RecordNumber, screenMap[x0][y0]
              RecordNumber = RecordNumber + 1
            }
          }
        CLOSE #1
        PRINT "SAVED": PCOPY 0, 1
        SLEEP
        RETURN
// */
function MenuUp() {
    if (GlovePos > 200) {
        GlovePos = GlovePos - 2;
    }
}
function MenuDown() {
    if (GlovePos < 310) {
        GlovePos = GlovePos + 2;
    }
}

function Space() {
    switch (RIGHT$(Guy.Direc, 1)) {
        case "R":
            if (Guy.ScreenX < 31) {
                if (screenMap[Guy.ScreenX + 1][Guy.ScreenY] > 20 && screenMap[Guy.ScreenX + 1][Guy.ScreenY] <= 30) {
                    SharedWiseMessage$ = WiseMen(screenMap[Guy.ScreenX + 1][Guy.ScreenY] - 20).Speech;
                    SharedTalk = 100;
                } else SharedTalk = 0;
            }
            else SharedTalk = 0;
            break;
            case "L":
                if (Guy.ScreenX > 0) {
                    if (screenMap[Guy.ScreenX - 1][Guy.ScreenY] > 20 && screenMap[Guy.ScreenX - 1][Guy.ScreenY] <= 30) {
                        SharedWiseMessage$ = WiseMen(screenMap[Guy.ScreenX - 1][Guy.ScreenY] - 20).Speech;
                        SharedTalk = 100;
                    } else {
                        SharedTalk = 0;
                    }
                } else SharedTalk = 0;
    }

    if (screenMap[Guy.ScreenX][Guy.ScreenY] === -4) {
      if (Guy.ScreenY > 1) {
        if (Guy.ScreenX > 1) {
          screenMap[Guy.ScreenX - 1][Guy.ScreenY - 1] = FlipBlocks(screenMap[Guy.ScreenX - 1][Guy.ScreenY - 1])
        }
        if (Guy.ScreenX < 31) {
          screenMap[Guy.ScreenX + 1][Guy.ScreenY - 1] = FlipBlocks(screenMap[Guy.ScreenX + 1][Guy.ScreenY - 1])
        }
        screenMap[Guy.ScreenX][Guy.ScreenY - 1] = FlipBlocks(screenMap[Guy.ScreenX][Guy.ScreenY - 1])
      }

      if (Guy.ScreenY < 19) {
        if (Guy.ScreenX > 1) {
          screenMap[Guy.ScreenX - 1][Guy.ScreenY + 1] = FlipBlocks(screenMap[Guy.ScreenX - 1][Guy.ScreenY + 1])
        }
        if (Guy.ScreenX < 31) {
          screenMap[Guy.ScreenX + 1][Guy.ScreenY + 1] = FlipBlocks(screenMap[Guy.ScreenX + 1][Guy.ScreenY + 1])
        }
        screenMap[Guy.ScreenX][Guy.ScreenY + 1] = FlipBlocks(screenMap[Guy.ScreenX][Guy.ScreenY + 1])
      }
      if (Guy.ScreenX > 1) {
        screenMap[Guy.ScreenX - 1][Guy.ScreenY] = FlipBlocks(screenMap[Guy.ScreenX - 1][Guy.ScreenY])
      }
      if (Guy.ScreenX < 31) {
        screenMap[Guy.ScreenX + 1][Guy.ScreenY] = FlipBlocks(screenMap[Guy.ScreenX + 1][Guy.ScreenY])
      }
    }
}
/*
Restart:
  World$ = SharedMessage$
  Warp = 1
  RETURN

SUB AI (SerialNumber, screenMap())
  if (Enemies(SerialNumber).Status = "GONE") { EXIT SUB        'dead men tell
                                                                ' no tales
  DIM EClone AS ENEMY
  screenMap(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y) = Enemies(SerialNumber).PlaceVal
  Enemies(SerialNumber).ScreenX = INT(Enemies(SerialNumber).x / 10)
  Enemies(SerialNumber).ScreenY = INT(Enemies(SerialNumber).y / 10)
  DistX = Guy.x - Enemies(SerialNumber).x
  DistY = Guy.y - Enemies(SerialNumber).y + 1
  ItemType$ = LEFT$(Enemies(SerialNumber).Item, 1): ItemNo = VAL(RIGHT$(Enemies(SerialNumber).Item, 3))

  if (screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY) !== -15) {
    Enemies(SerialNumber).PlaceHold.x = Enemies(SerialNumber).ScreenX
    Enemies(SerialNumber).PlaceHold.y = Enemies(SerialNumber).ScreenY
    Enemies(SerialNumber).PlaceVal = screenMap(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y)
    screenMap(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y) = -15
  else    'anchor
    switch (RIGHT$(Enemies(SerialNumber).Direc, 1)) {
    case "L": Enemies(SerialNumber).x = Enemies(SerialNumber).x + 5
    case "R": Enemies(SerialNumber).x = Enemies(SerialNumber).x - 5
    }
  }


  if (Enemies(SerialNumber).Intelligence >= 4) {                'smart move

      if (DistY < -Enemies(SerialNumber).Speed + 1) { EMove$ = UP$  'go nearer
      if (DistY > Enemies(SerialNumber).Speed - 1) { EMove$ = DN$     ' to guy
      if (DistX < -Enemies(SerialNumber).Speed + 1) { EMove$ = LFT$
      if (DistX > Enemies(SerialNumber).Speed - 1) { EMove$ = RGT$

      if (Enemies(SerialNumber).Race = "DRAGON    ") {
        if (DistY < -Enemies(SerialNumber).Speed) { EMove$ = UP$
        if (DistY > Enemies(SerialNumber).Speed) { EMove$ = DN$
        if (Guy.Mvmnt !== "DN") {
          if (EMove$ = LFT$ || EMove$ = RGT$) {
            if (Enemies(SerialNumber + 1).Status = "GONE") {
              if (EMove$ = LFT$) { Enemies(SerialNumber).Direc = "UL"
              if (EMove$ = RGT$) { Enemies(SerialNumber).Direc = "UR"
              Enemies(SerialNumber + 1) = FireTemplate
              Enemies(SerialNumber + 1).Direc = Enemies(SerialNumber).Direc
              Enemies(SerialNumber + 1).x = Enemies(SerialNumber).x
              Enemies(SerialNumber + 1).y = Enemies(SerialNumber).y
              Enemies(SerialNumber + 1).Health = 15
              Enemies(SerialNumber + 1).DP = 2
              Enemies(SerialNumber + 1).Intelligence = 3
              EMove$ = ""      'anchor
            } else if (Enemies(SerialNumber + 1).Health > 13) { EMove$ = ""
            }
          }
        }
      }

      if (Guy.Mvmnt = "DN") {
        switch (EMove$) {
        case DN$: EMove$ = UP$
        case UP$: EMove$ = DN$
        case LFT$: EMove$ = RGT$
        case RGT$: EMove$ = LFT$
        }
      }

    if (Enemies(SerialNumber).Race = "GOBLIN    ") {
      switch (EMove$) {
      case DN$:
        switch (RIGHT$(Enemies(SerialNumber).Direc, 1)) {
        case "R": EMove$ = LFT$
        case "L": EMove$ = RGT$
        }
      case UP$:
        switch (RIGHT$(Enemies(SerialNumber).Direc, 1)) {
        case "R": EMove$ = LFT$
        case "L": EMove$ = RGT$
        }
      case RGT$:
        if (Enemies(SerialNumber).ScreenX < 31) {
          if (screenMap(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY + 1) <= 0) { EMove$ = ""
        }
      case LFT$:
        if (Enemies(SerialNumber).ScreenX > 0) {
          if (screenMap(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY + 1) <= 0) { EMove$ = ""
        }
      }
    }

    if (Enemies(SerialNumber).Race = "STORMY    ") {
      switch (EMove$) {
        case DN$:
          EMove$ = ""
          if (Enemies(SerialNumber + 1).Status = "GONE") {
            Enemies(SerialNumber + 1) = LightningTemplate
            Enemies(SerialNumber + 1).x = Enemies(SerialNumber).x
            Enemies(SerialNumber + 1).y = Enemies(SerialNumber).y + 10
          }
        case UP$: EMove$ = ""
      }
    }

    if (ABS(DistX) < Enemies(SerialNumber).Speed) { Enemies(SerialNumber).x = Guy.x
    Enemies(SerialNumber).ScreenX = INT(Enemies(SerialNumber).x / 10)
    Enemies(SerialNumber).ScreenY = INT(Enemies(SerialNumber).y / 10)

  } else if (Enemies(SerialNumber).Intelligence > 2) {

      switch (RIGHT$(Enemies(SerialNumber).Direc, 1)) {
      case "R": EMove$ = RGT$
        if (Enemies(SerialNumber).ScreenX < 31) {
          if (screenMap(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) > 0 || screenMap(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) = -15) {
            EMove$ = LFT$
          }
        } else {
          EMove$ = LFT$
        }
      case "L": EMove$ = LFT$
        if (Enemies(SerialNumber).ScreenX > 0) {
          if (screenMap(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) > 0 || screenMap(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) = -15) {
            EMove$ = RGT$
          }
        } else {
          EMove$ = RGT$
        }
      }
  }


  switch (EMove$) {
  case RGT$:

    if (Enemies(SerialNumber).ScreenX < 31) {
      if (screenMap(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) <= 0 && screenMap(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) !== -15) {
        Enemies(SerialNumber).x = Enemies(SerialNumber).x + Enemies(SerialNumber).Speed: MID$(Enemies(SerialNumber).Direc, 2) = "R"
      }
    }
  case LFT$:
    if (Enemies(SerialNumber).ScreenX > 0) {
      if (screenMap(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) <= 0 && screenMap(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) !== -15) {
        Enemies(SerialNumber).x = Enemies(SerialNumber).x - Enemies(SerialNumber).Speed: MID$(Enemies(SerialNumber).Direc, 2) = "L"
      }
    }
  case UP$:
    if (Enemies(SerialNumber).ScreenY > 0) {
      if (screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY - 1) <= 0 && screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY - 1) !== -15) {
        Enemies(SerialNumber).y = Enemies(SerialNumber).y - Enemies(SerialNumber).Speed
      }
    }
  case DN$:
    if (Enemies(SerialNumber).ScreenY < 19) {
      if (screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) <= 0 && screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) !== -15) {
        Enemies(SerialNumber).y = Enemies(SerialNumber).y + Enemies(SerialNumber).Speed
      }
    }
  }

  if (NOT Enemies(SerialNumber).CanFly) {
    if (Enemies(SerialNumber).ScreenY < 19) {
      if (screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) <= 0 && screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) !== -15) {
        Enemies(SerialNumber).y = Enemies(SerialNumber).y + 10
      } else {
        Enemies(SerialNumber).y = Enemies(SerialNumber).ScreenY * 10
      }
    } else {
      Enemies(SerialNumber).Health = 0
    }
  }

  switch (Enemies(SerialNumber).Race) {
  case "LIGHTNING ":
    if (screenMap(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) > 0) {
      EClone = Enemies(SerialNumber)
      Enemies(SerialNumber) = FireTemplate
      Enemies(SerialNumber).Health = 5
      Enemies(SerialNumber).DP = 2
      Enemies(SerialNumber).x = EClone.x
      Enemies(SerialNumber).y = EClone.y
      Enemies(SerialNumber).PlaceHold = EClone.PlaceHold
      Enemies(SerialNumber).PlaceVal = EClone.PlaceVal
    }
  case "FIRE      ":
    ETrueDamage = ZeroLimit(INT(Enemies(SerialNumber).AP / Enemies(SerialNumber).DP))
    Enemies(SerialNumber).Health = Enemies(SerialNumber).Health - ETrueDamage
  }

  if (Enemies(SerialNumber).PlaceVal = -1) {
    if (ItemType$ !== "X") {
      if (ItemType$ = "$") { ItemNo = ItemNo + 1:  else ItemType$ = "$": ItemNo = 1
      Enemies(SerialNumber).PlaceVal = 0
    }
  }

  if (Enemies(SerialNumber).PlaceVal = -11) {

    switch (EMove$) {
    case UP$:
      Enemies(SerialNumber).x = PortalBeta.x * 10
      Enemies(SerialNumber).y = (PortalBeta.y * 10) - 10
    case DN$, "":
      Enemies(SerialNumber).x = PortalBeta.x * 10
      Enemies(SerialNumber).y = (PortalBeta.y * 10) + 10
    case RGT$:
      Enemies(SerialNumber).x = (PortalBeta.x * 10) + 10
      Enemies(SerialNumber).y = PortalBeta.y * 10
    case LFT$:
      Enemies(SerialNumber).x = (PortalBeta.x * 10) - 10
      Enemies(SerialNumber).y = PortalBeta.y * 10
    }

  }

  if (Enemies(SerialNumber).PlaceVal = -12) {

    switch (EMove$) {
    case UP$:
      Enemies(SerialNumber).x = PortalAlpha.x * 10
      Enemies(SerialNumber).y = (PortalAlpha.y * 10) - 10
    case DN$:
      Enemies(SerialNumber).x = PortalAlpha.x * 10
      Enemies(SerialNumber).y = (PortalAlpha.y * 10) + 10
    case "":
      Enemies(SerialNumber).x = PortalAlpha.x * 10
      Enemies(SerialNumber).y = (PortalAlpha.y * 10) + 10
    case RGT$:
      Enemies(SerialNumber).x = (PortalAlpha.x * 10) + 10
      Enemies(SerialNumber).y = PortalAlpha.y * 10
    case LFT$:
      Enemies(SerialNumber).x = (PortalAlpha.x * 10) - 10
      Enemies(SerialNumber).y = PortalAlpha.y * 10
    }
  }

  if (Guy.ScreenX = Enemies(SerialNumber).ScreenX && Guy.ScreenY = Enemies(SerialNumber).ScreenY) {
    if (Guy.Mvmnt = "DN" && NOT Enemies(SerialNumber).NotBounce) {
      ETrueDamage = ZeroLimit(INT(Guy.AP / Enemies(SerialNumber).DP))
      Enemies(SerialNumber).Health = ZeroLimit(Enemies(SerialNumber).Health - ETrueDamage)
      if (ETrueDamage > 0) {
        SharedWiseMessage$ = "YEAH!"
        SharedTalk = 10
      }
      Guy.y = Guy.y - 10
      Guy.Mvmnt = "UP"
      MID$(Guy.Direc, 1) = "U"
      Guy.JTime = 35
    } else {
      GTrueDamage = ZeroLimit(INT(Enemies(SerialNumber).AP / Guy.DP))
      Guy.Health = ZeroLimit(Guy.Health - GTrueDamage)
      if (GTrueDamage > 0) {
        SharedWiseMessage$ = "OUCH!"
        SharedTalk = 10
      }
      switch (RIGHT$(Enemies(SerialNumber).Direc, 1)) {
      case "L":
        Guy.x = Guy.x - 5
        Enemies(SerialNumber).x = Enemies(SerialNumber).x + 5
      case "R":
        Guy.x = Guy.x + 5
        Enemies(SerialNumber).x = Enemies(SerialNumber).x - 5
      }
    }
  }

  if (Guy.Health <= 0) { GameOver

  if (Enemies(SerialNumber).Health <= 0) {
    Enemies(SerialNumber).Status = "GONE"
    switch (ItemType$) {
    case "":
      Guy.Health = Guy.Health + ItemNo
      if (Guy.Health > Guy.MaxHp) { Guy.Health = Guy.MaxHp
    case "$":
      Coins = Coins + ItemNo
    }
    screenMap(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y) = Enemies(SerialNumber).PlaceVal
    Enemies(SerialNumber) = NoOneTemplate
  }

  Enemies(SerialNumber).Item = ItemType$ + STR$(ItemNo)

  switch (Enemies(SerialNumber).Race) {
  case "GOBLIN    ": DrawObj Goblinimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "DRAGON    ": DrawObj Dragonimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "RAVEN     ": DrawObj Ravenimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "WSTATUE   ": DrawObj WingedStatueimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "SNAKE     ": DrawObj Snakeimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "STORMY    ": DrawObj Stormyimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "GHOST     ": DrawObj Ghostimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "LIGHTNING ": DrawObj Lightningimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  case "FIRE      ": DrawObj Fireimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  }

END SUB
// */
const determineCoin = screenMap => screenMap
    .flatMap(row => row.map(cell => cell === -1 ? 1 : 0))
    .reduce((prev, current) => prev + current);
/*
SUB Directions
  CLS
  COLOR 15
  PRINT "The object of the game is to get the key into the keyhole."
  PRINT "Watch out for false and hidden platforms and get coins."
  PRINT "To restart a level, press Ctrl+R."
  PRINT "To jump, press the up arrow. Press right and left to walk right and left."
  PRINT "To go through doors, press down. Use the number pad's arrow keys."
  PRINT "The Num Lock does not have to be on. Press <Space> to talk to people."
  PRINT "Good luck!"
  PRINT "(Press <Esc>.)"
  PCOPY 0, 1
  WHILE INKEY$ !== ESC$
  WEND
END SUB

SUB DrawObj (Image() AS INTEGER, xlimit AS INTEGER, ylimit AS INTEGER, x AS INTEGER, y AS INTEGER, position$)

for (let yp = 0; yp <= ylimit; yp++) {
  for (let xp = 0; xp <= xlimit; xp++) {
    switch (position$) {
    case "UR": pixel = Image%(xp, yp)
    case "UL": pixel = Image%(-xp + xlimit, yp)
    case "DL": pixel = Image%(xp, -yp + ylimit)
    case "DR": pixel = Image%(-xp + xlimit, -yp + ylimit)
    case "VL": pixel = Image%(-yp + ylimit, -xp + xlimit)
    case "VR": pixel = Image%(-yp + ylimit, xp)
    case "HR": pixel = Image%(yp, -xp + xlimit)
    case "HL": pixel = Image%(yp, xp)
    }
    if (pixel = -2) { pixel = POINT(xp + x, yp + y) + 1; }
    if (pixel = 16) { pixel = 0; }
    if (pixel !== -1) { PSET (xp + x, yp + y), pixel; }
  }
}

END SUB
// */

function FlipBlocks (block) {
    switch (block) {
        case -4: return 4;
        case 4: return -4;
        default: return block;
    }
}

/*
SUB Game
  Guy.Health = 10
  Guy.MaxHp = 10
  Guy.AP = 2
  Guy.DP = 1
  Guy.x = 160
  Guy.y = 99
  Guy.Mvmnt = "DN"
  Guy.JTime = 25
  Guy.Direc = "UR"
  Guy.Status = "GOOD"

1
if (WorldsChecked >= NoOfLevels) { Warp = 0: WorldsChecked = 0; }

  PlayLevel screenMap1%(), "LEVEL 1 Beware of Lonely Coins", ""
  PlayLevel screenMap2%(), "LEVEL 2 Keys are Immortal", ""
  PlayLevel screenMap3%(), "LEVEL 3 Leaping Lions Distrust Green", ""
  PlayLevel screenMap4%(), "LEVEL 4 Eyes are Wiser than Coins", ""
  PlayLevel screenMap5%(), "LEVEL 5 What Goes Down Must Come Up", ""
  PlayLevel screenMap6%(), "LEVEL 6 The Bottomless Pit", ""
  PlayLevel screenMap7%(), "LEVEL 7 Goblins Eat Coins", ""
  PlayLevel screenMap8%(), "LEVEL 8 The Impossible Box", ""

  if (ADMISSION = 1) {
    PlayLevel BonusLevel%(), "BONUS LEVEL!!!", ""
    ADMISSION = 0
  }

  PlayLevel screenMap9%(), "LEVEL 9 Strangers Give Good Advice", ""
  PlayLevel screenMap10%(), "LEVEL 10 Statues Never Die or Kill", ""
  PlayLevel screenMap11%(), "LEVEL 11 Just Wait", ""

if (Guy.Status = "GONE") { GOTO 2; }
if (Warp = 1) { GOTO 1; }

COLOR 15
PRINT " YOU WINZ! Until I makes another level.  Press <Esc>."
PCOPY 0, 1
DO
LOOP WHILE INKEY$ !== ESC$
2 SCREEN 9, 0, 0, 1
  ON KEY(11) GOSUB MenuUp
  ON KEY(14) GOSUB MenuDown
  KEY(11) ON
  KEY(14) ON

END SUB

SUB GameOver
  DIM x AS INTEGER, y AS INTEGER, a AS INTEGER, B AS INTEGER

  x = 170
  y = 100
  a = 150
  B = 100

  OUT &H3C8, 0
  OUT &H3C9, 13
  OUT &H3C9, 13
  OUT &H3C9, 63

  DO

    RANDOMIZE TIMER

    CLS

    CIRCLE (100, 55), 4, 15
      PAINT (100, 55), 15, 15
    CIRCLE (10, 155), 8, 15
      PAINT (10, 155), 15, 15
    CIRCLE (300, 30), 5, 15
      PAINT (300, 30), 15, 15
    CIRCLE (105, 100), 10, 15
      PAINT (105, 100), 15, 15
    CIRCLE (270, 110), 15, 15
      PAINT (270, 110), 15, 15
    CIRCLE (195, 70), 13, 15
      PAINT (195, 70), 15, 15
    CIRCLE (160, 180), 20, 15
      PAINT (160, 180), 15, 15

    COLOR 4
    PRINT "Sorry, you died. Press <Esc>."
    LOCATE 13, 13
    PRINT "GAME       OVER"

    DrawObj GuyImage%(), 10, 10, x, y, "UR"
    DrawObj Handimage%(), 3, 3, x - 2, y + 4, "UR"
    DrawObj Handimage%(), 3, 3, x + 9, y + 4, "UR"
    CIRCLE (x + 4, y - 1), 4, 14

    DrawObj GuyImage%(), 10, 10, a, B, "UL"
    DrawObj Handimage%(), 3, 3, a - 2, B + 4, "UR"
    DrawObj Handimage%(), 3, 3, a + 9, B + 4, "UR"
    CIRCLE (a + 5, B - 1), 4, 14

    PCOPY 0, 1

    xDirecY = INT(RND * 3)
    aDirecB = INT(RND * 3)

    switch (xDirecY) {              'random directions
      case 0: x = x + 5; break;
      case 1: x = x - 5; break;
      case 2: y = y - 5; break;
    }

    switch (aDirecB) {
      case 0: a = a + 5; break;
      case 1: a = a - 5; break;
      case 2: B = B - 5; break;
    }

    if (a > XMAX) { a = 0; }        'world-wrap
    if (a < 0) { a = XMAX; }
    if (B < 0) { B = YMAX; GoneUp = GoneUp + 1; }

    if (x > XMAX) { x = 0; }
    if (x < 0) { x = XMAX; }
    if (y < 0) { y = YMAX; GoneUp = GoneUp + 1; }

    if (INKEY$ = ESC$) {
      Guy.Status = "GONE"
      for (let SerialNumber = 1; SerialNumber <= 10; SerialNumber++) {
        Enemies(SerialNumber).Status = "GONE"
      }
      EXIT SUB
    }

    LOOP WHILE GoneUp < 20
    x = 0
    y = YMAX / 2
    DIM Ex AS INTEGER
    DIM Ey AS INTEGER
    Ex = -10
    Ey = YMAX / 2
    DIM HisDirec AS STRING * 2
    HisDirec = "UR"
    COMMANDSTRING1$ = "RRRRRRRRRRRRRRRRRRRRRRRRRR        LLLL    R  L UUDD LL"
    COMMANDSTRING2$ = "RRRRRRRRR   UDHUDHUDH UUUUUUDDDDDDDDDDDDDDDDDDDDDDDDDX"
    COMMANDSTRING$ = COMMANDSTRING1$ + COMMANDSTRING2$
    ECMMANDSTRING1$ = "RRRRRRRRRRRRRRRRRRRRRRRRRR   DDDD LLLL UUUR  LD     LL"
    ECMMANDSTRING2$ = "RRRRRRRRR   LL   UURRR             UDUDUDUDUDUDUDUDUD "
    ECMMANDSTRING$ = ECMMANDSTRING1$ + ECMMANDSTRING2$
    DO
      if (Place < LEN(COMMANDSTRING$)) { Place = Place + 1; }
      CLS
      LOCATE 1, 15: COLOR 4: PRINT "EPIC FAIL"
      if (MID$(COMMANDSTRING$, Place, 1) = "H") {
        LOCATE 12, 15: PRINT "HELP!!!"
      }
      DrawObj GuyImage%(), 10, 10, x, y, HisDirec
      DrawObj Goblinimage%(), 9, 9, Ex, Ey, "UR"
      if (LEFT$(HisDirec, 1) = "U" || LEFT$(HisDirec, 1) = "D") {
        DrawObj Handimage%(), 3, 3, x - 2, y + 4, "UR"
        DrawObj Handimage%(), 3, 3, x + 9, y + 4, "UR"
      } else {
        DrawObj Handimage%(), 3, 3, x + 4, y - 2, "UR"
        DrawObj Handimage%(), 3, 3, x + 4, y + 9, "UR"
      }

      if (y <= (YMAX / 2) + 10) {
        CIRCLE (x + 4, y - 1), 4, 14
      } else {
        CIRCLE (x, (YMAX / 2) + 10), 4, 14
      }

      DrawObj LCloudimage%(), 9, 9, 0, (YMAX / 2) + 10, "UR"
      for (let x0 = 9; x0 <= XMAX - 19; x0 += 10) {
        DrawObj MCloudimage%(), 9, 9, INT(x0), (YMAX / 2) + 10, "UR"
      }
      DrawObj RCloudimage%(), 9, 9, XMAX - 11, (YMAX / 2) + 10, "UR"

      PCOPY 0, 1


      switch (MID$(COMMANDSTRING$, Place, 1)) {
      case "R":
        x = x + 5
        MID$(HisDirec, 2, 1) = "R"
      case "L":
        x = x - 5
        MID$(HisDirec, 2, 1) = "L"
      case "U":
        y = y - 5
        MID$(HisDirec, 1, 1) = "U"
      case "D":
        y = y + 5
        HisDirec = Spin$(HisDirec)
      case " ":
        MID$(HisDirec, 1, 1) = "U"
      case "X":
        EXIT DO
      }

      switch (MID$(ECMMANDSTRING$, Place, 1)) {
      case "R":
        Ex = Ex + 5
      case "L":
        Ex = Ex - 5
      case "U":
        Ey = Ey - 5
      case "D":
        Ey = Ey + 5
      }

      if (INKEY$ = ESC$) {
        Guy.Status = "GONE"
        for (let SerialNumber = 1; SerialNumber <= 10; SerialNumber += 1) {
          Enemies(SerialNumber).Status = "GONE"
        }
        EXIT SUB
      }

    LOOP
Guy.Status = "GONE"
for (let SerialNumber = 1; SerialNumber <= 10; SerialNumber += 1) {
  Enemies(SerialNumber).Status = "GONE"
}

END SUB

SUB LBInfo (Choice$)
CLS
PRINT "Use Keys F1-F10 to make platforms, keys, keyholes and coins."
PRINT "Use [ and ] to make portals. I and i make eyes."
PRINT "Use a and l to make LevelUps. Use 1-9 to make enemies."
PRINT "Press the Spacebar to add the object."
PRINT "Press Shift+S to play level, then Ctrl+S to"
PRINT "save a level, and F12 to load a level."
PRINT "Press BackSpace to delete all of the level info."
PRINT "Currently selected:"; Choice$
SLEEP
END SUB

SUB LevelBuilder
SCREEN 12
  for (let x0 = 0; x0 <= 31; x0 += 1) {
    for (let y0 = 0; y0 <= 19; y0 += 1) {
      screenMap[x0][y0] = 0
    }
  }
  CLS
  PRINT "Select a template."
  PRINT "(0) Blank level"
  PRINT "(1) Level w/ Floor"
  PRINT "(2) Build off of other level"
  INPUT "Which one"; Template
  switch (Template) {
  case 1
    for (let x0 = 0; x0 <= 31; x0 += 1) {
      screenMap[x0][19] = 1
    }
  case 2
    INPUT "File Name"; FileName$
    FileName$ = UCASE$(FileName$)
    if (RIGHT$(FileName$, 4) !== ".LVL") { FileName$ = FileName$ + ".LVL"; }
    OPEN "C:/BASIC/GAME/CUSTOM~1/" + FileName$ FOR RANDOM AS #1 LEN = LEN(screenMap)
      RecordNumber = 1
      for (let x0 = 0; x0 <= 31; x0 += 1) {
        for (let y0 = 0; y0 <= 19; y0 += 1) {
          GET #1, RecordNumber, screenMap[x0][y0]
          if (screenMap[x0][y0] = -1) { CoinMax = CoinMax + 1; }
          RecordNumber = RecordNumber + 1
        }
      }
    CLOSE #1
  }

SCREEN 7, 0, 0, 1
  KEY(16) OFF
  CoinMax = 0
  ScreenX = 15
  ScreenY = 9
  Choice$ = "Platform"
  Choice = 1
  GDirec$ = "UR"

  DO
    CLS

    Move$ = INKEY$
    switch (Move$) {
      case RGT$: ScreenX = ScreenX + 1: GDirec$ = "UR"
      case LFT$: ScreenX = ScreenX - 1: GDirec$ = "UL"
      case UP$: ScreenY = ScreenY - 1
      case DN$: ScreenY = ScreenY + 1
      case CHR$(8):
      for (let x0 = 0; x0 <= 31; x0 += 1) {
        for (let y0 = 0; y0 <= 19; y0 += 1) {
          screenMap[x0][y0] = 0
        }
      }
      case "i": Choice$ = "Sealed Eye": Choice = 3
      case "I": Choice$ = "Eye": Choice = -10
      case "[": Choice$ = "Portal �": Choice = -11
      case "]": Choice$ = "Portal �": Choice = -12
      case "1": Choice$ = "Goblin": Choice = 11
      case "2": Choice$ = "Raven": Choice = 12
      case "3": Choice$ = "Dragon": Choice = 13
      case "4": Choice$ = "Winged Statue": Choice = 14
      case "5": Choice$ = "Snake": Choice = 15
      case "6": Choice$ = "Stormy": Choice = 16
      case "7": Choice$ = "Ghost": Choice = 17
      case "w": Choice$ = "Wiseman": Choice = 22
      case "l": Choice$ = "LifeUp!": Choice = -13
      case "a": Choice$ = "AttackUp!": Choice = -14
      case "+": Choice$ = "Positive Block": Choice = 4
      case "-": Choice$ = "Negative Block": Choice = -4
      case F1$: Choice$ = "Platform": Choice = 1
      case F2$: Choice$ = "Sealed Platform": Choice = -5
      case F3$: Choice$ = "False Platform": Choice = -9
      case F4$: Choice$ = "Hidden Platform": Choice = 2
      case F5$: Choice$ = "Key": Choice = -20
      case F6$: Choice$ = "Sealed Key": Choice = -2
      case F7$: Choice$ = "Keyhole": Choice = -3
      case F8$: Choice$ = "Sealed Keyhole": Choice = -6
      case F9$: Choice$ = "Coin": Choice = -1
      case F10$:  Choice$ = "Delete": Choice = 0
      case "S":
        for (let y0 = 0; y0 <= 19; y0 += 1) {
          for (let x0 = 0; x0 <= 31; x0 += 1) {
            if (screenMap[x0][y0] = -3 || screenMap[x0][y0] = -20 || screenMap[x0][y0] = -6 || screenMap[x0][y0] = -2) {
              Req = Req + 1
            }
            if (screenMap[x0][y0] = -1) { CoinMax = CoinMax + 1; }
          }
        }
        if (Req < 2) {
          PRINT "Need keyhole and key."
          CoinMax = 0
          PCOPY 0, 1
          SLEEP
        } else {
          Guy.x = TrueX
          Guy.y = TrueY
          Coins = 0
          PlayLevel screenMap(), "CUSTOM LEVEL", ""
          Req = 0
        }
      case F11$:
      case ESC$: EXIT DO
      case SPC$:
        for (let y0 = 0; y0 <= 19; y0 += 1) {
          for (let x0 = 0; x0 <= 31; x0 += 1) {
            if ((Choice$ = "Key" || Choice$ = "Sealed Key") && (screenMap[x0][y0] = -20 || screenMap[x0][y0] = -2)) { screenMap[x0][y0] = 0; }
            if ((Choice$ = "Keyhole" || Choice$ = "Sealed Keyhole") && (screenMap[x0][y0] = -6 || screenMap[x0][y0] = -3)) { screenMap[x0][y0] = 0; }
            if (Choice = -11 && screenMap[x0][y0] = -11) { screenMap[x0][y0] = 0; }
            if (Choice = -12 && screenMap[x0][y0] = -12) { screenMap[x0][y0] = 0; }
          }
        }
        screenMap[ScreenX][ScreenY] = Choice
    }

    if (Move$ = ENTR$) {
      EnterCount = EnterCount + 1
    } else {
      EnterCount = 0
    }
    if (EnterCount >= 3) { LBInfo Choice$; }

    if (ScreenX > 31) { ScreenX = 0; }
    if (ScreenX < 0) { ScreenX = 31; }
    if (ScreenY > 19) { ScreenY = 0; }
    if (ScreenY < 0) { ScreenY = 19; }

    TrueX = ScreenX * 10
    TrueY = (ScreenY * 10) - 1

    PRINT Choice$

    for (let y0 = 0; y0 <= 19; y0 += 1) {
      for (let x0 = 0; x0 <= 31; x0 += 1) {
        switch (screenMap[x0][y0]) {
        case 1: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF
        case 2: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, B
        case 4: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 1, BF
        case -4: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 4, BF
        case -9: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 4, B
        case -5: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 1, B
        case -1:
          CIRCLE ((x0 * 10) + 5, (y0 * 10) + 5), 5, 6
          PAINT ((x0 * 10) + 5, (y0 * 10) + 5), 14, 6
        case -3: DrawObj Keyholeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        case -6: DrawObj Keyholeimage%(), 9, 9, x0 * 10, y0 * 10, "DL"
        case -20: DrawObj Keyimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        case IS > 20:
          DrawObj GuyImage%(), 10, 10, x0 * 10, y0 * 10, "UR"
          DrawObj Handimage%(), 3, 3, (x0 * 10) - 2, (y0 * 10) + 4, "UR"
          DrawObj Handimage%(), 3, 3, (x0 * 10) + 9, (y0 * 10) + 4, "UR"
        case -2: DrawObj Keyimage%(), 9, 9, x0 * 10, y0 * 10, "DL"
        case -10: DrawObj Eyeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        case 3: DrawObj Eyeimage%(), 9, 9, x0 * 10, y0 * 10, "VR"
        case -11: DrawObj Portalimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        case -12: DrawObj Portalimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        case 11: DrawObj Goblinimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        case 12: DrawObj Ravenimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case 13: DrawObj Dragonimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case 14: DrawObj WingedStatueimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case 15: DrawObj Snakeimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case 16: DrawObj Stormyimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case 17: DrawObj Ghostimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case -13: DrawObj LifeUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        case -14: DrawObj AttackUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        }
      }
    }

    DrawObj GuyImage%(), 10, 10, INT(TrueX), INT(TrueY), GDirec$
    DrawObj Handimage%(), 3, 3, TrueX - 2, TrueY + 4, "UR"
    DrawObj Handimage%(), 3, 3, TrueX + 9, TrueY + 4, "UR"

    PCOPY 0, 1
  LOOP
  SCREEN 9, 0, 0, 1
  ON KEY(11) GOSUB MenuUp
  ON KEY(14) GOSUB MenuDown
  KEY(11) ON
  KEY(14) ON
  KEY(16) ON
END SUB

SUB MainMenu
Opt1 = 8
Opt2 = 8
Opt3 = 8
Opt4 = 8
GlovePos = 200

DO
  SCREEN 9, 0, 0, 1
  ON KEY(11) GOSUB MenuUp
  ON KEY(14) GOSUB MenuDown
  KEY(11) ON
  KEY(14) ON

  Move$ = INKEY$
  switch (Move$) {
  case ENTR$:
    if (Choice = 1) { KEY(11) OFF: KEY(14) OFF: Game; }
    if (Choice = 2) { Directions; }
    if (Choice = 3) { LevelBuilder; }
    if (Choice = 4) {
      GOSUB Load
        ON KEY(11) GOSUB MenuUp
        ON KEY(14) GOSUB MenuDown
        KEY(11) ON
        KEY(14) ON
        SCREEN 9, 0, 0, 1
    }
    if (Choice = 5) { END; }
    if (Choice = 6) { RecordDemo; }
  }
  if (GlovePos > 199 && GlovePos < 210) { Choice = 1; }
  if (GlovePos > 220 && GlovePos < 230) { Choice = 2; }
  if (GlovePos > 250 && GlovePos < 260) { Choice = 3; }
  if (GlovePos > 280 && GlovePos < 290) { Choice = 4; }
  if (GlovePos > 300 && GlovePos < 310) { Choice = 5; }
  if (GlovePos > 320 && GlovePos < 330) { Choice = 6; }
  switch (Choice) {
  case 1: Opt1 = 15: Opt2 = 8: Opt3 = 8: Opt4 = 8: Opt5 = 8: Opt6 = 8
  case 2: Opt1 = 8: Opt2 = 15: Opt3 = 8: Opt4 = 8: Opt5 = 8: Opt6 = 8
  case 3: Opt1 = 8: Opt2 = 8: Opt3 = 15: Opt4 = 8: Opt5 = 8: Opt6 = 8
  case 4: Opt1 = 8: Opt2 = 8: Opt3 = 8: Opt4 = 15: Opt5 = 8: Opt6 = 8
  case 5: Opt1 = 8: Opt2 = 8: Opt3 = 8: Opt4 = 8: Opt5 = 15: Opt6 = 8
  case 6: Opt1 = 8: Opt2 = 8: Opt3 = 8: Opt4 = 8: Opt5 = 8: Opt6 = 15
  }
  CLS
  COLOR 15
  PRINT "�����������        ��          ���       ���    ���������"
  PRINT "��                ����         ����     ����    ��"
  PRINT "��               ��  ��        �� ��   �� ��    ��"
  PRINT "��              ��    ��      ��  ��� ���  ��   ��������"
  PRINT "��     ����    ����������     ��   �� ��   ��   ��"
  PRINT "��       ��   ���      ���   ��     ���     ��  ��"
  PRINT "��       ��  ���        ���  ��      �      ��  ��"
  PRINT "�����������  ��          ��  ��             ��  ���������.BAS "
  PRINT
  PRINT
  PRINT
  PRINT "By Christian Gorski"
  PRINT
  PRINT
  COLOR Opt1
  PRINT "   PLAY GAME"
  PRINT
  COLOR Opt2
  PRINT "   DIRECTIONS"
  PRINT
  COLOR Opt3
  PRINT "   GO TO LEVELBUILDER"
  PRINT
  COLOR Opt4
  PRINT "   LOAD CUSTOM LEVEL"
  PRINT
  COLOR Opt5
  PRINT "   QUIT"
  COLOR Opt6
  DrawObj Gloveimage%(), 12, 9, 5, GlovePos, "UR"
  PCOPY 0, 1
  DemoTimer = DemoTimer + 1

  if (DemoTimer = 400) { PlayDemo "DEMO2.DMO", screenMap2%(); }
  if (DemoTimer = 800) { PlayDemo "DEMO3.DMO", screenMap3%(); }
  if (DemoTimer = 1200) { PlayDemo "DEMO5.DMO", screenMap5%(): DemoTimer = 0; }

LOOP
Load:
        SCREEN 12
        INPUT "FileName"; FileName$
        SCREEN 9, 0, 0, 1
        Guy.x = 160
        Guy.y = 99
        Guy.Status = "GOOD"
        Guy.MaxHp = 10
        Guy.Health = 10
        Guy.Direc = "UR"
        Guy.AP = 2
        Guy.DP = 1
        CoinMax = 0
        FileName$ = UCASE$(FileName$)
        if (RIGHT$(FileName$, 4) !== ".LVL") { FileName$ = FileName$ + ".LVL"; }
        OPEN "C:/BASIC/GAME/CUSTOM~1/" + FileName$ FOR RANDOM AS #1 LEN = LEN(screenMap)
          RecordNumber = 1
          for (let x0 = 0; x0 <= 31; x0 += 1) {
            for (let y0 = 0; y0 <= 19; y0 += 1) {
              GET #1, RecordNumber, screenMap[x0][y0]
              if (screenMap[x0][y0] = -1) { CoinMax = CoinMax + 1; }
              RecordNumber = RecordNumber + 1
            }
          }
        CLOSE #1
        PRINT "LOADED": PCOPY 0, 1
        SLEEP
        PlayLevel screenMap(), "CUSTOM LEVEL", ""
        RETURN

END SUB

SUB Pause
  KEY(12) OFF
  KEY(13) OFF
  KEY(14) OFF
  KEY(11) OFF
  GuyX = 160
  GuyY = 100
  GDirec$ = "UR"
  DO

    CLS

    switch (INKEY$) {
      case RGT$: GuyX = GuyX + 5: GDirec$ = "UR"
      case LFT$: GuyX = GuyX - 5: GDirec$ = "UL"
      case UP$: GuyY = GuyY - 5
      case DN$: GuyY = GuyY + 5
      case SPC$:
        if (Message$ = " Go to LevelBuilder.") { BuildLevel = 1: EXIT DO; }
        if (Message$ = " Unpause w/ Spacebar.") { EXIT DO; }
        if (GuyX >= Guy.x && GuyX < Guy.x + 11 && GuyY >= Guy.y && GuyY < Guy.y + 11) {
           Warp$ = WhichWorld$(1)
        }
      case ENTR$:
        if (Warp$ !== "") {
          Warp = 1
          World$ = Warp$
          EXIT DO
        }
    }

    if (GuyX > 30 && GuyX < 70 && GuyY > 90 && GuyY < 130) {
      Message$ = " Unpause w/ Spacebar."
    } else if (GuyX > 270 && GuyX < 310 && GuyY > 90 && GuyY < 130) {
      Message$ = " Go to LevelBuilder."
    } else {
      Message$ = ""
    }

    if (GuyX >= Guy.x && GuyX < Guy.x + 11 && GuyY >= Guy.y && GuyY < Guy.y + 11) {
      Message$ = Warp$
    }


    if (GuyX > XMAX) { GuyX = 0; }
    if (GuyX < 0) { GuyX = XMAX; }
    if (GuyY > YMAX) { GuyY = 0; }
    if (GuyY < 0) { GuyY = YMAX; }

    'draw all de crap

    COLOR 15
    PRINT "PAUSED"; Message$

    'boxes
    LINE (30, 90)-(70, 130), 3, BF
    LINE (270, 90)-(310, 130), 3, BF

    'guy
    DrawObj GuyImage%(), 10, 10, INT(GuyX), INT(GuyY), GDirec$
    DrawObj Handimage%(), 3, 3, GuyX - 2, GuyY + 4, "UR"
    DrawObj Handimage%(), 3, 3, GuyX + 9, GuyY + 4, "UR"

    'shift
    ShiftColor INT(Guy.x), INT(Guy.y), 11, 11
    PCOPY 0, 1

  LOOP

  KEY(12) ON
  KEY(13) ON
  KEY(14) ON
  KEY(11) ON

END SUB

SUB PlayDemo (FileName$, screenMap())
  FileName$ = UCASE$(FileName$)
  if (RIGHT$(FileName$, 4) !== ".DMO") { FileName$ = FileName$ + ".DMO"; }
  SCREEN 7, 0, 0, 1

  OPEN "C:/BASIC/GAME/DEMOS/" + FileName$ FOR RANDOM AS #1 LEN = 210
    RecordNumber = 1
    for (let Time = 1; Time <= 200; Time += 1) {
      GET #1, RecordNumber, DemoGuy(Time)
      RecordNumber = RecordNumber + 1
    }
  CLOSE #1
  Guy = DemoGuy(1)
  PlayLevel screenMap(), "DEMO", "DEMO"
END SUB

SUB PlayLevel (LescreenMap(), Message$, Demo$)
SCREEN 7, 0, 0, 1
SharedMessage$ = Message$
YouShouldGo = 0
if (Guy.Status = "GONE") { EXIT SUB; }
if (LCASE$(Message$) = LCASE$(World$)) {
  Warp = 0
  WorldsChecked = 0
} else if (Warp = 1) {
  WorldsChecked = WorldsChecked + 1
}

ON KEY(13) GOSUB LevelRight
ON KEY(12) GOSUB LevelLeft
ON KEY(11) GOSUB LevelJump
ON KEY(14) GOSUB Down
ON KEY(15) GOSUB Save
ON KEY(16) GOSUB Space
ON KEY(17) GOSUB Restart
DoorX = -1
DoorY = -1

Guy.Health = 10
if (Demo$ !== "DEMO") {
  KEY(15) ON
  KEY(16) ON
  KEY(17) ON
  KEY(11) ON 'up
  KEY(12) ON 'left
  KEY(13) ON 'right
  KEY(14) ON 'down
} else {
  KEY(15) OFF
  KEY(16) OFF
  KEY(17) OFF
  KEY(11) OFF'up
  KEY(12) OFF'left
  KEY(13) OFF'right
  KEY(14) OFF'down
}
Coins = 0

for (let SerNo = 1; SerNo <= 10; SerNo += 1) {
  Enemies[SerNo].Status = "GONE"
}

SerNo = 0

for (let y0 = 0; y0 <= 19; y0 += 1) {
  for (let x0 = 0; x0 <= 31; x0 += 1) {
    screenMap[x0][y0] = LescreenMap[x0][y0]
    if (screenMap[x0][y0] > 10 && screenMap[x0][y0] <= 20 && SerNo < 15) {
      EnemyRace = screenMap[x0][y0] - 10
      screenMap[x0][y0] = 0
      SerNo = SerNo + 1
      switch (EnemyRace) {
      case 1
        Enemies[SerNo] = GoblinTemplate
      case 2
        Enemies[SerNo] = RavenTemplate
      case 3
        if (SerNo < 15) {
          Enemies[SerNo] = DragonTemplate
          Enemies[SerNo].x = x0 * 10
          Enemies[SerNo].y = y0 * 10
          SerNo = SerNo + 1
          Enemies[SerNo] = NoOneTemplate
        else Enemies[SerNo] = NoOneTemplate
        }
      case 4
        Enemies[SerNo] = WingedStatueTemplate
      case 5
        Enemies[SerNo] = SnakeTemplate
      case 6
        if (SerNo < 15) {
          Enemies[SerNo] = StormyTemplate
          Enemies[SerNo].x = x0 * 10
          Enemies[SerNo].y = y0 * 10
          SerNo = SerNo + 1
          Enemies[SerNo] = NoOneTemplate
        else Enemies[SerNo] = NoOneTemplate
        }
      case 7
        Enemies[SerNo] = GhostTemplate
      }
      Enemies[SerNo].x = x0 * 10
      Enemies[SerNo].y = y0 * 10
      Enemies[SerNo].PlaceHold.x = x0
      Enemies[SerNo].PlaceHold.y = y0
    }
  }
}

CoinMax = DetermineCoin(LescreenMap())
WiseMessage$ = ""
SharedWiseMessage$ = ""

for (let y0 = 0; y0 <= 19; y0 += 1) {
  for (let x0 = 0; x0 <= 31; x0 += 1) {
    if (screenMap(x0, y0) = -11) { PortalAlpha.x = x0: PortalAlpha.y = y0; }
    if (screenMap[x0][y0] = -12) { PortalBeta.x = x0: PortalBeta.y = y0; }
  }
}

Time = 0
'-----------------------------------------------------------------------------
DO
if (Warp = 1) { KEY(17) OFF: EXIT DO; }
if (Guy.Status = "GONE") { EXIT SUB; }
if (BuildLevel = 1) {
  BuildLevel = 0
  KEY(11) OFF
  KEY(12) OFF
  KEY(13) OFF
  KEY(14) OFF
  LevelBuilder
  KEY(11) ON
  KEY(12) ON
  KEY(13) ON
  KEY(14) ON
}
Talk = SharedTalk
WiseMessage$ = SharedWiseMessage$
CLS
PRINT " $"; Coins; CHR$(3); STR$(Guy.Health) + "/" + STR$(Guy.MaxHp); CHR$(6); Guy.AP; CHR$(5); Guy.DP
PRINT SharedMessage$

0 for (let y0 = 19; y0 <= 0; y0 += 1) { STEP -1
  for (let x0 = 0; x0 <= 31; x0 += 1) {
    switch (screenMap[x0][y0]) {
    case 1, 3:
      LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF
    case -9:
      if (screenMap[Guy.ScreenX][Guy.ScreenY] !== -10) { LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF; }
    case 2
      if (screenMap[Guy.ScreenX][Guy.ScreenY] = -10) { LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF; }
    case 4
      LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 10), 1, BF
    case -4:
      LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 10), 4, BF
    case -1:
      CIRCLE ((x0 * 10) + 5, (y0 * 10) + 5), 5, 6
      PAINT ((x0 * 10) + 5, (y0 * 10) + 5), 14, 6
    case IS = -3:
      DrawObj Keyholeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
    case -31:
      screenMap[x0][y0] = -11: screenMap[PortalBeta.x][PortalBeta.y + 1] = screenMap[PortalBeta.x][PortalBeta.y + 1] - 20
    case -32:
      screenMap[x0][y0] = -12: screenMap[PortalAlpha.x][PortalAlpha.y + 1] = screenMap[PortalAlpha.x][PortalAlpha.y + 1] - 20

    case IS <= -20:
      DrawObj Keyimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
      if (y0 < 19) {
        if (screenMap[x0][y0 + 1] <= 0) {
          screenMap[x0][y0 + 1] = screenMap[x0][y0 + 1] - 20: screenMap[x0][y0] = screenMap[x0][y0] + 20
        }

      } else if (screenMap[x0][0] <= 0) {
        screenMap[x0][y0] = screenMap[x0][y0] + 20: screenMap[x0][0] = screenMap[x0][0] - 20
      }

    case -7: DoorX = x0 * 10: DoorY = y0 * 10
    case -10:
      DrawObj Eyeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
    case -11, -12:
      DrawObj Portalimage%(), 9, 9, x0 * 10, y0 * 10, "UR"

    case IS > 20:
      if (x0 > Guy.ScreenX) { WiseDirec$ = "UL"; }
      if (x0 < Guy.ScreenX) { WiseDirec$ = "UR"; }
      DrawObj GuyImage%(), 10, 10, x0 * 10, (y0 * 10) - 1, WiseDirec$
      DrawObj Handimage%(), 3, 3, (x0 * 10) - 2, (y0 * 10) + 4, "UR"
      DrawObj Handimage%(), 3, 3, (x0 * 10) + 9, (y0 * 10) + 4, "UR"
    case -13:
      DrawObj LifeUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
    case -14:
      DrawObj AttackUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
    case -15:
      'LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 10), 3, BF
      'anchor

    }
    if (screenMap[x0][y0] = -23) { screenMap[x0][y0] = -7; }
  }
}

if (DoorX > -1 && DoorY > -1) { DrawObj Doorimage%(), 9, 9, INT(DoorX), INT(DoorY), "UR"; }
DrawObj GuyImage%(), 10, 10, INT(Guy.x), INT(Guy.y), Guy.Direc

if (LEFT$(Guy.Direc, 1) = "U" || LEFT$(Guy.Direc, 1) = "D") {
  DrawObj Handimage%(), 3, 3, Guy.x - 2, Guy.y + 4, "UR"
  DrawObj Handimage%(), 3, 3, Guy.x + 9, Guy.y + 4, "UR"
} else {
  DrawObj Handimage%(), 3, 3, Guy.x + 4, Guy.y - 2, "UR"
  DrawObj Handimage%(), 3, 3, Guy.x + 4, Guy.y + 9, "UR"
}

if (Time < 200) {
  if (Demo$ = "DEMO") { Time = Time + 1: Guy = DemoGuy(Time); }
  if (Demo$ = "RECORD") { Time = Time + 1: DemoGuy(Time) = Guy; }
} else if (Demo$ = "RECORD") { SaveDemo: EXIT DO
} else if (Demo$ = "DEMO") { EXIT DO
}

if (screenMap[Guy.ScreenX][Guy.ScreenY] = -1) { Coins = Coins + 1: screenMap[Guy.ScreenX][Guy.ScreenY] = 0; } 'get coin

if (screenMap[Guy.ScreenX][Guy.ScreenY] <= -20 && Demo$ !== "") {
  screenMap[Guy.ScreenX][Guy.ScreenY] = screenMap[Guy.ScreenX][Guy.ScreenY] + 20
  switch (RIGHT$(Guy.Direc, 1)) {
  case "R":
    if (Guy.ScreenX < 31) {
      screenMap[Guy.ScreenX + 1][Guy.ScreenY] = screenMap[Guy.ScreenX + 1][Guy.ScreenY] - 20
    }
  case "L":
    if (Guy.ScreenX > 0) {
      screenMap[Guy.ScreenX - 1][Guy.ScreenY] = screenMap[Guy.ScreenX - 1][Guy.ScreenY] - 20
    }
  }
}

if (screenMap[Guy.ScreenX][Guy.ScreenY] = -13) { Guy.MaxHp = Guy.MaxHp + 5: Guy.Health = Guy.MaxHp: screenMap[Guy.ScreenX][Guy.ScreenY] = 0: SharedWiseMessage$ = "MAX HP +5!!!": SharedTalk = 50; }
if (screenMap[Guy.ScreenX][Guy.ScreenY] = -14) { Guy.AP = Guy.AP + 3: screenMap[Guy.ScreenX][Guy.ScreenY] = 0: SharedWiseMessage$ = "Attack +3!!!": SharedTalk = 50; }

if (screenMap[Guy.ScreenX][Guy.ScreenY] = -11) {
  Guy.x = PortalBeta.x * 10
  Guy.y = (PortalBeta.y * 10) + 9
}
if (screenMap[Guy.ScreenX][Guy.ScreenY] = -12) {
  Guy.x = PortalAlpha.x * 10
  Guy.y = (PortalAlpha.y * 10) + 9
}


Guy.ScreenX = INT(Guy.x / 10)
Guy.ScreenY = INT((Guy.y + 1) / 10)



'jump
if (Demo$ !== "DEMO") {
  if (Move$ !== UP$ && Guy.Mvmnt = "UP") { NJTimer = NJTimer + 1:  else NJTimer = 0; }

  if ((NJTimer >= 10 && Guy.Mvmnt = "UP") || (Guy.Mvmnt = "UP" && Guy.JTime = 0)) {
    Guy.Mvmnt = "DN"
  }

  if (Guy.Mvmnt = "DN") {
    Guy.Direc = Spin$(Guy.Direc)
  }
}

if (Guy.ScreenY > 18) { GameOver: EXIT SUB; }

for (let SerialNo = 1; SerialNo <= SerNo; SerialNo += 1) {
  AI SerialNo, screenMap()
}

if (Demo$ !== "DEMO") {
  if (Guy.Mvmnt !== "UP") {
    if (((Guy.y - 1) / 10) >= 19) { Guy.y = Guy.y - 10; }
    if (Guy.x / 10 >= 31) { Guy.x = Guy.x - 10; }
    if (screenMap(Guy.ScreenX, Guy.ScreenY + 1) <= 0 && screenMap[INT((Guy.x + 5) / 10)][Guy.ScreenY + 1] <= 0) {
      if (Guy.ScreenY = (Guy.y + 1) / 10) {
        Guy.y = Guy.y + 10
      } else {
        Guy.y = Guy.y + 5
      }
      Guy.Mvmnt = "DN"
    else : Guy.JTime = 25
      Guy.Mvmnt = "DX"

      if (RIGHT$(Guy.Direc, 1) = "R") { Guy.Direc = "UR"; }
      if (RIGHT$(Guy.Direc, 1) = "L") { Guy.Direc = "UL"; }
    }
  }


  if (Guy.Mvmnt = "UP" && Guy.JTime > 0) {
    Guy.JTime = Guy.JTime - 5
  }
  if (Guy.JTime < 0) {
    Guy.JTime = Guy.JTime + 1
  }

  if (Guy.ScreenY !== (Guy.y + 1) / 10 && screenMap[Guy.ScreenX][Guy.ScreenY + 1] > 0 && Guy.Mvmnt !== "UP") { Guy.y = Guy.y - 5; }

  if (INKEY$ = ENTR$) {
    KEY(16) OFF
    Pause           'pause
    KEY(16) ON
    ON KEY(13) GOSUB LevelRight
    ON KEY(12) GOSUB LevelLeft
    ON KEY(11) GOSUB LevelJump
    ON KEY(14) GOSUB Down
    ON KEY(15) GOSUB Save
      for (let x0 = 0; x0 <= 31; x0 += 1) {
        for (let y0 = 0; y0 <= 19; y0 += 1) {
          screenMap[x0][y0] = LescreenMap[x0][y0]
        }
      }
  }
}
if (Coins = CoinMax) {
  for (let y0 = 0; y0 <= 19; y0 += 1) {
    for (let x0 = 0; x0 <= 31; x0 += 1) {
      if (screenMap[x0][y0] = -5) { screenMap[x0][y0] = 1; }
      if (screenMap[x0][y0] = -2) { screenMap[x0][y0] = -20; }
      if (screenMap[x0][y0] = -6) { screenMap[x0][y0] = -3; }
      if (screenMap[x0][y0] = 3) { screenMap[x0][y0] = -10; }
    }
  }
  Coins = 0
}


if (Guy.y / 10 > 18) { GameOver: EXIT DO; }

if (YouShouldGo = 1) { EXIT DO; }

if (Talk > 0) { Talk = Talk - 1: SharedTalk = SharedTalk - 1: PRINT WiseMessage$; }
if (SharedTalk = 0 && SharedWiseMessage$ = WiseMen(3).Speech) { ADMISSION = 1: EXIT DO; }

if (INKEY$ = ESC$) { Guy.Status = "GONE": EXIT SUB; }     'quit

PCOPY 0, 1
SOUND 0, 3 'anchor
LOOP
'-----------------------------------------------------------------------------
YouShouldGo = 0

END SUB

SUB RecordDemo
  SCREEN 12
  INPUT "FileName"; FileName$
  SCREEN 9, 0, 0, 1
  Guy.x = 160
  Guy.y = 99
  Guy.Status = "GOOD"
  Guy.MaxHp = 10
  Guy.Health = 10
  Guy.Direc = "UR"
  Guy.AP = 2
  Guy.DP = 1
  CoinMax = 0
  FileName$ = UCASE$(FileName$)
  if (RIGHT$(FileName$, 4) !== ".LVL") { FileName$ = FileName$ + ".LVL"; }
    OPEN "C:/BASIC/GAME/" + FileName$ FOR RANDOM AS #1 LEN = LEN(screenMap)
      RecordNumber = 1
      for (let x0 = 0; x0 <= 31; x0 += 1) {
        for (let y0 = 0; y0 <= 19; y0 += 1) {
          GET #1, RecordNumber, screenMap[x0][y0]
          if (screenMap[x0][y0] = -1) { CoinMax = CoinMax + 1; }
          RecordNumber = RecordNumber + 1
        }
      }
    CLOSE #1
    PRINT "LOADED": PCOPY 0, 1
    SLEEP
    PlayLevel screenMap(), "RECORDING", "RECORD"

END SUB

SUB SaveDemo
  SCREEN 12
  INPUT "Save Demo As"; FileName$
  FileName$ = UCASE$(FileName$)
  if (RIGHT$(FileName$, 4) !== ".DMO") { FileName$ = FileName$ + ".DMO"; }
  SCREEN 7, 0, 0, 1
  OPEN "C:/BASIC/GAME/DEMOS/" + FileName$ FOR RANDOM AS #1 LEN = 210
    RecordNumber = 1
    for (let Time = 1; Time <= 200; Time += 1) {
      PUT #1, RecordNumber, DemoGuy(Time)
      RecordNumber = RecordNumber + 1
    }
  CLOSE #1

  PRINT "SAVED": PCOPY 0, 1
  SLEEP

END SUB

SUB ShiftColor (Startx, Starty, XLength, YLength)
for (let y0 = Starty; y0 <= Starty; y0 += 1) { + YLength
  for (let x0 = Startx; x0 <= Startx; x0 += 1) { + XLength
    pixel = POINT(x0, y0) + 1

    if (pixel = 16) { pixel = 0; }

    PSET (x0, y0), pixel
  }
}
END SUB
// */

function Spin$(Direction) { // AS STRING
    let LeftDirec$ = LEFT$(Direction, 1)
    switch (LeftDirec$) {
        case "U":
            LeftDirec$ = "H";
            break;
        case "H":
            LeftDirec$ = "D";
            break;
        case "D":
            LeftDirec$ = "V";
            break;
        case "V":
            LeftDirec$ = "U";
            break;
    }

    Direction[1] = LeftDirec$;
    return Direction;
}

/*
FUNCTION WhichWorld$ (blah)
SCREEN 9
CLS
COLOR 15
PRINT "SPEAK!"
INPUT World$
WhichWorld$ = World$
SCREEN 7, 0, 0, 1
END FUNCTION
// */

const ZeroLimit = n => (n < 0) ? 0 : n

module.exports = {
    bitmapString,
    gloveImage,
    levelString,
    loadBitmapByName,
    loadLevelByName,
    transpose
};
