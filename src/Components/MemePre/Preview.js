import React, {useMemo} from 'react'
import './Preview.css'

const Preview = (props) => {

    const topHeaderColor = useMemo(() => (props.blackText === true) ? 'top-black' :'top-white', [props.blackText]);
    const bottomHeaderColor = useMemo(() => (props.blackText === true) ? "bottom-black" : "bottom-white", [props.blackText]);

    return(
        <div className="meme-preview" >
            <img src={props.image} alt="img"/>
            <h2 className={topHeaderColor}>{props.topText}</h2>
            <h2 className={bottomHeaderColor}>{props.bottomText}</h2>
        </div>
    )    
}

export default Preview