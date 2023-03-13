import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { mainConfig } from "./../src/main.config";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        mainConfig(app);

        await app.init();
    });

    it("/ (GET)", () => {
        return request(app.getHttpServer()).get("/").expect(200).expect("Hello World!");
    });
});
