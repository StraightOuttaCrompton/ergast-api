import querystring from "querystring";
import { GetConstructorStandingsDto } from "src/routes/constructorStandings/dto/get-constructor-standings.dto";
import { getMigrationTest } from "../migrationUtils";

function convertLegacyConstructorStandingsResponse(constructorStanding: any) {
    const { Constructors, ...rest } = constructorStanding;

    return rest;
}

function convertLegacyResponse(response: any) {
    const { season, round, ConstructorStandings } = response;

    console.log({
        season,
        round,
        constructorStandings: ConstructorStandings.map(convertLegacyConstructorStandingsResponse),
    });

    return { season, round, constructorStandings: ConstructorStandings.map(convertLegacyConstructorStandingsResponse) };
}

describe("GET /constructorStandings smoke tests", () => {
    const migrationTest = getMigrationTest((response) => {
        return response.MRData.StandingsTable.StandingsLists.map(convertLegacyResponse);
    });

    const endpoint = "/constructorStandings";

    const queries: { queryParams: Partial<GetConstructorStandingsDto>; legacyRoute: string }[] = [
        {
            queryParams: { year: 2022 },
            legacyRoute: "2022",
        },
        {
            queryParams: { year: 2009, round: 5 },
            legacyRoute: "2009/5",
        },
        {
            queryParams: { year: 2012, round: 3, constructorId: "ferrari" },
            legacyRoute: "2012/3/constructors/ferrari",
        },
        {
            queryParams: { constructorId: "mercedes" },
            legacyRoute: "constructors/mercedes",
        },
        {
            queryParams: { year: 2019, constructorId: "red_bull" },
            legacyRoute: "2019/constructors/red_bull",
        },
    ];

    migrationTest(endpoint, `https://ergast.com/api/f1/constructorStandings.json`);

    migrationTest(
        `${endpoint}?${querystring.stringify({ position: 2, year: 2022 })}`,
        `https://ergast.com/api/f1/2022/constructorStandings/2.json`
    );

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/constructorStandings.json`
        );
    });
});
