//Открывающееся бургер-меню
const burgerMenuLink = document.querySelector('.burger-menu-open');
const burgerMenuOpen = document.querySelector('.burger-menu');
const body = document.querySelector('body');


burgerMenuLink.addEventListener('click', function () {
  if (burgerMenuLink.classList.contains('is-active')) {
    body.classList.remove('locked');
    burgerMenuLink.classList.remove('is-active');
    burgerMenuOpen.classList.remove('is-active');
  } else {
    body.setAttribute('class', 'locked');
    burgerMenuLink.classList.add('is-active');
    burgerMenuOpen.classList.add('is-active');
  }
});

//Модальное окно секции отзывы
const modalButtonOpen = document.getElementsByClassName('button_reviews');
const modalActive = document.querySelector('.modal-review');
const modalButtonClose = document.querySelector('.modal-review__close');


for (var i = 0; i < modalButtonOpen.length; i++) {
  modalButtonOpen[i].addEventListener('click', function () {
    body.setAttribute('class', 'locked');
    modalActive.classList.add('is-active');
  });
}

modalButtonClose.addEventListener('click', function (e) {
  e.preventDefault();
  body.classList.remove('locked');
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
    body.setAttribute('class', 'locked');
  });

});

closeModalOrder.addEventListener('click', function (e) {
  e.preventDefault();
  body.classList.remove('locked');
  modalOrder.classList.remove('is-active');
})

buttonCloseModalOrder.addEventListener('click', function (e) {
  e.preventDefault();
  body.classList.remove('locked');
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
      let allLinks = document.querySelectorAll('.menu-acco__item');

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

// let teamAcco=function(){
//   let teamList=document.querySelector('.team-acco');

//   teamList.addEventListener("click", e =>{
//     e.preventDefault();
//     let target=e.target;
//     const item=target.closest('.team-acco__item');
//     const items=document.querySelectorAll('.team-acco__item');

//     if(target.className == "team-acco__link") {
//       if(!item.classList.contains('is-active')) {
//         for(var i=0;i<items.length;i++){
//           items[i].classList.remove('is-active');
//         }
//         item.classList.add('is-active');
//       } else {
//         item.classList.remove('is-active');
//       }
//     }
//   });
// };

// teamAcco();

let teamAcco = () => {
  let teamLinkList = document.querySelectorAll('.team-acco__link');

  teamLinkList.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let activePerson = document.querySelector('.team-acco__item.is-active');

      if (activePerson) {
        let teamAccoContent = activePerson.querySelector('.team-acco__content')

        teamAccoContent.style.height = "0px";
        activePerson.classList.remove('is-active');
      }

      if (!activePerson || activePerson.querySelector('.team-acco__link') !== this) {
        let currentPerson = this.closest(".team-acco__item");
        currentPerson.classList.add('is-active');

        let currentPersonAccoContent = currentPerson.querySelector('.team-acco__content');
        currentPersonAccoContent.style.height = currentPersonAccoContent.scrollHeight + 'px';
      }

    });
  });
};

teamAcco();


//слайдер бургер

let isMobile = () => {
  let screen = document.documentElement.clientWidth;
  let mobile = false;
  if (screen <= 768) {
    mobile = true;
  }
  return mobile;
}


let slider = options => {
  let wrapper = document.querySelector(options.wrapper);
  let width = wrapper.clientWidth;
  wrapper.style.width = width + 'px';
  let step = width;
  let list = document.querySelector(options.list);
  let items = document.querySelectorAll(options.item);

  let left = document.querySelector(options.left);
  let right = document.querySelector(options.right);

  items.forEach(element => {
    element.style.width = width + 'px';
  });

  let positionMaxRight = width * (items.length - 1);

  let positionRight = 0;

  let _right = position => {
    if (position <= positionMaxRight) {
      positionRight = positionRight + step;
      list.style.right = positionRight + "px";
    }
  };

  let _left = position => {
    if (position >= 0) {
      positionRight = positionRight - step;
      list.style.right = positionRight + "px";
    }
  };

  let initial = () => {
    list.style.right = positionRight;

    right.addEventListener("click", e => {
      console.log('click right');
      e.preventDefault();

      _right(positionRight + step);
    });

    left.addEventListener("click", e => {
      e.preventDefault();
      console.log('click left');

      _left(positionRight - step);
    });

  };

  return {
    init: initial
  }
};

