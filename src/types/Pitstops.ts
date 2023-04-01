import Circuit from "./Circuit";

export interface PitstopsResponse {
    url: string;
    raceName: string;
    date: string; // TODO: Date
    time: string; // TODO: Date
    Circuit: Circuit;
    PitStops: Pitstop[];
}

export interface Pitstop {
    driverId: string;
    lap: string; // TODO: number
    stop: string; // TODO: number
    time: string; // TODO: Date
    duration: string; // TODO: number miliseconds
}
