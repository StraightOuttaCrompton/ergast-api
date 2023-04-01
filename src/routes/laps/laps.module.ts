import { Module } from "@nestjs/common";
import { LapsService } from "./laps.service";
import { LapsController } from "./laps.controller";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [LapsController],
    providers: [LapsService, PrismaService],
})
export class LapsModule {}
