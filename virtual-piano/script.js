const buttonContainer = document.querySelector('.btn-container')
const button = buttonContainer.querySelectorAll('.btn')

const piano = document.querySelector('.piano')
const pianoKeys = piano.querySelectorAll('.piano-key')

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