export class CircuitLocation {
    lat: string; // TODO: number?
    long: string; // TODO: number?
    // alt: string; // TODO: number?
    locality: string;
    country: string;

    constructor(location: CircuitLocation) {
        Object.assign(this, location);
    }
}

export class Circuit {
    circuitId: string; // TODO: rename to id
    url: string;
    circuitName: string; // TODO: rename to name
    Location: CircuitLocation; // TODO: rename to location

    constructor(circuit: Circuit) {
        Object.assign(this, circuit);
        this.Location = new CircuitLocation(circuit.Location);
    }
}
