auth.onAuthStateChanged(user => {

if(!user){

window.location = "index.html"

}

if(user.email !== sventhesing27@gmail.com){

alert("Kein Admin Zugriff")

window.location = "member.html"

}

})
function addSong(){

let name=document.getElementById("songname").value
let url=document.getElementById("songurl").value

db.collection("music").add({
name:name,
url:url
})

}

function addInfo(){

let cat=document.getElementById("infotitle").value
let text=document.getElementById("infotext").value

db.collection("infos").add({
category:cat,
text:text
})

}
