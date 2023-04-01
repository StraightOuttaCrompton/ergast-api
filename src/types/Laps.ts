import Circuit from "./Circuit";

export interface LapsResponse {
    url: string;
    raceName: string;
    date: string; // TODO: Date
    time: string; // TODO: Date
    Circuit: Circuit;
    Laps: Lap[];
}

export interface Lap {
    number: string; // TODO: number
    Timings: {
        driverId: string;
        position: string; // TODO: number
        time: string; // TODO: number of miliseconds?
    }[];
}
