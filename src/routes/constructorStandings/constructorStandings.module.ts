import { Module } from "@nestjs/common";
import { ConstructorStandingsService } from "./constructorStandings.service";
import { ConstructorStandingsController } from "./constructorStandings.controller";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [ConstructorStandingsController],
    providers: [ConstructorStandingsService, PrismaService],
})
export class ConstructorStandingsModule {}
