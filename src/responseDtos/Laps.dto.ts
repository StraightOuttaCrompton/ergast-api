import { Circuit } from "./Circuit.dto";

export class LapTiming {
    driverId: string;
    position: string;
    time: string;

    constructor(lap: LapTiming) {
        Object.assign(this, lap);
    }
}

export class Lap {
    number: string;
    Timings: LapTiming[];

    constructor(lap: Lap) {
        Object.assign(this, lap);
    }
}

export class LapsResponse {
    url: string;
    raceName: string;
    date: string;
    time: string;
    Circuit: Circuit;
    Laps: Lap[];

    constructor(lapsResponse: LapsResponse) {
        Object.assign(this, lapsResponse);
    }
}
