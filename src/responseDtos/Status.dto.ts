export default class Status {
    statusId: string; // TODO: number
    status: string;
    count: string; // TODO: number

    constructor(status: Status) {
        Object.assign(this, status);
    }
}
