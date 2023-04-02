import querystring from "querystring";
import { GetConstructorsDto } from "src/routes/constructors/dto/get-constructors.dto";
import { getMigrationTest } from "../migrationUtils";
import path from "path";

describe("GET /constructors/${constructorId} smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.ConstructorTable.Constructors[0]
    );

    migrationTest("/constructors/red_bull", `https://ergast.com/api/f1/constructors/red_bull.json`);
});

describe("GET /constructors smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.ConstructorTable.Constructors
    );

    const endpoint = "/constructors";

    const queries: { queryParams: Partial<GetConstructorsDto>; legacyRoute: string }[] = [
        {
            queryParams: { driverId: "bottas" },
            legacyRoute: "drivers/bottas",
        },
        {
            queryParams: { driverId: "alonso", circuitId: "monza" },
            legacyRoute: "drivers/alonso/circuits/monza",
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
            queryParams: { driverId: "vettel", circuitId: "bahrain", result: 1 },
            legacyRoute: "drivers/vettel/circuits/bahrain/results/1",
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
        {
            queryParams: { constructorStandings: 1, year: 2021 },
            legacyRoute: "2021/constructorStandings/1",
        },
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/constructors.json`);

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/constructors.json`
        );
    });
});
