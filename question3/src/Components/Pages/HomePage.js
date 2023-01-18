const API = 'https://places-exam-api.azurewebsites.net';

const renderRecommended = async () => {
  const div = document.createElement('div');
  div.classList.add('bg-primary', 'my-4', 'p-4');
  div.innerHTML = 'Recommended place is ';
  document.querySelector('main').append(div);

  const recommended = await fetch(`${API}/recommended`).then((res) => res.json());
  div.innerHTML = `Recommended place: <strong>${recommended.name}</strong>`;
};

const renderPlaces = async () => {
  const places = await fetch(`${API}/places`).then((res) => res.json());
  const main = document.querySelector('main');
  main.innerHTML = '<h1 class="my-4">Vacation spots</h1>';

  places.forEach((place) => {
    main.innerHTML += `<div class="my-2">${place.name}</div>`;
  });
  await renderRecommended();
};

const HomePage = () => {
  const main = document.querySelector('main');
  main.classList.add('text-center');
  main.innerHTML = 'Loading ...';
  renderPlaces();
};

export default HomePage;
