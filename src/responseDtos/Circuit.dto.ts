export class CircuitLocation {
    lat: string;
    long: string;
    locality: string;
    country: string;

    constructor(location: CircuitLocation) {
        Object.assign(this, location);
    }
}

export class Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: CircuitLocation;

    constructor(circuit: Circuit) {
        Object.assign(this, circuit);
        this.Location = new CircuitLocation(circuit.Location);
    }
}
