import querystring from "querystring";
import { GetRacesDto } from "src/routes/races/dto/get-races.dto";
import { getMigrationTest } from "../migrationUtils";
import path from "path";

describe("GET /races/${year}/${round} smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.RaceTable.Races[0]
    );

    migrationTest("/races/2016/5", `https://ergast.com/api/f1/2016/5.json`);
});

describe("GET /races smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.RaceTable.Races
    );

    const endpoint = "/races";

    const queries: { queryParams: Partial<GetRacesDto>; legacyRoute: string }[] = [
        {
            queryParams: { driverId: "bottas" },
            legacyRoute: "drivers/bottas",
        },
        {
            queryParams: { driverId: "alonso", constructorId: "minardi" },
            legacyRoute: "drivers/alonso/constructors/minardi",
        },
        {
            queryParams: { year: 2022 },
            legacyRoute: "2022",
        },
        {
            queryParams: { driverId: "hamilton", year: 2022 },
            legacyRoute: "2022/drivers/hamilton",
        },
        {
            queryParams: { year: 2010, round: 2 },
            legacyRoute: "2010/2",
        },
        {
            queryParams: { driverId: "maldonado", status: 4 },
            legacyRoute: "drivers/maldonado/status/4",
        },
        {
            queryParams: { driverId: "vettel", constructorId: "ferrari", result: 1 },
            legacyRoute: "drivers/vettel/constructors/ferrari/results/1",
        },
        {
            queryParams: { driverId: "hamilton", result: 2, year: 2022 },
            legacyRoute: "2022/drivers/hamilton/results/2",
        },
        {
            queryParams: { driverId: "max_verstappen", grid: 1, year: 2022 },
            legacyRoute: "2022/drivers/max_verstappen/grid/1",
        },
        {
            queryParams: { driverId: "sainz", fastest: 1, year: 2022 },
            legacyRoute: "2022/drivers/sainz/fastest/1",
        },
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/races.json`);

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/races.json`
        );
    });
});
