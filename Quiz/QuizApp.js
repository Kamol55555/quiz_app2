let OnlineUser=JSON.parse(localStorage.getItem("interUser"))
console.log(OnlineUser);



const gameBody = document.querySelector('.gameBody')
const GameResaltBox = document.querySelector('.GameResaltBox')
const GameResaltBoxH1 = document.querySelector('.GameResaltBox h1')
const rsetBTN = document.querySelector('.rsetBTN')
const logOutbtn = document.querySelector('.logOut')
const user_name = document.querySelector('.user_name .user_name_p')
const sms_body = document.querySelector('.sms_body ul')
const sms_count = document.querySelector('.sms_count')

let newSms=0

console.log(logOutbtn);
logOutbtn.addEventListener('click',()=>{
 localStorage.removeItem("interUser")
 window.location.href="../Login.html"
})

user_name.textContent=OnlineUser[0].name

let messages=JSON.parse(localStorage.getItem("messages"))?JSON.parse(localStorage.getItem("messages")):[]
messages.forEach(element => {
    if (element.resiver.toLowerCase()==OnlineUser[0].name.toLowerCase()&& element.status=='new') {
        newSms++
        sms_count.textContent=newSms
        console.log(element);
        sms_body.innerHTML+=`
        <li class="sms_new" style="cursor: pointer;">
                    <p> <span>SENDER:</span>${element.sender}</p>
                    <p> <span>DATE:</span>${element.time}</p>
                    <p> <span>TIME:</span>${element.time}</p>
                    <p id="message"> <span>MESSAGE:</span>${element.messege}</p>
        </li>
        `

        document.querySelectorAll('.sms_new').forEach((list)=>{
            list.addEventListener('click',()=>{
                let msg_text=list.childNodes[7].childNodes[2].textContent
                console.log(msg_text);
                messages.forEach((mes)=>{
                    console.log(mes.messege);
                    if (mes.messege==msg_text) {
                        console.log("salom");
                        mes.status='read'
                        localStorage.setItem('messages',JSON.stringify(messages))
                    }
                })
                window.location.reload()
            })
        })

        //console.log(document.querySelectorAll('.sms_new #message').childNodes[3]);
    }
    else if(element.resiver.toLowerCase()==OnlineUser[0].name.toLowerCase()){
        sms_body.innerHTML+=`
        <li>
                    <p> <span>SENDER:</span>${element.sender}</p>
                    <p> <span>DATE:</span>${element.time}</p>
                    <p> <span>TIME:</span>${element.time}</p>
                    <p id="message"> <span>MESSAGE:</span> ${element.messege}</p>
        </li>
        `
    };
    
})


let timer;
let setTimer;
let truAnswers=0;
let worongAnswernum=0;
let allQuestions = ques_and_ans.length
let currentQuestion = 1

let PassTestUsers=JSON.parse(localStorage.getItem("pass_test"))?JSON.parse(localStorage.getItem("pass_test")):[]


function showQues() {
    let currentQuestionTitle=ques_and_ans[currentQuestion-1]
    gameBody.innerHTML = ""
    gameBody.innerHTML = `
     <h3>${currentQuestionTitle.ques}</h3>
                  <ul>
                     <li class="quiz_answer">${currentQuestionTitle.javoblar[0]}</li>
                     <li class="quiz_answer">${currentQuestionTitle.javoblar[1]}</li>
                     <li class="quiz_answer">${currentQuestionTitle.javoblar[2]}</li>
                     <li class="quiz_answer">${currentQuestionTitle.javoblar[3]}</li>
                  </ul>
    `
    let nextTimer
    clearTimeout(nextTimer)
    const questionList = document.querySelectorAll('.gameBody li')
     questionList.forEach((list)=>{
       list.addEventListener("click",()=>{
          if (list.textContent.toLowerCase()==currentQuestionTitle.ans.toLowerCase()) {
             console.log("to'g'ri javob");
             list.classList.add("trueAnswer")
             truAnswers++
             nextTimer= setTimeout(()=>{
             nextQuestion() 
              },200)
             
          }
          else{
            console.log("javoblar xato");
            list.classList.add("worongAnswer")
            worongAnswernum++
            nextTimer= setTimeout(()=>{
            nextQuestion() 
              },200)
         
          }
         console.log("ture answers :",  truAnswers,"wrong answers :" ,worongAnswernum);
          

       })
       
     })
    
}
showQues()
const STRT_BTN = document.querySelector('.start_btn')
const GameBox = document.querySelector('.GameBox')
const startBox = document.querySelector('.startBox')
const time_sign = document.querySelector('.time_sign')
const next_btn = document.querySelector('.next_btn_b')
const q_wiew = document.querySelector('.q_wiew')


function showtimer() {
    q_wiew.innerHTML = `${currentQuestion}/${allQuestions}`
    clearInterval(setTimer)
    timer = 10
    setTimer = setInterval(() => {
        if (timer == 0) {
            clearInterval(setTimer)
            nextQuestion()
            showQues()
        }
       
        time_sign.innerHTML = `<i class="fa-solid fa-clock"></i><span>${timer}</span>s`
        timer--
    }, 950);

}
function nextQuestion() {
    currentQuestion++
    if (currentQuestion > allQuestions) {
        currentQuestion = 1
        GameBox.classList.add('hidden')
        GameResaltBox.classList.remove('hidden')
        GameResaltBoxH1.innerHTML=""
        GameResaltBoxH1.innerHTML=` SIZ <span>${truAnswers}</span> ta to'g'ri javob topdingiz`
        PassTestUsers.push({name:OnlineUser[0].name,resalt:truAnswers})
        localStorage.setItem('pass_test',JSON.stringify(PassTestUsers))
        console.log(PassTestUsers);
        truAnswers=0
        worongAnswernum=0
        clearInterval(setTimer)
        return
    }
    showQues()
    showtimer()
}
STRT_BTN.addEventListener('click', () => {
    startBox.classList.add("hidden")
    GameBox.classList.remove('hidden')
    showtimer()
})

next_btn.addEventListener('click', () => {
    nextQuestion()
})


rsetBTN.addEventListener('click', () => {
   window.location.reload()
})





