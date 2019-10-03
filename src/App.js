import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import GPU from './GPU/gpu';
import CPU from './cpu/cpu';
import MemoryInterfacing from './memory_interfacing/memory_interfacing';

class App extends Component {

    constructor() {
        super();
        this._interval = null;
    }

    reset = () => {
        GPU.reset();
        MemoryInterfacing.reset();
        CPU.reset();

        MemoryInterfacing.load('./opus5.gb');
    }

    frame = () => {
        let fclk = CPU._clock.t + 70224;
        do {
            CPU._map[MemoryInterfacing.rb(CPU._r.pc++)]();
            CPU._r.pc &= 65535;
            CPU._clock.m += CPU._r.m;
            CPU._clock.t += CPU._r.t;
            GPU.step();
        } while(CPU._clock.t < fclk);
    }

    run = () => {
        if (!this._interval)
        {
            this._interval = setTimeout(this.frame, 1);
            document.querySelector('#run').innerHTML = 'Pause';
        } else {
            clearInterval(this._interval);
            this._interval = null;
            document.querySelector('#run').innerHTML = 'Run';
        }
    }

    componentDidMount() {
        document.querySelector('#reset').onclick = this.reset;
        document.querySelector('#run').onclick = this.run;
        this.reset();
    }

    render() {
        return (
            <div>
                <canvas id="screen" width="160" height="144"></canvas>
                <button id="reset">Reset</button>
                <button id="run">Run</button>
            </div>
        );
    }
}

export default App;
