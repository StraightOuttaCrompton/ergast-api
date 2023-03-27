import { Module } from "@nestjs/common";
import { CircuitsService } from "./circuits.service";
import { CircuitsController } from "./circuits.controller";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [CircuitsController],
    providers: [CircuitsService, PrismaService],
})
export class CircuitsModule {}
