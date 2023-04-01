import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, races, circuits } from "@prisma/client";
import * as sql from "../../sql";
import { PrismaService } from "../../prisma.service";
import { GetRacesDto } from "./dto/get-races.dto";
import formatRace from "../../formatters/formatRace";

@Injectable()
export class RacesService {
    constructor(private prisma: PrismaService) {}

    async getRaces({
        limit,
        offset,
        year,
        round,
        driverId,
        constructorId,
        circuitId,
        status,
        result,
        grid,
        fastest,
    }: GetRacesDto) {
        const sqlResponse = (await this.prisma.$queryRaw`
            SELECT races.year, races.round, 
            races.name AS 'raceName', 
            races.url AS 'raceURL', 
            
            DATE_FORMAT(races.date, '%Y-%m-%d') AS 'date', DATE_FORMAT(races.time, '%H:%i:%S') AS 'time', 
            DATE_FORMAT(races.fp1_date, '%Y-%m-%d') AS 'fp1_date', DATE_FORMAT(races.fp1_time, '%H:%i:%S') AS 'fp1_time', 
            DATE_FORMAT(races.fp2_date, '%Y-%m-%d') AS 'fp2_date', DATE_FORMAT(races.fp2_time, '%H:%i:%S') AS 'fp2_time', 
            DATE_FORMAT(races.fp3_date, '%Y-%m-%d') AS 'fp3_date', DATE_FORMAT(races.fp3_time, '%H:%i:%S') AS 'fp3_time', 
            DATE_FORMAT(races.quali_date, '%Y-%m-%d') AS 'quali_date', DATE_FORMAT(races.quali_time, '%H:%i:%S') AS 'quali_time', 
            DATE_FORMAT(races.sprint_date, '%Y-%m-%d') AS 'sprint_date', DATE_FORMAT(races.sprint_time, '%H:%i:%S') AS 'sprint_time', 
            
            circuits.*
            FROM races, circuits

            ${sql.tables.results({ driverId, constructorId, grid, result, status, fastest })}
            ${sql.tables.drivers({ driverId })}
            ${sql.tables.constructors({ constructorId })}

            WHERE races.circuitId=circuits.circuitId

            ${sql.and.year({ year })}
            ${sql.and.round({ round })}
            ${sql.oneOf({ circuitId }) ? Prisma.sql`AND circuits.circuitRef=${circuitId}` : Prisma.empty}
            ${
                sql.oneOf({ driverId, constructorId, grid, result, status, fastest })
                    ? Prisma.sql`AND races.raceId=results.raceId`
                    : Prisma.empty
            }
            ${sql.and.constructors({ constructorId })}
            ${sql.and.drivers({ driverId })}
            ${sql.and.status({ status })}
            ${sql.and.grid({ grid })}
            ${sql.and.fastest({ fastest })}
            ${sql.and.result({ result })}

            ORDER BY races.year, races.round LIMIT ${offset}, ${limit}
        `) as { raceName: string; raceURL: string } & races & circuits[];

        return sqlResponse.map(formatRace);
    }

    async getRace(year: number, round: number) {
        const sqlResponse = (await this.prisma.$queryRaw`
            SELECT races.year, races.round, 
            races.name AS 'raceName', 
            races.url AS 'raceURL', 
            
            DATE_FORMAT(races.date, '%Y-%m-%d') AS 'date', DATE_FORMAT(races.time, '%H:%i:%S') AS 'time', 
            DATE_FORMAT(races.fp1_date, '%Y-%m-%d') AS 'fp1_date', DATE_FORMAT(races.fp1_time, '%H:%i:%S') AS 'fp1_time', 
            DATE_FORMAT(races.fp2_date, '%Y-%m-%d') AS 'fp2_date', DATE_FORMAT(races.fp2_time, '%H:%i:%S') AS 'fp2_time', 
            DATE_FORMAT(races.fp3_date, '%Y-%m-%d') AS 'fp3_date', DATE_FORMAT(races.fp3_time, '%H:%i:%S') AS 'fp3_time', 
            DATE_FORMAT(races.quali_date, '%Y-%m-%d') AS 'quali_date', DATE_FORMAT(races.quali_time, '%H:%i:%S') AS 'quali_time', 
            DATE_FORMAT(races.sprint_date, '%Y-%m-%d') AS 'sprint_date', DATE_FORMAT(races.sprint_time, '%H:%i:%S') AS 'sprint_time', 
            
            circuits.*
            FROM races, circuits

            WHERE races.circuitId=circuits.circuitId

            ${sql.and.year({ year })}
            ${sql.and.round({ round })}
        `) as { raceName: string; raceURL: string } & races & circuits[];

        if (!sqlResponse.length) {
            throw new NotFoundException();
        }

        return sqlResponse.map(formatRace)[0];
    }
}
