import { Module } from "@nestjs/common";
import { PitstopsService } from "./pitstops.service";
import { PitstopsController } from "./pitstops.controller";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [PitstopsController],
    providers: [PitstopsService, PrismaService],
})
export class PitstopsModule {}
