import { seasons } from "@prisma/client";
import Season from "../responseDtos/Season.dto";

export default function formatSeason(season: seasons): Season {
    return new Season({
        season: season.year.toString(),
        url: season.url,
    });
}
