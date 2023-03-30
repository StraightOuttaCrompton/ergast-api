import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, results } from "@prisma/client";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../consts";
import * as sql from "../../sql";
import { GetResultsDto } from "./dto/get-results.dto";
import formatResult from "../../formatters/formatResult";
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
            races.year AS 'raceYear', races.round AS 'raceRound', races.name AS 'raceName', DATE_FORMAT(races.date, '%Y-%m-%d') AS 'raceDate', DATE_FORMAT(races.time, '%H:%i:%S') AS 'raceTime', races.url AS 'raceUrl', 
            circuits.circuitRef, circuits.name, circuits.location, circuits.country, circuits.url, circuits.lat, circuits.lng, circuits.alt,
            results.*,
            drivers.driverRef, drivers.number 'driverNumber', drivers.code, drivers.forename, drivers.surname, DATE_FORMAT(drivers.dob, '%Y-%m-%d') AS 'dob', drivers.nationality, drivers.url AS 'driverUrl',
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
        `) as results[] & {
            raceName: string;
            raceDate: Date;
            raceTime: Date | null;
            raceUrl: string | null;
        };

        // return sqlResponse.map(formatResult);

        return sqlResponse;
    }

    async getResult(year: number, round: number) {
        const sqlResponse = (await prisma.$queryRaw`
            SELECT results.year, results.round, 
            results.name AS 'raceName', 
            results.url AS 'raceURL', 
            
            DATE_FORMAT(results.date, '%Y-%m-%d') AS 'date', DATE_FORMAT(results.time, '%H:%i:%S') AS 'time', 
            DATE_FORMAT(results.fp1_date, '%Y-%m-%d') AS 'fp1_date', DATE_FORMAT(results.fp1_time, '%H:%i:%S') AS 'fp1_time', 
            DATE_FORMAT(results.fp2_date, '%Y-%m-%d') AS 'fp2_date', DATE_FORMAT(results.fp2_time, '%H:%i:%S') AS 'fp2_time', 
            DATE_FORMAT(results.fp3_date, '%Y-%m-%d') AS 'fp3_date', DATE_FORMAT(results.fp3_time, '%H:%i:%S') AS 'fp3_time', 
            DATE_FORMAT(results.quali_date, '%Y-%m-%d') AS 'quali_date', DATE_FORMAT(results.quali_time, '%H:%i:%S') AS 'quali_time', 
            DATE_FORMAT(results.sprint_date, '%Y-%m-%d') AS 'sprint_date', DATE_FORMAT(results.sprint_time, '%H:%i:%S') AS 'sprint_time', 
            
            circuits.*
            FROM results, circuits

            WHERE results.circuitId=circuits.circuitId

            ${sql.and.year({ year })}
            ${sql.and.round({ round })}
        `) as results[];

        if (!sqlResponse.length) {
            throw new NotFoundException();
        }

        return sqlResponse.map(formatResult)[0];
    }
}
