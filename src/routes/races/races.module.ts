import { Module } from "@nestjs/common";
import { RacesService } from "./races.service";
import { RacesController } from "./races.controller";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [RacesController],
    providers: [RacesService, PrismaService],
})
export class RacesModule {}
