import { Circuit } from "./Circuit.dto";
import Constructor from "./Constructor.dto";
import Driver from "./Driver.dto";

export class Result {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: Driver;
    Constructor: Constructor;
    grid: string;
    laps: string;
    status: string;
    Time: {
        millis: string;
        time: string;
    };

    constructor(result: Result) {
        Object.assign(this, result);
    }
}

export class ResultsResponse {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
    Results: Result[];

    constructor(resultsResponse: ResultsResponse) {
        Object.assign(this, resultsResponse);
    }
}
