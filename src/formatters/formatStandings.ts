import { drivers, driverStandings } from "@prisma/client";
import { DriverStandings, DriverStandingsResponse } from "../types/DriverStandings";
import formatDriver from "./formatDriver";

function formatDriverStandings(response: driverStandings & drivers): DriverStandings {
    return {
        position: response.position.toString(),
        positionText: response.positionText.toString(),
        points: response.points.toString(),
        wins: response.wins.toString(),
        Driver: formatDriver(response),
    };
}

export function formatDriverStandingsResponse(
    response: (driverStandings & drivers & { year: number; round: number })[]
): DriverStandingsResponse[] {
    const standingsResponse = extractByYearAndRound(response, formatDriverStandings);

    return standingsResponse.map(({ season, round, standings }) => ({
        season,
        round,
        driverStandings: standings,
    }));
}

function extractByYearAndRound<S, T>(
    response: (S & { year: number; round: number })[],
    formatStandings: (response: S) => T
) {
    const standingsMap: Record<string, { season: string; round: string; standings: T[] }> = {};

    for (let i = 0; i < response.length; i++) {
        const { year, round } = response[i];

        // Generate a unique key for this year and round
        const key = `${year}-${round}`;

        const standings = formatStandings(response[i]);

        if (!standingsMap[key]) {
            // Create a new standings object if one does not exist for this season and round
            standingsMap[key] = {
                season: year.toString(),
                round: round.toString(),
                standings: [standings],
            };
        } else {
            // Add the player to the existing standings object for this season and round
            standingsMap[key].standings.push(standings);
        }
    }

    // Convert the standingsMap object to an array of standings objects
    return Object.values(standingsMap);
}
