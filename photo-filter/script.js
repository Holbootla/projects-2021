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

const loadNextPicture = () => {
  const date = new Date()
  const hours = date.getHours()
 
  let dayPart

  if (hours < 6) {
    dayPart = 'night'
  } else if (hours < 12) {
    dayPart = 'morning'
  } else if (hours < 18) {
    dayPart = 'day'
  } else if (hours < 24) {
    dayPart = 'evening'
  }

  let numberOfImageString

  if (numberOfImage < 10) {
    numberOfImageString = `0${numberOfImage}`
  } else {
    numberOfImageString = `${numberOfImage}`
  }

  const img = new Image()
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayPart}/${numberOfImageString}.jpg`

  img.addEventListener('load', () => {
    image.src = img.src
  }) 

  numberOfImage += 1

  if (numberOfImage > 20) {
    numberOfImage = 1
  }

}

const loadImage = () => {

  const fileInput = document.querySelector('input[type="file"]')

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      image.src = reader.result
    })

    reader.readAsDataURL(file)
  })

}

const buttonHandler = (event) => {

  if (event.target.classList.contains('btn-reset')) {
    resetFilters()
  }

  if (event.target.classList.contains('btn-next')) {
    loadNextPicture()
  }

  if (event.target.classList.contains('btn-load--input')) {
    loadImage()
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