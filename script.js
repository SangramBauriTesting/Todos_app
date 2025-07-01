const addBtn = document.querySelector('#add');
const userInput = document.querySelector('.user-input');
const ed = document.querySelector('#edit');
const ul =document.querySelector('.todo-list');

let editId = null;
let todos=[];
let id=null;

ed.style.display='none';


addBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    const todo = userInput.value;

    todos.push(todo);
    localStorage.setItem("todos",todos);
    userInput.value='';
    editId = null; 
    ed.style.display='none';
    getData();


})



function getData()
{   
  const data = localStorage.getItem("todos").split(",");
  display(data)

}


function display(data)
{ 

    ul.innerHTML = "";
    data.forEach((value , index)=>{
        const li = document.createElement('li');
        const span =document.createElement('span');
        const div =document.createElement('div');
        const editBtn =document.createElement('button');
        const dltBtn =document.createElement('button');
        li.setAttribute('class','item');
        li.setAttribute('id',index);
        span.setAttribute('class','todo');
        div.setAttribute('class','btns');
        editBtn.setAttribute('class','editBtn');
        editBtn.setAttribute('id',index);
        editBtn.innerHTML='Edit';
        dltBtn.setAttribute('class','dltBtn');
        dltBtn.setAttribute('id',index);
        dltBtn.innerHTML='Delete';
        span.innerText=value;
        li.appendChild(span);
        div.appendChild(editBtn);
        div.appendChild(dltBtn);
        li.appendChild(div);
        ul.appendChild(li);

        dltBtn.addEventListener('click',(e)=>{
        const data = localStorage.getItem("todos").split(",");
        const id = e.target.id;
        let update = data.filter((data ,index)=>index!=id);
        localStorage.setItem("todos",update);
        display(update)
        })


        editBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const data = localStorage.getItem("todos").split(",");
        const id = Number(e.target.id);

        const editTodo = data.filter((data,index)=> index==id);
        userInput.value=editTodo[0];
        editId=id;
        if(editId !=null)
        {

            ed.style.display='block'


        }
printId(editId);


})






})


}

function printId(editId)
{

    ed.addEventListener('click', (e) => {
    e.preventDefault();
    if (editId !== null) {
    const data = localStorage.getItem("todos").split(",");
    data[editId] = userInput.value;
    localStorage.setItem("todos", data);
    
    userInput.value = "";
    editId = null; 
    ed.style.display='none';
    getData();
}
})
}

getData();



