import { el } from "./lib/elements.js";
import { fetchJson } from "./lib/fetch.js";




const questionSegment = document.querySelector(".question");

const nextbtn = document.querySelector('.nextbtn');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    questionSegment.appendChild(el('p', {class:"correct"}, "Correct!"))
    questionSegment.appendChild(el('p', {class:"incorrect"}, "Incorrect you fucking loser!"))
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

/*

const bookElement = document.querySelector(".book");

const nextbtn = document.querySelector('.nextbtn');

let booknum = 0;

async function nextBook(){
    bookElement.innerHTML = '';
    const bookTitle = booksJson.reading_log_entries[booknum].work.title;
    const bookAuthor = booksJson.reading_log_entries[booknum].work.author_names;
    const bookKey = booksJson.reading_log_entries[booknum].work.cover_id;

    const img = el('img', {src: `https://covers.openlibrary.org/b/id/${bookKey}-M.jpg`}, "");
    
    // Wait for the image to load
    await new Promise((resolve, reject) => {
        img.onload = resolve; // Resolve the promise when image loads
        img.onerror = reject; // Reject the promise if image fails to load
    });

    bookElement.appendChild(img);
    bookElement.appendChild(el('h1',{}, `${bookTitle}`));
    bookElement.appendChild(el('p',{}, `${bookAuthor}`));

    booknum++;
}

console.log(booknum);

nextbtn.addEventListener('click', nextBook);

function getData(form) {
    var formData = new FormData(form);
    for (var pair of formData.entries()) {
        var value = pair[1];
    }
    console.log(value);
    return(value);
}
  
document.getElementById("rating").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = getData(e.target);
    console.log(text);
    if (text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == 10){
        console.log(text);
        const ratingElement = document.querySelector(".bookRatings");
        const currentBookElement = document.querySelector(".book img");
        const copiedBookElement = currentBookElement.cloneNode(true)
        ratingElement.appendChild(el("li", {}, copiedBookElement, `gets a ${text}`));
        nextBook();
    }
});

*/