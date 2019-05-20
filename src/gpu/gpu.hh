#pragme once

#define VRAM_SIZE 41000
#define TILESET_SIZE 128
#define PALETTE_SIZE 4
#define PIXEL_CHANNELS 3

class GPU {
public:
    GPU();
    ~GPU();

    void reset();
    void step();
    void updateTile(int addr, int val);
    void renderScan();
    int readByte(int addr);
    void writeByte(int addr, int value);

protected:
    int _mode;
    int _modeclock;
    int _line;
    int _vram[VRAM_SIZE];
    int _tileset[TILESET_SIZE];
    int _scrollY;
    int _scrollX;
    int _bgmap;
    int _bgtile;
    int _switchbg;
    int _switchlcd;
    int _pal[PALETTE_SIZE][PIXEL_CHANNELS] = {
        { 255, 255, 255 },
        { 192, 192, 192 },
        { 96, 96, 96 },
        { 0, 0, 0 }
    };
};
