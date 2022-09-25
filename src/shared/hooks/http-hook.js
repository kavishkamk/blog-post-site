import { useCallback, useState, useRef, useEffect } from "react";

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback( async (path, method = "GET", body = null, headers = {}) => {

        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}${path}`, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
    
            const responseResult = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );
    
            if (!response.ok) {
                throw new Error(responseResult.message);
            }

            setIsLoading(false);
            return responseResult;
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            throw error;
        }
        
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        };
    }, []);

    return {sendRequest, error, isLoading, clearError};
};