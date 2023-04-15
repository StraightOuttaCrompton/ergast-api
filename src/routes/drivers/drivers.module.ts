import { Module } from "@nestjs/common";
import { DriversService } from "./drivers.service";
import { DriversController } from "./drivers.controller";

@Module({
    controllers: [DriversController],
    providers: [DriversService],
})
export class DriversModule {}
