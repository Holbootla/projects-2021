// Burger-menu

const burgerBtn = document.querySelector('.burger-icon')
const burgerBtnExit = document.querySelector('.burger-icon-exit')

burgerBtn.addEventListener('click', function() {
  document.querySelector('.navigation-burger').classList.remove('navigation-burger_hidden')
  document.body.classList.add('overflow-hidden')
})

burgerBtnExit.addEventListener('click', function() {
  document.querySelector('.navigation-burger').classList.add('navigation-burger_hidden')
  document.body.classList.remove('overflow-hidden')
})

// Color theme switcher

const switcher = (document.querySelector('.switch')).querySelector('input[type="checkbox"]')

const toggleColorTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', '')
  }
}

switcher.addEventListener('change', toggleColorTheme)

// Carousel at main page

const carouselControls = document.querySelector('.wrapper-top__slider-container').querySelector('input[type=range]')
const carouselControlsText = document.querySelector('.wrapper-top__slider-container').querySelector('.slide-number-current')
const carouselSlides = document.querySelector('.wrapper-top__slider-container').querySelectorAll('.wrapper-top__slider-container__slider__slide')

const moveCarousel = () => {
  carouselControls.defaultValue = carouselControls.value
  carouselControlsText.textContent = `0${carouselControls.defaultValue}/`
  carouselSlides.forEach((el) => {
    if (el.classList.contains('wrapper-top__slider-container__slider__slide_active')) {
      el.classList.remove('wrapper-top__slider-container__slider__slide_active')
    }
  })
  carouselSlides[carouselControls.defaultValue-1].classList.add('wrapper-top__slider-container__slider__slide_active')
  carouselSlides.forEach((el) => {
    el.style.transform = `translateX(${-(carouselControls.defaultValue - 2) * (el.offsetWidth + (parseInt(getComputedStyle(el).marginRight) * 2))}px)`
  })
}

carouselControls.addEventListener('input', moveCarousel)

carouselSlides.forEach((el) => {
  el.addEventListener('click', function () {
    let isNextSiblingActive
    if (el.nextElementSibling) {
      isNextSiblingActive = el.nextElementSibling.classList.contains('wrapper-top__slider-container__slider__slide_active')
    } else {
      isNextSiblingActive = 0
    }    
    if (!(el.classList.contains('wrapper-top__slider-container__slider__slide_active')) && !(isNextSiblingActive)) {
      carouselControls.value = Number(carouselControls.defaultValue) + 1
      moveCarousel()
    }
    if (!(el.classList.contains('wrapper-top__slider-container__slider__slide_active')) && isNextSiblingActive) {
      carouselControls.value = Number(carouselControls.defaultValue) - 1
      moveCarousel()
    }
  })
})