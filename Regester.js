const btn = document.querySelector('.btn')
const r_name = document.querySelector('#name')
const r_email = document.querySelector('#email')
const r_pps = document.querySelector('.pps')
const r_con_password = document.querySelector('#con_password')
const r_btn = document.querySelector('.r_btn')
const message = document.querySelector('.message')
const r_inputes = document.querySelectorAll('input')
const Secsess_messaage = document.querySelector('.Secsess_messaage')
let allUser = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [{
    name: "Davronov Kamal",
    email: "admin@mail.ru",
    password: "123",
    status:"ADMIN"
}]



let OnlineUser=JSON.parse(localStorage.getItem("interUser"))

if(OnlineUser){
    window.location.href = './Admin/Admin.html'  

}



console.log(allUser);
btn.addEventListener('click', function clickBtn(a) {

})



// function change_dir() {

//     window.location.href='./usersData.html'
// }

function to_log_page() {
    window.location.href = './Login.html'
}

r_btn.addEventListener('click', () => {


    if (!r_name.value || !r_email.value || !r_pps.value || !r_con_password.value) {
        console.log("INPUTLARNI TO'LIQ kiriting");
        message.textContent = "INPUTLARNI TO'LIQ kiriting"

        setTimeout(() => {
            message.textContent = ""
        }, 1000)
        return
    }
    if (!r_email.value.includes('@')) {
        message.textContent = "Email TO'LIQ kiriting"
        setTimeout(() => {
            message.textContent = ""
        }, 1000)
        return

    }



    let user = {
        name: r_name.value,
        email: r_email.value,
        password: r_pps.value,
        status:"new"
    }

    let ex_user = false


    allUser.forEach(element => {
        if (element.email == user.email) {
            message.textContent = "Bu email ro'yaxtdan o'tgan"
            ex_user = true
            return
        }
      

        

    }

    );


    if (user && !ex_user) {
        window.location.href = './Login.html'
        allUser.push(user)
        localStorage.setItem("users", JSON.stringify(allUser))
    }
 
    // if (user && !ex_user) {
    //     allUser.push(user)
    //     localStorage.setItem("users", JSON.stringify(allUser))
    //     Secsess_messaage.classList.remove("heddin")
    //     Secsess_messaage.innerHTML = `
    //     <table>
    //        <tr>
    //           <td>User's login</td>
    //           <td>${user.email}</td>
    //        </tr>
    //   </table>
    //   <p>User who is ${user.email} regester seccsesfully </p>`
    //     r_name.value = ""
    //     r_email.value = ""
    //     r_pps.value = ""
    //     r_con_password.value = ""
    //     setTimeout(() => {
    //         Secsess_messaage.classList.add("heddin")
    //     }, 1000)
    //     setTimeout(() => {
           
    //     }, 500)
    //     return

    // }


})