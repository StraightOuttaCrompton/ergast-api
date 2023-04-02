export interface CircuitLocation {
    lat: string; // TODO: number?
    long: string; // TODO: number?
    // alt: string; // TODO: number?
    locality: string;
    country: string;
}

export default interface Circuit {
    circuitId: string; // TODO: rename to id
    url: string;
    circuitName: string; // TODO: rename to name
    Location: CircuitLocation; // TODO: rename to location
}
