const allUserShuw=document.getElementById('all_user_num')
const newUsernum=document.getElementById('newUsernum')
const users_info_table=document.getElementById('users_info_table')
const logOutBtn=document.getElementById('logOutBtn')
const search_table_btn=document.getElementById('search_table_btn')
const table_search_inpt=document.getElementById('table_search_inpt')
const test_res=document.querySelector('.test_res')
const control_role=document.querySelector('#control_role')
const send_sms=document.querySelector('#send_sms')
const clouse_icon=document.querySelector('#clouse_icon')
const users_list_ul=document.querySelector('.users_list_ul')



let allUser = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
let OnlineUser=JSON.parse(localStorage.getItem("interUser"))
let PassTestUsers=JSON.parse(localStorage.getItem("pass_test"))?JSON.parse(localStorage.getItem("pass_test")):[]
let messages=JSON.parse(localStorage.getItem("messages"))?JSON.parse(localStorage.getItem("messages")):[]
if(!OnlineUser){
   window.location.href = '../Login.html'
}


allUserShuw.innerHTML=allUser.length

logOutBtn.addEventListener("click",()=>{
  localStorage.removeItem("interUser")
  window.location.reload()
})

console.log(allUser);




let newUsers=0

allUser.forEach((element,index) => {
 
    users_info_table.innerHTML+=`
              <tr>
                <td class="thead1">${index+1}</td>
                <td class="thead2">${element.name}</td>
                <td class="thead3">${element.status.toUpperCase()}</td>
                <td class="thead4">${element.status=="new"?"new user":"user"}</td>
              </tr>

    `
    if (element.status=="new") {
       newUsers++
       newUsernum.textContent=newUsers
    }
    else{
      newUsernum.textContent=0
    }
  
    
});

function SaveData() {
  localStorage.removeItem("users")
  localStorage.setItem("users",JSON.stringify(allUser))
  window.location.reload()

}


console.log(allUser);

const alltableTd=document.querySelectorAll(".thead4")



alltableTd.forEach(element => {
   if (element.textContent=="new user") {
    element.innerHTML+=`    <i class="fa-regular fa-circle"></>`
      element.classList.add("newUser")
      
   }
   
});

const iconUser=document.querySelectorAll(".thead4 i")


console.log(iconUser);

iconUser.forEach((i)=>{
    i.addEventListener('click',()=>{
      console.log(i.parentElement.parentElement.children[1].textContent);
      let asd=i.parentElement.parentElement.children[1].textContent
      i.parentElement.classList.remove("newUser")
      i.parentElement.textContent="user"
      allUser.forEach((el)=>{
        if (asd==el.name) {
           el.status="user"
           console.log(allUser);
           SaveData()
 
           
        }
        
      })

      

      
    })
})

PassTestUsers.forEach((i)=>{
  test_res.innerHTML+=` <tr style=" color: white; height: 45px; font-size: 18px; font-weight: bold;">
                    <td>${i.name}</td>
                    <td>${i.resalt}</td>
                  </tr>`
  
})

search_table_btn.addEventListener('click',()=>{
  users_info_table.innerHTML=""
   console.log(table_search_inpt.value)
   allUser.forEach((element,index) => {
    if(table_search_inpt.value==""){
     window.location.reload()
     }
     if(element.name.toLowerCase().includes(table_search_inpt.value.toLowerCase())){
      
      users_info_table.innerHTML+=`
               <tr>
                 <td class="thead1">${index+1}</td>
                 <td class="thead2">${element.name}</td>
                 <td class="thead3">${element.status}</td>
                 <td class="thead4">${element.status=="new"?"new user":"user"}</td>
               </tr>`
     }
     

      })
 
  
})

const Quiz_add=document.getElementById('Quiz_add')

Quiz_add.addEventListener('click',()=>{
  window.location.href = '../Add_Quiz_Page/Add_quiz.html'
  
})

control_role.addEventListener('click',()=>{
  window.location.href = '../Role_control/control.html'
  
})



send_sms.addEventListener('click',()=>{
  document.querySelector('.sms_box').classList.remove('hidden')
} )
console.log(send_sms);


clouse_icon.addEventListener('click',()=>{  
  document.querySelector('.sms_box').classList.add('hidden')})

 // Listni yaratish va event listenerni bir marta qo'shish
allUser.forEach((element) => {
  users_list_ul.innerHTML += `<li class="users_list_li">${element.name.toUpperCase()}</li>`;
});

// Click eventni barcha elementlarga bir marta o'rnatish
document.querySelectorAll('.users_list_ul li').forEach((i) => {
  i.addEventListener('click', () => {
    console.log(i.textContent);
    document.querySelector('#resewer').textContent = i.textContent;
  });
});

// Search inputda filtr qo'llash
document.querySelector('#search_user_input').addEventListener('input', () => {
  const searchValue = document.querySelector('#search_user_input').value.toLowerCase();
  document.querySelectorAll('.users_list_ul li').forEach((i) => {
    i.removeAttribute('style');
    if (i.textContent.toLowerCase().includes(searchValue)) {
      i.removeAttribute('style')
    } else {
      i.classList.add('hidden');
      i.setAttribute('style', 'display: none ');
    }
  });
});




document.querySelector('#send_sms_btn').addEventListener('click', () => {
  document.querySelector('#sms_text').value
  let messege={
    messege:document.querySelector('#sms_text').value,
    resiver:document.querySelector('#resewer').textContent,
    sender:OnlineUser[0].name,
    time:new Date().toLocaleString(),
    status:"new"

  }
messages.push(messege)
localStorage.setItem("messages",JSON.stringify(messages))
window.location.reload()

})