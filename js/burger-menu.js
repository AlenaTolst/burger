const burgerMenuLink = document.getElementsByClassName('burger-menu-open');
const burgerMenuOpen = document.getElementsByClassName('burger-menu');
const body = document.getElementsByTagName('body');


burgerMenuLink[0].addEventListener('click', function () {
  if (burgerMenuLink[0].classList.contains('is-active')) {
    body[0].classList.remove('locked');
    burgerMenuLink[0].classList.remove('is-active');
    burgerMenuOpen[0].classList.remove('is-active');
  } else {
  body[0].setAttribute('class', 'locked');
  burgerMenuLink[0].classList.add('is-active');
  burgerMenuOpen[0].classList.add('is-active');
  }
});