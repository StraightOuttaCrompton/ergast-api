import { circuits, races } from "@prisma/client";
import formatCircuit from "./formatCircuit";
import Race, { DateTime } from "../responseDtos/Race.dto";

function formatDateTime({ date, time }: { date: string; time: string }) {
    return new DateTime({
        date,
        time: time + "Z",
    });
}

export default function formatRace(response: { raceName: string; raceURL: string } & races & circuits) {
    return new Race({
        season: response.year.toString(),
        round: response.round.toString(),
        url: response.raceURL,
        raceName: response.raceName,
        Circuit: formatCircuit(response),
        date: response.date?.toString(),
        time: response.time ? response.time.toString() + "Z" : undefined,

        ...(response.fp1_date && response.fp1_time
            ? {
                  FirstPractice: formatDateTime({
                      date: response.fp1_date.toString(),
                      time: response.fp1_time.toString(),
                  }),
              }
            : {}),

        ...(response.fp2_date && response.fp2_time
            ? {
                  SecondPractice: formatDateTime({
                      date: response.fp2_date.toString(),
                      time: response.fp2_time.toString(),
                  }),
              }
            : {}),

        ...(response.fp3_date && response.fp3_time
            ? {
                  ThirdPractice: formatDateTime({
                      date: response.fp3_date.toString(),
                      time: response.fp3_time.toString(),
                  }),
              }
            : {}),

        ...(response.quali_date && response.quali_time
            ? {
                  Qualifying: formatDateTime({
                      date: response.quali_date.toString(),
                      time: response.quali_time.toString(),
                  }),
              }
            : {}),

        ...(response.sprint_date && response.sprint_time
            ? {
                  Sprint: formatDateTime({
                      date: response.sprint_date.toString(),
                      time: response.sprint_time.toString(),
                  }),
              }
            : {}),
    });
}
