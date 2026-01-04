import { useState, useEffect } from 'react';

const useAsyncData = <T>(asyncFn: () => Promise<T>, deps: any[] = []) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const execute = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await asyncFn();

                if (mounted) {
                    setData(result);
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        execute();

        return () => {
            mounted = false;
        };
    }, deps);

    return { data, error, loading };
};

export default useAsyncData