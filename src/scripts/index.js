import 'regenerator-runtime'; /* for async await transpile */
import '../styles/css/main.css';

//function for taking data from data.json
//import {readFile} from 'fs/promises';
import dataJSON from '../DATA.json';
// const dataJSON = JSON.parse(
//   await readFile(
//     new URL('../DATA.json', import.meta.url);
//   )
// )
//console.log(data);
const data = dataJSON.restaurants;

//function for making list from data
  //finding how much data
  //function itemList
const newElement = (elmt) => {
  return document.createElement(elmt);
}
  //get main element
const main = document.getElementsByTagName('main')[0]

  //function for generating resto list-item
const newListItem = ({id, name, description, pictureId, city, rating}) => {
  const restoElement = newElement('article');
  restoElement.setAttribute('id', `${id}`);
  restoElement.classList.add('list-item');
  const restoElement_upper = newElement('section');
  restoElement_upper.setAttribute('class', "upper-section");
  const restoElement_under = newElement('section');
  restoElement_under.setAttribute('class', "under-section");

  const restoElement_picture = newElement('img');
  restoElement_picture.setAttribute('src', `${pictureId}`);
  restoElement_picture.setAttribute('class', "resto-picture");
  restoElement_picture.setAttribute('alt', `Picture of ${name}`);

  const restoElement_name = newElement('h3');
  restoElement_name.innerText = name;
  restoElement_name.setAttribute('class', "resto-name");

  const restoElement_rating = newElement('p');
  restoElement_rating.innerHTML = `<p>${rating.toFixed(1)}</p><img src="./images/rating/star-rating.jpg" alt="">`;
  restoElement_rating.setAttribute('class', "resto-rating");

  const restoElement_city = newElement('p');
  restoElement_city.innerText = city;
  restoElement_city.setAttribute('class', "resto-city");

  const restoElement_description = newElement('p');
  restoElement_description.innerText = description;
  restoElement_description.setAttribute('class', "resto-description");

  const moreButton = newElement('button');
  moreButton.innerText = 'Read More';
  moreButton.classList.add('more-button', 'clickable');

  restoElement_upper.append(restoElement_rating, restoElement_picture);
  restoElement_under.append(restoElement_name, restoElement_city, restoElement_description, moreButton);
  restoElement.append(restoElement_upper, restoElement_under);
  main.lastElementChild.append(restoElement)
}

  //putting list-item to DOM
data.forEach(item => {
  newListItem(item);
});

//function for off canvas menu
const hamburgerElement = document.querySelector('.hamburger');
const drawerElement = document.querySelector('.drawer');

hamburgerElement.addEventListener('click', () => {
  if (drawerElement.classList.contains('open')) {
      drawerElement.classList.remove('open');
      hamburgerElement.innerHTML = '&#9776;';
  } else {
    drawerElement.classList.add('open');
    hamburgerElement.innerHTML = '&times;';
  }
})

//extending overflowed text 
const textOverflowElement = document.querySelectorAll('.resto-description')
const moreButtonElements = document.querySelectorAll('.more-button');
let clickedBefore = null;

textOverflowElement.forEach(textE => {
  textE.addEventListener('click', (e) => {
    e.target.classList.remove('extended-overflow');
    e.target.nextSibling.style.visibility = "visible";
  })
});

moreButtonElements.forEach(textM => {
  textM.addEventListener('click', (e) => {
    e.target.previousSibling.classList.add('extended-overflow');
    e.target.style.visibility = 'hidden';

    if (clickedBefore) {
      clickedBefore.previousSibling.classList.remove('extended-overflow');
      clickedBefore.style.visibility = "visible";
    }

    clickedBefore = e.target;
  })
});

//click more --> extended; more --> disappear


//click twice --> folded
//click another --> extended; previous --> folded

//function to make header change color
//relative height hero
//ketika di akhir hero => opacity 1
//ketika scroll => gradullay turn to 1
//how musch the opacity decrease each pixel?
// 1 => height
//x => scroll
//x = scroll/height

const navElement = document.querySelector('nav');

window.addEventListener('resize', () => {
  const screenWidth = document.body.clientWidth;
  if (screenWidth > 600) {
    navElement.style.backgroundColor = 'transparent'
  } else {
    navElement.style.backgroundColor = 'rgb(229,176,77)'
  }
})

window.addEventListener('scroll', () => {
  const screenWidth = document.body.clientWidth;
  if (screenWidth > 600) {
    const offset = window.scrollY / 10;
    const relHeight = navElement.offsetHeight;

    navElement.style.backgroundColor = `rgba(229,176,77, ${offset / relHeight})`;
  }
})