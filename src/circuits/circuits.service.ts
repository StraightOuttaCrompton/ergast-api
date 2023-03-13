import { Injectable } from "@nestjs/common";
import { circuits } from "@prisma/client";
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
        const circuits = await this.prisma.circuits.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                circuitRef: "asc",
            },

            where: {
                races: {
                    some: {
                        year: year
                            ? {
                                  // TODO: allow for multiple
                                  in: [year],
                              }
                            : undefined,
                        round: round
                            ? {
                                  // TODO: allow for multiple
                                  in: [round],
                              }
                            : undefined,

                        results: {
                            some: {
                                driver: {
                                    driverRef: driverId
                                        ? {
                                              // TODO: allow for multiple
                                              in: [driverId],
                                          }
                                        : undefined,
                                },
                                constructorRelation: {
                                    constructorRef: constructorId
                                        ? {
                                              // TODO: allow for multiple
                                              in: [constructorId],
                                          }
                                        : undefined,
                                },
                                statusId: status
                                    ? {
                                          // TODO: allow for multiple
                                          in: [status],
                                      }
                                    : undefined,
                                positionText: result?.toString()
                                    ? {
                                          // TODO: allow for multiple
                                          in: [result.toString()],
                                      }
                                    : undefined,
                                grid: grid
                                    ? {
                                          // TODO: allow for multiple
                                          in: [grid],
                                      }
                                    : undefined,
                                rank: fastest
                                    ? {
                                          // TODO: allow for multiple
                                          in: [fastest],
                                      }
                                    : undefined,
                            },
                        },
                    },
                },
            },
        });

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
                // TODO: don't default to 0 here
                lat: (circuit.lat || 0).toString() || "",
                long: (circuit.lng || 0).toString() || "",
                // alt: circuit.alt != null ? circuit.alt.toString() : "N/D", // TODO: include
                locality: circuit.location || "",
                country: circuit.country || "",
            },
        };
    }
}
