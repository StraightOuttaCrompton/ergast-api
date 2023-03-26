import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { constructors, Prisma } from "@prisma/client";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../consts";
import { PrismaService } from "../prisma.service";
import { GetConstructorsDto } from "./dto/get-constructors.dto";
import Constructor from "./types/Constructor";

@Injectable()
export class ConstructorsService {
    constructor(private prisma: PrismaService) {}

    async getConstructors({
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
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
            throw new HttpException(
                "Cannot combine standings with circuit, grid, result or status qualifiers.",
                HttpStatus.BAD_REQUEST
            );
        }

        const constructors = (await this.prisma.$queryRaw`
            SELECT DISTINCT constructors.* 
            FROM constructors
            ${
                year !== undefined || circuitId !== undefined || constructorStandings !== undefined
                    ? Prisma.sql`, races`
                    : Prisma.empty
            }
            ${
                year !== undefined ||
                driverId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                result !== undefined ||
                circuitId !== undefined ||
                fastest !== undefined
                    ? Prisma.sql`, results`
                    : Prisma.empty
            }
            ${constructorStandings !== undefined ? Prisma.sql`, constructorStandings` : Prisma.empty}
            ${circuitId !== undefined ? Prisma.sql`, circuits` : Prisma.empty}
            ${driverId !== undefined ? Prisma.sql`, drivers` : Prisma.empty}

            WHERE TRUE 

            ${
                year !== undefined ||
                driverId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                result !== undefined ||
                circuitId !== undefined ||
                fastest !== undefined
                    ? Prisma.sql`AND constructors.constructorId = results.constructorId`
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
                driverId !== undefined
                    ? Prisma.sql`AND results.driverId=drivers.driverId AND drivers.driverRef=${driverId}`
                    : Prisma.empty
            }
            ${status !== undefined ? Prisma.sql`AND results.statusId=${status}` : Prisma.empty}
            ${grid !== undefined ? Prisma.sql`AND results.grid=${grid}` : Prisma.empty}
            ${fastest !== undefined ? Prisma.sql`AND results.rank=${fastest}` : Prisma.empty}
            ${result !== undefined ? Prisma.sql`AND results.positionText=${result}` : Prisma.empty}

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
            ${year !== undefined ? Prisma.sql`AND races.year=${year}` : Prisma.empty}


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

        return constructors.map(this.formatConstructor);
    }

    async getConstructor(constructorRef: string) {
        const constructor = await this.prisma.constructors.findUnique({
            where: { constructorRef },
        });

        return this.formatConstructor(constructor);
    }

    private formatConstructor(constructor: constructors): Constructor {
        return {
            constructorId: constructor.constructorRef,
            url: constructor.url,
            name: constructor.name,
            nationality: constructor.nationality,
        };
    }
}
