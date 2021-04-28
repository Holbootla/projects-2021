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

// Top Carousel at main page

const topCarouselControls = document.querySelector('.wrapper-top__slider-container').querySelector('input[type=range]')
const topCarouselControlsText = document.querySelector('.wrapper-top__slider-container').querySelector('.slide-number-current')
const topCarouselSlides = document.querySelector('.wrapper-top__slider-container').querySelectorAll('.wrapper-top__slider-container__slider__slide')

const moveTopCarousel = () => {
  topCarouselControls.defaultValue = topCarouselControls.value
  topCarouselControlsText.textContent = `0${topCarouselControls.defaultValue}/`
  topCarouselSlides.forEach((el) => {
    if (el.classList.contains('wrapper-top__slider-container__slider__slide_active')) {
      el.classList.remove('wrapper-top__slider-container__slider__slide_active')
    }
  })
  topCarouselSlides[topCarouselControls.defaultValue-1].classList.add('wrapper-top__slider-container__slider__slide_active')
  topCarouselSlides.forEach((el) => {
    el.style.transform = `translateX(${-(topCarouselControls.defaultValue - 2) * (el.offsetWidth + (parseInt(getComputedStyle(el).marginRight) * 2))}px)`
  })
}

topCarouselControls.addEventListener('input', moveTopCarousel)

topCarouselSlides.forEach((el) => {
  el.addEventListener('click', () => {
    let isNextSiblingActive
    if (el.nextElementSibling) {
      isNextSiblingActive = el.nextElementSibling.classList.contains('wrapper-top__slider-container__slider__slide_active')
    } else {
      isNextSiblingActive = 0
    }    
    if (!(el.classList.contains('wrapper-top__slider-container__slider__slide_active')) && !(isNextSiblingActive)) {
      topCarouselControls.value = Number(topCarouselControls.defaultValue) + 1
      moveTopCarousel()
    }
    if (!(el.classList.contains('wrapper-top__slider-container__slider__slide_active')) && isNextSiblingActive) {
      topCarouselControls.value = Number(topCarouselControls.defaultValue) - 1
      moveTopCarousel()
    }
  })
})