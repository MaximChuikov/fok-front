import {useEffect, useMemo, useRef, useState} from "react";
import parseUrl from "./shared/utils/parseUrl";
import useAsyncData from "./shared/utils/useAsyncData";
import {DecryptedObj} from "./shared/types/index";
import getPattern from "./patterns/getPattern";
import {DownloadPDFButton} from "./shared/DownloadPDFButton/DownloadPDFButton";
import confetti from "canvas-confetti"
import {ShareButton} from "./shared/ShareButton/ShareButton";

function App() {

    const docRef = useRef(null)
    const {data: decryptedData, error, loading} = useAsyncData<DecryptedObj>(async () => {
        const url = new URLSearchParams(window.location.search);
        const encryptedData = url.get('d');
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
    }, [check])

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
        <div>
            <h2>Поздравляем! Вы получили памятный уникальный цифровой носитель!</h2>
            <h3>Здесь навсегда будет запечатлено, то что вы сделали для ФОКа, в каком соревновании одержали победу или
                приняли участие!</h3>
            <br />
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around', gap: '8px'}}>
                <ShareButton />
                <DownloadPDFButton contentRef={docRef} />
            </div>
            <div ref={docRef}>
                {pattern}
            </div>
        </div>
    )
}

export default App
