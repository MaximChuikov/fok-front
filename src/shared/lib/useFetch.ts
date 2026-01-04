import {useEffect, useState} from "react";

export default function useFetch<T>(func: () => Promise<T>): [T, boolean, any] {
    let [loading, setLoading] = useState(true)
    let [data, setData] = useState<T>({} as T)
    let [error, setError] = useState(null)

    useEffect(() => {
        async function fetch() {
            await func()
                .then(r => setData(r))
                .catch(e => setError(e))
            setLoading(false)
        }
        fetch().then()
    }, [])
    return [data, loading, error]
}