import React from 'react'
import './Button.css'

const Button = (props) => {

    const style = props.blackText ? "default clicked" : "default regular-backgroud";

    return(
        <button className={style} type={props.type} onClick={props.onClick}>{props.text}</button>
    )

}

export default Button;