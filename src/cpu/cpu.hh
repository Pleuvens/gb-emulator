#pragma once

#include "../clock/clock.hh"
#include "../registers/registers.hh"

class CPU {
public:
    CPU();
    ~CPU();

    void reset();
    void exec();
    void dispatcher();

    // Register Interface
    inline int get8BitRegister(REGISTER_8_BIT reg) { return _r.get8BitRegister(reg); }
    inline int get16BitRegister(REGISTER_16_BIT reg) { return _r.get16BitRegister(reg); }
    inline Clock getRegisterClock() { return _r.getClock(); }
    inline int getIme() { return _r.getIme(); }

    inline void set8BitRegister(REGISTER_8_BIT reg, int value) { _r.set8BitRegister(reg, value); }
    inline void set16BitRegister(REGISTER_16_BIT reg, int value) { _r.set16BitRegister(reg, value); }
    inline void setRegisterClock(int m, int t) { _r.setClock(m, t); }
    inline void setIme(int value) { _r.setIme(value); }

protected:
    Clock _clock;
    Registers _r;
    int _halt;
    int _stop;

    //map = []
    //cbmap = []
};
