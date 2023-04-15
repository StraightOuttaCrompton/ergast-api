import { Module } from "@nestjs/common";
import { DriverStandingsService } from "./driverStandings.service";
import { DriverStandingsController } from "./driverStandings.controller";

@Module({
    controllers: [DriverStandingsController],
    providers: [DriverStandingsService],
})
export class DriverStandingsModule {}
