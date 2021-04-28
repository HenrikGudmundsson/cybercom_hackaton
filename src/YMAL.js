import { useEffect, useState } from "react";

async function getRandom() {
    const res = await fetch('https://api.punkapi.com/v2/beers/random');
    const json = await res.json();
    return json[0];
}


const YMAL = props => {
    const [data, setData] = useState({});
    const getRand = async () => {
        const data = await getRandom();
        setData(data);
    }
    useEffect(() => {
        getRand();
    },[])

    const {name, tagline, abv, food_pairing} = data;


    return <>
        <p>You Might Also Like</p>
        <p>{name} {abv}%</p>
        <p>{tagline}</p>
    </>
}

export default YMAL;