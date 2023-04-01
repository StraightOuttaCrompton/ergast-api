import { Injectable } from "@nestjs/common";
import { pitStops, Prisma } from "@prisma/client";
import formatPitstopsResponse from "../../formatters/formatPitstops";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../consts";
import { PrismaService } from "../../prisma.service";
import { GetPitstopsDto } from "./dto/get-pitstops.dto";

@Injectable()
export class PitstopsService {
    constructor(private prisma: PrismaService) {}

    async getPitstops({ pitstopNumber, query }: { pitstopNumber?: number; query?: GetPitstopsDto }) {
        const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, year, round, driverId, lapNumber } = query;
        const pitstops = (await this.prisma.$queryRaw`

            SELECT 
                races.name as 'raceName', DATE_FORMAT(races.date, '%Y-%m-%d') AS 'raceDate', DATE_FORMAT(races.time, '%H:%i:%S') AS 'raceTime', races.url as 'raceUrl', 
                circuits.circuitRef, circuits.name as 'circuitName', circuits.location as 'circuitLocation', circuits.country as 'circuitCountry', circuits.lat as 'circuitLat', circuits.lng as 'circuitLng', circuits.alt as 'circuitAlt', circuits.url as 'circuitUrl',
     
                drivers.driverRef,
                pitStops.stop, pitStops.lap, DATE_FORMAT(pitStops.time, '%H:%i:%S') AS 'time', pitStops.duration 
            FROM pitStops, races, circuits, drivers
                
            WHERE races.circuitId=circuits.circuitId 
            AND pitStops.driverId=drivers.driverId 
            AND pitStops.raceId=races.raceId 
            AND races.year=${year} 
            AND races.round=${round}
            ${driverId !== undefined ? Prisma.sql`AND drivers.driverRef=${driverId}` : Prisma.empty}
            ${lapNumber !== undefined ? Prisma.sql`AND pitStops.lap=${lapNumber}` : Prisma.empty}
            ${pitstopNumber !== undefined ? Prisma.sql`AND pitStops.stop=${pitstopNumber}` : Prisma.empty}

            ORDER BY pitStops.time
            LIMIT ${offset}, ${limit}
        `) as (pitStops & {
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

        return formatPitstopsResponse(pitstops);
    }
}
