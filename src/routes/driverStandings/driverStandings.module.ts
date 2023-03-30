import { Module } from "@nestjs/common";
import { DriverStandingsService } from "./driverStandings.service";
import { DriverStandingsController } from "./driverStandings.controller";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [DriverStandingsController],
    providers: [DriverStandingsService, PrismaService],
})
export class DriverStandingsModule {}
