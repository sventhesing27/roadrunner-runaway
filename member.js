
auth.onAuthStateChanged(user=>{

if(!user){
window.location="index.html"
}

})

function logout(){

auth.signOut()
window.location="index.html"

}

db.collection("music").onSnapshot(snap=>{

let list=document.getElementById("playlist")
list.innerHTML=""

snap.forEach(doc=>{

let d=doc.data()

let li=document.createElement("li")
li.innerText=d.name

li.onclick=()=>{

document.getElementById("player").src=d.url

}

list.appendChild(li)

})

})

db.collection("infos").onSnapshot(snap=>{

let div=document.getElementById("infos")
div.innerHTML=""

snap.forEach(doc=>{

let d=doc.data()

div.innerHTML+= "<b>"+d.category+"</b><p>"+d.text+"</p>"

})

})

db.collection("chat").orderBy("time").onSnapshot(snap=>{

let box=document.getElementById("chatbox")
box.innerHTML=""

snap.forEach(doc=>{

let d=doc.data()
box.innerHTML+= "<p>"+d.user+": "+d.text+"</p>"

})

})

function sendMessage(){

let text=document.getElementById("chatinput").value
let user=auth.currentUser.email

db.collection("chat").add({
user:user,
text:text,
time:Date.now()
})

document.getElementById("chatinput").value=""

}
