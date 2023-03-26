import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CircuitsModule } from "./circuits/circuits.module";
import { ConstructorsModule } from "./constructors/constructors.module";
import { DriversModule } from "./drivers/drivers.module";
import { SeasonsModule } from "./seasons/seasons.module";

@Module({
    imports: [CircuitsModule, DriversModule, ConstructorsModule, SeasonsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
