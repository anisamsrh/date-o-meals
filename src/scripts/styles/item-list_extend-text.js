// extending overflowed text
const textOverflowElement = document.querySelectorAll('.resto-description');
const moreButtonElements = document.querySelectorAll('.more-button');
let clickedBefore = null;

textOverflowElement.forEach((textE) => {
  textE.addEventListener('click', (e) => {
    e.target.classList.remove('extended-overflow');
    e.target.nextSibling.style.visibility = 'visible';
  });
});

moreButtonElements.forEach((textM) => {
  textM.addEventListener('click', (e) => {
    e.target.previousSibling.classList.add('extended-overflow');
    e.target.style.visibility = 'hidden';

    if (clickedBefore) {
      clickedBefore.previousSibling.classList.remove('extended-overflow');
      clickedBefore.style.visibility = 'visible';
    }

    clickedBefore = e.target;
  });
});

// click more --> extended; more --> disappear

// click twice --> folded
// click another --> extended; previous --> folded

// function to make header change color
// relative height hero
// ketika di akhir hero => opacity 1
// ketika scroll => gradullay turn to 1
// how musch the opacity decrease each pixel?
// 1 => height
// x => scroll
// x = scroll/height
