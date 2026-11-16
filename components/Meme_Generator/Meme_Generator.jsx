import { useState, useEffect } from 'react'
import './Meme_Generator.css'

function MemeGenerator() {

  const [allMemes, setAllMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => {
        const memes = data.data.memes
        setAllMemes(memes)
        setCurrentMeme(memes[Math.floor(Math.random() * memes.length)])
      })
  }, [])

     function getNewMeme() {
        const randomMeme = Math.floor(Math.random() * allMemes.length)
        setCurrentMeme(allMemes[randomMeme])
    }

    return (
        <div className="container">

      <input
        type="text"
        placeholder="Texte du haut"
        value={topText}
        onChange={event => setTopText(event.target.value)}
      />

      <input
        type="text"
        placeholder="Texte du bas"
        value={bottomText}
        onChange={event => setBottomText(event.target.value)}
      />

      <button onClick={getNewMeme}>
        Get a new meme image
      </button>

      {currentMeme && (
        <div className="meme">
          <img src={currentMeme.url} alt={currentMeme.name} />
          <span className="top">{topText}</span>
          <span className="bottom">{bottomText}</span>
        </div>
      )}

    </div>
  )


}

export default MemeGenerator