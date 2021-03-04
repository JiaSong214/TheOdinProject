import _, { tap } from 'lodash';
import {mainPage} from './mainPage';
import {menu} from './menuPage';
import {contact} from './contactPage';

function component() {
  //first loading page
  const content = document.querySelector('#content');
  content.innerHTML = mainPage;

  //event listner for tap each page
  const taps = document.querySelectorAll('nav li')
  const nav__home = document.querySelector('.nav__home');
  const nav__menu = document.querySelector('.nav__menu');
  const nav__contact = document.querySelector('.nav__contact');

  nav__home.addEventListener('click', () => {
    content.innerHTML = mainPage;
  })

  nav__menu.addEventListener('click', () => {
    content.innerHTML = menu;
  })

  nav__contact.addEventListener('click', () => {
    content.innerHTML = contact;
  })

  for(let i=0; i<taps.length; i++) {
    taps[i].addEventListener('click', function () {
      taps.forEach((tap) => {
        tap.classList.remove('active');
      })
      this.classList.add('active');
    })
  }

  return content;
}

document.body.appendChild(component());