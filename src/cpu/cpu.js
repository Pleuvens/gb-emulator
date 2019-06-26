import Ops from './operators.js'
import GPU from '../GPU/gpu';
import MemoryInterfacing from '../memory_interfacing/memory_interfacing';

class CPU {

    constructor() {
        // Time clock: The Z80 holds two types of clock (m and t)
        this._clock = {m: 0, t:0};
        this._r = {
            a: 0, b: 0, c: 0, d: 0, e: 0, h: 0, l: 0, f: 0, // 8-bit registers
            pc: 0, sp: 0, i: 0, r:0,                        // 16-bit registers
            m: 0, t: 0,                                     // clock for last instr
            ime: 0
        };
        this._halt = 0;
        this._stop = 0;

        this._map = [
            // 00
              Ops.NOP,
              Ops.LDBCnn,
              Ops.LDBCmA,
              Ops.INCBC,
              Ops.INCr_b,
              Ops.DECr_b,
              Ops.LDrn_b,
              Ops.RLCA,
              Ops.LDmmSP,
              Ops.ADDHLBC,
              Ops.LDABCm,
              Ops.DECBC,
              Ops.INCr_c,
              Ops.DECr_c,
              Ops.LDrn_c,
              Ops.RRCA,

              // 10
              Ops.DJNZn,
              Ops.LDDEnn,
              Ops.LDDEmA,
              Ops.INCDE,
              Ops.INCr_d,
              Ops.DECr_d,
              Ops.LDrn_d,
              Ops.RLA,
              Ops.JRn,
              Ops.ADDHLDE,
              Ops.LDADEm,
              Ops.DECDE,
              Ops.INCr_e,
              Ops.DECr_e,
              Ops.LDrn_e,
              Ops.RRA,

              // 20
              Ops.JRNZn,
              Ops.LDHLnn,
              Ops.LDHLIA,
              Ops.INCHL,
              Ops.INCr_h,
              Ops.DECr_h,
              Ops.LDrn_h,
              Ops.XX,
              Ops.JRZn,
              Ops.ADDHLHL,
              Ops.LDAHLI,
              Ops.DECHL,
              Ops.INCr_l,
              Ops.DECr_l,
              Ops.LDrn_l,
              Ops.CPL,

              // 30
              Ops.JRNCn,
              Ops.LDSPnn,
              Ops.LDHLDA,
              Ops.INCSP,
              Ops.INCHLm,
              Ops.DECHLm,
              Ops.LDHLmn,
              Ops.SCF,
              Ops.JRCn,
              Ops.ADDHLSP,
              Ops.LDAHLD,
              Ops.DECSP,
              Ops.INCr_a,
              Ops.DECr_a,
              Ops.LDrn_a,
              Ops.CCF,

              // 40
              Ops.LDrr_bb,
              Ops.LDrr_bc,
              Ops.LDrr_bd,
              Ops.LDrr_be,
              Ops.LDrr_bh,
              Ops.LDrr_bl,
              Ops.LDrHLm_b,
              Ops.LDrr_ba,
              Ops.LDrr_cb,
              Ops.LDrr_cc,
              Ops.LDrr_cd,
              Ops.LDrr_ce,
              Ops.LDrr_ch,
              Ops.LDrr_cl,
              Ops.LDrHLm_c,
              Ops.LDrr_ca,

              // 50
              Ops.LDrr_db,
              Ops.LDrr_dc,
              Ops.LDrr_dd,
              Ops.LDrr_de,
              Ops.LDrr_dh,
              Ops.LDrr_dl,
              Ops.LDrHLm_d,
              Ops.LDrr_da,
              Ops.LDrr_eb,
              Ops.LDrr_ec,
              Ops.LDrr_ed,
              Ops.LDrr_ee,
              Ops.LDrr_eh,
              Ops.LDrr_el,
              Ops.LDrHLm_e,
              Ops.LDrr_ea,

              // 60
              Ops.LDrr_hb,
              Ops.LDrr_hc,
              Ops.LDrr_hd,
              Ops.LDrr_he,
              Ops.LDrr_hh,
              Ops.LDrr_hl,
              Ops.LDrHLm_h,
              Ops.LDrr_ha,
              Ops.LDrr_lb,
              Ops.LDrr_lc,
              Ops.LDrr_ld,
              Ops.LDrr_le,
              Ops.LDrr_lh,
              Ops.LDrr_ll,
              Ops.LDrHLm_l,
              Ops.LDrr_la,

              // 70
              Ops.LDHLmr_b,
              Ops.LDHLmr_c,
              Ops.LDHLmr_d,
              Ops.LDHLmr_e,
              Ops.LDHLmr_h,
              Ops.LDHLmr_l,
              Ops.HALT,
              Ops.LDHLmr_a,
              Ops.LDrr_ab,
              Ops.LDrr_ac,
              Ops.LDrr_ad,
              Ops.LDrr_ae,
              Ops.LDrr_ah,
              Ops.LDrr_al,
              Ops.LDrHLm_a,
              Ops.LDrr_aa,

              // 80
              Ops.ADDr_b,
              Ops.ADDr_c,
              Ops.ADDr_d,
              Ops.ADDr_e,
              Ops.ADDr_h,
              Ops.ADDr_l,
              Ops.ADDHL,
              Ops.ADDr_a,
              Ops.ADCr_b,
              Ops.ADCr_c,
              Ops.ADCr_d,
              Ops.ADCr_e,
              Ops.ADCr_h,
              Ops.ADCr_l,
              Ops.ADCHL,
              Ops.ADCr_a,

              // 90
              Ops.SUBr_b,
              Ops.SUBr_c,
              Ops.SUBr_d,
              Ops.SUBr_e,
              Ops.SUBr_h,
              Ops.SUBr_l,
              Ops.SUBHL,
              Ops.SUBr_a,
              Ops.SBCr_b,
              Ops.SBCr_c,
              Ops.SBCr_d,
              Ops.SBCr_e,
              Ops.SBCr_h,
              Ops.SBCr_l,
              Ops.SBCHL,
              Ops.SBCr_a,

              // A0
              Ops.ANDr_b,
              Ops.ANDr_c,
              Ops.ANDr_d,
              Ops.ANDr_e,
              Ops.ANDr_h,
              Ops.ANDr_l,
              Ops.ANDHL,
              Ops.ANDr_a,
              Ops.XORr_b,
              Ops.XORr_c,
              Ops.XORr_d,
              Ops.XORr_e,
              Ops.XORr_h,
              Ops.XORr_l,
              Ops.XORHL,
              Ops.XORr_a,

              // B0
              Ops.ORr_b,
              Ops.ORr_c,
              Ops.ORr_d,
              Ops.ORr_e,
              Ops.ORr_h,
              Ops.ORr_l,
              Ops.ORHL,
              Ops.ORr_a,
              Ops.CPr_b,
              Ops.CPr_c,
              Ops.CPr_d,
              Ops.CPr_e,
              Ops.CPr_h,
              Ops.CPr_l,
              Ops.CPHL,
              Ops.CPr_a,

              // C0
              Ops.RETNZ,
              Ops.POPBC,
              Ops.JPNZnn,
              Ops.JPnn,
              Ops.CALLNZnn,
              Ops.PUSHBC,
              Ops.ADDn,
              Ops.RST00,
              Ops.RETZ,
              Ops.RET,
              Ops.JPZnn,
              Ops.MAPcb,
              Ops.CALLZnn,
              Ops.CALLnn,
              Ops.ADCn,
              Ops.RST08,

              // D0
              Ops.RETNC,
              Ops.POPDE,
              Ops.JPNCnn,
              Ops.XX,
              Ops.CALLNCnn,
              Ops.PUSHDE,
              Ops.SUBn,
              Ops.RST10,
              Ops.RETC,
              Ops.RETI,
              Ops.JPCnn,
              Ops.XX,
              Ops.CALLCnn,
              Ops.XX,
              Ops.SBCn,
              Ops.RST18,

              // E0
              Ops.LDIOnA,
              Ops.POPHL,
              Ops.LDIOCA,
              Ops.XX,
              Ops.XX,
              Ops.PUSHHL,
              Ops.ANDn,
              Ops.RST20,
              Ops.ADDSPn,
              Ops.JPHL,
              Ops.LDmmA,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.ORn,
              Ops.RST28,

              // F0
              Ops.LDAIOn,
              Ops.POPAF,
              Ops.LDAIOC,
              Ops.DI,
              Ops.XX,
              Ops.PUSHAF,
              Ops.XORn,
              Ops.RST30,
              Ops.LDHLSPn,
              Ops.XX,
              Ops.LDAmm,
              Ops.EI,
              Ops.XX,
              Ops.XX,
              Ops.CPn,
              Ops.RST38
        ];

        this._cbmap = [
            // CB00
              Ops.RLCr_b,
              Ops.RLCr_c,
              Ops.RLCr_d,
              Ops.RLCr_e,
              Ops.RLCr_h,
              Ops.RLCr_l,
              Ops.RLCHL,
              Ops.RLCr_a,
              Ops.RRCr_b,
              Ops.RRCr_c,
              Ops.RRCr_d,
              Ops.RRCr_e,
              Ops.RRCr_h,
              Ops.RRCr_l,
              Ops.RRCHL,
              Ops.RRCr_a,

              // CB10
              Ops.RLr_b,
              Ops.RLr_c,
              Ops.RLr_d,
              Ops.RLr_e,
              Ops.RLr_h,
              Ops.RLr_l,
              Ops.RLHL,
              Ops.RLr_a,
              Ops.RRr_b,
              Ops.RRr_c,
              Ops.RRr_d,
              Ops.RRr_e,
              Ops.RRr_h,
              Ops.RRr_l,
              Ops.RRHL,
              Ops.RRr_a,

              // CB20
              Ops.SLAr_b,
              Ops.SLAr_c,
              Ops.SLAr_d,
              Ops.SLAr_e,
              Ops.SLAr_h,
              Ops.SLAr_l,
              Ops.XX,
              Ops.SLAr_a,
              Ops.SRAr_b,
              Ops.SRAr_c,
              Ops.SRAr_d,
              Ops.SRAr_e,
              Ops.SRAr_h,
              Ops.SRAr_l,
              Ops.XX,
              Ops.SRAr_a,

              // CB30
              Ops.SWAPr_b,
              Ops.SWAPr_c,
              Ops.SWAPr_d,
              Ops.SWAPr_e,
              Ops.SWAPr_h,
              Ops.SWAPr_l,
              Ops.XX,
              Ops.SWAPr_a,
              Ops.SRLr_b,
              Ops.SRLr_c,
              Ops.SRLr_d,
              Ops.SRLr_e,
              Ops.SRLr_h,
              Ops.SRLr_l,
              Ops.XX,
              Ops.SRLr_a,

              // CB40
              Ops.BIT0b,
              Ops.BIT0c,
              Ops.BIT0d,
              Ops.BIT0e,
              Ops.BIT0h,
              Ops.BIT0l,
              Ops.BIT0m,
              Ops.BIT0a,
              Ops.BIT1b,
              Ops.BIT1c,
              Ops.BIT1d,
              Ops.BIT1e,
              Ops.BIT1h,
              Ops.BIT1l,
              Ops.BIT1m,
              Ops.BIT1a,

              // CB50
              Ops.BIT2b,
              Ops.BIT2c,
              Ops.BIT2d,
              Ops.BIT2e,
              Ops.BIT2h,
              Ops.BIT2l,
              Ops.BIT2m,
              Ops.BIT2a,
              Ops.BIT3b,
              Ops.BIT3c,
              Ops.BIT3d,
              Ops.BIT3e,
              Ops.BIT3h,
              Ops.BIT3l,
              Ops.BIT3m,
              Ops.BIT3a,

              // CB60
              Ops.BIT4b,
              Ops.BIT4c,
              Ops.BIT4d,
              Ops.BIT4e,
              Ops.BIT4h,
              Ops.BIT4l,
              Ops.BIT4m,
              Ops.BIT4a,
              Ops.BIT5b,
              Ops.BIT5c,
              Ops.BIT5d,
              Ops.BIT5e,
              Ops.BIT5h,
              Ops.BIT5l,
              Ops.BIT5m,
              Ops.BIT5a,

              // CB70
              Ops.BIT6b,
              Ops.BIT6c,
              Ops.BIT6d,
              Ops.BIT6e,
              Ops.BIT6h,
              Ops.BIT6l,
              Ops.BIT6m,
              Ops.BIT6a,
              Ops.BIT7b,
              Ops.BIT7c,
              Ops.BIT7d,
              Ops.BIT7e,
              Ops.BIT7h,
              Ops.BIT7l,
              Ops.BIT7m,
              Ops.BIT7a,

              // CB80
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CB90
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CBA0
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CBB0
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CBC0
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CBD0
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CBE0
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,

              // CBF0
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX,
              Ops.XX
        ]
    }

    reset = () =>
    {
        this._r = {
            a: 0, b: 0, c: 0, d: 0, e: 0, h: 0, l: 0, f: 0,
            pc: 0, sp: 0, i: 0, r: 0,
            m: 0, t: 0
        };

        this._clock = { m: 0, t: 0};

        this._halt = 0;
        this._stop = 0;
        this._ime = 1;
    }

    exec = () => {
        this._r.r = (this._r.r+1) & 127;
        this._map[MemoryInterfacing.rb(this._r.pc++)]();
        this._r.pc &= 65535;
        this._clock.m += this._r.m; this._clock.t += this._r.t;
        if(MemoryInterfacing._inbios && this._r.pc === 0x0100) MemoryInterfacing._inbios=0;
    }

    dispatcher = () =>
    {
        while (true)
        {
            let op = MemoryInterfacing.rb(this._r.pc++);        // Fetch instruction
            this._map[op]();                                    // Dispatch
            this._r.pc &= 65535;                                // Mask PC to 16 bits
            this._clock.m += this._r.m;                         // Add time to CPU clock
            this._clock.t += this._r.t;

            GPU.step();
        }
    }
}

const instance = new CPU();

export default instance;
