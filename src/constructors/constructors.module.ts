import { Module } from "@nestjs/common";
import { ConstructorsService } from "./constructors.service";
import { ConstructorsController } from "./constructors.controller";
import { PrismaService } from "../prisma.service";

@Module({
    controllers: [ConstructorsController],
    providers: [ConstructorsService, PrismaService],
})
export class ConstructorsModule {}
