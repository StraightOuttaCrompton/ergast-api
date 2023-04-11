export default class Driver {
    driverId: string;
    permanentNumber: string;
    code?: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;

    constructor(driver: Driver) {
        Object.assign(this, driver);
    }
}
