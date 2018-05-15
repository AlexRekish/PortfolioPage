;(function(){
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.main-menu');
    var content = document.querySelector('.page-header__wrapper');
    var name = document.querySelector('.page-header__name');
    var social = document.querySelector('.page-header__social');
    var tabs = document.querySelectorAll('.who-i-am__tabs');
    var tabsContainer = document.querySelector('.tabs-container')
    var tabsSections = document.querySelectorAll('.who-i-am__section');
    var menuLinks = document.querySelectorAll('.main-menu__link');
    var place = document.querySelector('.skills');
    var skills = document.querySelectorAll('.skills__my-skill');

    burger.addEventListener('click', function(evt) {
        evt.preventDefault();
        content.classList.toggle('page-header__wrapper--left');
        name.classList.toggle('page-header__name--right');
        burger.classList.toggle('burger--open');
        menu.classList.toggle('main-menu--open');
        social.classList.toggle('page-header__social--left');
        social.classList.toggle('page-header__social--fixed');
    })

    tabsContainer.addEventListener('click', function (evt) {
        evt.preventDefault();
        var targetTab = evt.target;
        var index;
        for (var k = 0; k < tabs.length; k++ ) {
            if (tabs[k] === targetTab) {
                index = k;
            }
        }

        var section = tabsSections[index];

        if (!evt.target.classList.contains('active')) {
            tabsContainer.classList.add('active');
            setTimeout(function () {
                tabsContainer.classList.remove('active');
            }, 2000);
        }

        for (var i = 0; i < tabs.length; i++ ) {
            tabs[i].classList.remove('active');
        }

        for (var j = 0; j < tabsSections.length; j++) {
            tabsSections[j].classList.remove('active');
        }
        
        tabs[index].classList.add('active');
        tabsSections[index].classList.add('active');
    });
//************************************************************************************* */
// ПРОКРУТКА СТРАНИЦЫ, НЕ МОЕ
    (function() {
        var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
            V = 0.75; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
        for (var i = 0; i < linkNav.length; i++) {
            linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
                e.preventDefault(); //отменяем стандартное поведение
                var w = window.pageYOffset, // производим прокрутка прокрутка
                    hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
                t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
                    start = null;
                requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
                function step(time) {
                    if (start === null) start = time;
                    var progress = time - start,
                        r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
                    window.scrollTo(0, r);
                    if (r != w + t) {
                        requestAnimationFrame(step)
                    } 
                }
            }, false);
        }
    })();
/****************************************************************************************** */
    for (var link = 0; link < menuLinks.length; link++) {
        menuLinks[link].addEventListener('click', function (evt) {
            evt.preventDefault();
            content.classList.toggle('page-header__wrapper--left');
            name.classList.toggle('page-header__name--right');
            burger.classList.toggle('burger--open');
            menu.classList.toggle('main-menu--open');
            social.classList.toggle('page-header__social--left');
            social.classList.toggle('page-header__social--fixed');
        });
    }
    // history.pushState('', document.title, window.location.pathname);

    window.onscroll = function () {
        var placeSourceBottom = place.getBoundingClientRect().top + window.pageYOffset - (skills[0].offsetHeight) - document.querySelector('.skills__header').offsetHeight / 2;
        if (window.pageYOffset > placeSourceBottom) {
            for (var i = 0; i < skills.length; i++) {
                if (window.pageYOffset > placeSourceBottom) {
                    skills[i].classList.add('skills_my-skill--open');
                    placeSourceBottom += skills[i].offsetHeight;
                } else {
                    skills[i].classList.remove('skills_my-skill--open');
                    }
            } 
        } else {
            skills[0].classList.remove('skills_my-skill--open');
        }        
    }
    
    var works = document.querySelectorAll('.my-works__work');
    var sliderNext = document.querySelector('.my-works__slider-button--next');
    var sliderPrev = document.querySelector('.my-works__slider-button--prev');
    // console.log(works, sliderNext, sliderPrev);

    sliderNext.addEventListener('click', function(evt) {
        evt.preventDefault();
        console.log('1');
        for(var i = 0; i < works.length; i++) {
            if (works[i].classList.contains('my-works__work--active')) {
                if ([i + 1] < works.length) {
                    works[i].classList.remove('my-works__work--active');
                    works[i + 1].classList.add('my-works__work--active');
                    break;
                }   else {
                        works[i].classList.remove('my-works__work--active');  
                        works[0].classList.add('my-works__work--active'); 
                        break;
                }
            }
        }
    });

    sliderPrev.addEventListener('click', function(evt) {
        evt.preventDefault();
        console.log('1');
        for(var i = 0; i < works.length; i++) {
            if (works[i].classList.contains('my-works__work--active')) {
                if ([i - 1] >= 0) {
                    works[i].classList.remove('my-works__work--active');
                    works[i - 1].classList.add('my-works__work--active');
                    break;
                }   else {
                        works[i].classList.remove('my-works__work--active');  
                        works[works.length - 1].classList.add('my-works__work--active'); 
                        break;
                }
                   
            }
        }
    });

})();