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

mapPetsList.forEach((el) => {
  circleSlider.insertAdjacentHTML('beforeend', 
  `<div class="circle-slider-container__slider__slide">
   <img src="../assets/images/pets-${el.name}.jpg" class="circle-slider-container__slider__slide__image" alt="">
  </div>`)
})

const circleSliderSlides = circleSliderContainer.querySelectorAll('.circle-slider-container__slider__slide')
const circleSliderControls = circleSliderContainer.querySelector('input[type=range]')
const circleSliderControlsText = circleSliderContainer.querySelector('.slide-number-current')
const ACTIVE_CIRCLE_CLASS = 'circle-slider-container__slider__slide_active'

circleSliderSlides[1].classList.add(ACTIVE_CIRCLE_CLASS)

const mapSection = document.querySelector('.wrapper-map')

mapSection.insertAdjacentHTML('beforeend', `<a class="wrapper-map__btn btn" href="../../online-zoo/zoos/${mapPetsList[1].name}/"><img src="../assets/icons/play.svg" alt="">Watch online</a>`)

const mapButton = mapSection.querySelector('.wrapper-map__btn')

const mapFlags = document.querySelectorAll('.wrapper-map__map__flag')
const ACTIVE_FLAG_CLASS = 'wrapper-map__map__flag_active'

const moveCircleCarousel = (direction, flag, index) => {

  function controlsHandler () {  
    circleSliderControls.defaultValue = nextActiveSlideIndex + 1
    circleSliderControls.value = circleSliderControls.defaultValue
    circleSliderControlsText.textContent = `0${circleSliderControls.defaultValue}/`
  }

  function rightMove () {
    if (nextActiveSlideIndex === 0) {
      circleSlider.scrollTo({left: 0, top: 0, behavior: 'smooth'})
    } else if ((nextActiveSlideIndex + 1) > (circleSlider.offsetWidth / (parseInt(getComputedStyle(circleSliderSlides[1]).width) + parseInt(getComputedStyle(circleSliderSlides[1]).marginRight)))) {
      circleSlider.scrollBy({left: parseInt(getComputedStyle(circleSliderSlides[1]).width) + (parseInt(getComputedStyle(circleSliderSlides[1]).marginRight) * 2), top: 0, behavior: 'smooth'})
    }
  }

  function leftMove () {
    if (nextActiveSlideIndex === (circleSliderSlides.length - 1)) {
      circleSlider.scrollTo({left: 99999, top: 0, behavior: 'smooth'})
    } else if (((parseInt(getComputedStyle(circleSliderSlides[1]).width) + parseInt(getComputedStyle(circleSliderSlides[1]).marginRight) * 2) * (nextActiveSlideIndex)) <= (circleSlider.scrollLeft)) {
      circleSlider.scrollBy({left: -(parseInt(getComputedStyle(circleSliderSlides[1]).width) + (parseInt(getComputedStyle(circleSliderSlides[1]).marginRight) * 2)), top: 0, behavior: 'smooth'})
    }
  }

  const currentActiveSlideIndex = Array.from(circleSliderSlides).findIndex((el) => el.classList.contains(ACTIVE_CIRCLE_CLASS))
  let nextActiveSlideIndex
  circleSliderSlides[currentActiveSlideIndex].classList.remove(ACTIVE_CIRCLE_CLASS)
  mapFlags.forEach((el) => {el.classList.remove(ACTIVE_FLAG_CLASS)})

  if (direction === 'right') {
    nextActiveSlideIndex = currentActiveSlideIndex < circleSliderSlides.length - 1 ? currentActiveSlideIndex + 1 : 0
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    rightMove()    
    controlsHandler()
  }

  if (direction === 'left') {
    nextActiveSlideIndex = currentActiveSlideIndex > 0 ? currentActiveSlideIndex - 1 : circleSliderSlides.length - 1
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    leftMove()
    controlsHandler()
  }

  if (direction === 'flag') {
    nextActiveSlideIndex = mapPetsList.findIndex((el) => el.name === flag)
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    controlsHandler()
    circleSlider.scrollTo({left: (parseInt(getComputedStyle(circleSliderSlides[1]).width) + parseInt(getComputedStyle(circleSliderSlides[1]).marginRight) * 2) * (nextActiveSlideIndex - 1), top: 0, behavior: 'smooth'})
  }

  if (direction === 'slide') {
    nextActiveSlideIndex = index
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    controlsHandler()
  }

  if (direction === 'number') {
    circleSliderControls.defaultValue = circleSliderControls.value
    circleSliderControlsText.textContent = `0${circleSliderControls.defaultValue}/`
    nextActiveSlideIndex = circleSliderControls.defaultValue - 1
    circleSliderSlides[nextActiveSlideIndex].classList.add(ACTIVE_CIRCLE_CLASS)
    circleSlider.scrollTo({left: (parseInt(getComputedStyle(circleSliderSlides[1]).width) + parseInt(getComputedStyle(circleSliderSlides[1]).marginRight) * 2) * (nextActiveSlideIndex - 1), top: 0, behavior: 'smooth'})
  }

  mapFlags.forEach((el) => {
    if (el.classList.contains(`wrapper-map__map__flag__${mapPetsList[nextActiveSlideIndex].name}`)) {
      el.classList.add(ACTIVE_FLAG_CLASS)
    }
  })

  if (nextActiveSlideIndex > 3) {
    mapButton.style.pointerEvents = 'none'
  } else {
    mapButton.href = `../../online-zoo/zoos/${mapPetsList[nextActiveSlideIndex].name}/`
  }
  
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

circleSliderSlides.forEach((el, index) => {
  el.addEventListener('click', () => {moveCircleCarousel('slide', null, index)})
})

circleSliderControls.addEventListener('input', () => {moveCircleCarousel('number')})