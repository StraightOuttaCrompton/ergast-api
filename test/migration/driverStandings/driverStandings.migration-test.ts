import querystring from "querystring";
import { GetDriverStandingsDto } from "src/routes/driverStandings/dto/get-driver-standings.dto";
import { getMigrationTest } from "../migrationUtils";
import path from "path";

function convertLegacyDriverStandingsResponse(driverStanding: any) {
    const { Constructors, ...rest } = driverStanding;

    return rest;
}

function convertLegacyResponse(response: any) {
    const { season, round, DriverStandings } = response;

    return { season, round, driverStandings: DriverStandings.map(convertLegacyDriverStandingsResponse) };
}

describe("GET /driverStandings smoke tests", () => {
    const migrationTest = getMigrationTest(__dirname, path.basename(__filename), (response) => {
        return response.MRData.StandingsTable.StandingsLists.map(convertLegacyResponse);
    });

    const endpoint = "/driverStandings";

    const queries: { queryParams: Partial<GetDriverStandingsDto>; legacyRoute: string }[] = [
        {
            queryParams: { year: 2022 },
            legacyRoute: "2022",
        },
        {
            queryParams: { year: 2009, round: 5 },
            legacyRoute: "2009/5",
        },
        {
            queryParams: { year: 2012, round: 3, driverId: "vettel" },
            legacyRoute: "2012/3/drivers/vettel",
        },
        {
            queryParams: { driverId: "hamilton" },
            legacyRoute: "drivers/hamilton",
        },
        {
            queryParams: { year: 2019, driverId: "hamilton" },
            legacyRoute: "2019/drivers/hamilton",
        },
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/driverStandings.json`);

    migrationTest(
        `${endpoint}?${querystring.stringify({ position: 2, year: 2022 })}`,
        `https://ergast.com/api/f1/2022/driverStandings/2.json`
    );

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/driverStandings.json`
        );
    });
});
