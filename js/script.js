import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import sliders from './modules/sliders';
import timer from './modules/timer';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    cards();
    forms('form', modalTimerId);
    sliders({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2022-12-28');
    
});