slider({
  wrapper: '.slider-container',
  list: '.slider__list',
  item: '.slider__item',
  right: '.slider__button-right',
  left: '.slider__button-left'
}).init();

//map
ymaps.ready(init);



function init() {
  var map = new ymaps.Map(document.querySelector('#map'), {
    center: [59.94, 30.32],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  var placemark = new ymaps.Placemark([59.97, 30.31], {
    hintContent: '<div class"map__hint>ул. Ленина, дом 10</div>'
  },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/map-marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]
    });

  var placemark2 = new ymaps.Placemark([59.94, 30.36], {
    hintContent: '<div class"map__hint>ул. Ленина, дом 10</div>'
  },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/map-marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]
    });

  var placemark3 = new ymaps.Placemark([59.9, 30.32], {
    hintContent: '<div class"map__hint>ул. Ленина, дом 10</div>'
  },
    {
      iconLayout: 'default#image',
      iconImageHref: '../img/map-marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]
    });

  map.geoObjects.add(placemark);
  map.geoObjects.add(placemark2);
  map.geoObjects.add(placemark3);
}

//OPS
const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const mobile = md.mobile;
const performTransition = sectionEq => {

  if (inscroll) return;
  inscroll = true;
  sectionEq = parseInt(sectionEq);
  const position = (sectionEq * -100) + '%';
  sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

  const sidebarButtons=$('.sidebar__link').removeClass('sidebar__link_activ');
  const sidebarButton=$($('.sidebar__link').filter($('[data-scroll-to="'+sectionEq+'"]'))).addClass('sidebar__link_activ');

  

  setTimeout(() => {
    inscroll = false;
  }, 1300);

  display.css({
    'transform': 'translateY(' + position + ')'
  });

}

const defineSections = sections => {
  const activeSection = sections.filter('.active');

  return {
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  }
}

const scrollToSection = direction => {
  // const activeSection = sections.filter('.active');
  // const prevSection = activeSection.prev();
  // const nextSection = activeSection.next();
  const section = defineSections(sections);

  if (direction === 'up' && section.nextSection.length) {
    performTransition(section.nextSection.index());
  }

  if (direction === 'down' && section.prevSection.length) {
    performTransition(section.prevSection.index());
  }
}

$('.wrapper').on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = (deltaY > 0) ? 'up' : 'down';

    scrollToSection(direction);

    // if (deltaY > 0) {
    //   // performTransition(4);
    //   scrollToSection('up');
    // }

    // if (deltaY < 0) {
    //   scrollToSection('down');
    // }
    // console.log(deltaY);
  },
  touchmove: e => (e.preventDefault())
});



$(document).on('keydown', e => {
  switch (e.keyCode) {
    case 40:
      scrollToSection('up');
      break;
    case 38:
      scrollToSection('down');
      break;
  }
})

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();
  const sectionNum = $(e.currentTarget).attr('data-scroll-to');
  if (burgerMenuLink.classList.contains('is-active')) {
    burgerMenuLink.classList.remove('is-active');
    burgerMenuOpen.classList.remove('is-active');
  }
  // const sidebarButtons=$('.sidebar__link').removeClass('sidebar__link_activ');
  // const sidebarButton=$(e.currentTarget).addClass('sidebar__link_activ');
  performTransition(sectionNum);
})

if (mobile) {
  $(window).swipe({
    //Generic swipe handler for all directions
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      scrollToSection(direction);
    }
  });
}

//player


let video;
let durationControl; 
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function(){
    video = document.getElementById("player"); 

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");    
    durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('onmousemove',setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval); 
    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;
    
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");
    
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1)
        // video.webkitRequestFullScreen(); возможность открыть в полноэкранном режиме
    }else{
        // останавливаем видео
        video.pause();  
        clearInterval(intervalId);
        // document.webkitExitFullscreen(); выйти из полноэкранного режима
    }
}

/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume ===0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

function stopInterval(){
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){
    video.currentTime = durationControl.value;   
    intervalId = setInterval(updateDuration,1000/66);    
}

/*
    Управление звуком видео
*/
function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
    */
    video.volume = soundControl.value/10;  
}

/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
}



