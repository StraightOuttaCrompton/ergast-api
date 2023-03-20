import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma.service";
import { CircuitsController } from "./circuits.controller";
import { CircuitsService } from "./circuits.service";

describe("CircuitsController", () => {
    let controller: CircuitsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CircuitsController],
            providers: [CircuitsService, PrismaService],
        }).compile();

        controller = module.get<CircuitsController>(CircuitsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
