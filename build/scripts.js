import { el } from "./lib/elements.js";
import { fetchJson } from "./lib/fetch.js";
import { lunch } from "./lib/lunch.js";




const questionSegment = document.querySelector(".question");

const nextbtn = document.querySelector('.nextbtn');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let eegg = 0;

async function nextquestion(){
    questionSegment.innerHTML = '';
    const booksJson = await fetchJson("https://opentdb.com/api.php?amount=1&type=multiple");
    const answersElement = el('section', {class: "answers"}, )
    const Answers = [];
    for (let i = 0; i<3; i++){
        Answers[i] = el('button', {onclick:"correct()"}, booksJson.results[0].incorrect_answers[i]);
    }
    Answers.push(el('button', {onclick:"correct(correct)"}, booksJson.results[0].correct_answer))
    shuffleArray(Answers);
    for (let i = 0; i<4; i++){
        answersElement.appendChild(Answers[i]);
        console.log(Answers[i]);
    }
    questionSegment.appendChild(el('h1',{},booksJson.results[0].question))
    questionSegment.appendChild(answersElement);
    questionSegment.appendChild(el('h4', {class:"correct"}, "Correct!"))
    eegg++;
    console.log(eegg);
    if (eegg == 5){
        lunch();
    }
}



nextbtn.addEventListener('click', nextquestion);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Random index from 0 to i
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;  // Optional: returns the shuffled array
}