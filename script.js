
function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u==="admin" && p==="admin"){

document.getElementById("login").style.display="none"
document.getElementById("admin").style.display="block"

loadUsers()

return
}

document.getElementById("login").style.display="none"
document.getElementById("member").style.display="block"

loadSongs()

}

async function addUser(){

let user=document.getElementById("newUser").value
let pass=document.getElementById("newPass").value

await fetch("/add-user",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({user,pass})
})

loadUsers()

}

async function loadUsers(){

let res=await fetch("/users")

let users=await res.json()

let html=""

users.forEach((u,i)=>{

html+=u.user+" <button onclick='deleteUser("+i+")'>löschen</button><br>"

})

document.getElementById("users").innerHTML=html

}

async function deleteUser(id){

await fetch("/user/"+id,{method:"DELETE"})

loadUsers()

}

async function upload(){

let file=document.getElementById("song").files[0]

let form=new FormData()

form.append("song",file)

await fetch("/upload",{
method:"POST",
body:form
})

alert("Song hochgeladen")

}

async function loadSongs(){

let res=await fetch("/songs")

let songs=await res.json()

let playlist=document.getElementById("playlist")

playlist.innerHTML=""

songs.forEach(s=>{

let opt=document.createElement("option")

opt.text=s

opt.value="/music/"+s

playlist.appendChild(opt)

})

}

function play(){

let src=document.getElementById("playlist").value

document.getElementById("player").src=src

}
