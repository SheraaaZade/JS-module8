import { clearPage } from '../../utils/render';
import places from '../../utils/places';

let currentPlace = 2;

const PhotosPage = () => {
  clearPage();
  renderPhoto();
};

function renderPhoto() {
  const main = document.querySelector('main');
  const place = places[currentPlace];

  main.innerHTML = `
    <div class="container text-center">
      <img src="${place.image}" alt="Photo of ${place.name}" id="photo" />
      <div class="my-4" id="name">${place.name}</div>
      <div class="my-4">
        <button class="btn btn-secondary" id="btn-prev">Previous</button>
        &nbsp;&nbsp;&nbsp;
        <button class="btn btn-secondary" id="btn-next">Next</button>
      </div>
    </div>
  `;

  changePhoto(currentPlace);

  document.getElementById('btn-prev').addEventListener('click', () => {
    changePhoto(currentPlace - 1);
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    changePhoto(currentPlace + 1);
  });
}

function changePhoto(index) {
  if (index < 0 || index >= places.length) return;

  currentPlace = index;
  const place = places[currentPlace];

  document.getElementById('photo').src = place.image;
  document.getElementById('name').innerText = place.name;

  document.getElementById('btn-prev').disabled = currentPlace <= 0;
  document.getElementById('btn-next').disabled = currentPlace >= places.length - 1;
}

export default PhotosPage;
