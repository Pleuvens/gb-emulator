import CPU from '../cpu/cpu';

class GPU {

    constructor() {
        this._canvas = {};
        this._scrn = {};
        this._mode = 0;
        this._modeclock = 0;
        this._line = 0;
        this._vram = [];
        this._tileset = [];
        this._scrollY = 0;
        this._scrollX = 0;
        this._bgmap = 0;
        this._bgtile = 0;
        this._switchbg = 0;
        this._switchlcd = 0;
        this._pal = [];
    }

    reset = () => {
        let canvas = document.getElementById('screen');
        if (canvas !== undefined)
        {
            this._canvas = canvas.getContext('2d');
            this._scrn = this._canvas.createImageData(160, 144);

            for (let i = 0; i < 160 * 144 * 4; i++)
            {
                this._scrn.data[i] = 255;
            }

            this._canvas.putImageData(this._scrn, 0, 0);
        }

        this._mode = 0;
        this._modeclock = 0;
        this._line = 0;

        this._vram = [];

        this._tileset = [];
        for (let i = 0; i < 384; i++)
        {
            this._tileset[i] = [];
            for (let j = 0; j < 8; j++)
            {
                this._tileset[i][j] = [0, 0, 0, 0, 0, 0, 0, 0];
            }
        }
    }

    step = () => {
        this._modeclock += CPU.instance()._r.t;

        switch (this._mode) {
            // OAM read mode, scanline active
            case 2:
                if (this._modeclock >= 80)
                {
                    // Enter scanline mode 3
                    this._modeclock = 0;
                    this._mode = 3;
                }
                break;

            // VRAM read mode, scanline active
            // Treat end of mode 3 as end of scanline
            case 3:
                if (this._modeclock >= 172)
                {
                    // Enter hblank
                    this._modeclock = 0;
                    this._mode = 0;

                    // Write a scanline to the framebuffer
                    this.renderscan();
                }
                break;

            // HBlank
            // After the last hblank, push the screen data to canvas
            case 0:
                if (this._modeclock >= 204)
                {
                    this._modeclock = 0;
                    this._line += 1;

                    if (this._line === 143)
                    {
                        // Enter vblank
                        this._mode = 1;
                        this._canvas.putImageData(this._scrn, 0, 0);
                    } else {
                        this._mode = 2;
                    }
                }
                break;

            // Vblank (10 lines)
            case 1:
                if (this._modeclock >= 456)
                {
                    this._modeclock = 0;
                    this._line += 1;

                    if (this._line > 153)
                    {
                        // Restart scanning mode
                        this._mode = 2;
                        this._line = 0;
                    }
                }
                break;
        }
    }

    // Take a value written to vram, and updates the internal tile data set
    updatetile = (addr, val) => {
        // get the "base address" for this tile row
        addr &= 0x1FFE;

        // Work out which tile and row was updated
        let tile = (addr >> 4) & 511;
        let y = (addr >> 1) & 7;

        for (let x = 0; x < 8; x++)
        {
            let bitIndex = 1 << (7-x);

            this._tileset[tile][y][x] = (this._vram[addr] & bitIndex ? 1 : 0) + (this._vram[addr + 1] & bitIndex ? 2 : 0);
        }
    }

    renderscan = () => {
        // VRAM offset for tile map
        let mapOffset = this._bgmap ? 0x1C00 : 0x1800;

        // Which line of tiles to use in the map
        mapOffset += ((this._line + this._scrollY) & 255) >> 3;

        // Which tile to start with in the map line
        let lineOffset = this._scrollX >> 3;

        // Which line of pixels to use in the tiles
        let y = (this._line + this._scrollY) & 7;

        // Where is the tileline to start
        let x = this._scrollX & 7;

        // Where to render on the canvas
        let canvasOffset = this._line * 160 * 4;

        // Read tile index from the background map
        let tile = this._vram[mapOffset + lineOffset];

        // If the tile data set in use is #1, the
        // indices are signed; calculate a real tile offset
        if (this._bgtile === 1 && tile < 128)
            tile += 256;

        for (let i = 0; i < 160; i++)
        {
            // Re-map the tile pixel through the palette
            let colour = this._pal[this._tileset[tile][y][x]];

            // Plot the pixel to canvas
            this._scrn.data[canvasOffset] = colour[0];
            this._scrn.data[canvasOffset + 1] = colour[1];
            this._scrn.data[canvasOffset + 2] = colour[2];
            this._scrn.data[canvasOffset + 3] = colour[3];
            canvasOffset += 4;

            // When this tile ends, read another
            x += 1;
            if (x === 8)
            {
                x = 0;
                lineOffset = (lineOffset + 1) & 31;
                tile = this._vram[mapOffset + lineOffset];

                if (this._bgtile === 1 && tile < 128)
                    tile += 256;
            }
        }
    }

    rb = (addr) => {
        switch (addr) {

            // LCD Control
            case 0xFF40:
                return  (this._switchbg     ? 0x01 : 0x00) |
                        (this._bgmap        ? 0x08 : 0x00) |
                        (this._bgtile       ? 0x10 : 0x00) |
                        (this._switchlcd    ? 0x80 : 0x00);

            // Scroll Y
            case 0xFF42:
                return this._scrollY;
            // Scroll X
            case 0xFF43:
                return this._scrollX;
            // Current scanline
            case 0xFF44:
                return this._line;
        }
    }

    wb = (addr, value) => {
        switch (addr) {

            // LCD Control
            case 0xFF40:
                this._switchbg  = (value & 0x01) ? 1 : 0;
                this._bgmap     = (value & 0x08) ? 1 : 0;
                this._bgtile    = (value & 0x10) ? 1 : 0;
                this._switchlcd = (value & 0x80) ? 1 : 0;
                break;

            // Scroll Y
            case 0xFF42:
                this._scrollY = value;
                break;

            // Scroll X
            case 0xFF43:
                this._scrollX = value;
                break;

            // Background Palette
            case 0xFF47:
                for (let i = 0; i < 4; i++)
                {
                    switch ((value >> (i * 2)) & 3) {
                        case 0:
                            this._pal[i] = [255,255,255,255];
                            break;
                        case 1:
                            this._pal[i] = [192,192,192, 255];
                            break;
                        case 2:
                            this._pal[i] = [96,96,96,255];
                            break;
                        case 3:
                            this._pal[i] = [0,0,0,255];
                            break;
                    }
                }
                break;
        }
    }
};

const instance = new GPU();

export default instance;
