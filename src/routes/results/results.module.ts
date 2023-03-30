import { Module } from "@nestjs/common";
import { ResultsService } from "./results.service";
import { ResultsController } from "./results.controller";

@Module({
    controllers: [ResultsController],
    providers: [ResultsService],
})
export class ResultsModule {}
