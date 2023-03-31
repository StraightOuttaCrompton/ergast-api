import { drivers, driverStandings } from "@prisma/client";
import { DriverStandings, DriverStandingsResponse } from "src/types/DriverStandings";
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
    const standingsMap: Record<string, DriverStandingsResponse> = {};

    for (let i = 0; i < response.length; i++) {
        const { year, round, ...rest } = response[i];

        // Generate a unique key for this year and round
        const key = `${year}-${round}`;

        const driverStandings = formatDriverStandings(rest);

        if (!standingsMap[key]) {
            // Create a new standings object if one does not exist for this season and round
            standingsMap[key] = {
                season: year.toString(),
                round: round.toString(),
                driverStandings: [driverStandings],
            };
        } else {
            // Add the player to the existing standings object for this season and round
            standingsMap[key].driverStandings.push(driverStandings);
        }
    }

    // Convert the standingsMap object to an array of standings objects
    return Object.values(standingsMap);
}
