// Map page carousel and map flags

const mapPetsList = [
  {name: 'eagle'},
  {name: 'panda'},
  {name: 'gorilla'},
  {name: 'alligator'},
  {name: 'fox'},
  {name: 'lazybones'},
  {name: 'cheetah'},
  {name: 'elephant'}
]

const circleSliderContainer = document.querySelector('.circle-slider-container')
const controlsArrowLeft = circleSliderContainer.querySelector('.slider-container__arrows__arrow_left')
const controlsArrowRight = circleSliderContainer.querySelector('.slider-container__arrows__arrow_right')
const circleSlider = circleSliderContainer.querySelector('.circle-slider-container__slider')

mapPetsList.forEach((el, ind) => {
  circleSlider.insertAdjacentHTML('beforeend', 
  `<div class="circle-slider-container__slider__slide">
   <img src="../assets/images/pets-${mapPetsList[ind].name}.jpg" class="circle-slider-container__slider__slide__image" alt="">
  </div>`)
})

const circleSliderSlides = circleSliderContainer.querySelectorAll('.circle-slider-container__slider__slide')
const circleSliderControls = circleSliderContainer.querySelector('input[type=range]')
const circleSliderControlsText = circleSliderContainer.querySelector('.slide-number-current')
const ACTIVE_CIRCLE_CLASS = 'circle-slider-container__slider__slide_active'

circleSliderSlides[1].classList.add(ACTIVE_CIRCLE_CLASS)

const mapFlags = document.querySelectorAll('.wrapper-map__map__flag')
const ACTIVE_FLAG_CLASS = 'wrapper-map__map__flag_active'

const moveCircleCarousel = (direction, flag) => {

  function controlsHandler () {  
    circleSliderControls.defaultValue = nextActiveSlideIndex + 1
    circleSliderControls.value = circleSliderControls.defaultValue
    circleSliderControlsText.textContent = `0${circleSliderControls.defaultValue}/`
  }

  const currentActiveSlideIndex = Array.from(circleSliderSlides).findIndex((el) => el.classList.contains(ACTIVE_CIRCLE_CLASS))
  let nextActiveSlideIndex
  circleSliderSlides[currentActiveSlideIndex].classList.remove(ACTIVE_CIRCLE_CLASS)
  mapFlags.forEach((el) => {el.classList.remove(ACTIVE_FLAG_CLASS)})

  if (direction === 'right') {
    nextActiveSlideIndex = currentActiveSlideIndex < circleSliderSlides.length - 1 ? currentActiveSlideIndex + 1 : 0
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    controlsHandler()
  }

  if (direction === 'left') {
    nextActiveSlideIndex = currentActiveSlideIndex > 0 ? currentActiveSlideIndex - 1 : circleSliderSlides.length - 1
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    controlsHandler()
  }

  if (direction === 'flag') {
    nextActiveSlideIndex = mapPetsList.findIndex((el) => el.name === flag)
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    controlsHandler()
  }

  if (direction === 'number') {
    circleSliderControls.defaultValue = circleSliderControls.value
    circleSliderControlsText.textContent = `0${circleSliderControls.defaultValue}/`
    nextActiveSlideIndex = circleSliderControls.defaultValue - 1
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
  }

  mapFlags.forEach((el) => {
    if (el.classList.contains(`wrapper-map__map__flag__${mapPetsList[nextActiveSlideIndex].name}`)) {
      el.classList.add(ACTIVE_FLAG_CLASS)
    }
  })
  
}

controlsArrowRight.addEventListener('click', () => {
  moveCircleCarousel('right')
  controlsArrowRight.style.pointerEvents = 'none'
  setTimeout(function() {
    controlsArrowRight.style.pointerEvents = 'auto'
  }, 600)
})

controlsArrowLeft.addEventListener('click', () => {
  moveCircleCarousel('left')
  controlsArrowLeft.style.pointerEvents = 'none'
  setTimeout(function() {
    controlsArrowLeft.style.pointerEvents = 'auto'
  }, 600)
})

mapFlags.forEach((el) => {
  el.addEventListener('click', () => {moveCircleCarousel('flag', el.id)})
})

circleSliderControls.addEventListener('input', () => {moveCircleCarousel('number')})