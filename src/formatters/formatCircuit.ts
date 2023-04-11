import { circuits } from "@prisma/client";
import { Circuit } from "../responseDtos/Circuit.dto";

export default function formatCircuit(circuit: Omit<circuits, "circuitId">) {
    return new Circuit({
        circuitId: circuit.circuitRef,
        url: circuit.url,
        circuitName: circuit.name,
        Location: {
            lat: (+(circuit.lat || 0).toPrecision(6)).toString() || "",
            long: (+(circuit.lng || 0).toPrecision(6)).toString() || "",
            locality: circuit.location || "",
            country: circuit.country || "",
        },
    });
}
