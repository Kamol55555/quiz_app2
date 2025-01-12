let allUser = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
const btn_dashbord = document.querySelector("#btn_dashbord")
const users_data = document.querySelector(".users_data")
const save_btn = document.querySelector(".save_btn")



btn_dashbord.addEventListener('click', () => (
    window.location.href = "../Admin/Admin.html"
))


console.log(allUser);


allUser.forEach((element, ind) => {

    if (element.status == "new") {
        users_data.innerHTML += `
       <li class="main_li new_user">
                        <p>${ind + 1}</p>
                        <p>${element.name.toUpperCase()}</p>
                        <p>${element.status.toUpperCase()}</p>
                        <div>
                            <i class="fa-solid fa-edit" id="edit" ></i>
                            <i class="fa-solid fa-eye" id="show"></i>
                            <i class="fa-regular fa-trash-alt" id="delite"></i>
                        </div>
    </li>
    
    
    
    `
    } else {
        users_data.innerHTML += `
        <li class="main_li">
                         <p>${ind + 1}</p>
                         <p>${element.name.toUpperCase()}</p>
                         <p>${element.status.toUpperCase()}</p>
                         <div>
                             <i class="fa-solid fa-edit" id="edit" style="color: rgb(37, 224, 68);"></i>
                             <i class="fa-solid fa-eye" id="show" style="color: rgb(224, 221, 49);"></i>
                             <i class="fa-regular fa-trash-alt" id="delite" style="color: rgb(232, 17, 17);"></i>
                         </div>
     </li>
     
     
     
     `
    }
});


const deleteIcon = document.querySelectorAll(".users_data #delite")
const edit = document.querySelectorAll(".users_data #edit")
const role_box = document.querySelector(".role_box")
const confirm_btns = document.querySelectorAll(".confirm_btns button")
const roles = document.querySelector(".roles")

deleteIcon.forEach((item) => {
    item.addEventListener('click', (i) => {
        let user_name = item.parentElement.parentElement.childNodes[3].textContent.toLowerCase()
        allUser = allUser.filter((i) => i.name.toLowerCase() != user_name)
        console.log(allUser);
        localStorage.setItem("users", JSON.stringify(allUser))
        window.location.reload()
    })

})

let user_name
let btnText
edit.forEach((item) => {

    item.addEventListener('click', () => {
        role_box.classList.remove("hidden")
        user_name = item.parentElement.parentElement.childNodes[3].textContent.toLowerCase()
       
    })

})
confirm_btns.forEach((j) => {
    j.addEventListener('click', () => {
        role_box.classList.add("hidden")
        console.log(j.textContent);
        console.log(user_name);
        if (j.textContent=="OK") {
            allUser.forEach((us, index) => {
                if (us.name.toLowerCase() == user_name) {
                    allUser[index]
                    us.status = roles.value
                    console.log(allUser);
                    console.log(roles.value);
                    localStorage.removeItem("users")
                    localStorage.setItem("users",JSON.stringify(allUser))
                    setTimeout(()=>{
                        window.location.reload()
                    },300)
                   
    
                }
            })
            
        } else {
            
        }
  
       

        

    })

})

save_btn.addEventListener('click', () => (
    window.location.href = "../Admin/Admin.html"
))
