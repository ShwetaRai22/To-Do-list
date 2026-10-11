const form= document.querySelector('form');
const newTask=document.getElementById("ntask");
const alltask= document.getElementById("alltask");
let tasklist = JSON.parse(localStorage.getItem("tasks")) || [];
let editTask= null;

function displayTask(text){
    const addedTask=document.createElement('span');
    addedTask.textContent=text;
    addedTask.classList.add("tasks");

    const done=document.createElement('button');
    done.textContent="Done";
    done.classList.add("but");
    done.id="doneBut";

    const del=document.createElement('button');
    del.textContent="Clear";
    del.classList.add("but");
    del.id="delBut";

    const edit=document.createElement('button');
    edit.textContent="Edit";
    edit.classList.add("but");
    edit.id="editBut";

    const list=document.createElement('div');
    list.id="task";
    list.append(addedTask,done,edit,del);

    const parent=document.createElement('div');   
    parent.append(list);

    alltask.append(parent);

    del.addEventListener('click',()=>{
       tasklist = tasklist.filter((task) => {
       return task !== text;
});
localStorage.setItem("tasks", JSON.stringify(tasklist));

    list.remove();
    })

    done.addEventListener('click',()=>{
        addedTask.style.color= 'grey';
        addedTask.style.textDecoration='line-through';
        
    })
    edit.addEventListener('click',()=>{
        // newTask.placeholder="Write the edited task here!";
        // setTimeout(()=>{
        // newTask.placeholder="!Enter new task!";
        //   },3000);
        // const edtext= newTask.value.trim();
        // if(edtext==""){
        //     return;
        // }
        //     addedTask.textContent=edtext;
        //     tasklist[text]=edtext;
        //     localStorage.setItem("tasks",JSON.stringify(tasklist));
        //     form.reset();
         if (editTask === null) {
        newTask.value = addedTask.textContent;
        editTask = addedTask;
    } 
    else {
        const edtext = newTask.value.trim();

        if (edtext == "") {
            return;
        }
        const index = tasklist.indexOf(addedTask.textContent);
        tasklist[index] = edtext;
        localStorage.setItem("tasks", JSON.stringify(tasklist));
        addedTask.textContent=edtext;
        newTask.value = "";
        editTask = null;}
    })

    const clr= document.getElementById("clr");
    clr.addEventListener('click',()=>{
        localStorage.removeItem("tasks");
        tasklist=[];
        parent.remove();
    })
 }

tasklist.forEach((task) => {
   displayTask(task);
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const text= newTask.value.trim();
    if(text==""){
        return;
    }
    tasklist.push(text);
    localStorage.setItem("tasks",JSON.stringify(tasklist));
    displayTask(text);

    form.reset();
})
