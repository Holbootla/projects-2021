const filters = document.querySelector('.filters')
const buttons = document.querySelector('.btn-container')
const fullScreenButton = document.querySelector('.fullscreen')
const image = document.querySelector('img')
const canvas = document.querySelector('canvas')

let numberOfImage = 1

let blurFilter = 0
let invertFilter = 0
let sepiaFilter = 0
let saturateFilter = 100
let hueFilter = 0

let imageSource

const drawImage = () => {
  const img = new Image()
  img.setAttribute('crossOrigin', 'anonymous')
  img.src = imageSource || 'https://upload.wikimedia.org/wikipedia/commons/8/8e/John_James_Audubon_1826.jpg'

  img.addEventListener('load', () => {
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext("2d")
    ctx.filter = `blur(${blurFilter}px) invert(${invertFilter}%) sepia(${sepiaFilter}%) saturate(${saturateFilter}%) hue-rotate(${hueFilter}deg)`
    ctx.drawImage(img, 0, 0)
  })
  
}

drawImage()

const inputHandler = (event) => {

  if (event.target.matches('input[type="range"]')) {
    
    event.target.nextElementSibling.value = event.target.value

    switch(event.target.name) {
      case 'blur':
        blurFilter = event.target.value
        break
      case 'invert':
        invertFilter = event.target.value
        break
      case 'sepia':
        sepiaFilter = event.target.value
        break
      case 'saturate':
        saturateFilter = event.target.value
        break
      case 'hue':
        hueFilter = event.target.value
        break
    }

    drawImage()

  }

}

filters.addEventListener('input', (event) => inputHandler(event))

const resetFilters = () => {
  const filtersInputs = filters.querySelectorAll('input')
    filtersInputs.forEach(el => {
      el.value = el.defaultValue
      el.nextElementSibling.value = el.defaultValue
    })
    
  blurFilter = 0
  invertFilter = 0
  sepiaFilter = 0
  saturateFilter = 100
  hueFilter = 0

  drawImage()
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

  imageSource = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayPart}/${numberOfImageString}.jpg`

  numberOfImage += 1

  if (numberOfImage > 20) {
    numberOfImage = 1
  }

  drawImage()

}

const loadImage = () => {

  const fileInput = document.querySelector('input[type="file"]')

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    const reader = new FileReader()
    let tempImage
    reader.addEventListener('load', () => {
      tempImage = new Image()
      tempImage.src = reader.result
      imageSource = tempImage.src
      drawImage()
    })
    reader.readAsDataURL(file)
    
  })
  
}

const saveImage = () => {
  const link = document.createElement('a')
  link.download = 'awesome-image'
  link.href = canvas.toDataURL('image/png')
  link.click()
  link.delete
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

  if (event.target.classList.contains('btn-save')) {
    saveImage()
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


// WITHOUT CANVAS (BUT WITHOUT SAVING IMAGE):

// const filters = document.querySelector('.filters')
// const buttons = document.querySelector('.btn-container')
// const fullScreenButton = document.querySelector('.fullscreen')
// const image = document.querySelector('img')

// let numberOfImage = 1

// const inputHandler = (event) => {

//   if (event.target.matches('input[type="range"]')) {
    
//     event.target.nextElementSibling.value = event.target.value
//     document.documentElement.style.setProperty(`--${event.target.name}`, event.target.value + event.target.dataset.sizing)

//   }

// }

// filters.addEventListener('input', (event) => inputHandler(event))


// const resetFilters = () => {
//   const filtersInputs = filters.querySelectorAll('input')
//     filtersInputs.forEach(el => {
//       document.documentElement.style.setProperty(`--${el.name}`, '')
//       el.value = el.defaultValue
//       el.nextElementSibling.value = el.defaultValue
//     })
// }

// const loadNextPicture = () => {
//   const date = new Date()
//   const hours = date.getHours()
 
//   let dayPart

//   if (hours < 6) {
//     dayPart = 'night'
//   } else if (hours < 12) {
//     dayPart = 'morning'
//   } else if (hours < 18) {
//     dayPart = 'day'
//   } else if (hours < 24) {
//     dayPart = 'evening'
//   }

//   let numberOfImageString

//   if (numberOfImage < 10) {
//     numberOfImageString = `0${numberOfImage}`
//   } else {
//     numberOfImageString = `${numberOfImage}`
//   }

//   const img = new Image()
//   img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayPart}/${numberOfImageString}.jpg`

//   img.addEventListener('load', () => {
//     image.src = img.src
//   }) 

//   numberOfImage += 1

//   if (numberOfImage > 20) {
//     numberOfImage = 1
//   }

// }

// const loadImage = () => {

//   const fileInput = document.querySelector('input[type="file"]')

//   fileInput.addEventListener('change', () => {
//     const file = fileInput.files[0]
//     const reader = new FileReader()

//     reader.addEventListener('load', () => {
//       image.src = reader.result
//     })

//     reader.readAsDataURL(file)
//   })

// }

// const buttonHandler = (event) => {

//   if (event.target.classList.contains('btn-reset')) {
//     resetFilters()
//   }

//   if (event.target.classList.contains('btn-next')) {
//     loadNextPicture()
//   }

//   if (event.target.classList.contains('btn-load--input')) {
//     loadImage()
//   }
  
// }

// buttons.addEventListener('click', (event) => buttonHandler(event))

// buttons.addEventListener('mousedown', (event) => {
//   if (event.target.classList.contains('btn')) {
//     event.target.classList.add('btn-active')
//   } 
  
// })

// window.addEventListener('mouseup', () => {
//   const button = buttons.querySelector('.btn-active')
//     if (button) {
//       button.classList.remove('btn-active')
//     }
//   }
// )

// const toggleFullScreen = ()=>{
//   if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen()
//   } else {
//       if (document.exitFullscreen) {
//           document.exitFullscreen()
//       }
//   }
// }

// fullScreenButton.addEventListener('click', ()=>{
//   toggleFullScreen()
//   }
// )
// 

