import React from 'react';
import { A4List } from '~/shared/ui/A4List/A4List';
import { DecryptedObj } from '~/shared/types/response/DecryptedObjType';
import ResizableText from '~/shared/ui/ResizableText/ResizableText';
import blueBackground from '~/shared/assets/images/diplomas/blue-background.jpg';

const Creativity: React.FC<DecryptedObj> = ({fio, msg, d}) => {
    return (
        <div>
            <A4List date={d} backgroundImage={blueBackground}>
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

