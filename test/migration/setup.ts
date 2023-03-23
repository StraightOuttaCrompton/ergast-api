import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { mainConfig } from "../../src/main.config";

export let app: INestApplication;

async function initServer() {
    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    mainConfig(app);

    await app.init();
}

global.beforeAll(async () => {
    await initServer();
});
