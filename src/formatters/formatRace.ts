import { circuits, races } from "@prisma/client";
import Race from "src/types/Race";
import formatCircuit from "./formatCircuit";

export default function formatRace(response: { raceName: string; raceURL: string } & races & circuits): Race {
    return {
        season: response.year.toString(),
        round: response.round.toString(),
        url: response.raceURL,
        raceName: response.raceName,
        Circuit: formatCircuit(response),
        date: response.date?.toString(),
        time: response.time ? response.time.toString() + "Z" : undefined,

        ...(response.fp1_date && response.fp1_time
            ? {
                  FirstPractice: {
                      date: response.fp1_date.toString(),
                      time: response.fp1_time.toString() + "Z",
                  },
              }
            : {}),

        ...(response.fp2_date && response.fp2_time
            ? {
                  SecondPractice: {
                      date: response.fp2_date.toString(),
                      time: response.fp2_time.toString() + "Z",
                  },
              }
            : {}),

        ...(response.fp3_date && response.fp3_time
            ? {
                  ThirdPractice: {
                      date: response.fp3_date.toString(),
                      time: response.fp3_time.toString() + "Z",
                  },
              }
            : {}),

        ...(response.quali_date && response.quali_time
            ? {
                  Qualifying: {
                      date: response.quali_date.toString(),
                      time: response.quali_time.toString() + "Z",
                  },
              }
            : {}),

        ...(response.sprint_date && response.sprint_time
            ? {
                  Sprint: {
                      date: response.sprint_date.toString(),
                      time: response.sprint_time.toString() + "Z",
                  },
              }
            : {}),
    };
}
