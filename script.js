const url="https://api.quotable.io/random";
const quoteDisplayElement=document.getElementById('quoteDisplay');
const quoteInputElement=document.getElementById('quoteInput');
const timerElement=document.getElementById('timer');
const button=document.getElementById('button');
const correct=true;
quoteInputElement.addEventListener('input',()=>{
    const arrayQuote=quoteDisplayElement.querySelectorAll('span')
    const arrayValue=quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan,index)=>{
        const character=arrayValue[index];
        if(character==null)
        {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('incorrect');
            correct=false;
        }
        else if(character===characterSpan.innerText)
        {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }
        else{
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct=false;
        }
    })
    if(correct==true)
    {
        getNextQuote();
    }
})
function getRandomQuote(){
    return fetch(url)
    .then(response => response.json())
    .then(data=>data.content);
}

async function getNextQuote(){
 const quote=await getRandomQuote()
 quoteDisplayElement.innerHTML=''
 quote.split('').forEach(character=> {
    const characterSpan=document.createElement('span')
    characterSpan.innerText=character;
    quoteDisplayElement.appendChild(characterSpan);
 });
 quoteInputElement.value=null;
 startTimer();
}
let startTime
function startTimer()
{
    timerElement.innerText=0;
    startTime=new Date()
    setInterval(()=>{
       timerElement.innerText=getTimerTime();
    },1000)
}
function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000);
}
getNextQuote();
// button.addEventListener('click',getNextQuote());

