import { useEffect, useState } from "react";
const RandomView = () => {
    const [item, setItem] = useState();
    useEffect(() => {
        const appItem = JSON.parse(localStorage.getItem("gratitude"));
        setItem(appItem);
        console.log(appItem);
    }, []);
    const math = Math.random();
    return (
        <div>
            <h1>History</h1>
        </div>
    );
};

export default RandomView;
