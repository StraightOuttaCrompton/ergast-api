import querystring from "querystring";
import { getMigrationTest } from "../migrationUtils";
import { GetDriversDto } from "../../../src/drivers/dto/get-drivers.dto";

describe("GET /drivers/${driverId} smoke tests", () => {
    const migrationTest = getMigrationTest((response) => response.MRData.DriverTable.Drivers[0]);

    migrationTest("/drivers/bottas", `https://ergast.com/api/f1/drivers/bottas.json`);
});

describe("GET /drivers smoke tests", () => {
    const migrationTest = getMigrationTest((response) =>
        response.MRData.DriverTable.Drivers.sort(
            /**
             * Sort function is needed here since ergast doesn't return sorted
             */
            (a, b) => a.familyName.localeCompare(b.familyName) || a.givenName.localeCompare(b.givenName)
        )
    );

    const endpoint = "/drivers";

    const queries: { queryParams: Partial<GetDriversDto>; legacyRoute: string }[] = [
        {
            queryParams: { circuitId: "monza" },
            legacyRoute: "circuits/monza",
        },
        {
            queryParams: { circuitId: "brands_hatch", constructorId: "minardi" },
            legacyRoute: "circuits/brands_hatch/constructors/minardi",
        },
        {
            queryParams: { year: 2022 },
            legacyRoute: "2022",
        },
        {
            queryParams: { circuitId: "catalunya", year: 2022 },
            legacyRoute: "2022/circuits/catalunya",
        },
        {
            queryParams: { year: 2010, round: 2 },
            legacyRoute: "2010/2",
        },
        {
            queryParams: { circuitId: "hockenheimring", status: 4 },
            legacyRoute: "circuits/hockenheimring/status/4",
        },
        {
            queryParams: { circuitId: "interlagos", constructorId: "ferrari", result: 1 },
            legacyRoute: "circuits/interlagos/constructors/ferrari/results/1",
        },
        {
            queryParams: { circuitId: "albert_park", result: 2, year: 2022 },
            legacyRoute: "2022/circuits/albert_park/results/2",
        },
        {
            queryParams: { circuitId: "americas", grid: 1, year: 2022 },
            legacyRoute: "2022/circuits/americas/grid/1",
        },
        {
            queryParams: { circuitId: "bahrain", fastest: 1, year: 2022 },
            legacyRoute: "2022/circuits/bahrain/fastest/1",
        },
        {
            queryParams: { driverStandings: 1, year: 2021 },
            legacyRoute: "2021/driverStandings/1",
        },
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/drivers.json`);

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/drivers.json`
        );
    });
});
