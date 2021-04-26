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

const switcher = (document.querySelector('.switch')).querySelector('input[type="checkbox"]')

const toggleColorTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', '')
  }
}

switcher.addEventListener('change', toggleColorTheme)