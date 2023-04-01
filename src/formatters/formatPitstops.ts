import { pitStops } from "@prisma/client";
import formatCircuit from "./formatCircuit";
import { Pitstop, PitstopsResponse } from "../types/Pitstops";

export default function formatPitstopsResponse(
    response: (pitStops & {
        raceName: string;
        raceDate: Date;
        raceTime: Date | null;
        raceUrl: string | null;
    } & {
        circuitRef: string;
        circuitName: string;
        circuitLocation: string | null;
        circuitCountry: string | null;
        circuitLat: number | null;
        circuitLng: number | null;
        circuitAlt: number | null;
        circuitUrl: string;
    } & { driverRef: string })[]
): PitstopsResponse {
    const firstItem = response[0];
    return {
        url: firstItem.raceUrl,
        raceName: firstItem.raceName,
        date: firstItem.raceDate.toString(),
        time: firstItem.raceTime ? firstItem.raceTime.toString() + "Z" : undefined,
        Circuit: formatCircuit({
            circuitRef: firstItem.circuitRef,
            name: firstItem.circuitName,
            location: firstItem.circuitLocation,
            country: firstItem.circuitCountry,
            lat: firstItem.circuitLat,
            lng: firstItem.circuitLng,
            alt: firstItem.circuitAlt,
            url: firstItem.circuitUrl,
        }),
        PitStops: response.map(formatPitstop),
    };
}

function formatPitstop(response: pitStops & { driverRef: string }): Pitstop {
    return {
        driverId: response.driverRef,
        lap: response.lap.toString(),
        stop: response.stop.toString(),
        time: response.time.toString(),
        duration: response.duration,
    };
}
