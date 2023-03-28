import { HttpException, HttpStatus } from "@nestjs/common";

export class StandingParameterCombinationException extends HttpException {
    constructor() {
        super("Cannot combine standings with circuit, grid, result or status qualifiers.", HttpStatus.BAD_REQUEST);
    }
}
