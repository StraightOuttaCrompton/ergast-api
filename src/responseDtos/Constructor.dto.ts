export default class Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;

    constructor(constructor: Constructor) {
        Object.assign(this, constructor);
    }
}
