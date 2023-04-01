import { Injectable } from "@nestjs/common";
import { seasons, Prisma } from "@prisma/client";
import * as sql from "../../sql";
import { PrismaService } from "../../prisma.service";
import { GetSeasonsDto } from "./dto/get-seasons.dto";
import formatSeason from "../../formatters/formatSeason";
import { StandingParameterCombinationException } from "../../exceptions/StandingParameterCombinationException";

// TODO: doesn't work for driverId, combined with constructorStandings

@Injectable()
export class SeasonsService {
    constructor(private prisma: PrismaService) {}

    async getSeasons({
        limit,
        offset,
        driverId,
        constructorId,
        circuitId,
        status,
        result,
        grid,
        fastest,
        driverStandings,
        constructorStandings,
    }: GetSeasonsDto) {
        if ((driverStandings || constructorStandings) && (circuitId || grid || result || status)) {
            throw new StandingParameterCombinationException();
        }

        const seasons = (await this.prisma.$queryRaw`
            SELECT DISTINCT seasons.year, seasons.url 
            FROM seasons

            ${sql.tables.drivers({ driverId })}
            ${sql.tables.constructors({ constructorId })}

            ${(() => {
                if (sql.oneOf({ driverStandings, constructorStandings })) {
                    return Prisma.sql`
                        , races
                        ${sql.oneOf({ driverStandings, driverId }) ? Prisma.sql`, driverStandings` : Prisma.empty}
                        ${
                            sql.oneOf({ constructorStandings, constructorId })
                                ? Prisma.sql`, constructorStandings`
                                : Prisma.empty
                        }
                    `;
                } else {
                    return Prisma.sql`
                        ${sql.tables.races({ circuitId, driverId, constructorId, status, result, grid, fastest })}
                        ${sql.tables.results({ driverId, constructorId, status, result, grid, fastest })}
                        ${sql.tables.circuits({ circuitId })}
                    `;
                }
            })()}

            WHERE TRUE 

            ${(() => {
                if (sql.oneOf({ driverStandings, constructorStandings })) {
                    return Prisma.sql`
                        AND seasons.year=races.year
                        ${
                            sql.oneOf({ constructorStandings, constructorId })
                                ? Prisma.sql`AND constructorStandings.raceId=races.raceId`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ constructorId })
                                ? Prisma.sql`AND constructorStandings.constructorId=constructors.constructorId AND constructors.constructorRef=${constructorId}`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ constructorStandings })
                                ? Prisma.sql`AND constructorStandings.positionText=${constructorStandings}`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ driverStandings, driverId })
                                ? Prisma.sql`AND driverStandings.raceId=races.raceId`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ driverId })
                                ? Prisma.sql`AND driverStandings.driverId=drivers.driverId AND drivers.driverRef=${driverId}`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ driverStandings })
                                ? Prisma.sql`AND driverStandings.positionText=${driverStandings}`
                                : Prisma.empty
                        }
                        AND (races.year, races.round) IN (SELECT year, MAX(round) FROM races GROUP BY year)
                    `;
                } else {
                    return Prisma.sql`
                        ${
                            sql.oneOf({ circuitId, driverId, constructorId, status, result, grid, fastest })
                                ? Prisma.sql`AND seasons.year=races.year`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ circuitId })
                                ? Prisma.sql`AND races.circuitId=circuits.circuitId AND circuits.circuitRef=${circuitId}`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ driverId, constructorId, status, result, grid, fastest })
                                ? Prisma.sql`AND races.raceId=results.raceId`
                                : Prisma.empty
                        }
                        ${
                            sql.oneOf({ constructorId })
                                ? Prisma.sql`AND results.constructorId=constructors.constructorId AND constructors.constructorRef=${constructorId}`
                                : Prisma.empty
                        }
                        ${sql.and.drivers({ driverId })}
                        ${sql.and.status({ status })}
                        ${sql.and.grid({ grid })}
                        ${sql.and.fastest({ fastest })}
                        ${sql.and.result({ result })}
                        ${sql.and.result({ result })}
                    `;
                }
            })()}

            ORDER BY seasons.year LIMIT ${offset}, ${limit}
        `) as seasons[];

        return seasons.map(formatSeason);
    }

    async getSeason(year: number) {
        const circuit = await this.prisma.seasons.findUnique({
            where: { year },
        });

        return formatSeason(circuit);
    }
}
