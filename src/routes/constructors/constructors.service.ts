import { Injectable } from "@nestjs/common";
import { constructors, Prisma } from "@prisma/client";
import * as sql from "../../sql";
import { GetConstructorsDto } from "./dto/get-constructors.dto";
import formatConstructor from "../../formatters/formatConstructor";
import { StandingParameterCombinationException } from "../../exceptions/StandingParameterCombinationException";
import prisma from "../../prisma";

@Injectable()
export class ConstructorsService {
    async getConstructors({
        limit,
        offset,
        year,
        round,
        circuitId,
        driverId,
        status,
        result,
        grid,
        fastest,
        constructorStandings,
    }: GetConstructorsDto) {
        if (constructorStandings && (circuitId || grid || result || status)) {
            throw new StandingParameterCombinationException();
        }

        const constructors = (await prisma.$queryRaw`
            SELECT DISTINCT constructors.* 
            FROM constructors
            ${sql.tables.races({ year, circuitId, constructorStandings })}
            ${sql.tables.results({ year, driverId, circuitId, status, grid, result, fastest })}

            ${sql.tables.drivers({ driverId })}
            ${sql.tables.circuits({ circuitId })}
            ${sql.tables.constructorStandings({ constructorStandings })}

            WHERE TRUE 

            ${
                sql.oneOf({
                    year,
                    driverId,
                    status,
                    grid,
                    result,
                    circuitId,
                    fastest,
                })
                    ? Prisma.sql`AND constructors.constructorId = results.constructorId`
                    : Prisma.empty
            }
            ${sql.oneOf({ year, circuitId }) ? Prisma.sql`AND results.raceId=races.raceId` : Prisma.empty}
            ${
                circuitId !== undefined
                    ? Prisma.sql`AND races.circuitId=circuits.circuitId AND circuits.circuitRef=${circuitId}`
                    : Prisma.empty
            }
            ${sql.and.drivers({ driverId })}
            ${sql.and.status({ status })}
            ${sql.and.grid({ grid })}
            ${sql.and.fastest({ fastest })}
            ${sql.and.result({ result })}

            ${
                constructorStandings !== undefined && driverId !== undefined
                    ? Prisma.sql`AND driverStandings.raceId=races.raceId AND drivers.driverId=driverStandings.driverId`
                    : Prisma.empty
            }

            ${
                constructorStandings !== undefined
                    ? Prisma.sql`AND constructorStandings.positionText=${constructorStandings} AND constructorStandings.constructorId=constructors.constructorId AND constructorStandings.raceId=races.raceId`
                    : Prisma.empty
            }
            ${
                constructorStandings !== undefined && driverId !== undefined
                    ? Prisma.sql`AND driverStandings.constructorId=constructorStandings.constructorId`
                    : Prisma.empty
            }
            ${sql.and.year({ year })}

            ${(() => {
                if (round !== undefined) {
                    return Prisma.sql`AND races.round=${round}`;
                } else {
                    if (constructorStandings) {
                        if (year) {
                            return Prisma.sql`AND races.round=(SELECT MAX(round) FROM races WHERE races.year=${year})`;
                        } else {
                            Prisma.sql`AND (races.year, races.round) IN (SELECT year, MAX(round) FROM races GROUP BY year)`;
                        }
                    }
                }
                return Prisma.empty;
            })()}
            ORDER BY constructors.name LIMIT ${offset}, ${limit}
        `) as constructors[];

        return constructors.map(formatConstructor);
    }

    async getConstructor(constructorRef: string) {
        const constructor = await prisma.constructors.findUnique({
            where: { constructorRef },
        });

        return formatConstructor(constructor);
    }
}
