import { lapTimes } from "@prisma/client";
import formatCircuit from "./formatCircuit";
import { Lap, LapTiming, LapsResponse } from "../responseDtos/Laps.dto";

export default function formatLapsResponse(
    response: (lapTimes & {
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
) {
    const firstItem = response[0];
    return new LapsResponse({
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
        Laps: formatLaps(response),
    });
}

function formatLaps(response: (lapTimes & { driverRef: string })[]): Lap[] {
    const laps: Lap[] = [];
    let currentLap: Lap | undefined;

    for (const responseItem of response) {
        const { lap, driverRef, position, time } = responseItem;

        if (!currentLap || currentLap.number !== lap.toString()) {
            currentLap = new Lap({ number: lap.toString(), Timings: [] });
            laps.push(currentLap);
        }

        currentLap.Timings.push(new LapTiming({ driverId: driverRef, position: position.toString(), time }));
    }

    return laps;
}
