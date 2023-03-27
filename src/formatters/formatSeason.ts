import { seasons } from "@prisma/client";
import Season from "../types/Season";

export default function formatSeason(season: seasons): Season {
    return {
        season: season.year.toString(),
        url: season.url,
    };
}
