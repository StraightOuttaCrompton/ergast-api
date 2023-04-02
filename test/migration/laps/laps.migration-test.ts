import querystring from "querystring";
import { getMigrationTest } from "../migrationUtils";
import { GetLapsDto } from "src/routes/laps/dto/get-laps.dto";
import path from "path";

describe("GET /laps/${lapNumber} smoke tests", () => {
    const migrationTest = getMigrationTest(__dirname, path.basename(__filename), (response) => {
        const { season, round, ...rest } = response.MRData.RaceTable.Races[0];

        return rest;
    });

    migrationTest(
        `/laps/1?${querystring.stringify({ year: 2022, round: 8 })}`,
        `https://ergast.com/api/f1/2022/8/laps/1.json`
    );
});

describe("GET /laps smoke tests", () => {
    const migrationTest = getMigrationTest(__dirname, path.basename(__filename), (response) => {
        const { season, round, ...rest } = response.MRData.RaceTable.Races[0];

        return rest;
    });
    const endpoint = "/laps";

    const queries: { queryParams: Partial<GetLapsDto>; legacyRoute: string }[] = [
        {
            queryParams: { year: 2022, round: 3 },
            legacyRoute: "2022/3",
        },
        {
            queryParams: { year: 2011, round: 5, driverId: "alonso" },
            legacyRoute: "2011/5/drivers/alonso",
        },
    ];

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/laps.json`
        );
    });
});
