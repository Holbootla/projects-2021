const buttonContainer = document.querySelector('.btn-container')
const button = buttonContainer.querySelectorAll('.btn')

const piano = document.querySelector('.piano')
const pianoKeys = piano.querySelectorAll('.piano-key')

const fullScreenButton = document.querySelector('.fullscreen')

let isPianoKeyClicked = false

buttonContainer.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn-active')) {
    
    button.forEach((el) => {
      el.classList.toggle('btn-active')
    })
    
    pianoKeys.forEach((el) => {
      el.classList.toggle('piano-key-letters-on')
    })
  }
})

const playAudioByClick = (event) => {
  if (event.target.classList.contains('piano-key')) {

    isPianoKeyClicked = true

    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo')

    const audio = new Audio()
    audio.src = `assets/audio/${event.target.dataset.note}.mp3`
    audio.currentTime = 0
    audio.play()

    event.target.addEventListener('mouseup', () => {
      if (event.target.classList.contains('piano-key-active', 'piano-key-active-pseudo'))
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
      isPianoKeyClicked = false
    })

    event.target.addEventListener('mouseout', () => {
      if (event.target.classList.contains('piano-key-active', 'piano-key-active-pseudo'))
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
    })
  }
}

const playAudioByOver = (event) => {
  if (event.target.classList.contains('piano-key') && isPianoKeyClicked === true) {

    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo')

    const audio = new Audio()
    audio.src = `assets/audio/${event.target.dataset.note}.mp3`
    audio.currentTime = 0
    audio.play()

    document.addEventListener('mouseup', () => {
      if (event.target.classList.contains('piano-key-active', 'piano-key-active-pseudo'))
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
      isPianoKeyClicked = false
      piano.removeEventListener('mouseover', (event) => playAudioByOver(event))
    })

    event.target.addEventListener('mouseout', () => {
      if (event.target.classList.contains('piano-key-active', 'piano-key-active-pseudo'))
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
    })
  }
}

piano.addEventListener('mousedown', (event) => playAudioByClick(event))

piano.addEventListener('mouseover', (event) => playAudioByOver(event))

const playAudioByKeypress = (event) => {

  if (event.repeat) {
    console.log('repeat')
    return
  }

  pianoKeys.forEach((el) => {

    if (event.code === `Key${el.dataset.letter}`) {

      el.classList.add('piano-key-active', 'piano-key-active-pseudo')

      const audio = new Audio()
      audio.src = `assets/audio/${el.dataset.note}.mp3`
      audio.currentTime = 0
      audio.play()

      event.target.addEventListener('keyup', (event) => {
        if (el.classList.contains('piano-key-active', 'piano-key-active-pseudo') && event.code === `Key${el.dataset.letter}`)
        el.classList.remove('piano-key-active', 'piano-key-active-pseudo')
      })
    }
  })

}

document.addEventListener('keydown', (event) => playAudioByKeypress(event))

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

fullScreenButton.addEventListener('click', () => {toggleFullScreen()})