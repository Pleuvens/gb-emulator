#pragma once

#include "../clock/clock.hh"

enum REGISTER_8_BIT {
    REGISTER_8_BIT_A,
    REGISTER_8_BIT_B,
    REGISTER_8_BIT_C,
    REGISTER_8_BIT_D,
    REGISTER_8_BIT_E,
    REGISTER_8_BIT_H,
    REGISTER_8_BIT_L,
    REGISTER_8_BIT_F,
    REGISTER_8_BIT_COUNT
};

enum REGISTER_16_BIT {
    REGISTER_16_BIT_PC,
    REGISTER_16_BIT_SP,
    REGISTER_16_BIT_I,
    REGISTER_16_BIT_R,
    REGISTER_16_BIT_COUNT
};

class Registers {
public:
    Registers();
    ~Registers();

    void reset();

    inline int get8BitRegister(REGISTER_8_BIT reg) { return registers_8_bit[reg]; }
    inline int get16BitRegister(REGISTER_16_BIT reg) { return registers_16_bit[reg]; }
    inline Clock getClock() { return last_intr_clk; }
    inline int getIme() { return ime; }

    inline void set8BitRegister(REGISTER_8_BIT reg, int value) { registers_8_bit[reg] = value; }
    inline void set16BitRegister(REGISTER_16_BIT reg, int value) { registers_16_bit[reg] = value; }
    inline void setClock(int m, int t) { last_intr_clk.setM(m); last_intr_clk.setT(t); }
    inline void setIme(int value) { ime = value; }

protected:

    int     registers_8_bit[REGISTER_8_BIT_COUNT];
    int     registers_16_bit[REGISTER_16_BIT_COUNT];
    Clock   last_intr_clk;      // clock for last instruction
    int     ime;
};
