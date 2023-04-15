import { Module } from "@nestjs/common";
import { LapsService } from "./laps.service";
import { LapsController } from "./laps.controller";

@Module({
    controllers: [LapsController],
    providers: [LapsService],
})
export class LapsModule {}
