import { drivers } from "@prisma/client";
import Driver from "../types/Driver";

export default function formatDriver(driver: drivers): Driver {
    return {
        driverId: driver.driverRef,
        permanentNumber: driver.number?.toString(),
        ...(driver.code ? { code: driver.code } : {}),
        url: driver.url,
        givenName: driver.forename,
        familyName: driver.surname,
        dateOfBirth: driver.dob?.toISOString().slice(0, 10), // TODO: change format, return date?
        nationality: driver.nationality,
    };
}
