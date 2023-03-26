import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({ log: process.env.NODE_ENV === "production" ? [] : ["query", "info", "warn", "error"] });
    }

    async onModuleInit() {
        if (process.env.NODE_ENV !== "production") {
            // @ts-ignore
            this.$on("query", (e: any) => {
                console.log("Query: " + e.query);
                console.log("Params: " + e.params);
                console.log("Duration: " + e.duration + "ms");
            });
        }

        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
}
