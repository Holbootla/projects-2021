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