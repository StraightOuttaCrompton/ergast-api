import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, results, status } from "@prisma/client";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../consts";
import * as sql from "../../sql";
import { GetResultsDto } from "./dto/get-results.dto";
import formatResultResponse from "../../formatters/formatResult";
import prisma from "../../prisma";

@Injectable()
export class ResultsService {
    async getResults({
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
        year,
        round,
        driverId,
        constructorId,
        circuitId,
        status,
        grid,
        fastest,
    }: GetResultsDto) {
        const sqlResponse = (await prisma.$queryRaw`
            SELECT 
            races.year AS 'year', races.round AS 'round', races.name AS 'raceName', DATE_FORMAT(races.date, '%Y-%m-%d') AS 'raceDate', DATE_FORMAT(races.time, '%H:%i:%S') AS 'raceTime', races.url AS 'raceUrl', 
            circuits.circuitRef, circuits.name AS 'circuitName', circuits.location AS 'circuitLocation', circuits.country AS 'circuitCountry', circuits.url AS 'circuitUrl', circuits.lat AS 'circuitLat', circuits.lng AS 'circuitLng', circuits.alt AS 'circuitAlt',
            results.*,
            drivers.driverRef, drivers.number AS 'driverNumber', drivers.code AS 'driverCode', drivers.forename AS 'driverForename', drivers.surname AS 'driverSurname', drivers.dob AS 'driverDob', drivers.nationality AS 'driverNationality', drivers.url AS 'driverUrl',
            status.statusId, status.status,
            constructors.constructorRef, constructors.name AS 'constructorName', constructors.nationality AS 'constructorNationality', constructors.url AS 'constructorUrl'
            
            FROM races, circuits, results, drivers, constructors, status
            
            WHERE races.circuitId=circuits.circuitId 
            AND races.raceId=results.raceId 
            AND results.driverId=drivers.driverId 
            AND results.constructorId=constructors.constructorId 
            AND results.statusId=status.statusId
   
            ${sql.and.year({ year })}
            ${sql.and.round({ round })}

            ${circuitId !== undefined ? Prisma.sql`AND circuits.circuitRef=${circuitId}` : Prisma.empty}
            ${constructorId !== undefined ? Prisma.sql`AND constructors.constructorRef=${constructorId}` : Prisma.empty}
            ${driverId !== undefined ? Prisma.sql`AND drivers.driverRef=${driverId}` : Prisma.empty}

            ${sql.and.status({ status })}
            ${sql.and.grid({ grid })}
            ${sql.and.fastest({ fastest })}

            ORDER BY races.year, races.round, results.positionOrder LIMIT ${offset}, ${limit}
        `) as (results &
            status & {
                year: number;
                round: number;
                raceName: string;
                raceDate: Date;
                raceTime: Date | null;
                raceUrl: string | null;
            } & {
                circuitRef: string;
                circuitName: string;
                circuitLocation: string;
                circuitCountry: string;
                circuitUrl: string;
                circuitLat: number;
                circuitLng: number;
                circuitAlt: number;
            } & {
                driverRef: string;
                driverNumber: number | null;
                driverCode: string | null;
                driverForename: string;
                driverSurname: string;
                driverDob: Date;
                driverNationality: string;
                driverUrl: string;
            } & {
                constructorRef: string;
                constructorName: string;
                constructorNationality: string;
                constructorUrl: string;
            })[];

        return formatResultResponse(sqlResponse);
    }

    async getResult(year: number, round: number) {
        const sqlResponse = (await prisma.$queryRaw`
            SELECT 
            races.year AS 'year', races.round AS 'round', races.name AS 'raceName', DATE_FORMAT(races.date, '%Y-%m-%d') AS 'raceDate', DATE_FORMAT(races.time, '%H:%i:%S') AS 'raceTime', races.url AS 'raceUrl', 
            circuits.circuitRef, circuits.name AS 'circuitName', circuits.location AS 'circuitLocation', circuits.country AS 'circuitCountry', circuits.url AS 'circuitUrl', circuits.lat AS 'circuitLat', circuits.lng AS 'circuitLng', circuits.alt AS 'circuitAlt',
            results.*,
            drivers.driverRef, drivers.number AS 'driverNumber', drivers.code AS 'driverCode', drivers.forename AS 'driverForename', drivers.surname AS 'driverSurname', drivers.dob AS 'driverDob', drivers.nationality AS 'driverNationality', drivers.url AS 'driverUrl',
            status.statusId, status.status,
            constructors.constructorRef, constructors.name AS 'constructorName', constructors.nationality AS 'constructorNationality', constructors.url AS 'constructorUrl'
            
            FROM races, circuits, results, drivers, constructors, status
            
            WHERE races.circuitId=circuits.circuitId 
            AND races.raceId=results.raceId 
            AND results.driverId=drivers.driverId 
            AND results.constructorId=constructors.constructorId 
            AND results.statusId=status.statusId
   
            ${sql.and.year({ year })}
            ${sql.and.round({ round })}
        `) as results[];

        if (!sqlResponse.length) {
            throw new NotFoundException();
        }
        return sqlResponse.map(formatRe)[0];
    }
}
