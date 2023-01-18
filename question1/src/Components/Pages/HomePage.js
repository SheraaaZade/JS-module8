import places from '../../utils/places';

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="text-center">
      <h1>Places to visit!</h1>
      ${places.map((place) => `<div>${place.name}</div>`).join('<hr>')}
    </div>
  `;
};

export default HomePage;
