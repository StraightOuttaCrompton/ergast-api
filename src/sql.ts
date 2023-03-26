import { Prisma } from "@prisma/client";

export function oneOf({
    year,
    round,
    driverId,
    constructorId,
    circuitId,
    status,
    grid,
    fastest,
    result,
    driverStandings,
    constructorStandings,
}: {
    year?: number;
    round?: number;
    driverId?: string;
    constructorId?: string;
    circuitId?: string;
    status?: number;
    grid?: number;
    fastest?: number;
    result?: number;
    driverStandings?: number;
    constructorStandings?: number;
}) {
    return (
        year !== undefined ||
        round !== undefined ||
        driverId !== undefined ||
        constructorId !== undefined ||
        circuitId !== undefined ||
        status !== undefined ||
        grid !== undefined ||
        fastest !== undefined ||
        result !== undefined ||
        driverStandings !== undefined ||
        constructorStandings !== undefined
    );
}

/**
 * Tables
 */

function appendRacesTable(params: {
    year?: number;
    circuitId?: string;
    driverId?: string;
    constructorId?: string;
    status?: number;
    grid?: number;
    fastest?: number;
    result?: number;
    constructorStandings?: number;
}) {
    if (oneOf(params)) {
        return Prisma.sql`, races`;
    }

    return Prisma.empty;
}

function appendResultsTable(params: {
    year?: number;
    driverId: string | undefined;
    constructorId?: string;
    circuitId?: string;
    status: number | undefined;
    grid: number | undefined;
    fastest: number | undefined;
    result: number | undefined;
}) {
    if (oneOf(params)) {
        return Prisma.sql`, results`;
    }

    return Prisma.empty;
}

function appendDriversTable({ driverId }: { driverId: string | undefined }) {
    if (driverId !== undefined) {
        return Prisma.sql`, drivers`;
    }

    return Prisma.empty;
}

function appendConstructorsTable({ constructorId }: { constructorId: string | undefined }) {
    if (constructorId !== undefined) {
        return Prisma.sql`, constructors`;
    }

    return Prisma.empty;
}

function appendCircuitsTable({ circuitId }: { circuitId: string | undefined }) {
    if (circuitId !== undefined) {
        return Prisma.sql`, circuits`;
    }

    return Prisma.empty;
}

function appendConstructorStandingsTable({ constructorStandings }: { constructorStandings: number | undefined }) {
    if (constructorStandings !== undefined) {
        return Prisma.sql`, constructorStandings`;
    }

    return Prisma.empty;
}

export const tables = {
    races: appendRacesTable,
    results: appendResultsTable,
    drivers: appendDriversTable,
    constructors: appendConstructorsTable,
    circuits: appendCircuitsTable,
    constructorStandings: appendConstructorStandingsTable,
};

/**
 * Joins
 */
function andCircuits(params: {
    year: number | undefined;
    driverId: string | undefined;
    constructorId: string | undefined;
    status: number | undefined;
    grid: number | undefined;
    fastest: number | undefined;
    result: number | undefined;
}) {
    if (oneOf(params)) {
        return Prisma.sql`AND races.circuitId=circuits.circuitId`;
    }

    return Prisma.empty;
}

function andRaces(params: {
    driverId: string | undefined;
    constructorId: string | undefined;
    status: number | undefined;
    grid: number | undefined;
    fastest: number | undefined;
    result: number | undefined;
}) {
    if (oneOf(params)) {
        return Prisma.sql`AND results.raceId=races.raceId`;
    }

    return Prisma.empty;
}

function andConstructors({ constructorId }: { constructorId: string | undefined }) {
    if (constructorId !== undefined) {
        return Prisma.sql`AND results.constructorId=constructors.constructorId AND constructors.constructorRef=${constructorId}`;
    }

    return Prisma.empty;
}

function andDrivers({ driverId }: { driverId: string | undefined }) {
    if (driverId !== undefined) {
        return Prisma.sql`AND results.driverId=drivers.driverId AND drivers.driverRef=${driverId}`;
    }

    return Prisma.empty;
}

function andStatus({ status }: { status: number | undefined }) {
    if (status !== undefined) {
        return Prisma.sql`AND results.statusId=${status}`;
    }

    return Prisma.empty;
}

function andGrid({ grid }: { grid: number | undefined }) {
    if (grid !== undefined) {
        return Prisma.sql`AND results.grid=${grid}`;
    }

    return Prisma.empty;
}

function andFastest({ fastest }: { fastest: number | undefined }) {
    if (fastest !== undefined) {
        return Prisma.sql`AND results.rank=${fastest}`;
    }

    return Prisma.empty;
}

function andResult({ result }: { result: number | undefined }) {
    if (result !== undefined) {
        return Prisma.sql`AND results.positionText=${result}`;
    }

    return Prisma.empty;
}

function andRound({ round }: { round: number | undefined }) {
    if (round !== undefined) {
        return Prisma.sql`AND races.round=${round}`;
    }

    return Prisma.empty;
}

function andYear({ year }: { year: number | undefined }) {
    if (year !== undefined) {
        return Prisma.sql`AND races.year=${year}`;
    }

    return Prisma.empty;
}

export const and = {
    circuits: andCircuits,
    races: andRaces,
    constructors: andConstructors,
    drivers: andDrivers,
    status: andStatus,
    grid: andGrid,
    fastest: andFastest,
    result: andResult,
    round: andRound,
    year: andYear,
};
