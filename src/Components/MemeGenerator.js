import React, { useState, useEffect } from 'react'
import Header from './Headers/Header'
import './MemeGenerator.css'
import Preview from './MemePre/Preview'
import Button from './Buttons/Button'
import Loader from 'react-loader-spinner'

const MemeGenerator = () =>{

    const [currentImage, setCurrentImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
   const [blackText, setBlackText] = useState(false); 
    const [download, setDownload] = useState(false);

    const fetchMeme = async () => {
        setLoading(true);
        const response = await fetch("https://mem-gen.herokuapp.com/getMeme");
        const result = await response.text();
        setCurrentImage(result);
        setLoading(false);
      }
  
      useEffect(() => {
        fetchMeme();
      }, []);

      const handleSubmit =  async (event) => {
        event.preventDefault();
        const send = await fetch("https://mem-gen.herokuapp.com/editMeme", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                upperText: topText,
                bottomText: bottomText,
                blackText: blackText
            })
        })
        const result = await send.text();
        if(result === 'Success'){
            setDownload(true);
        }
      }

      const handleTextChange = () =>{
        setBlackText(!blackText);
      }

      const handleNextMeme = () =>{
          fetchMeme();
          setDownload(false);
      } 

      const downloadImage = require("downloadjs");

      const handleDownload = async () => {
        const res = await fetch("https://mem-gen.herokuapp.com/getNewMeme");
        const blob = await res.blob();
        downloadImage(blob, "download.jpeg");
      }

      const handleText = (event) => {
        const {value, name} = event.target;
        setDownload(false)
        name === "topText" ?
        setTopText(value)
        :
        setBottomText(value)
      }

    return (
        <div>
            <Header/>
            <form className="meme-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={topText}
                        onChange={handleText}
                        maxLength="20"
                    />
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={handleText}
                        maxLength="20"
                    />
                <Button type={"submit"} text={"Gen"}/>
            </form>
            <div className="buttons-group">
                <Button type={"button"} onClick={handleTextChange} blackText={blackText} text="Black Text"/>
                <Button type={"button"} onClick={handleNextMeme}  text="Next Meme"/>
                {download ? <Button type={"button"} onClick={handleDownload} text="Download"/> : null}
            </div>
            {loading ?
            (<div className="loader">  
                <Loader
                    type="Puff"
                    color="#6441A5"
                    height={150}
                    width={150}
                />
            </div>)
            : 
            <Preview 
                image={currentImage} 
                topText={topText} 
                bottomText={bottomText} 
                blackText={blackText}
            />}
        </div>
    )
}

export default MemeGenerator