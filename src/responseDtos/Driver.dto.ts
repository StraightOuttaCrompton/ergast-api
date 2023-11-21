export default class Driver {
    driverId: string;
    permanentNumber: string; // TODO: number
    code?: string;
    url: string;
    givenName: string; // TODO: forename
    familyName: string; // TODO: surname
    dateOfBirth: string; // TODO: Date
    nationality: string;

    constructor(driver: Driver) {
        Object.assign(this, driver);
    }
}
