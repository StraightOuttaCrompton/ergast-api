import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import querystring from "querystring";
import path from "path";
import { getSnapshotExists } from "../migrationUtils";
import { AppModule } from "../../../src/app.module";
import { GetCircuitsDto } from "../../../src/circuits/dto/get-circuits.dto";

describe("GET /circuits smoke tests", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true })); // TODO: shouldn't really have to do this

        await app.init();
    });

    const endpoint = "/circuits";

    const queries: { queryParams: Partial<GetCircuitsDto>; legacyRoute: string }[] = [
        {
            queryParams: { driverId: "bottas" },
            legacyRoute: "drivers/bottas",
        },
        {
            queryParams: { driverId: "alonso", constructorId: "minardi" },
            legacyRoute: "drivers/alonso/constructors/minardi",
        },
        {
            queryParams: { driverId: "hamilton", year: 2022 },
            legacyRoute: "2022/drivers/hamilton",
        },
        {
            queryParams: { year: 2010, round: 2 },
            legacyRoute: "2010/2",
        },
        {
            queryParams: { driverId: "maldonado", status: 4 },
            legacyRoute: "drivers/maldonado/status/4",
        },
        {
            queryParams: { driverId: "vettel", constructorId: "ferrari", result: 1 },
            legacyRoute: "drivers/vettel/constructors/ferrari/results/1",
        },
        {
            queryParams: { driverId: "hamilton", result: 2, year: 2022 },
            legacyRoute: "2022/drivers/hamilton/results/2",
        },
        {
            queryParams: { driverId: "max_verstappen", grid: 1, year: 2022 },
            legacyRoute: "2022/drivers/max_verstappen/grid/1",
        },
        {
            queryParams: { driverId: "sainz", fastest: 1, year: 2022 },
            legacyRoute: "2022/drivers/sainz/fastest/1",
        },
    ];

    const migrationTest = async (url: string, legacyUrl: string) => {
        test(url, async () => {
            const response = await request(app.getHttpServer()).get(url);

            const snapshotExists = await getSnapshotExists(__dirname, path.basename(__filename), url);
            if (snapshotExists) {
                expect(response.body).toMatchSnapshot();
                return;
            }

            const legacyResponse = await fetch(legacyUrl);
            const legacyJson = await legacyResponse.json();
            const legacyCircuits = legacyJson.MRData.CircuitTable.Circuits;

            expect(response.body).toEqual(legacyCircuits);
            expect(response.body).toMatchSnapshot();
        });
    };

    migrationTest(endpoint, `https://ergast.com/api/f1/circuits.json`);

    queries.forEach(({ queryParams, legacyRoute }) => {
        migrationTest(
            `${endpoint}?${querystring.stringify(queryParams)}`,
            `https://ergast.com/api/f1/${legacyRoute}/circuits.json`
        );
    });
});
