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


    return <div style={{margin: '24px 0', borderTop: '1px solid #cecece', borderBottom: '1px solid #cecece', padding:'8px'}}>
        <h3>You Might Also Like</h3>
        <p style={{margin: '4px 0'}}><b>{name} {abv}%</b></p>
        <p style={{margin: '4px 0'}}>{tagline}</p>
        <p style={{margin: '4px 0'}}><b>Paired with</b> {food_pairing?.join(', ')}</p>
    </div>
}

export default YMAL;