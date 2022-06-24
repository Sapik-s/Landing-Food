window.addEventListener('DOMContentLoaded', function() {

    let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabsContent() {
        tabsContent.forEach(e  => {
            e.classList.add('hide');
            e.classList.remove('show');
        });

        tabs.forEach(e => {
            e.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click' , function(event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((e, i) => {
                if (target == e) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    const deadline = '2022-09-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //modal
    const modalTrigger = document.querySelector('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal'),
          btnModal = document.querySelectorAll('#Btn-modal');

    function showModalFucn(){
        modalTrigger.style.cssText = `display: block;`;
        document.body.style.overflow = 'hidden';
    }

    function hideModalFucn(){
        modalTrigger.style.cssText = `display: none;`;
        document.body.style.overflow = '';
    }

    btnModal.forEach(btn => {
        btn.addEventListener('click', () =>{
            showModalFucn();
            window.removeEventListener('scroll', showModalByScroll);
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        hideModalFucn();
    });

    modal.addEventListener('click', (e) => {
        if(e.target == modal){
            hideModalFucn();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == "Escape" && modalTrigger.style.cssText == `display: block;`) {
            hideModalFucn();
        }
    });

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModalFucn();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});