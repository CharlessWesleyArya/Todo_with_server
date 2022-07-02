function fetchTodos() {
    return fetch('http://localhost:3004/todos')
        .then((res) => res.json())
        .catch((err)=>{
            console.log(err);
        })
}
function createTodos(data) {
    return fetch('http://localhost:3004/todos',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then((data)=> data.json())
    
}
function deleteTodo(id){
    return fetch(`http://localhost:3004/todos/${id}`,{
        method:'DELETE'
    })
        .then((data)=>data.json())
        .then((data)=>data)
        .catch(err=>{
            console.log(err);
        })
}