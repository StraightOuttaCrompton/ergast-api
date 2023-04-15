import { Module } from "@nestjs/common";
import { PitstopsService } from "./pitstops.service";
import { PitstopsController } from "./pitstops.controller";

@Module({
    controllers: [PitstopsController],
    providers: [PitstopsService],
})
export class PitstopsModule {}
