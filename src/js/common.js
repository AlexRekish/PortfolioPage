"use strict"
;(function(){
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.main-menu');
    var content = document.querySelector('.page-header__wrapper');
    var name = document.querySelector('.page-header__name');
    var social = document.querySelector('.social');
    var tabs = document.querySelectorAll('.who-i-am__tabs');
    var tabsContainer = document.querySelector('.tabs-container')
    var tabsSections = document.querySelectorAll('.who-i-am__section');
    var menuLinks = document.querySelectorAll('.main-menu__link');
    var place = document.querySelector('.skills');
    var skills = document.querySelectorAll('.skills__my-skill');
    var rocket = document.querySelector('.rocket');

    //Бургер меню************************************************************************
    burger.addEventListener('click', function(evt) {
        evt.preventDefault();
        content.classList.toggle('page-header__wrapper--left');
        name.classList.toggle('page-header__name--right');
        burger.classList.toggle('burger--open');
        menu.classList.toggle('main-menu--open');
        social.classList.toggle('social--left');
        social.classList.toggle('social--fixed');
    });
    //Табы*********************************************************************************
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
// ПРОКРУТКА СТРАНИЦЫ, НЕ МОЕ. Разобрался
    (function() {
        var linkNav = document.querySelectorAll('[href^="#"]');
        var V = 0.3;
        //выбираем все ссылки к якорю на странице
             // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
        for (var i = 0; i < linkNav.length; i++) {
            linkNav[i].addEventListener('click', function (evt) { 
                evt.preventDefault(); 
                if (evt.currentTarget.href == document.querySelector('[href="#home"]').href) {
                    V = 0.15;
                } 
                var w = window.pageYOffset,
                    hash = this.href.replace(/[^#]*(.*)/, '$1'),
                    t = document.querySelector(hash).getBoundingClientRect().top, 
                    start = null;
                requestAnimationFrame(step); 
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
    //Закрываем меню при клике по ссылке
    for (var link = 0; link < menuLinks.length; link++) {
        menuLinks[link].addEventListener('click', function (evt) {
            evt.preventDefault();
            content.classList.toggle('page-header__wrapper--left');
            name.classList.toggle('page-header__name--right');
            burger.classList.toggle('burger--open');
            menu.classList.toggle('main-menu--open');
            social.classList.toggle('social--left');
            social.classList.toggle('social--fixed');
        });
    }

//Появление навыков и ракеты при прокрутке до секции****************************************
    window.onscroll = function () {
        var section2 = document.querySelector('.who-i-am')
        var section2Top = section2.getBoundingClientRect().top + section2.offsetHeight;
        var placeSourceBottom = place.getBoundingClientRect().top + window.pageYOffset - (skills[0].offsetHeight) /*- document.querySelector('.skills__header').offsetHeight / 4;*/
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
        
        if (window.pageYOffset > section2Top) {
            rocket.classList.add('rocket--visible');
        } else rocket.classList.remove('rocket--visible');
    };
//Слайдер**********************************************************************
    var works = document.querySelectorAll('.my-works__work');
    var slider = document.querySelector('.my-works__slider-container');
    var sliderNext = document.querySelector('.my-works__slider-button--next');
    var sliderPrev = document.querySelector('.my-works__slider-button--prev');
    var translate = 0;
    // console.log(works, sliderNext, sliderPrev);

    sliderNext.addEventListener('click', function(evt) {
        evt.preventDefault();
        // console.log('1');
        for(var i = 0; i < works.length; i++) {
            if (works[i].classList.contains('my-works__work--active')) {
                if ([i + 1] < works.length) {
                    // console.log(translate);
                    translate -= 100;
                    slider.style.transform = 'translate(' + translate + 'vw, 0)';
                    works[i].classList.remove('my-works__work--active');
                    works[i + 1].classList.add('my-works__work--active');
                    // console.log(translate);
                    break;
                }   else {
                        translate = 0;
                        slider.style.transform = 'translate(' + translate + 'vw, 0)';
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
                    translate += 100;
                    slider.style.transform = 'translate(' + translate + 'vw, 0)';
                    works[i].classList.remove('my-works__work--active');
                    works[i - 1].classList.add('my-works__work--active');
                    break;
                }   else {
                        translate = -(works.length - 1) * 100;
                        slider.style.transform = 'translate(' + translate + 'vw, 0)';
                        works[i].classList.remove('my-works__work--active');  
                        works[works.length - 1].classList.add('my-works__work--active'); 
                        break;
                }
                   
            }
        }
    });

/*Параллакс*********************************************************************************** */
    var parallaxContainer = document.querySelector('.parallax-wrapper');
    var worksSection = document.querySelector('.my-works');

    function moveTriangles(evt) {    
        var parallaxLayers = parallaxContainer.children;
        var pageX = evt.pageX;
        var pageY = evt.pageY;
        var initialX = window.innerWidth / 2 - pageX;
        var initialY = window.innerHeight / 2 - pageY;
        for (var  i = 0; i < parallaxLayers.length; i++) {
            var divider = (i + 1) / 100;
            var translateX = initialX * divider;
            var translateY = initialY * divider;
            var transform = 'translate3d(' + translateX + 'px ,' + translateY + 'px, 0)';
            parallaxLayers[i].style.transform = transform;
        }
    };
    if (window.innerWidth > 768) {
        worksSection.addEventListener('mousemove', moveTriangles);
    }
    


})();