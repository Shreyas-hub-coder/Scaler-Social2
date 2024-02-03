let addBtn = document.querySelector('.add-btn');
let removeBtn = document.querySelector('.remove-btn');
let modal = document.querySelector('.modal-cont');
let textArea = document.querySelector('.textarea-cont');
let mainCont = document.querySelector('.main-cont');
let addModal = true;
let taskColor = 'red';
let removeBtnActive = false;
let ticketArr = [];

removeBtn.addEventListener('click',function(){
    if(removeBtnActive){
        removeBtn.style.color = 'black';
        removeBtnActive = false;
    }else{
        removeBtn.style.color = 'red';
        removeBtnActive = true;
    }  
})


var uid = new ShortUniqueId();

addBtn.addEventListener('click',function(){
    console.log("Btn has been clicked")
    if(addModal){
        modal.style.display = 'flex' 
    }else{
        modal.style.display = 'none' 
    }
    addModal = !addModal;
})

textArea.addEventListener('keydown',function(e){
    let key = e.key;
    if(key === "Enter"){
        if(textArea.value == ""){
            textArea.value = "";
            alert("Please Enter some task!");
            return;
        }
        generateTicket(textArea.value,taskColor); 
        textArea.value = "";
        modal.style.display = 'none'
        addModal = true
    }
})



function generateTicket(task,priority,ticketId){
   
    let id;
    if(ticketId){
        id = ticketId 
    }else{ 
        id = uid.rnd(); 
    }
     
    let ticketCont = document.createElement("div");
    ticketCont.className = "ticket-cont";
    ticketCont.innerHTML = `<div class="ticket-color ${priority}"></div>
                            <div class="ticket-id">#${id}</div>
                            <div class="ticket-area">${task}</div>
                            <div class="lock-unlock"><i class="fa-solid fa-lock"></i></div>`
    console.log(ticketCont)
    mainCont.appendChild(ticketCont);
    if(!ticketId){
        ticketArr.push({id:id,task:task,color:taskColor});
        let stringifiedArr = JSON.stringify(ticketArr);
        localStorage.setItem('tasks',stringifiedArr);
        console.log(ticketArr);
    }

    let taskArea = ticketCont.querySelector('.ticket-area');
    let lockUnlockBtn = ticketCont.querySelector('.lock-unlock i');
    lockUnlockBtn.addEventListener('click',function(){
        if(lockUnlockBtn.classList.contains('fa-lock')){
            lockUnlockBtn.classList.remove('fa-lock');
            lockUnlockBtn.classList.add('fa-lock-open')
            taskArea.setAttribute('contentEditable','true')
        }else{
            lockUnlockBtn.classList.remove('fa-lock-open');
            lockUnlockBtn.classList.add('fa-lock')
            taskArea.setAttribute('contentEditable','false')
        }
        let updatedTask = taskArea.innerText;
        let idx;
        for(let i=0;i<ticketArr.length;i++){
            if(id == ticketArr[i].id){
                idx = i;
            }
        }
        ticketArr[idx].task = updatedTask;
        updateLocalStorage();
    })
    ticketCont.addEventListener('click',function(){
        if(removeBtnActive){
            ticketCont.remove();
            let idx;
            for(let i=0;i<ticketArr.length;i++){
                if(id == ticketArr[i].id){
                    idx = i;
                }
            }
            ticketArr.splice(idx,1);
            console.log(ticketArr);
            updateLocalStorage();
        }
    })
}

function updateLocalStorage(){
    let stringifiedArr = JSON.stringify(ticketArr);
    localStorage.setItem('tasks',stringifiedArr);
}