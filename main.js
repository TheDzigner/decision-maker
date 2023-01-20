const container = 

document.querySelector('.container')

let randomizeButton = 

document.querySelector('.randomize')

let Cards = JSON.parse(localStorage.getItem('cardsChoice') || '[]')

const choiseSend = 

document.querySelector('.choiseSend')

const choiceInput = 

document.querySelector('#choiceInput')

let RandomTimer;

let Timer;

let seconds = 0

let index = 0

function showChoices()

{

  let innerChoices = ''

  for (var i = 0; i < Cards.length; i++) {

    let newChoice = `

    <div class="card">

   <p>

   ${Cards[i].choice}

   </p>

   <div>

     <button class="delete_card material-symbols-outlined">

       delete

     </button>

   </div>

 </div>

    `

    innerChoices += newChoice

  }

  container.innerHTML = innerChoices

  

  const retrieveCards = document.querySelectorAll('.container .card')

  

  function randomDiv()

{

  let random = 

  Math.floor(Math.random() * retrieveCards.length)

  for (var i = 0; i < retrieveCards.length; i++) {

    index = retrieveCards[i].classList.remove('choosen')

  }

  retrieveCards[random].classList.add('choosen')

  }

  

  

  

  function timer()

{

   if(Cards.length < 2) {

    alert('Enter at last  2 choices to randomize');

    return ;

  }

  

  Timer = setInterval(()=>{

    seconds++

    if (seconds == 30) {

     clearInterval(Timer) 

     clearInterval(RandomTimer)

     randomizeButton.disabled = false

     choiseSend.disabled = false

     seconds = 0

    }

  },400)

  RandomTimer = setInterval(()=>{

  randomDiv()

},200)

randomizeButton.disabled = true;

 choiseSend.disabled = true

}

randomizeButton.onclick = timer

  const delete_card = Array.from(document.querySelectorAll('.card div .delete_card'))

  delete_card.forEach(deleteButton => {

    deleteButton.addEventListener('click',function(){

   

   if (confirm('Delete card ?')) {

     Cards.splice(delete_card.indexOf(this), 1)

     showChoices()

   }

   

    localStorage.setItem('cardsChoice',JSON.stringify(Cards))

    })

  })

  }

  

showChoices()

  

  

function saveChoises()

{

  

  if (choiceInput.value == '' || choiceInput.value == ' ') {

    alert('Input cannot be empty')

    return;

  }

  Cards.push({

    choice:choiceInput.value

  })

  choiceInput.value = ''

 localStorage.setItem('cardsChoice',JSON.stringify(Cards))

  showChoices()

}

choiseSend.onclick = saveChoises

