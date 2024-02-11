import axios from "axios";
import SlimSelect from 'slim-select';

axios.defaults.headers.common["x-api-key"] = "live_wQ6zKqW4xLdmiSOAOnksWBFRuoDhl8Kigsple5smLKaGN6zFiomdv9HJpNMvd43A";

new SlimSelect ({
    select: '#breed-select',
    placeholder: 'Select Breed',
    onChange: (selected) => {
      const breedId = selected.value();
      fetchCatByBreed(breedId)
        .then((catData) => {
          displayCatInfo(catData);
        })
      .catch(error => {
        Notiflix.Notify.failure('Error fetching breeds. Please try again later.');
        console.error('Error fetching breeds. Please try again later.', error);
        showError();
      });
  }
});

  export async function fetchBreeds() {
    try {
      const response = await axios.get("https://api.thecatapi.com/v1/breeds");
      return response.data;
    } catch (error) {
      console.error('Error fetching breeds:', error);
      Notiflix.Notify.failure('Error fetching cat information. Please try again later.');
      throw error;
    }
  }
  
  export async function fetchCatByBreed(breedId) {
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cat by breed:', error);
      Notiflix.Notify.failure('Error fetching cat information. Please try again later.');
      throw error;
    }
  }

function displayCatInfo(catData) {
    const catInfoDiv = document.querySelector('.cat-info');
    const loader = document.querySelector('.loader');
    const breedSelect = document.querySelector('#breed-select');
  
    const catImage = document.getElementById('cat-image');
    const breedName = document.getElementById('breed-name');
    const description = document.getElementById('description');
    const temperament = document.getElementById('temperament');
    
  
    catImage.src = catData[0].url;
    breedName.textContent = catData[0].breeds[0].name;
    description.textContent = catData[0].breeds[0].description;
    temperament.textContent = catData[0].breeds[0].temperament;
  
    catInfoDiv.style.display = 'block';
    loader.style.display = 'none';
    breedSelect.style.display = 'none';
  }
  
  function showError() {
    const errorElement = document.querySelector('.error');
    const loader = document.querySelector('.loader');
    const breedSelect = document.querySelector('#breed-select');
  
    errorElement.style.display = 'block';
    loader.style.display = 'none';
    breedSelect.style.display = 'none';
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector('.loader');
    const breedSelect = document.querySelector('#breed-select');
    const errorElement = document.querySelector('.error');
  
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    errorElement.style.display = 'none';
  
    fetchBreeds()
      .then(breeds => {
        breeds.forEach(breed => {
          breedSelect.innerHTML += `<option value="${breed.id}">${breed.name}</option>`;
        });
        breedSelect.style.display = 'block';
        loader.style.display = 'none';
      })
      .catch(error => {
        Notiflix.Notify.failure('Error fetching cat information. Please try again later.');
        console.error('Error fetching cat information. Please try again later.', error);
        showError();
      });
  });
  