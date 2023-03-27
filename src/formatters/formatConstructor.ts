import { constructors } from "@prisma/client";
import Constructor from "../types/Constructor";

export default function formatConstructor(constructor: constructors): Constructor {
    return {
        constructorId: constructor.constructorRef,
        url: constructor.url,
        name: constructor.name,
        nationality: constructor.nationality,
    };
}
