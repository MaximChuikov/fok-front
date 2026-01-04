import {A4List} from '../../shared/A4list/A4list'
import {DecryptedObj} from "../../shared/types/index";
import ResizableText from "../../shared/Text/ResizableText";

const Creativity = ({fio, msg, d}: DecryptedObj) => {
    return (
        <div>
            <A4List date={d}>
                <ResizableText tag={'h3'}>
                    Присуждается
                </ResizableText>
                <ResizableText tag={'h3'}>
                    {fio}
                </ResizableText>
                <ResizableText tag={'p'}>
                    За творческий подход,<br/>
                    нестандартное мышление и выдающиеся достижения!
                </ResizableText>
                <br/>
                <ResizableText tag={'span'}>
                    {msg}
                </ResizableText>
            </A4List>
        </div>
    );
};

export default Creativity;