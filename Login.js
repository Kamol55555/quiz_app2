
const l_email=document.querySelector("#l_email")
const l_password=document.querySelector("#l_password")
const log_btn=document.querySelector(".log_btn")
const L_message=document.querySelector(".L_message")

let allUser = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [{
    name: "Davronov Kamal",
    email: "admin@mail.ru",
    password: "123",
    status:"ADMIN"
}]
let OnlineUser=JSON.parse(localStorage.getItem("interUser"))

if(OnlineUser&&OnlineUser.length>0){
    window.location.href = './Admin/Admin.html'  
}

function to_reg_page() {
    window.location.href = './Regester.html'
}

log_btn.addEventListener("click",(e)=>{
    e.preventDefault()
    if (l_email.value=="" || l_password.value=="") {
        L_message.classList.remove("heddin")
            L_message.innerHTML=` <p class="login_message">Malumotlarni to'liq to'ldiring</p>`
            setTimeout(() => {
                L_message.classList.add("heddin")
                L_message.innerHTML = ""
            }, 1000)
        return
    }

    allUser.length>0?allUser.forEach(element => {
        console.log(element);
        if (element.email==l_email.value && element.password==l_password.value ) {
            localStorage.setItem('interUser',JSON.stringify([{name:element.name,status:element.status}]))
            console.log("foydalanuvchi tizimga kirdi");
            if (element.status=="ADMIN") {
                window.location.href = './Admin/Admin.html'  
            }
            else{
                window.location.href = './Quiz/QuizApp.html'  
            }

               
            return
        }
        else{
            L_message.classList.remove("heddin")
            L_message.innerHTML=` <p class="login_message">Login yoki Parol xato</p>`
            setTimeout(() => {
                L_message.classList.add("heddin")
                L_message.innerHTML = ""
            }, 1000)

        }
       
        
    }): window.location.href = './Regester.html';
    
})



