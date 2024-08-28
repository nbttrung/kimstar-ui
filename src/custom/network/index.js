import {useEffect, useState} from "react";

const useNetwork = () => {
    const [online, setOnline] = useState(undefined);

    useEffect(() => {
        const setStatusOnline = () => {
            setOnline(true);
        }
        const setStatusOffline = () => {
            setOnline(false);
        }

        window.addEventListener("online", setStatusOnline);
        window.addEventListener("offline", setStatusOffline);

        return () => {
            window.removeEventListener("online", setStatusOnline);
            window.removeEventListener("offline", setStatusOffline);
        }
    }, []);

    return online;
};

export default useNetwork;
