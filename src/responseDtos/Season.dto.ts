export default class Season {
    season: string; // TODO: year? number?
    url: string;

    constructor(season: Season) {
        Object.assign(this, season);
    }
}
