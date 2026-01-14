import React from 'react';
import { A4List } from '~/shared/ui/A4List/A4List';
import { DecryptedObj } from '~/shared/types/response/DecryptedObjType';
import ResizableText from '~/shared/ui/ResizableText/ResizableText';
import karateDiplomaBackground from '~/shared/assets/images/diplomas/olympic-karate.jpg';

const KarateDiploma: React.FC<DecryptedObj> = ({ fio, msg, d, p }) => {
    return (
        <div>
            <A4List listStyles={{ padding: '30% 7%' }} date={d} backgroundImage={karateDiplomaBackground} dateStyles={{ color: 'black', bottom: '8%' }}>
                <ResizableText tag={'h1'} textStyles={{ color: 'black' }}>
                    Грамота
                </ResizableText>
                <ResizableText tag={'h3'} textStyles={{ color: 'black' }}>
                    Награждается
                </ResizableText>
                <ResizableText tag={'h3'} textStyles={{ textDecoration: 'underline', color: 'black' }}>
                    {fio}
                </ResizableText>
                <ResizableText tag={'h3'} textStyles={{ color: 'black' }}>
                    Занявший(ая): <span style={{ fontSize: '2.2em' }}>{p}</span> место
                    <br/>
                    В соревнованиях по каратэ «Олимпийское каратэ»
                </ResizableText>
                <br />
                <ResizableText tag={'h4'} textStyles={{ color: 'black' }}>
                    {msg}
                </ResizableText>
            </A4List>
        </div>
    );
};

export default KarateDiploma;

