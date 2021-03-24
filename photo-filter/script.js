const filters = document.querySelector('.filters')
const buttons = document.querySelector('.btn-container')
const fullScreenButton = document.querySelector('.fullscreen')

const inputHandler = (event) => {

  if (event.target.matches('input[type="range"]')) {
    
    event.target.nextElementSibling.value = event.target.value
    document.documentElement.style.setProperty(`--${event.target.name}`, event.target.value + event.target.dataset.sizing)

  }

}

filters.addEventListener('input', (event) => inputHandler(event))


const resetFilters = () => {
  const filtersInputs = filters.querySelectorAll('input')
    filtersInputs.forEach(el => {
      document.documentElement.style.setProperty(`--${el.name}`, '')
      el.value = el.defaultValue
      el.nextElementSibling.value = el.defaultValue
    })
}

const buttonHandler = (event) => {

  if (event.target.classList.contains('btn-reset')) {
    resetFilters()
  }

}

buttons.addEventListener('click', (event) => buttonHandler(event))

buttons.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('btn')) {
    event.target.classList.add('btn-active')
  } 
  
})

window.addEventListener('mouseup', () => {
  const button = buttons.querySelector('.btn-active')
    if (button) {
      button.classList.remove('btn-active')
    }
  }
)






const toggleFullScreen = ()=>{
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen()
      }
  }
}

fullScreenButton.addEventListener('click', ()=>{
  toggleFullScreen()
  }
)