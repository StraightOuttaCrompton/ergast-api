import { Module } from "@nestjs/common";
import { ConstructorStandingsService } from "./constructorStandings.service";
import { ConstructorStandingsController } from "./constructorStandings.controller";

@Module({
    controllers: [ConstructorStandingsController],
    providers: [ConstructorStandingsService],
})
export class ConstructorStandingsModule {}
