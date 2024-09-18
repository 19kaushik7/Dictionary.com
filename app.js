const formEl = document.querySelector('#form');
const resultEl = document.querySelector('.result');





formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    getDictionaryInfo(formEl[0].value);
});

const getDictionaryInfo = async (inputVal) => {
    try {
const responceApi = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal}`);
const data = await responceApi.json();
   console.log(data);
   console.log(data[0].phonetics[0].audio);
   let definition = data[0].meanings[0].definitions[0];
   resultEl.style.display = 'block';
   resultEl.innerHTML = `
   <div class='header-info'>
   <h2><strong>Word: </strong>${data[0].word}</h2>
   <audio id="myAudio">
  <source src=${data[0].phonetics[0].audio}>
</audio>
   <i class="fa-solid fa-volume-high" id='sound' onclick='readyToPlay()'></i>
   </div>
   <p class='part-of-speech'>${data[0].meanings[0].partOfSpeech}</p>
   <p><strong>Meaning: </strong>${definition.definition === undefined ? 'Not Found' : definition.definition}</p>
   <p><strong>Exemple: </strong>${definition.example === undefined ? 'Not Found' : definition.example}</p> 
   `;

   for (let i = 0; i < definition.antonyms.length; i++) {
      resultEl.innerHTML += `<li>${definition.antonyms[i]}</li>`
   }
//    ADDING READ MORE BUTTON 
resultEl.innerHTML += `<div class='read-more'><a href='${data[0].sourceUrls}' target='_blank'>Read More</a></div>`;

} catch (error) {
    resultEl.innerHTML = `<p>Sorry, The word could not be found.</p>`;    
}
} 


const sound = document.querySelector('#sound');
function readyToPlay() {
let myAudio = document.querySelector('#myAudio');
    myAudio.play();
}

