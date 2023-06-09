import { Injectable } from "@nestjs/common";
import { drivers, Prisma } from "@prisma/client";
import formatDriver from "../../formatters/formatDriver";
import { GetDriversDto } from "./dto/get-drivers.dto";
import { StandingParameterCombinationException } from "../../exceptions/StandingParameterCombinationException";
import prisma from "../../prisma";

@Injectable()
export class DriversService {
    async getDrivers({
        limit,
        offset,
        year,
        round,
        circuitId,
        constructorId,
        status,
        result,
        grid,
        fastest,
        driverStandings,
    }: GetDriversDto) {
        if (driverStandings && (circuitId || grid || result || status)) {
            throw new StandingParameterCombinationException();
        }

        const drivers = (await prisma.$queryRaw`
            SELECT DISTINCT drivers.*
            FROM drivers
            ${
                year !== undefined || circuitId !== undefined || driverStandings !== undefined
                    ? Prisma.sql`, races`
                    : Prisma.empty
            }
            ${
                year !== undefined ||
                constructorId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                result !== undefined ||
                circuitId !== undefined ||
                fastest !== undefined
                    ? Prisma.sql`, results`
                    : Prisma.empty
            }
            ${driverStandings !== undefined ? Prisma.sql`, driverStandings` : Prisma.empty}
            ${circuitId !== undefined ? Prisma.sql`, circuits` : Prisma.empty}
            ${constructorId !== undefined ? Prisma.sql`, constructors` : Prisma.empty}

            WHERE TRUE 

            ${(() => {
                if (driverStandings !== undefined) {
                    return Prisma.sql`
                        ${
                            year !== undefined || constructorId !== undefined
                                ? Prisma.sql`AND drivers.driverId=results.driverId`
                                : Prisma.empty
                        }
                        ${year !== undefined ? Prisma.sql`AND results.raceId=races.raceId` : Prisma.empty}
                        ${
                            constructorId !== undefined
                                ? Prisma.sql`AND results.constructorId=constructors.constructorId AND constructors.constructorRef=${constructorId}`
                                : Prisma.empty
                        }
                        ${
                            driverStandings !== undefined
                                ? Prisma.sql`AND driverStandings.positionText=${driverStandings}`
                                : Prisma.empty
                        }
                        AND driverStandings.raceId=races.raceId
                        AND drivers.driverId=driverStandings.driverId
                    `;
                } else {
                    return Prisma.sql`
                        ${
                            year !== undefined ||
                            constructorId !== undefined ||
                            status !== undefined ||
                            grid !== undefined ||
                            result !== undefined ||
                            circuitId !== undefined ||
                            fastest !== undefined
                                ? Prisma.sql`AND drivers.driverId=results.driverId`
                                : Prisma.empty
                        }
                        ${
                            year !== undefined || circuitId !== undefined
                                ? Prisma.sql`AND results.raceId=races.raceId`
                                : Prisma.empty
                        }
                        ${
                            circuitId !== undefined
                                ? Prisma.sql`AND races.circuitId=circuits.circuitId AND circuits.circuitRef=${circuitId}`
                                : Prisma.empty
                        }
                        ${
                            constructorId !== undefined
                                ? Prisma.sql`AND results.constructorId=constructors.constructorId AND constructors.constructorRef=${constructorId}`
                                : Prisma.empty
                        }
                        ${status !== undefined ? Prisma.sql`AND results.statusId=${status}` : Prisma.empty}
                        ${grid !== undefined ? Prisma.sql`AND results.grid=${grid}` : Prisma.empty}
                        ${fastest !== undefined ? Prisma.sql`AND results.rank=${fastest}` : Prisma.empty}
                        ${result !== undefined ? Prisma.sql`AND results.positionText=${result}` : Prisma.empty}
                    `;
                }
            })()}

            ${year !== undefined ? Prisma.sql`AND races.year=${year}` : Prisma.empty}

            ${(() => {
                if (round !== undefined) {
                    return Prisma.sql`AND races.round=${round}`;
                } else {
                    if (driverStandings) {
                        if (year) {
                            return Prisma.sql`AND races.round=(SELECT MAX(round) FROM races WHERE races.year=${year})`;
                        } else {
                            Prisma.sql`AND (races.year, races.round) IN (SELECT year, MAX(round) FROM races GROUP BY year)`;
                        }
                    }
                }
                return Prisma.empty;
            })()}
            ORDER BY drivers.surname, drivers.forename LIMIT ${offset}, ${limit}
        `) as drivers[];

        return drivers.map(formatDriver);
    }

    async getDriver(driverRef: string) {
        const driver = await prisma.drivers.findUnique({
            where: { driverRef },
        });

        return formatDriver(driver);
    }
}
