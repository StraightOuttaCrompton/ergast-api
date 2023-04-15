import { Injectable } from "@nestjs/common";
import { constructors, constructorStandings, Prisma } from "@prisma/client";
import { formatConstructorStandingsResponse } from "../../formatters/formatStandings";
import { GetConstructorStandingsDto } from "./dto/get-constructor-standings.dto";
import * as sql from "../../sql";
import prisma from "../../prisma";

@Injectable()
export class ConstructorStandingsService {
    async getConstructorStandings({ limit, offset, year, round, constructorId, position }: GetConstructorStandingsDto) {
        const constructorStandings = (await prisma.$queryRaw`
            SELECT DISTINCT 
                constructors.constructorRef, constructors.name, constructors.nationality, constructors.url, constructorStandings.points,
                constructorStandings.position, constructorStandings.positionText, constructorStandings.wins, 
                races.year, races.round
            FROM constructors, constructorStandings, races
            WHERE constructorStandings.raceId=races.raceId AND constructorStandings.constructorId=constructors.constructorId

            ${position !== undefined ? Prisma.sql`AND constructorStandings.positionText=${position}` : Prisma.empty}
            ${constructorId !== undefined ? Prisma.sql`AND constructors.constructorRef=${constructorId}` : Prisma.empty}
            ${sql.and.year({ year })}
            
            ${(() => {
                if (round) {
                    return Prisma.sql`AND races.round=${round}`;
                } else {
                    if (year) {
                        return Prisma.sql`AND races.round=(SELECT MAX(round) FROM constructorStandings, races WHERE constructorStandings.raceId=races.raceId AND races.year=${year})`;
                    } else {
                        return Prisma.sql`AND (races.year, races.round) IN (SELECT year, MAX(round) FROM races GROUP BY year)`;
                    }
                }
            })()}
  
            ORDER BY races.year, constructorStandings.position LIMIT ${offset}, ${limit}
        `) as (constructorStandings & constructors & { year: number; round: number })[];

        return formatConstructorStandingsResponse(constructorStandings);
    }
}
