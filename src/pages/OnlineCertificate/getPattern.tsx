import React from "react";
import {DecryptedObj} from "~/shared/types/response/DecryptedObjType";
import Creativity from "./Creativity/Creativity";

export default function getPattern(decryptedObj: DecryptedObj): React.ReactElement | undefined {
    const {pid} = decryptedObj;
    switch (pid) {
        case 1:
            return <Creativity {...decryptedObj} />;
        default:
            return undefined;
    }
}