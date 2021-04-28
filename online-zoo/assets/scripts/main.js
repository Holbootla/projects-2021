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

// Pets Carousel at main page

const petsContainer = document.querySelector('.wrapper-pets__slider-container')
const petsCarouselSlides = document.querySelector('.wrapper-pets__slider-container__slider')
const petsCarouselArrowLeft = document.querySelector('.slider-container__arrows__arrow_left')
const petsCarouselArrowRight = document.querySelector('.slider-container__arrows__arrow_right')
const petsCarouselControls = document.querySelector('.wrapper-pets__slider-container').querySelector('input[type=range]')
const petsCarouselControlsText = document.querySelector('.wrapper-pets__slider-container').querySelector('.slide-number-current')
const direction = 1
const petsList = [
  {name: 'eagle', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'},
  {name: 'panda', text: 'Panda’s name is Bei Bei. He is 2 years old. Bei Bei is from China. He loves bamboos.'},
  {name: 'gorilla', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'},
  {name: 'alligator', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'},
  {name: 'fox', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'},
  {name: 'lazybones', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'},
  {name: 'cheetah', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'},
  {name: 'elephant', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem itaque commodi.'}
]

for (let i = 0; i <= 31; i++) {
  let j

  if (i < 8) {
    j = i
  } else if (i < 16) {
    j = i - 8
  } else if (i < 24) {
    j = i - 16
  } else if (i < 32) {
    j = i - 24
  }

  petsCarouselSlides.insertAdjacentHTML('beforeend', 
  `<div class="wrapper-pets__slider-container__slider__slide">
    <img src="assets/images/pets-${petsList[j].name}.jpg" class="wrapper-pets__slider-container__slider__slide__image" alt="">
    <div class="wrapper-pets__slider-container__slider__slide__content">
      <p class="paragraph wrapper-pets__slider-container__slider__slide__content__description">${petsList[j].text}</p>
      <div class="wrapper-pets__slider-container__slider__slide__content__btn-container">
        <a href="../online-zoo/zoos/${petsList[j].name}/" class="wrapper-pets__slider-container__slider__slide__content__btn-container__btn_watch">Watch online</a>
        <a href="#" class="wrapper-pets__slider-container__slider__slide__content__btn-container__btn_donate">Donate</a>
      </div>
    </div>
  </div>`
  )
}

const petsCarouselSlide = document.querySelector('.wrapper-pets__slider-container__slider__slide')

const movePetsCarousel = (direction) => {
  if (direction === 'right') {
    if (petsCarouselSlides.scrollWidth - petsCarouselSlides.offsetWidth - parseInt(getComputedStyle(petsCarouselSlide).marginRight) <= petsCarouselSlides.scrollLeft) {
      petsCarouselControls.value = 1
      petsCarouselControls.defaultValue = petsCarouselControls.value
      petsCarouselControlsText.textContent = `0${petsCarouselControls.defaultValue}/`
      petsCarouselSlides.scrollTo({left: 0, top: 0, behavior: 'smooth'})
    } else {
      petsCarouselControls.value = Number(petsCarouselControls.defaultValue) + 1
      petsCarouselControls.defaultValue = petsCarouselControls.value
      petsCarouselControlsText.textContent = `0${petsCarouselControls.defaultValue}/`
      petsCarouselSlides.scrollBy({left: petsCarouselSlides.offsetWidth + (parseInt(getComputedStyle(petsCarouselSlide).marginRight)), top: 0, behavior: 'smooth'})
    }
  }
  if (direction === 'left') {
    if (petsCarouselSlides.scrollLeft === 0) {
      petsCarouselControls.value = 8
      petsCarouselControls.defaultValue = petsCarouselControls.value
      petsCarouselControlsText.textContent = `0${petsCarouselControls.defaultValue}/`
      petsCarouselSlides.scrollTo({left: 300 * 35, top: 0, behavior: 'smooth'})
    } else {
      petsCarouselControls.value = Number(petsCarouselControls.defaultValue) - 1
      petsCarouselControls.defaultValue = petsCarouselControls.value
      petsCarouselControlsText.textContent = `0${petsCarouselControls.defaultValue}/`
      petsCarouselSlides.scrollBy({left: -(petsCarouselSlides.offsetWidth + (parseInt(getComputedStyle(petsCarouselSlide).marginRight))), top: 0, behavior: 'smooth'})
    } 
  }
  if (direction === 'number') {
      petsCarouselControls.defaultValue = petsCarouselControls.value
      petsCarouselControlsText.textContent = `0${petsCarouselControls.defaultValue}/`
      petsCarouselSlides.scrollTo({left: ((petsCarouselSlides.offsetWidth + (parseInt(getComputedStyle(petsCarouselSlide).marginRight))) * (petsCarouselControls.defaultValue - 1)), top: 0, behavior: 'smooth'})
  }
}

petsCarouselArrowLeft.addEventListener('click', () => {
  movePetsCarousel('left')
  petsCarouselArrowLeft.style.pointerEvents = 'none'
  setTimeout(function() {
    petsCarouselArrowLeft.style.pointerEvents = 'auto'
  }, 600)
})
petsCarouselArrowRight.addEventListener('click', () => {
  movePetsCarousel('right')
  petsCarouselArrowRight.style.pointerEvents = 'none'
  setTimeout(function() {
    petsCarouselArrowRight.style.pointerEvents = 'auto'
  }, 600)
})
petsCarouselControls.addEventListener('input', () => {movePetsCarousel('number')})