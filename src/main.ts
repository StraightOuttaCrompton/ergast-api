import { API_PORT } from "./consts";
import getApp from "./getApp";

async function bootstrap() {
    const app = await getApp();
    console.log(`Server is listening on port ${API_PORT}\n`);
    await app.listen(API_PORT);
}

bootstrap();
