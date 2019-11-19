import React from 'react'
import './Preview.css'

const Preview = (props) => {

    const topHeaderColor = props.blackText ? "top-black" :"top-white";
    const bottomHeaderColor = props.blackText ? "bottom-black" : "bottom-white";

    return(
        <div className="meme-preview" >
            <img src={props.image} alt="img"/>
            <h2 className={topHeaderColor}>{props.topText}</h2>
            <h2 className={bottomHeaderColor}>{props.bottomText}</h2>
        </div>
    )    
}

export default Preview