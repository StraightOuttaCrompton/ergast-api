import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CircuitsModule } from "./routes/circuits/circuits.module";
import { ConstructorsModule } from "./routes/constructors/constructors.module";
import { DriversModule } from "./routes/drivers/drivers.module";
import { RacesModule } from "./routes/races/races.module";
import { SeasonsModule } from "./routes/seasons/seasons.module";

@Module({
    imports: [CircuitsModule, DriversModule, ConstructorsModule, SeasonsModule, RacesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
