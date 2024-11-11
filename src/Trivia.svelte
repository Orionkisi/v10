<!-- src/Trivia.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let question = '';
    let choices = [];
    let correctAnswer = '';
    let result = '';
  
    async function fetchTrivia() {
      const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
      const data = await response.json();
      const questionData = data.results[0];
  
      question = questionData.question;
      correctAnswer = questionData.correct_answer;
      choices = [...questionData.incorrect_answers, correctAnswer].sort(() => Math.random() - 0.5);
      result = '';
    }
  
    function checkAnswer(answer) {
      result = answer === correctAnswer ? 'Correct!' : `Wrong! The correct answer was: ${correctAnswer}`;
    }
  
    onMount(fetchTrivia);
  </script>
  
  <div class="text-center max-w-lg mx-auto p-4">
    <h2 class="text-2xl font-semibold my-4">{@html question}</h2>
    {#each choices as choice}
      <button class="bg-blue-500 text-white px-4 py-2 rounded m-2 hover:bg-blue-600" on:click={() => checkAnswer(choice)}>{choice}</button>
    {/each}
    <p class="text-lg mt-4 font-bold" class:wrong={result.startsWith('Wrong')}>{result}</p>
    <button class="bg-green-500 text-white px-4 py-2 rounded mt-4" on:click={fetchTrivia}>New Question</button>
  </div>
  
  <style>
    .wrong {
      color: #c00;
    }
  </style>
  