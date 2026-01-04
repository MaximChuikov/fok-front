import React, {useEffect, useMemo, useRef, useState} from "react";
import {DownloadPDFButton} from "~/shared/ui/DownloadPDFButton";
import confetti from "canvas-confetti";
import {ShareButton} from "~/shared/ui/ShareButton";
import { DecryptedObj } from "~/shared/types/response/DecryptedObjType";
import useAsyncData from "~/shared/lib/useAsyncData";
import getPattern from "./getPattern";
import parseUrl from "~/shared/lib/parseUrl";
import styles from './OnlineCertificate.module.css';

const App: React.FC = () => {

    const docRef = useRef<HTMLDivElement>(null);
    const {data: decryptedData, error, loading} = useAsyncData<DecryptedObj>(async () => {
        const url = new URLSearchParams(window.location.search);
        const encryptedData = url.get('d');
        if (!encryptedData) {
            throw new Error('No encrypted data provided');
        }
        return await parseUrl(encryptedData);
    }, []);

    const check = useMemo(() => {
        if (!loading) {
            return !!decryptedData || !error;
        }
        return false
    }, [loading])

    const pattern = useMemo(() => {
        if (check && decryptedData) {
            const p = getPattern(decryptedData)
            return p ? p
                : (
                    <div>
                        Не найден шаблон
                    </div>
                )
        }
    }, [check])

    const [wasFireworks, setWasFireworks] = useState(false)
    useEffect(() => {
        const doAFireworks = () => {
            const end = Date.now() + 2.5 * 1000 // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]
            const frame = () => {
                if (Date.now() > end) return
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.5 },
                    colors: colors,
                })
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.5 },
                    colors: colors,
                })
                requestAnimationFrame(frame)
            }
            frame()
        }
        if (check && !wasFireworks) {
            doAFireworks()
            setWasFireworks(true)
        }
    }, [check, wasFireworks]);

    if (loading)
        return (
            <h3>Поиск вашей награды...</h3>
        )

    if (!check)
        return (
            <div>
                <h1>Ошибка 404</h1>
                <h2>
                    Cсылка повреждена, обратитесь к системному администратору ФОКа, если вы владелец изделия с
                    NFC меткой
                </h2>
                <br/>
                Ошибка: <span style={{color: 'red'}}>{error}</span>
            </div>
        )

    console.log({
        decryptedData,
        error,
        check
    })

    return (
        <div className={styles.certificatePage}>
            <h2 className={styles.certificateHeader}>
                Поздравляем! Вы получили памятный уникальный цифровой носитель!
            </h2>
            <h3 className={styles.certificateSubheader}>
                Здесь навсегда будет запечатлено, то что вы сделали для ФОКа, в каком соревновании одержали победу или
                приняли участие!
            </h3>
            <div className={styles.buttonsContainer}>
                <ShareButton />
                <DownloadPDFButton contentRef={docRef} />
            </div>
            <div 
                ref={docRef}
                className={styles.certificateWrapper}
            >
                {pattern}
            </div>
        </div>
    );
};

export default App;
