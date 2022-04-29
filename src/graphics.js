let canvas = null;
let ctx = null;

function grabCanvas(element) {
    canvas = element;
    ctx = canvas.getContext('2d');
}

function screen(mode) {
    // Blank out the screen
    // Re-map drawing functions per the resolution matching the screen mode

    // https://www.qbasic.net/en/reference/general/screen-modes.htm
    // SCREEN 7, 9, 12
    switch (mode) {
        case 7:
            // SCREEN 7: 320 x 200 graphics
            // 40 x 25 text format, 8 x 8 character box
            // Assignment of 16 colors to any of 16 attributes
            // If 64K EGA adapter memory, 2 video memory pages (0-1); otherwise, 8 pages (0-7)
            canvas.width = 320;
            canvas.height = 200;
            break;

        case 9:
            // SCREEN 9: 640 x 350 graphics
            // 80 x 25 or 80 x 43 text format, 8 x 14 or 8 x 8 character box
            // 16 colors assigned to 4 attributes (64K adapter memory), or 64 colors assigned to 16 attributes (more than 64K adapter memory)
            // If 64K EGA adapter memory, 1 video memory page (0); otherwise, 2 pages (0-1)
            canvas.width = 640;
            canvas.height = 350;
            break;

        case 12:
            // SCREEN 12
            // 640 x 480 graphics
            // 80 x 30 or 80 x 60 text format, 8 x 16 or 8 x 8 character box
            // Assignment of up to 256K colors to 16 attributes
            // 1 video memory page (0)
            canvas.width = 640;
            canvas.height = 480;
            break;
    }

    ctx.fillStyle('#000000');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function DrawObj(Image, xlimit, ylimit, x, y, position$) {
    for (let yp = 0; yp <= ylimit; yp++) {
        for (let xp = 0; xp <= xlimit; xp++) {
            let pixel = null;
            switch (position$) {
                case "UR":
                    pixel = Image[xp][yp];
                    break;
                case "UL":
                    pixel = Image[-xp + xlimit][yp];
                    break;
                case "DL":
                    pixel = Image[xp][-yp + ylimit];
                    break;
                case "DR":
                    pixel = Image[-xp + xlimit][-yp + ylimit];
                    break;
                case "VL":
                    pixel = Image[-yp + ylimit][-xp + xlimit];
                    break;
                case "VR":
                    pixel = Image[-yp + ylimit][xp];
                    break;
                case "HR":
                    pixel = Image[yp][-xp + xlimit];
                    break;
                case "HL":
                    pixel = Image[yp][xp];
                    break;
            }
            if (pixel === -2) { pixel = POINT(xp + x, yp + y) + 1; }
            if (pixel === 16) { pixel = 0; }
            if (pixel !== -1) { PSET(xp + x, yp + y, pixel); }
        }
    }
}

function PSET(x, y, c) {
    ctx.fillStyle(color(c));
    ctx.fillRect(x, y, 1, 1);
}

function color(c) {
    return [
        '#000000', // 0 - Black
        '#0000AA', // 1 - Blue
        '#00AA00', // 2 - Green
        '#00AAAA', // 3 - Cyan
        '#AA0000', // 4 - Red
        '#AA00AA', // 5 - Magenta
        '#AA5500', // 6 - Dark Yellow (Brown)
        '#AAAAAA', // 7 - Gray (Dark White)
        '#555555', // 8 - Dark Gray (Bright Black)
        '#5555FF', // 9 - Bright Blue
        '#55FF55', // 10 - Bright Green
        '#55FFFF', // 11 - Bright Cyan
        '#FF5555', // 12 - Bright Red
        '#FF55FF', // 13 - Bright Magenta
        '#FFFF55', // 14 - Yellow
        '#FFFFFF', // 15 - White
    ][c];
}
