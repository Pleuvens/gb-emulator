class GPU {

    constructor() {
        this._canvas = {};
        this._scrn = {};
        this._mode = 0;
        this._modeclock = 0;
        this._line = 0;
        this._tileset = [];
    }

    static instance = () => {
        return this;
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

                    if (this._line == 143)
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

            this._tileset[tile][y][x] = (MemoryInterfacing.instance()._vram[addr] & bitIndex ? 1 : 0) + (MemoryInterfacing.instance()._vram[addr + 1] & bitIndex ? 2 : 0);
        }
    }

};

export default GPU;
