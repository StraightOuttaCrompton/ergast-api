import querystring from "querystring";
import { getMigrationTest } from "../migrationUtils";
import { GetStatusDto } from "src/routes/status/dto/get-status.dto";
import path from "path";

describe("GET /status/${statusId} smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.StatusTable.Status[0]
    );

    migrationTest("/status/1", `https://ergast.com/api/f1/status/1.json`);
});

describe("GET /status smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.StatusTable.Status
    );

    const endpoint = "/status";

    const queries: { queryParams: Partial<GetStatusDto>; legacyRoute: string }[] = [
        {
            queryParams: { driverId: "hamilton" },
            legacyRoute: "drivers/hamilton",
        },
        {
            queryParams: { constructorId: "renault" },
            legacyRoute: "constructors/renault",
        },
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
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/status.json`);

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/status.json`
        );
    });
});
