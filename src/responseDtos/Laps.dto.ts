import { Circuit } from "./Circuit.dto";

export class LapTiming {
    driverId: string;
    position: string; // TODO: number
    time: string; // TODO: number of miliseconds?

    constructor(lap: LapTiming) {
        Object.assign(this, lap);
    }
}

export class Lap {
    number: string; // TODO: number
    Timings: LapTiming[];

    constructor(lap: Lap) {
        Object.assign(this, lap);
    }
}

export class LapsResponse {
    url: string;
    raceName: string;
    date: string; // TODO: Date
    time: string; // TODO: Date
    Circuit: Circuit;
    Laps: Lap[];

    constructor(lapsResponse: LapsResponse) {
        Object.assign(this, lapsResponse);
    }
}
