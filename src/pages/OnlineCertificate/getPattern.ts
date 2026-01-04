import {DecryptedObj} from "~/shared/types/response/DecryptedObjType";
import Creativity from "./Patterns/Creativity";

export default function getPattern(decryptedObj: DecryptedObj) {
    const {pid} = decryptedObj;
    switch (pid) {
        case 1:
            return Creativity(decryptedObj);
        default:
            return undefined;
    }
}