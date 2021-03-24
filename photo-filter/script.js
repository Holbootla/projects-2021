const filters = document.querySelector('.filters')
const buttons = document.querySelector('.btn-container')
const fullScreenButton = document.querySelector('.fullscreen')
const image = document.querySelector('img')

let numberOfImage = 1

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

const loadNextImage = () => {
  const date = new Date()
  const hours = date.getHours()

  let numberOfImageString

  if (numberOfImage < 10) {
    numberOfImageString = `0${numberOfImage}`
  } else {
    numberOfImageString = `${numberOfImage}`
  }

  if (hours < 6) {
    image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/${numberOfImageString}.jpg`
  } else if (hours < 12) {
    image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/${numberOfImageString}.jpg`
  } else if (hours < 18) {
    image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/${numberOfImageString}.jpg`
  } else if (hours < 24) {
    image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${numberOfImageString}.jpg`
  }

  numberOfImage += 1

  if (numberOfImage > 20) {
    numberOfImage = 1
  }

}

const buttonHandler = (event) => {

  if (event.target.classList.contains('btn-reset')) {
    resetFilters()
  }

  if (event.target.classList.contains('btn-next')) {
    loadNextImage()
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