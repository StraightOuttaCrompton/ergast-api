import { Module } from "@nestjs/common";
import { CircuitsModule } from "./routes/circuits/circuits.module";
import { ConstructorsModule } from "./routes/constructors/constructors.module";
import { ConstructorStandingsModule } from "./routes/constructorStandings/constructorStandings.module";
import { DriversModule } from "./routes/drivers/drivers.module";
import { DriverStandingsModule } from "./routes/driverStandings/driverStandings.module";
import { RacesModule } from "./routes/races/races.module";
import { SeasonsModule } from "./routes/seasons/seasons.module";
import { StatusModule } from "./routes/status/status.module";
import { LapsModule } from "./routes/laps/laps.module";
import { PitstopsModule } from "./routes/pitstops/pitstops.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env", ".env.local"],
        }),
        DriversModule,
        DriverStandingsModule,
        CircuitsModule,
        ConstructorsModule,
        ConstructorStandingsModule,
        LapsModule,
        PitstopsModule,
        RacesModule,
        SeasonsModule,
        StatusModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
