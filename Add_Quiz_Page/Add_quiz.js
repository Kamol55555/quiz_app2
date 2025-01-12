let ques_and_ans =JSON.parse(localStorage.getItem('Questions'))?JSON.parse(localStorage.getItem('Questions')):[]
let Title=["Tarix","Matematika","Ona tili","Dasturlash",'Fizika']

const clouse_icon = document.querySelector('#clouse_icon')
const TITLE = document.querySelector('#TITLE')
const theQuiz = document.querySelector('#theQuiz')
const answers = document.querySelectorAll('#answers input')
const the_true_answer = document.querySelector('#the_true_answer')
const add_btn = document.querySelector('#add_btn')
const warning_message = document.querySelector('.warning_message')
const inputs = document.querySelectorAll('input')
const info_table = document.querySelector('.info_box table')

Title.forEach(element => {
    TITLE.innerHTML+=`<option>${element}</option>`
});



clouse_icon.addEventListener('click', () => {
    window.location.href = '../Admin/Admin.html'
})

let q_answers = []

console.log(answers);
add_btn.addEventListener('click', () => {
    q_answers = []
    answers.forEach((ans) => {
        if (ans.value == "") {
            warning_message.classList.remove('hidden')
            setTimeout(() => {
                warning_message.classList.remove('hidden')
            }, 500);
            return
        }
        else {
            warning_message.classList.add('hidden')
            q_answers.push(ans.value)
        }

    })
    inputs.forEach((inp) => {
        if (inp.value == '') {
            inp.classList.add('warning')
        }
        else {
            inp.classList.remove('warning')
        }
    })
    if (theQuiz.value == "" || the_true_answer.value == "" || q_answers.length != 4) {
        warning_message.classList.remove('hidden')
    }

    else {
        warning_message.classList.add('hidden')
        ques_and_ans.push({
            title: TITLE.value,
            ques: theQuiz.value,
            javoblar: q_answers,
            ans: the_true_answer.value

        })
        localStorage.setItem('Questions',JSON.stringify(ques_and_ans))
        theQuiz.value = ""
        the_true_answer.value = ""
        answers.forEach((ans) => {
            ans.value=""
    
        })
        window.location.reload()
    }

})

let allTitl={}
ques_and_ans.forEach(element => {
    allTitl[element.title]= (allTitl[element.title]||0)+1

});


console.log(info_table);

let datforinfotable=Object.entries(allTitl)

datforinfotable.forEach(element => {
    console.log(element);
    info_table.innerHTML+=`
        <tr>
            <th>${element[0]}</th>
            <th style="text-align:center; padding:0">${element[1]}</th>
         </tr>
    
    `
   
});