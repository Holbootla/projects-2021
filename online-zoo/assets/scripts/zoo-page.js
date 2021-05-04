// Changing video in slider

const videoBig = document.querySelector('.video-slider-container__view').querySelector('iframe')
const videoSlider = document.querySelector('.video-slider-container__slider')

const changeVideo = (event) => {
  if (event.target.classList.contains('stop-cover')) {
    const tempSrc = videoBig.src
    videoBig.src = event.target.previousElementSibling.src
    event.target.previousElementSibling.src = tempSrc
  }
}

videoSlider.addEventListener('click', (event) => {
  changeVideo(event)
})