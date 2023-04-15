import { Module } from "@nestjs/common";
import { ConstructorsService } from "./constructors.service";
import { ConstructorsController } from "./constructors.controller";

@Module({
    controllers: [ConstructorsController],
    providers: [ConstructorsService],
})
export class ConstructorsModule {}
