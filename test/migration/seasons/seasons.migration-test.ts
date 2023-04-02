import querystring from "querystring";
import request from "supertest";
import { GetSeasonsDto } from "../../../src/routes/seasons/dto/get-seasons.dto";
import { getMigrationTest } from "../migrationUtils";
import { app } from "../setup";
import path from "path";

describe("GET /seasons/${seasonId} smoke tests", () => {
    test("/seasons/1994", async () => {
        const response = await request(app.getHttpServer()).get("/seasons/1994");

        expect(response.body).toMatchSnapshot();
    });
});

describe("GET /seasons smoke tests", () => {
    const migrationTest = getMigrationTest(
        __dirname,
        path.basename(__filename),
        (response) => response.MRData.SeasonTable.Seasons
    );

    const endpoint = "/seasons";

    const queries: { queryParams: Partial<GetSeasonsDto>; legacyRoute: string }[] = [
        {
            queryParams: { driverId: "bottas" },
            legacyRoute: "drivers/bottas",
        },
        {
            queryParams: { driverId: "alonso", constructorId: "minardi" },
            legacyRoute: "drivers/alonso/constructors/minardi",
        },
        {
            queryParams: { driverId: "hamilton", constructorId: "mercedes", circuitId: "imola" },
            legacyRoute: "drivers/hamilton/constructors/mercedes/circuits/imola",
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
            queryParams: { driverId: "max_verstappen", grid: 1 },
            legacyRoute: "drivers/max_verstappen/grid/1",
        },
        {
            queryParams: { driverId: "sainz", fastest: 1 },
            legacyRoute: "drivers/sainz/fastest/1",
        },
        {
            queryParams: { driverId: "sainz", driverStandings: 5 },
            legacyRoute: "drivers/sainz/driverStandings/5",
        },
        {
            queryParams: { constructorId: "ferrari", driverStandings: 5 },
            legacyRoute: "constructors/ferrari/driverStandings/5",
        },
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/seasons.json`);

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/seasons.json`
        );
    });
});
