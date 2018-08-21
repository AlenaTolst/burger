//Открывающееся бургер-меню
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

//Модальное окно секции отзывы
const modalButtonOpen = document.getElementsByClassName('button_reviews');
const modalActive = document.querySelector('.modal-review');
const modalButtonClose = document.querySelector('.modal-review__close');


for (var i = 0; i < modalButtonOpen.length; i++) {
  modalButtonOpen[i].addEventListener('click', function () {
    body[0].setAttribute('class', 'locked');
    modalActive.classList.add('is-active');
  });
}

modalButtonClose.addEventListener('click', function (e) {
  e.preventDefault();
  body[0].classList.remove('locked');
  modalActive.classList.remove('is-active');
})

//Отправка формы

const form = document.querySelector("#main-form");
const send = document.querySelector('.button_form');
const modalOrder = document.querySelector('.modal-order');
const modalOrderText = document.querySelector('.modal-order__text');
const closeModalOrder = document.querySelector('.modal-order__close-link');
const buttonCloseModalOrder = document.querySelector('.modal-order__button');

send.addEventListener('click', e => {
  e.preventDefault();

  const data = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    comment: form.elements.comment.value,
    to: 'example@example.com'
  };

  console.log(data);

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
  xhr.send(JSON.stringify(data));
  xhr.addEventListener('load', () => {
    modalOrderText.innerHTML = xhr.response.message;
    modalOrder.classList.add('is-active');
    body[0].setAttribute('class', 'locked');
  });

});

closeModalOrder.addEventListener('click', function (e) {
  e.preventDefault();
  body[0].classList.remove('locked');
  modalOrder.classList.remove('is-active');
})

buttonCloseModalOrder.addEventListener('click', function (e) {
  e.preventDefault();
  body[0].classList.remove('locked');
  modalOrder.classList.remove('is-active');
})

//Mеню с бургерами аккордеон

let horizontalAcco = () => {
  let culcWidth = () => {
    let windowWidth = document.getElementsByTagName('body')[0].offsetWidth;
    let links = document.getElementsByClassName('menu-acco__trigger');
    let linkWidth = document.querySelector('.menu-acco__trigger').offsetWidth;
    let reqWidth = windowWidth - linkWidth * links.length;
    return reqWidth > 550 ? 550 : reqWidth;
  }
    let menuLinkList = document.querySelectorAll('.menu-acco__trigger');

    menuLinkList.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        console.log('click');
        let activeLink = document.querySelector('.menu-acco__item.is-active');
        let allLinks=document.querySelectorAll('.menu-acco__item');

        if (activeLink) {
          let menuAccoContent = activeLink.querySelector('.menu-acco__content')

          menuAccoContent.style.width = "0px";
          activeLink.classList.remove('is-active');
        }

        if (!activeLink || activeLink.querySelector('.menu-acco__trigger') !== this) {
          let currentItem = this.closest(".menu-acco__item");
          currentItem.classList.add('is-active');

          let currentLinkAccoContent = currentItem.querySelector('.menu-acco__content');
          currentLinkAccoContent.style.width = culcWidth() + 'px';
        }

      });
    });
}
horizontalAcco();


//Аккордеон команда

let teamAcco=function(){
  let teamList=document.querySelector('.team-acco');

  teamList.addEventListener("click", e =>{
    e.preventDefault();
    let target=e.target;
    const item=target.closest('.team-acco__item');
    const items=document.querySelectorAll('.team-acco__item');

    if(target.className == "team-acco__link") {
      if(!item.classList.contains('is-active')) {
        for(var i=0;i<items.length;i++){
          items[i].classList.remove('is-active');
        }
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    }
  });
};

teamAcco();

// let teamAcco=() =>{
//   let teamLinkList=document.querySelectorAll('.team-acco__link');

//   teamLinkList.forEach(function(link){
//     link.addEventListener("click", function(e){
//       e.preventDefault();
//       let activePerson=document.querySelector('.team-acco__item.is-active');

//       if(activePerson){
//         let teamAccoContent=activePerson.querySelector('.team-acco__content')

//         teamAccoContent.style.height="0px";
//         activePerson.classList.remove('is-active');
//       }

//       if(!activePerson || activePerson.querySelector('.team-acco__link')!==this) {
//         let currentPerson=this.closest(".team-acco__item");
//         currentPerson.classList.add('is-active');

//         let currentPersonAccoContent=currentPerson.querySelector('.team-acco__content');
//         currentPersonAccoContent.style.height=currentPersonAccoContent.scrollHeight+'px';
//       }

//     });
//   });
// };

// teamAcco();




//Меню бургеров слайдер

const left = document.querySelector(".slider__button-left");
const right = document.querySelector(".slider__button-right");
const items = document.querySelector(".slider__list");
const computed = getComputedStyle(items);


right.addEventListener("click", function(e) {
  e.preventDefault();
  let currentRight = parseInt(computed.right);

  if (!currentRight) {
    currentRight = 0;
  }
  
  if (currentRight < 500) {
    items.style.right = currentRight + 100 + "px";
  }
});

left.addEventListener("click", function(e) {
  e.preventDefault();
  let currentRight = parseInt(computed.right);

  if (!currentRight) {
    currentRight = 0;
  }

  if (currentRight > 0) {
    items.style.right = currentRight - 100 + "px";
  }
});





