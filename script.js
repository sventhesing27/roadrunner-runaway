let currentUser = ""

function login(){

let email = document.getElementById("user").value
let password = document.getElementById("pass").value

auth.signInWithEmailAndPassword(email,password)

.then((userCredential)=>{

let user = userCredential.user
console.log(user.email)

document.getElementById("login").style.display="none"

if(user.email === "admin@runaway.de"){

document.getElementById("adminpanel").style.display="block"
loadMembers()

}else{

document.getElementById("memberpanel").style.display="block"
loadMusic()
loadInfo()
loadChat()

}

})

.catch((error)=>{

document.getElementById("error").innerText = error.message

})

}



function logout(){

auth.signOut()

location.reload()

}



function addMember(){

let user = document.getElementById("newuser").value
let pass = document.getElementById("newpass").value

auth.createUserWithEmailAndPassword(user,pass)

.then(()=>{

alert("Member erstellt")
loadMembers()

})

}



function loadMembers(){

db.collection("members").get().then((snapshot)=>{

let html=""

snapshot.forEach(doc=>{

html += "<p>"+doc.data().email+"</p>"

})

document.getElementById("memberlist").innerHTML = html

})

}



function addMusic(){

let link = document.getElementById("musiclink").value

db.collection("music").add({

url:link

})

}



function loadMusic(){

db.collection("music").onSnapshot((snapshot)=>{

let html=""

snapshot.forEach(doc=>{

let url = doc.data().url

html += `
<audio controls>
<source src="${url}" type="audio/mpeg">
</audio>
`

})

document.getElementById("musiclist").innerHTML = html

})

}



function postInfo(){

let text = document.getElementById("infotext").value

db.collection("info").add({

text:text

})

}



function loadInfo(){

db.collection("info").onSnapshot((snapshot)=>{

let html=""

snapshot.forEach(doc=>{

html += "<p>"+doc.data().text+"</p>"

})

document.getElementById("infoboard").innerHTML = html

})

}



function sendMessage(){

let msg = document.getElementById("chatmsg").value

db.collection("chat").add({

user:currentUser,
message:msg

})

}



function loadChat(){

db.collection("chat").orderBy("message").onSnapshot((snapshot)=>{

let html=""

snapshot.forEach(doc=>{

let d = doc.data()

html += "<p><b>"+d.user+"</b>: "+d.message+"</p>"

})

document.getElementById("chatbox").innerHTML = html

})

}
