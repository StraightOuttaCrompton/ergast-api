import { results, status } from "@prisma/client";
import formatCircuit from "./formatCircuit";
import { Result, ResultsResponse } from "../responseDtos/Results.dto";
import { Circuit } from "src/responseDtos/Circuit.dto";
import formatDriver from "./formatDriver";
import formatConstructor from "./formatConstructor";

function formatResult(
    response: results &
        status & {
            year: number;
            round: number;
            raceName: string;
            raceDate: Date;
            raceTime: Date | null;
            raceUrl: string | null;
        } & {
            circuitRef: string;
            circuitName: string;
            circuitLocation: string;
            circuitCountry: string;
            circuitUrl: string;
            circuitLat: number;
            circuitLng: number;
            circuitAlt: number;
        } & {
            driverRef: string;
            driverNumber: number | null;
            driverCode: string | null;
            driverForename: string;
            driverSurname: string;
            driverDob: Date;
            driverNationality: string;
            driverUrl: string;
        } & {
            constructorRef: string;
            constructorName: string;
            constructorNationality: string;
            constructorUrl: string;
        }
) {
    return new Result({
        number: response.number.toString(),
        position: response.position?.toString(),
        positionText: response.positionText,
        points: response.points.toString(),
        Driver: formatDriver({
            driverRef: response.driverRef,
            number: response.number,
            code: response.driverCode,
            url: response.raceUrl,
            forename: response.driverForename,
            surname: response.driverSurname,
            dob: response.driverDob,
            nationality: response.driverNationality,
        }),
        Constructor: formatConstructor({
            constructorRef: response.constructorRef,
            url: response.constructorUrl,
            name: response.constructorName,
            nationality: response.constructorNationality,
        }),
        grid: response.grid.toString(),
        laps: response.laps.toString(),
        status: response.status,
        Time: {
            millis: response.milliseconds?.toString(),
            time: response.time,
        },
    });
}

export default function formatResultResponse(
    response: (results &
        status & {
            year: number;
            round: number;
            raceName: string;
            raceDate: Date;
            raceTime: Date | null;
            raceUrl: string | null;
        } & {
            circuitRef: string;
            circuitName: string;
            circuitLocation: string;
            circuitCountry: string;
            circuitUrl: string;
            circuitLat: number;
            circuitLng: number;
            circuitAlt: number;
        } & {
            driverRef: string;
            driverNumber: number | null;
            driverCode: string | null;
            driverForename: string;
            driverSurname: string;
            driverDob: Date;
            driverNationality: string;
            driverUrl: string;
        } & {
            constructorRef: string;
            constructorName: string;
            constructorNationality: string;
            constructorUrl: string;
        })[]
) {
    const resultsResponse = extractByYearAndRound(response, formatResult);

    return resultsResponse.map((response) => new ResultsResponse(response));
}

function extractByYearAndRound<S, T>(
    response: (S & {
        year: number;
        round: number;
        raceUrl: string;
        raceName: string;
        circuitRef: string;
        circuitName: string;
        circuitLocation: string;
        circuitCountry: string;
        circuitUrl: string;
        circuitLat: number;
        circuitLng: number;
        circuitAlt: number;
    })[],
    formatResult: (response: S) => T
) {
    const responseMap: Record<
        string,
        { season: string; round: string; url: string; raceName: string; Circuit: Circuit; Results: T[] }
    > = {};

    for (let i = 0; i < response.length; i++) {
        const {
            year,
            round,
            raceUrl,
            raceName,
            circuitRef,
            circuitName,
            circuitLocation,
            circuitCountry,
            circuitUrl,
            circuitLat,
            circuitLng,
            circuitAlt,
        } = response[i];

        // Generate a unique key for this year and round
        const key = `${year}-${round}`;

        const formattedResults = formatResult(response[i]);

        if (!responseMap[key]) {
            // Create a new standings object if one does not exist for this season and round
            responseMap[key] = {
                season: year.toString(),
                round: round.toString(),
                url: raceUrl,
                raceName,
                Circuit: formatCircuit({
                    circuitRef,
                    name: circuitName,
                    location: circuitLocation,
                    country: circuitCountry,
                    url: circuitUrl,
                    lat: circuitLat,
                    lng: circuitLng,
                    alt: circuitAlt,
                }),
                Results: [formattedResults],
            };
        } else {
            responseMap[key].Results.push(formattedResults);
        }
    }

    return Object.values(responseMap);
}
