import { Circuit } from "./Circuit.dto";

export class DateTime {
    date: string;
    time: string;

    constructor(dateTime: DateTime) {
        Object.assign(this, dateTime);
    }
}

export default class Race {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
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
