import { constructors, constructorStandings, drivers, driverStandings } from "@prisma/client";
import formatConstructor from "./formatConstructor";
import formatDriver from "./formatDriver";
import { ConstructorStandings, ConstructorStandingsResponse } from "../responseDtos/ConstructorStandings.dto";
import { DriverStandings, DriverStandingsResponse } from "../responseDtos/DriverStandings.dto";

function formatDriverStandings(response: driverStandings & drivers) {
    return new DriverStandings({
        position: response.position.toString(),
        positionText: response.positionText.toString(),
        points: response.points.toString(),
        wins: response.wins.toString(),
        Driver: formatDriver(response),
    });
}

export function formatDriverStandingsResponse(
    response: (driverStandings & drivers & { year: number; round: number })[]
): DriverStandingsResponse[] {
    const standingsResponse = extractByYearAndRound(response, formatDriverStandings);

    return standingsResponse.map(
        ({ season, round, standings }) =>
            new DriverStandingsResponse({
                season,
                round,
                driverStandings: standings,
            })
    );
}

function formatConstructorStandings(response: constructorStandings & constructors) {
    return new ConstructorStandings({
        position: response.position.toString(),
        positionText: response.positionText.toString(),
        points: response.points.toString(),
        wins: response.wins.toString(),
        Constructor: formatConstructor(response),
    });
}

export function formatConstructorStandingsResponse(
    response: (constructorStandings & constructors & { year: number; round: number })[]
): ConstructorStandingsResponse[] {
    const standingsResponse = extractByYearAndRound(response, formatConstructorStandings);

    return standingsResponse.map(
        ({ season, round, standings }) =>
            new ConstructorStandingsResponse({
                season,
                round,
                constructorStandings: standings,
            })
    );
}

function extractByYearAndRound<S, T>(
    response: (S & { year: number; round: number })[],
    formatStandings: (response: S) => T
) {
    const responseMap: Record<string, { season: string; round: string; standings: T[] }> = {};

    for (let i = 0; i < response.length; i++) {
        const { year, round } = response[i];

        // Generate a unique key for this year and round
        const key = `${year}-${round}`;

        const standings = formatStandings(response[i]);

        if (!responseMap[key]) {
            // Create a new standings object if one does not exist for this season and round
            responseMap[key] = {
                season: year.toString(),
                round: round.toString(),
                standings: [standings],
            };
        } else {
            // Add the player to the existing standings object for this season and round
            responseMap[key].standings.push(standings);
        }
    }

    // Convert the standingsMap object to an array of standings objects
    return Object.values(responseMap);
}
