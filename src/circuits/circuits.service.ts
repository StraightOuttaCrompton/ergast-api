import { Injectable } from "@nestjs/common";
import { circuits } from "@prisma/client";
import * as sql from "../sql";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../consts";
import { PrismaService } from "../prisma.service";
import { GetCircuitsDto } from "./dto/get-circuits.dto";
import Circuit from "./types/Circuit";

@Injectable()
export class CircuitsService {
    constructor(private prisma: PrismaService) {}

    async getCircuits({
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
        year,
        round,
        driverId,
        constructorId,
        status,
        result,
        grid,
        fastest,
    }: GetCircuitsDto) {
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

        return circuits.map(this.formatCircuit);
    }

    async getCircuit(circuitRef: string) {
        const circuit = await this.prisma.circuits.findUnique({
            where: { circuitRef },
        });

        return this.formatCircuit(circuit);
    }

    private formatCircuit(circuit: circuits): Circuit {
        return {
            circuitId: circuit.circuitRef,
            url: circuit.url,
            circuitName: circuit.name,
            Location: {
                // TODO: don't default to 0 here. Remove toPrecision and number cast
                lat: (+(circuit.lat || 0).toPrecision(6)).toString() || "",
                long: (+(circuit.lng || 0).toPrecision(6)).toString() || "",
                // alt: circuit.alt != null ? circuit.alt.toString() : "N/D", // TODO: include
                locality: circuit.location || "",
                country: circuit.country || "",
            },
        };
    }
}
