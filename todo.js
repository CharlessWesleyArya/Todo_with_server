/* this process is used when we have less fields to
{const title = document.getElementById('title')
const desc=document.getElementById('description')
const bn = document.getElementById('btun')
{ this is one type:const title=document.querySelector('#title')
const bn=document.querySelector('#btun')}
bn.addEventListener('click', function () {
    console.log(title.value)
    console.log(desc.value);
})
} */

//2nd way to get values from input

let todos = []
var newTodos = []
let isEdit = false;
let editId = null;

fetchTodos()
    .then(data => {
        todos = data;
        iter(todos);
    })

const todo = document.getElementById('todoForm')

const bn = document.querySelector('#btun')
let ap = document.querySelector('#ap')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const active = document.querySelector('#inlineCheckbox1');
const complete = document.querySelector('#inlineCheckbox2')

function typed() {
    var start = ""
    var end = ap.textContent
    var idx = 1;
    var pointer = 1;
    setInterval(function () {
        if (pointer == end.length || pointer == -1) {
            idx = idx * -1;
        }
        start = end.substring(0, pointer)
        ap.textContent = start;
        pointer = pointer + idx;

    }, 250)
}

typed()


complete.addEventListener('click', function () {

})
bn.addEventListener('click', function () {
    if (title.value == '' || description.value == '')
        return console.log('no data given');
    logic()
})
function logic() {
    const form = new FormData(todoForm)
    var formval = {};
    for (var key of form.keys()) {
        formval[key] = form.get(key)
    }
    if (!isEdit) {

        //formval.title=formval.get('title')
        //formval.description=formval.get('description')
        var todo = getTodo(formval.title, formval.description)
        /* {
           title: formval.title,
           description: formval.description,
           createdAt: new Date().toString,
           status: 'Active',

       }  todos.push(todo);*/

        createTodos(todo)
            .then(data => {
                todo={...todo,id:data.id}
                todos = [...todos, todo];
                iter(todos)
            })
    }
    else {
        var newTodos = [...todos];
        var idx = newTodos.findIndex(t => t.id == editId)
        var t = { ...newTodos[idx] };
        t.title = formval.title;
        t.description = formval.description;
        newTodos[idx] = t;
        releaseLock();
        todos = newTodos;
    }
    title.value = null;
    description.value = null;

}
function editLock(id) {
    editId = id
    isEdit = true;
    bn.textContent = 'Save'
}
function releaseLock() {
    editId = null;
    isEdit = false;
    bn.textContent = 'Add Todo'
}
//to get new todo
function getTodo(title, description) {
    /* var id;
    if (todos.length == 0) id = 1;
    else {
        var last = todos[todos.length - 1]
        id = last.id + 1;
    } */
    return {
        //id,
        title,
        description,
        createdAt: new Date().toString,
        status: 'active',

    }
}
function iter(todos) {
    const items = todos.map(todo => iterATodo(todo));

    const todo_list = document.querySelector('.todo_list')
    //to clear the info before this step
    todo_list.innerHTML = null
    items.forEach(item => {
        todo_list.appendChild(item)
    })
}

function iterATodo(todo) {
    const mainRow = document.createElement('div');
    mainRow.className = 'row jumbo';
    const meeting = document.createElement('div');
    meeting.className = 'col-md-3'
    meeting.textContent = todo.title;
    const description_div = document.createElement('div');
    description_div.className = 'col-md-3';
    description_div.textContent = todo.description;

    const status_div = document.createElement('div');
    status_div.className = 'col-md-1 stat';
    status_div.textContent = todo.status;


    const mark = document.createElement('div');
    mark.className = 'col-md-2';
    let but = document.createElement('button');
    but.className = 'btn btn-info';
    but.textContent = "Mark completed";

    but.addEventListener('click', () => {
        /* mutable way
         var new_todo=todos.find(t=>t.id==todo.id);
         new_todo.status='Completed'; */

        //immutable way
        statusChange()
    })
    function statusChange() {
        newTodos = [...todos];
        var idx = newTodos.findIndex(t => t.id == todo.id)
        var t = { ...newTodos[idx] }
        t.status = 'Completed'
        newTodos[idx] = t;

        iter(newTodos)
    }

    const edit = document.createElement('div');
    edit.className = 'col-md-1';
    let edit_button = document.createElement('button')
    edit_button.className = 'btn btn-primary';
    edit_button.textContent = 'edit';

    edit_button.addEventListener('click', function () {
        title.value = todo.title;
        description.value = todo.description

        editLock(todo.id)

        /* editId = todo.id
        bn.textContent = 'Save';
        isEdit = true; */
    })

    const del = document.createElement('div');
    del.className = 'col-md-2';
    let del_button = document.createElement('button')
    del_button.className = 'btn btn-danger';
    del_button.textContent = 'Delete';

    del_button.addEventListener('click', function () {

        /* var newTodos = todos.filter(t => t.id = !todo.id);
         todos=newTodos;
        iter(todos); */
        //console.log(todo.id);
        if (todo.id != undefined) {
            deleteTodo(todo.id)
                .then(data => {
                    todos = [...todos, data]
                    return todos
                })
        }
    })

    mark.appendChild(but)
    edit.appendChild(edit_button)
    del.appendChild(del_button);

    mainRow.appendChild(meeting);
    mainRow.appendChild(description_div);
    mainRow.appendChild(status_div);
    mainRow.appendChild(mark);
    mainRow.appendChild(edit);
    mainRow.appendChild(del)


    return mainRow;
}
active.addEventListener('click', function () {
    newTodos = [...todos]
    console.log(newTodos[0].status);

})

