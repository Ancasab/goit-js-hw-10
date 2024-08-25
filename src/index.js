"use strict";

import axios from 'axios';
import Notiflix from 'notiflix';


axios.defaults.headers.common['x-api-key'] = 'live_qZuYx3rGEnTsT5CEggwmg46wjLVKCaUJFGjXpuyIw9LbBP5gLRoPCpKY5ZTkPuKw';


const selectElement = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

loaderElement.style.visibility = 'visible';
errorElement.style.visibility = 'hidden';

async function fetchBreeds() {
  try {
    
    loaderElement.style.visibility = 'visible';
    errorElement.style.visibility = 'hidden';
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    
    const breeds = response.data;

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;  
      option.textContent = breed.name;
      selectElement.appendChild(option);  


    });

   
    loaderElement.style.visibility = 'hidden';
    selectElement.style.visibility = 'visible';
  } catch (error) {
    Notiflix.Notify.failure('Failed to fetch breeds. Please try again later.');
   
    errorElement.style.visibility = 'visible';
    loaderElement.style.visibility = 'hidden';
  }
}

async function fetchCatByBreed(breedId) {
  try {
  
    loaderElement.style.visibility = 'visible';
    errorElement.style.visibility = 'hidden';

    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const catData = response.data[0]; 


    catInfoElement.innerHTML = `
      <img src="${catData.url}" alt="${catData.breeds[0].name} width="500" height="300"">
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;

    loaderElement.style.visibility = 'hidden'

  } catch (error) {
    Notiflix.Notify.failure('Failed to fetch cat information. Please try again.');
   
    errorElement.style.visibility = 'visible';
  } finally {
    loaderElement.style.visibility = 'hidden'
  }
};


selectElement.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId);
});

fetchBreeds();














