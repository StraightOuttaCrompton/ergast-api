import querystring from "querystring";
import { getMigrationTest } from "../migrationUtils";
import { GetPitstopsDto } from "src/routes/pitstops/dto/get-pitstops.dto";
import path from "path";

describe("GET /pitstops/${pitNumber} smoke tests", () => {
    const migrationTest = getMigrationTest(__dirname, path.basename(__filename), (response) => {
        const { season, round, ...rest } = response.MRData.RaceTable.Races[0];

        return rest;
    });

    migrationTest(
        `/pitstops/1?${querystring.stringify({ year: 2022, round: 8 })}`,
        `https://ergast.com/api/f1/2022/8/pitstops/1.json`
    );
});

describe("GET /pitstops smoke tests", () => {
    const migrationTest = getMigrationTest(__dirname, path.basename(__filename), (response) => {
        const { season, round, ...rest } = response.MRData.RaceTable.Races[0];

        return rest;
    });
    const endpoint = "/pitstops";

    const queries: { queryParams: Partial<GetPitstopsDto>; legacyRoute: string }[] = [
        {
            queryParams: { year: 2022, round: 3 },
            legacyRoute: "2022/3",
        },
        {
            queryParams: { year: 2011, round: 5, driverId: "alonso" },
            legacyRoute: "2011/5/drivers/alonso",
        },
        {
            queryParams: { year: 2020, round: 8, lapNumber: 20 },
            legacyRoute: "2020/8/laps/20",
        },
    ];

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/pitstops.json`
        );
    });
});
