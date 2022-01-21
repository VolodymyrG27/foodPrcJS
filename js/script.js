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
          modal = document.querySelector('.modal');


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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 50000);

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

    //Отримуємо дані з DB
    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }


        return await res.json();
    };

/*
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
*/
    //Використання бібліотеки axios
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

        //другий варіант створення вище вказаних елементів, різниця в тому що він не буде використовувати класи, буде зразу формути верстку
        /*getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

        function createCard(data) {
            data.forEach(({img, altimg, title, descr, price}) => {
                const element = document.createElement('div');

                element.classList.add('menu__item');
                element.innerHTML = `
                    <img src="${img}" alt="${altimg}">
                    <h3 class="menu__item-subtitle">${title}"</h3>
                    <div class="menu__item-descr">${descr}></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                    </div>
                `;
                document.querySelector('.menu .container').append(element);
            });
        }*/

    /*Відправляємо дані на сервер з форм*/
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thank you',
        failure: 'error...'
    };

    forms.forEach(item => {
        bindPostDate(item);
    });

 // Постинг даних до бази даних за допомогою json-server
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
            `;

            form.insertAdjacentElement('afterend', statusMessage); //Замість append для форми яка зразу відображена

           const formData = new FormData(form);
           
           // Form Data перетворюємо в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div> 
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal();
        }, 4000) 
    }

    //SLIDER

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    
          let slideIndex = 1;
          let offset = 0;
    //slider типу каруселі який є незалежний від кількості елементів

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

});
