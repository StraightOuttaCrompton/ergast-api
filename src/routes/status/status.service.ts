import { Injectable } from "@nestjs/common";
import { status, Prisma } from "@prisma/client";
import { formatPrismaStatus, formatRawStatus } from "../../formatters/formatStatus";
import prisma from "../../prisma";
import { GetStatusDto } from "./dto/get-status.dto";
import * as sql from "../../sql";

@Injectable()
export class StatusService {
    async getStatuses({
        limit,
        offset,
        year,
        round,
        driverId,
        circuitId,
        constructorId,
        grid,
        result,
        fastest,
    }: GetStatusDto) {
        const status = (await prisma.$queryRaw`
            SELECT DISTINCT 
                status.statusId, status.status, COUNT(*) AS 'count'
                FROM status, results

                ${sql.tables.races({ year, round, circuitId })}
                ${sql.tables.drivers({ driverId })}
                ${sql.tables.constructors({ constructorId })}
                ${sql.tables.circuits({ circuitId })}
            
            WHERE TRUE
                AND results.statusId=status.statusId
                ${sql.and.races({ year, round, circuitId })}
                ${sql.and.constructors({ constructorId })}
                ${sql.and.drivers({ driverId })}
                ${
                    circuitId !== undefined
                        ? Prisma.sql`AND races.circuitId=circuits.circuitId AND circuits.circuitRef=${circuitId}`
                        : Prisma.empty
                }
                ${sql.and.grid({ grid })}
                ${sql.and.fastest({ fastest })}
                ${result !== undefined ? Prisma.sql`AND results.positionText=${result}` : Prisma.empty}
                ${sql.and.year({ year })}
                ${sql.and.round({ round })}

            GROUP BY status.statusId 
            ORDER BY status.statusId 
            LIMIT ${offset}, ${limit}
        `) as (status & { count: bigint })[];

        return status.map(formatRawStatus);
    }

    async getStatusById(statusId: number) {
        const status = await prisma.status.findUnique({
            where: { statusId },
            include: {
                _count: true,
            },
        });

        status._count.results;

        return formatPrismaStatus(status);
    }
}
