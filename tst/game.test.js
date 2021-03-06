const game = require('../src/game');

describe('utilities', () => {
    it('can transpose', () => {
        expect(game.transpose([
            ['a1', 'a2'],
            ['b1', 'b2']
        ])).toEqual([
            ['a1', 'b1'],
            ['a2', 'b2']
        ]);
    });

    it('can load levels', async () => {
        expect(game.levelString(await game.loadLevelByName('LEVEL2'))).toEqual(
            [
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. SP SP SP SP SP SP SP SP .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. KH .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. PF PF FP FP FP FP PF .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. PF .. .. .. .. .. PF .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. 11 .. PF .. oO oO oO .. PF .. .. .. .. .. .. .. .. .. .. .. .. ..",
                "HP HP HP HP HP HP HP HP HP HP HP .. PF .. oO oO oO .. PF .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. PF .. oO oO oO .. PF .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. PF PF PF PF PF SP .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. PF .. .. SP .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. 11 .. .. HK .. FP .. oO .. .. .. .. .. .. .. .. .. .. .. .. .. ..",
                ".. .. .. .. .. .. .. .. .. .. HP HP PF PF PF PF PF PF PF .. .. .. HP HP HP HP .. .. .. .. .. .."
            ].join('\n'));
    });

    it('can load bitmaps', async () => {
        expect(game.bitmapString(await game.loadBitmapByName('LIFEUP'))).toEqual(
            [
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 15 15 15 -1 -1 15 15 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "15 4 4 4 15 15 4 4 4 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "15 4 4 4 4 0 4 4 4 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "15 4 4 4 0 0 0 4 4 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 15 4 4 4 0 4 4 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 15 4 4 4 4 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 15 4 4 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 15 15 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1",
                "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1"
            ].join('\n')
        );
    });

    it('has the glove properly flipped', () => {
        expect(game.bitmapString(game.gloveImage)).toEqual([
            "-1 -1 -1 8 8 8 -1 -1 -1 -1 -1 -1 -1",
            "-1 -1 -1 8 15 8 -1 -1 -1 -1 -1 -1 -1",
            "-1 -1 8 15 15 8 -1 -1 -1 -1 -1 -1 -1",
            "8 8 15 15 15 8 8 8 8 8 8 8 8",
            "8 15 15 15 15 15 15 15 15 15 15 15 8",
            "8 15 15 7 7 15 15 15 8 8 8 8 8",
            "8 15 15 15 15 15 15 15 8 -1 -1 -1 -1",
            "8 15 15 7 7 15 15 15 8 -1 -1 -1 -1",
            "8 8 15 15 15 15 15 15 8 -1 -1 -1 -1",
            "-1 -1 8 8 8 8 8 8 8 -1 -1 -1 -1"
        ].join('\n'));
    });
});
