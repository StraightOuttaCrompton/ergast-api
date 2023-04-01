import { Prisma, status } from "@prisma/client";
import Status from "../responseDtos/Status.dto";

export function formatRawStatus(statusResponse: status & { count: bigint }): Status {
    const { statusId, status, count } = statusResponse;

    return {
        statusId: statusId.toString(),
        count: BigInt(count).toString(),
        status,
    };
}

export function formatPrismaStatus(
    statusResponse: status & {
        _count: Prisma.StatusCountOutputType;
    }
) {
    const { statusId, status, _count } = statusResponse;

    return new Status({
        statusId: statusId.toString(),
        count: _count.results.toString(),
        status,
    });
}
