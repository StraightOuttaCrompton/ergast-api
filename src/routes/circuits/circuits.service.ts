import { Injectable } from "@nestjs/common";
import { circuits } from "@prisma/client";
import * as sql from "../../sql";
import { PrismaService } from "../../prisma.service";
import { GetCircuitsParamsDto } from "./dto/get-circuits.dto";
import formatCircuit from "../../formatters/formatCircuit";

@Injectable()
export class CircuitsService {
    constructor(private prisma: PrismaService) {}

    async getCircuits({
        limit,
        offset,
        year,
        round,
        driverId,
        constructorId,
        status,
        result,
        grid,
        fastest,
    }: GetCircuitsParamsDto) {
        const circuits = (await this.prisma.$queryRaw`
            SELECT DISTINCT circuits.circuitRef, circuits.name, circuits.location, circuits.country, circuits.lat, circuits.lng, circuits.alt, circuits.url 
            FROM circuits 

            ${sql.tables.races({
                year,
                driverId,
                constructorId,
                status,
                grid,
                fastest,
                result,
            })}
            ${sql.tables.results({
                driverId,
                constructorId,
                status,
                grid,
                fastest,
                result,
            })}
            ${sql.tables.drivers({ driverId })}
            ${sql.tables.constructors({ constructorId })}

            WHERE TRUE 
            ${sql.and.circuits({
                year,
                driverId,
                constructorId,
                status,
                grid,
                fastest,
                result,
            })}
            ${sql.and.races({
                driverId,
                constructorId,
                status,
                grid,
                fastest,
                result,
            })}
            ${sql.and.constructors({ constructorId })}
            ${sql.and.drivers({ driverId })}
            ${sql.and.status({ status })}
            ${sql.and.grid({ grid })}
            ${sql.and.fastest({ fastest })}
            ${sql.and.result({ result })}
            ${sql.and.round({ round })}
            ${sql.and.year({ year })}

            ORDER BY circuits.circuitRef LIMIT ${offset}, ${limit}
        `) as circuits[];

        return circuits.map(formatCircuit);
    }

    async getCircuit(circuitRef: string) {
        const circuit = await this.prisma.circuits.findUnique({
            where: { circuitRef },
        });

        return formatCircuit(circuit);
    }

    private;
}
