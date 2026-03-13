
const accounts=[
{user:'Admin',pass:'Run'},
{user:'Pilot',pass:'0815'},
{user:'Verwalter',pass:'FDH'}
];

document.getElementById('loginBtn').addEventListener('click',()=>{

const u=document.getElementById('username').value.trim();
const p=document.getElementById('password').value.trim();

const acc=accounts.find(a=>a.user===u && a.pass===p);

if(acc){

document.getElementById('loginCard').style.display='none';
document.getElementById('dashboard').style.display='block';

setupNav();
loadLinks();

}else{

document.getElementById('errorMsg').textContent='Falscher Login';

}

});

function logout(){
location.reload();
}

function setupNav(){

const nav=document.getElementById('navLinks');

nav.innerHTML="";
nav.innerHTML+="<a onclick=\"showSection('inventory')\">Inventar</a>";
nav.innerHTML+="<a onclick=\"showSection('links')\">Links</a>";

}

function showSection(id){

['inventory','links'].forEach(s=>{

document.getElementById(s).style.display=(s===id)?'block':'none';

});

}

/* LINKS (Firebase) */

function loadLinks(){

db.collection("links").onSnapshot(snapshot=>{

const tbody=document.querySelector('#linksTable tbody');
tbody.innerHTML='';

snapshot.forEach(doc=>{

const l=doc.data();

const tr=document.createElement('tr');

tr.innerHTML=`
<td>${l.name}</td>
<td><a href="${l.url}" target="_blank">${l.url}</a></td>
<td><button onclick="deleteLink('${doc.id}')">Löschen</button></td>
`;

tbody.appendChild(tr);

});

});

}

document.getElementById('addLink').addEventListener('click',()=>{

const name=document.getElementById('linkName').value;
const url=document.getElementById('linkURL').value;

if(!name || !url) return;

db.collection("links").add({
name:name,
url:url
});

});

function deleteLink(id){

db.collection("links").doc(id).delete();

}
