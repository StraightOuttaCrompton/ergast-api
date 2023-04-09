import { INestApplication, ValidationPipe } from "@nestjs/common";

export default function mainConfig(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );
}
