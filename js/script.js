window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContents = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContents.forEach(item => {
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent(i = 0) {
        //tabsContents[i].style.display = 'block';
        tabsContents[i].classList.add('show', 'fade');
        tabsContents[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    //Timer
    const deadline = '2021-12-28';

    //Функція яка буде оприділяти різницю між дедлайном і теперішнім нашим часом
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        //цю різницю мілісекунд необхідно перетвори в дні години і тп
        const  days = Math.floor( (t/(1000*60*60*24)) ),
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

        
        //Функція яка буде обновляти наш таймер
        function updateClock() {
            const t = getTimeRemaining(endtime); //вертає нам всі дані з функції getTimeRemaining
            //Величини поміщаємо на сторінку
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


    //  Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          closeModal = document.querySelector('[data-close]');


    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', showModal);
    });

    closeModal.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    /*Tabs*/

    class MenuCard{
        constructor(src, alt, subtitle, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.desc = desc;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes; //massive
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const elem = document.createElement('div');
            if (this.classes.length === 0) {
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach(className => {  
                    elem.classList.add(className); //до діва добавляємо клас через оператор rest
                });
            }

            elem.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.subtitle}"</h3>
                    <div class="menu__item-descr">${this.desc}></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(elem);
        }
    }

    /*
    const div = new MenuCard();
    div.render();
    */
    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        12,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        12,
        '.menu .container',
        'menu__item'
    ).render();

    
    /*Відправляємо дані на сервер з форм*/
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading',
        success: 'tahnk you',
        failure: 'error...'
    };

    forms.forEach(item => {
        postDate(item);
    })

    function postDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            //request.setRequestHeader('Content-type'); При використанні звязоз XMLHTTPRequest і formData заголовок встановлювати не треба(він підставляється атоматично)

            /*як зробити так щоб всі дані які заповнив користувач отримати в JS і відправити на сервер
            Є два формата передачі даних - 1.Form data;  2.Формат JSON
            Все залежить від сервера(бекенду)
            formData - спеціальний об*єкт, який дозволяє з певної форми сформувати дані які заповнив користувач(ключ : властивість)
            */
           const formData = new FormData(form);
           request.send(formData);
           request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
           });


        });
    }







});
