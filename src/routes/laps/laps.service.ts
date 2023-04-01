import { Injectable } from "@nestjs/common";
import { lapTimes, Prisma } from "@prisma/client";
import formatLapsResponse from "../../formatters/formatLaps";
import { PrismaService } from "../../prisma.service";
import { GetLapsDto } from "./dto/get-laps.dto";

@Injectable()
export class LapsService {
    constructor(private prisma: PrismaService) {}

    async getLaps({ lapNumber, query }: { lapNumber?: number; query?: GetLapsDto }) {
        const { limit, offset, year, round, driverId } = query;
        const laps = (await this.prisma.$queryRaw`
            SELECT 
                races.name as 'raceName', DATE_FORMAT(races.date, '%Y-%m-%d') AS 'raceDate', DATE_FORMAT(races.time, '%H:%i:%S') AS 'raceTime', races.url as 'raceUrl', 
                circuits.circuitRef, circuits.name as 'circuitName', circuits.location as 'circuitLocation', circuits.country as 'circuitCountry', circuits.lat as 'circuitLat', circuits.lng as 'circuitLng', circuits.alt as 'circuitAlt', circuits.url as 'circuitUrl',
                drivers.driverRef, 
                lapTimes.lap, lapTimes.position, lapTimes.time 
            
            FROM lapTimes, races, circuits, drivers
                 
            WHERE races.circuitId=circuits.circuitId 
            AND lapTimes.driverId=drivers.driverId 
            AND lapTimes.raceId=races.raceId 
            AND races.year=${year} 
            AND races.round=${round}
            ${driverId !== undefined ? Prisma.sql`AND drivers.driverRef=${driverId}` : Prisma.empty}
            ${lapNumber !== undefined ? Prisma.sql`AND lapTimes.lap=${lapNumber}` : Prisma.empty}

            ORDER BY lapTimes.lap, lapTimes.position
            LIMIT ${offset}, ${limit}
        `) as (lapTimes & {
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
        } & { driverRef: string })[];

        return formatLapsResponse(laps);
    }
}
