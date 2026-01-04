import {DecryptedObj} from "../shared/types/index";
import Creativity from "./Creativity/Creativity";

export default function getPattern(decryptedObj: DecryptedObj) {
    const {pid} = decryptedObj
    switch (pid) {
        case 1:
            return Creativity(decryptedObj)
    }

    return undefined
}