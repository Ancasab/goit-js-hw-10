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
    // loaderElement.classList.remove('hidden');
    loaderElement.style.visibility = 'visible';
    errorElement.style.visibility = 'hidden';// Show loader while fetching breeds
    const response = await axios.get('https://api.thecatapi.com/v1/breeds?api_key=live_qZuYx3rGEnTsT5CEggwmg46wjLVKCaUJFGjXpuyIw9LbBP5gLRoPCpKY5ZTkPuKw');
    
    const breeds = response.data;

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;  
      option.textContent = breed.name;
      selectElement.appendChild(option);  


    });

    // Hide loader and show select element after fetching breeds
    // loaderElement.classList.add('hidden');
    loaderElement.style.visibility = 'hidden';
    // selectElement.classList.remove('hidden');
    selectElement.style.visibility = 'visible';
  } catch (error) {
    console.error('Error fetching breeds:', error);
    Notiflix.Notify.failure('Failed to fetch breeds. Please try again later.');
    // Show error message and hide loader
    // errorElement.classList.remove('hidden');
    errorElement.style.visibility = 'visible';
    // loaderElement.classList.add('hidden');
    loaderElement.style.visibility = 'hidden';
  }
}

async function fetchCatByBreed(breedId) {
  try {
    // loaderElement.classList.remove('hidden'); // Show loader while fetching cat data
    loaderElement.style.visibility = 'visible';
    // errorElement.classList.add('hidden'); // Hide error message initially
    errorElement.style.visibility = 'hidden';

    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_qZuYx3rGEnTsT5CEggwmg46wjLVKCaUJFGjXpuyIw9LbBP5gLRoPCpKY5ZTkPuKw`);
    const catData = response.data[0]; 


    catInfoElement.innerHTML = `
      <img src="${catData.url}" alt="${catData.breeds[0].name} width="500" height="300"">
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;

    // Hide loader and show cat info after successful fetch
    // loaderElement.classList.add('hidden');
    loaderElement.style.visibility = 'hidden'
    // catInfoElement.classList.remove('hidden');
    catInfoElement.style.visibility = 'visible';
  } catch (error) {
    console.error('Error fetching cat data:', error);
    Notiflix.Notify.failure('Failed to fetch cat information. Please try again later.');
    // errorElement.classList.remove('hidden'); // Show error message on error
    errorElement.style.visibility = 'visible';
  } finally {
    // Ensure loader is hidden in case of errors
    // loaderElement.classList.add('hidden');
    loaderElement.style.visibility = 'hidden'
  }
}

// function hiddenMessage(element) {
//   if element.querySelector('hidden');
//   hiddenElement.style.visibility = 'hidden'; 
// }

selectElement.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId);
});

fetchBreeds();














