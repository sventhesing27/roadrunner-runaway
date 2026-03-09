
function login(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

auth.signInWithEmailAndPassword(email,pass)
.then(()=>{

window.location="member.html"

})
.catch(e=>{

document.getElementById("msg").innerText=e.message

})

}

function register(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

auth.createUserWithEmailAndPassword(email,pass)

}
