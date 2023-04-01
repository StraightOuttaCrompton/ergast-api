import { Injectable } from "@nestjs/common";
import { drivers, driverStandings, Prisma } from "@prisma/client";
import { formatDriverStandingsResponse } from "../../formatters/formatStandings";
import { PrismaService } from "../../prisma.service";
import { GetDriverStandingsDto } from "./dto/get-driver-standings.dto";
import * as sql from "../../sql";

@Injectable()
export class DriverStandingsService {
    constructor(private prisma: PrismaService) {}

    async getDriverStandings({ limit, offset, year, round, driverId, position }: GetDriverStandingsDto) {
        const driverStandings = (await this.prisma.$queryRaw`
            SELECT DISTINCT 
                drivers.driverId, drivers.driverRef, drivers.number, drivers.code, drivers.forename, drivers.surname, drivers.dob, drivers.nationality, drivers.url, 
                driverStandings.points, driverStandings.position, driverStandings.positionText, driverStandings.wins, 
                races.year, races.round
            FROM drivers, driverStandings, races
            
            WHERE driverStandings.raceId=races.raceId AND driverStandings.driverId=drivers.driverId

            ${position !== undefined ? Prisma.sql`AND driverStandings.positionText=${position}` : Prisma.empty}
            ${driverId !== undefined ? Prisma.sql`AND drivers.driverRef=${driverId}` : Prisma.empty}
            ${sql.and.year({ year })}
            
            ${(() => {
                if (round) {
                    return Prisma.sql`AND races.round=${round}`;
                } else {
                    if (year) {
                        return Prisma.sql`AND races.round=(SELECT MAX(round) FROM driverStandings, races WHERE driverStandings.raceId=races.raceId AND races.year=${year})`;
                    } else {
                        return Prisma.sql`AND (races.year, races.round) IN (SELECT year, MAX(round) FROM races GROUP BY year)`;
                    }
                }
            })()}
  
            ORDER BY races.year, driverStandings.position LIMIT ${offset}, ${limit}
        `) as (driverStandings & drivers & { year: number; round: number })[];

        return formatDriverStandingsResponse(driverStandings);
    }
}
