export default class Season {
    season: string;
    url: string;

    constructor(season: Season) {
        Object.assign(this, season);
    }
}
