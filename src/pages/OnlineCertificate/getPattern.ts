import {DecryptedObj} from "~/shared/types/response/DecryptedObjType";
import Creativity from "./Patterns/Creativity";
import KarateDiploma from "./Patterns/KarateDiploma";

export default function getPattern(decryptedObj: DecryptedObj) {
    const {pid} = decryptedObj;
    switch (pid) {
        case 1:
            return Creativity(decryptedObj);
        case 2:
            return KarateDiploma(decryptedObj);
        default:
            return undefined;
    }
}