const firebaseConfig = {

apiKey: "DEIN_KEY",
authDomain: "DEIN_PROJEKT.firebaseapp.com",
projectId: "DEIN_PROJEKT"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let adminUser="admin";
let adminPass="roadrunner";


function login(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

if(u===adminUser && p===adminPass){

document.getElementById("login").style.display="none";
document.getElementById("adminpanel").style.display="block";

loadMembers();
loadMusic();
loadInfo();
loadChat();

return;

}

db.collection("members").get().then(snapshot=>{

snapshot.forEach(doc=>{

let m=doc.data();

if(m.user===u && m.pass===p){

document.getElementById("login").style.display="none";
document.getElementById("memberpanel").style.display="block";

loadMusic();
loadInfo();
loadChat();

}

});

});

}

function logout(){
location.reload();
}

function addMember(){

let u=document.getElementById("newuser").value;
let p=document.getElementById("newpass").value;

db.collection("members").add({
user:u,
pass:p
});

loadMembers();

}

function loadMembers(){

db.collection("members").get().then(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let m=doc.data();

html+=m.user+" <button onclick='deleteMember(\""+doc.id+"\")'>löschen</button><br>";

});

document.getElementById("memberlist").innerHTML=html;

});

}

function deleteMember(id){

db.collection("members").doc(id).delete();

loadMembers();

}

function addMusic(){

let link=document.getElementById("musiclink").value;

db.collection("music").add({
url:link
});

loadMusic();

}

function loadMusic(){

db.collection("music").onSnapshot(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let m=doc.data();

html+="<audio controls src='"+m.url+"'></audio><br>";

});

document.getElementById("musiclist").innerHTML=html;

});

}

function postInfo(){

let text=document.getElementById("infotext").value;

db.collection("info").add({
text:text
});

}

function loadInfo(){

db.collection("info").onSnapshot(snapshot=>{

let html="";

snapshot.forEach(doc=>{

html+="<p>"+doc.data().text+"</p>";

});

document.getElementById("infoboard").innerHTML=html;

});

}

function sendMessage(){

let msg=document.getElementById("chatmsg").value;

db.collection("chat").add({
text:msg
});

}

function loadChat(){

db.collection("chat").onSnapshot(snapshot=>{

let html="";

snapshot.forEach(doc=>{

html+="<p>"+doc.data().text+"</p>";

});

document.getElementById("chatbox").innerHTML=html;

});

}
