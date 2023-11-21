import { Circuit } from "./Circuit.dto";

// TODO: replace with just a Date
export class DateTime {
    date: string;
    time: string;

    constructor(dateTime: DateTime) {
        Object.assign(this, dateTime);
    }
}

export default class Race {
    season: string; // TODO: number
    round: string; // TODO: number
    url: string;
    raceName: string; // TODO: name
    Circuit: Circuit; // TODO: remove? should use circuit id to get?

    /**
        TODO: replace with structure similar to
        schedule: {
            firstPractice: Date;
            secondPractice: Date;
            thirdPractice: Date;
            qualifying: Date;
            race: Date;
        }
     */
    date: string;
    time: string;

    FirstPractice?: DateTime;
    SecondPractice?: DateTime;
    ThirdPractice?: DateTime;
    Qualifying?: DateTime;

    constructor(race: Race) {
        Object.assign(this, race);
    }
}
