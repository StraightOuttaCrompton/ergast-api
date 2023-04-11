export default class Status {
    statusId: string;
    status: string;
    count: string;

    constructor(status: Status) {
        Object.assign(this, status);
    }
}
