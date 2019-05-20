#include "../cpu/cpu.hh"

void LDrr_bb (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_bc (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(1, 4);
}

void LDrr_bd (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(1, 4);
}

void LDrr_be (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(1, 4);
}

void LDrr_bh (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(1, 4);
}

void LDrr_bl (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ba (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(1, 4);
}

void LDrr_cc (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_cb (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(1, 4);
}

void LDrr_cd (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ce (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ch (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(1, 4);
}

void LDrr_cl (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ca (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(1, 4);
}

void LDrr_dd (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_dc (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(1, 4);
}

void LDrr_db (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(1, 4);
}

void LDrr_de (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(1, 4);
}

void LDrr_dh (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(1, 4);
}

void LDrr_dl (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(1, 4);
}

void LDrr_da (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ee (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_ec (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ed (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(1, 4);
}

void LDrr_eb (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(1, 4);
}

void LDrr_eh (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(1, 4);
}

void LDrr_el (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ea (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(1, 4);
}

void LDrr_hh (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_hc (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(1, 4);
}

void LDrr_hd (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(1, 4);
}

void LDrr_he (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(1, 4);
}

void LDrr_hb (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(1, 4);
}

void LDrr_hl (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ha (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ll (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_lc (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ld (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(1, 4);
}

void LDrr_le (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(1, 4);
}

void LDrr_lh (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(1, 4);
}

void LDrr_lb (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(1, 4);
}

void LDrr_la (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(1, 4);
}

void LDrr_aa (CPU& cpu) {
    cpu.setRegisterClock(1, 4);
}

void LDrr_ac (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ad (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ae (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ah (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(1, 4);
}

void LDrr_al (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(1, 4);
}

void LDrr_ab (CPU& cpu) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(1, 4);
}

void LDrHLm_b(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDrHLm_c(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDrHLm_d(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDrHLm_e(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDrHLm_h(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDrHLm_l(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDrHLm_a(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L)));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_b(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_B));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_c(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_C));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_d(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_D));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_e(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_E));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_h(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_H));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_l(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_L));
    cpu.setRegisterClock(2, 8);
}

void LDHLmr_a(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(2, 8);
}

void LDrn_b(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_B, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDrn_c(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_C, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDrn_d(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_D, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDrn_e(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_E, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDrn_h(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_H, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDrn_l(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_L, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDrn_a(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(2, 8);
}

void LDHLmn(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_H) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_L), memory.readByte(cpu.get16BitRegister(REGISTER_16_BIT_PC)));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 1);
    cpu.setRegisterClock(3, 12);
}

void LDBCmA(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_B) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_C), cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(2, 8);
}

void LDDEmA(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte((cpu.get8BitRegister(REGISTER_8_BIT_D) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_E), cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.setRegisterClock(2, 8);
}

void LDmmA(CPU& cpu, MemoryInterface& memory) {
    memory.writeByte(memory.readWord(cpu.get16BitRegister(REGISTER_16_BIT_PC)), cpu.get8BitRegister(REGISTER_8_BIT_A));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 2);
    cpu.setRegisterClock(4, 16);
}

void LDABCm(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_B) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_C)));
    cpu.setRegisterClock(2, 8);
}

void LDABCm(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, memory.readByte((cpu.get8BitRegister(REGISTER_8_BIT_D) << 8) + cpu.get8BitRegister(REGISTER_8_BIT_E)));
    cpu.setRegisterClock(2, 8);
}

void LDAmm(CPU& cpu, MemoryInterface& memory) {
    cpu.set8BitRegister(REGISTER_8_BIT_A, memory.readByte(memory.readWord(cpu.get16BitRegister(REGISTER_16_BIT_PC))));
    cpu.set16BitRegister(REGISTER_16_BIT_PC, cpu.get16BitRegister(REGISTER_16_BIT_PC) + 2);
    cpu.setRegisterClock(4, 16);
}
