import { Injectable } from "@nestjs/common";
import { circuits, Prisma } from "@prisma/client";
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
            ${
                year !== undefined ||
                driverId !== undefined ||
                constructorId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                fastest !== undefined ||
                result !== undefined
                    ? Prisma.sql`, races`
                    : Prisma.empty
            }
            ${
                driverId !== undefined ||
                constructorId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                fastest !== undefined ||
                result !== undefined
                    ? Prisma.sql`, results`
                    : Prisma.empty
            }
            ${driverId !== undefined ? Prisma.sql`, drivers` : Prisma.empty}
            ${constructorId !== undefined ? Prisma.sql`, constructors` : Prisma.empty}

            WHERE TRUE 
            ${
                year !== undefined ||
                driverId !== undefined ||
                constructorId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                fastest !== undefined ||
                result !== undefined
                    ? Prisma.sql`AND races.circuitId=circuits.circuitId`
                    : Prisma.empty
            }
            ${
                driverId !== undefined ||
                constructorId !== undefined ||
                status !== undefined ||
                grid !== undefined ||
                fastest !== undefined ||
                result !== undefined
                    ? Prisma.sql`AND results.raceId=races.raceId`
                    : Prisma.empty
            }
            ${
                constructorId !== undefined
                    ? Prisma.sql`AND results.constructorId=constructors.constructorId AND constructors.constructorRef=${constructorId}`
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
            ${round !== undefined ? Prisma.sql`AND races.round=${round}` : Prisma.empty}
            ${year !== undefined ? Prisma.sql`AND races.year=${year}` : Prisma.empty}
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
