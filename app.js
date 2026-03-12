window.onload = function(){

const accounts=[
{user:'admin',pass:'Cornelia_1',role:'admin'},
{user:'BigBommel',pass:'1233095817Ae',role:'admin'},
{user:'Piloten',pass:'Runaway',role:'mitarbeiter'},
{user:'verwalter',pass:'ChefPilot',role:'verwalter'}
];

let currentRole='';

const loginCard=document.getElementById('loginCard');
const dashboard=document.getElementById('dashboard');

const INV_KEY='shelby_inventory';
const PAY_KEY='shelby_payouts';
const HIST_KEY='shelby_history';
const STAFF_KEY='shelby_staff';
const ORDERS_KEY='shelby_orders';
const LINKS_KEY='shelby_links';

document.getElementById('loginBtn').addEventListener('click',()=>{

const u=document.getElementById('username').value.trim();
const p=document.getElementById('password').value.trim();

const acc=accounts.find(a=>a.user===u && a.pass===p);

if(acc){
currentRole=acc.role;
loginCard.style.display='none';
dashboard.style.display='block';
setupNav();
initData();
}else{
document.getElementById('errorMsg').textContent='Falscher Benutzer oder Passwort';
}
});

function logout(){
currentRole='';
dashboard.style.display='none';
loginCard.style.display='flex';
}

function setupNav(){
const nav=document.getElementById('navLinks');
nav.innerHTML='';

nav.innerHTML+='<a onclick="showSection(\'inventory\')">Inventar</a>';
nav.innerHTML+='<a onclick="showSection(\'orders\')">Aufträge</a>';

if(currentRole==='admin')
nav.innerHTML+='<a onclick="showSection(\'payouts\')">Auszahlungen</a>';

if(currentRole!=='mitarbeiter')
nav.innerHTML+='<a onclick="showSection(\'history\')">History</a>';

if(currentRole!=='mitarbeiter')
nav.innerHTML+='<a onclick="showSection(\'staff\')">Mitarbeiter</a>';

nav.innerHTML+='<a onclick="showSection(\'links\')">Links</a>';
}

function showSection(id){
['inventory','orders','payouts','history','staff','links']
.forEach(s=>document.getElementById(s).style.display=(s===id)?'block':'none');
}

let staff=[];
function loadStaff(){
staff=JSON.parse(localStorage.getItem(STAFF_KEY)||'["mitarbeiter","verwalter"]');
renderStaff();
}
function saveStaff(){
localStorage.setItem(STAFF_KEY,JSON.stringify(staff));
}
function renderStaff(){

const tbody=document.querySelector('#staffTable tbody');
tbody.innerHTML='';

const selectInv=document.getElementById('invEmployee');
const selectPay=document.getElementById('payEmployee');

selectInv.innerHTML='';
selectPay.innerHTML='';

staff.forEach(s=>{

const tr=document.createElement('tr');
tr.innerHTML=`<td>${s}</td><td><button class="secondary" onclick="removeStaff('${s}')">Löschen</button></td>`;
tbody.appendChild(tr);

const opt=document.createElement('option');
opt.value=s;
opt.text=s;

selectInv.add(opt.cloneNode(true));
selectPay.add(opt.cloneNode(true));

});
}

function addStaff(){
const n=document.getElementById('newEmployee').value.trim();
if(!n || staff.includes(n)){ alert('Ungültiger Name'); return; }
staff.push(n);
saveStaff();
renderStaff();
document.getElementById('newEmployee').value='';
addHistory('Mitarbeiter hinzugefügt',n);
}

function removeStaff(name){
if(!confirm('Wirklich löschen?')) return;
staff=staff.filter(s=>s!==name);
saveStaff();
renderStaff();
addHistory('Mitarbeiter gelöscht',name);
}

document.getElementById('addStaff').addEventListener('click',addStaff);


let inventory=[];
function loadInventory(){

db.collection("inventory").onSnapshot(snapshot=>{

inventory=[];

snapshot.forEach(doc=>{
inventory.push(doc.data());
});

renderInventory();

});

}
function saveInventory(){
localStorage.setItem(INV_KEY,JSON.stringify(inventory));
}
function renderInventory(){

const tbody=document.querySelector('#entriesTable tbody');
tbody.innerHTML='';

inventory.forEach((e,i)=>{

const total=(e.quantity*e.price).toFixed(2);
const tr=document.createElement('tr');

tr.innerHTML=`
<td>${e.employee}</td>
<td>${e.material}</td>
<td>${e.quantity}</td>
<td>${e.price}</td>
<td>${total}</td>
<td><button class="secondary" onclick="removeInventory(${i})">Entnommen</button></td>
`;

tbody.appendChild(tr);
});
}



inventory.unshift(e);
saveInventory();
renderInventory();
addHistory('Inventar hinzugefügt',`${e.employee} - ${e.material}`);
}

function removeInventory(i){
const e=inventory[i];
inventory.splice(i,1);
saveInventory();
renderInventory();
addHistory('Inventar entnommen',`${e.employee} - ${e.material}`);
}

document.getElementById('addInv').addEventListener('click',addInventory);


let payouts=[];
function loadPayouts(){
payouts=JSON.parse(localStorage.getItem(PAY_KEY)||'[]');
renderPayouts();
}
function savePayouts(){
localStorage.setItem(PAY_KEY,JSON.stringify(payouts));
}
function renderPayouts(){

const tbody=document.querySelector('#payoutTable tbody');
tbody.innerHTML='';

payouts.forEach((p,i)=>{

const tr=document.createElement('tr');

tr.innerHTML=`
<td>${p.date}</td>
<td>${p.employee}</td>
<td>${p.amount}€</td>
<td><button class="secondary" onclick="removePayout(${i})">Löschen</button></td>
`;

tbody.appendChild(tr);
});
}

function addPayout(){
const p={
employee:document.getElementById('payEmployee').value,
amount:Number(document.getElementById('amount').value),
date:document.getElementById('date').value
};
payouts.unshift(p);
savePayouts();
renderPayouts();
addHistory('Auszahlung',`${p.employee} - ${p.amount}€`);
}

function removePayout(i){
const p=payouts[i];
payouts.splice(i,1);
savePayouts();
renderPayouts();
addHistory('Auszahlung gelöscht',`${p.employee}`);
}

document.getElementById('addPay').addEventListener('click',addPayout);


let orders=[];
function loadOrders(){
orders=JSON.parse(localStorage.getItem(ORDERS_KEY)||'[]');
renderOrders();
}
function saveOrders(){
localStorage.setItem(ORDERS_KEY,JSON.stringify(orders));
}
function renderOrders(){

const tbody=document.querySelector('#orderTable tbody');
tbody.innerHTML='';

orders.forEach((o,i)=>{

const overdue=new Date(o.due)<new Date();
const tr=document.createElement('tr');

tr.innerHTML=`
<td>${o.client}</td>
<td>${o.item}</td>
<td>${o.date}</td>
<td class="${overdue?'overdue':''}">${o.due}</td>
<td><button class="secondary" onclick="removeOrder(${i})">Erledigt</button></td>
`;

tbody.appendChild(tr);
});
}

function addOrder(){
const o={
client:document.getElementById('orderClient').value,
item:document.getElementById('orderItem').value,
date:document.getElementById('orderDate').value,
due:document.getElementById('orderDue').value
};
orders.unshift(o);
saveOrders();
renderOrders();
addHistory('Auftrag erstellt',`${o.client} - ${o.item}`);
}

function removeOrder(i){
const o=orders[i];
orders.splice(i,1);
saveOrders();
renderOrders();
addHistory('Auftrag erledigt',`${o.client}`);
}

document.getElementById('addOrder').addEventListener('click',addOrder);


let links=[];

function loadLinks(){
links=JSON.parse(localStorage.getItem(LINKS_KEY)||'[]');
renderLinks();
}

function saveLinks(){
localStorage.setItem(LINKS_KEY,JSON.stringify(links));
}

function renderLinks(){

const tbody=document.querySelector('#linksTable tbody');
tbody.innerHTML='';

links.forEach((l,i)=>{

const tr=document.createElement('tr');

tr.innerHTML=`
<td>${l.name}</td>
<td><a href="${l.url}" target="_blank">Öffnen</a></td>
<td><button class="secondary" onclick="removeLink(${i})">Löschen</button></td>
`;

tbody.appendChild(tr);
});
}

function addLink(){

const name=document.getElementById('linkName').value.trim();
const url=document.getElementById('linkURL').value.trim();

if(!name || !url){
alert('Name und URL eingeben');
return;
}

links.unshift({name,url});

saveLinks();
renderLinks();

document.getElementById('linkName').value='';
document.getElementById('linkURL').value='';

addHistory('Link hinzugefügt',name);
}

function removeLink(i){

const l=links[i];

if(!confirm('Link wirklich löschen?')) return;

links.splice(i,1);

saveLinks();
renderLinks();

addHistory('Link gelöscht',l.name);
}

document.getElementById('addLink').addEventListener('click',addLink);


let history=[];

function loadHistory(){
history=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');
renderHistory();
}

function saveHistory(){
localStorage.setItem(HIST_KEY,JSON.stringify(history));
}

function addHistory(action,details=''){

const now=new Date();

history.unshift({
date:now.toLocaleString(),
action,
details
});

saveHistory();
renderHistory();
}

function renderHistory(){

const tbody=document.querySelector('#historyTable tbody');
tbody.innerHTML='';

history.forEach(h=>{

const tr=document.createElement('tr');

tr.innerHTML=`
<td>${h.date}</td>
<td>${h.action}</td>
<td>${h.details}</td>
`;

tbody.appendChild(tr);
});
}

function initData(){
loadStaff();
loadInventory();
loadPayouts();
loadOrders();
loadLinks();
loadHistory();
showSection('inventory');
}

window.showSection=showSection;
window.removeInventory=removeInventory;
window.removePayout=removePayout;
window.removeOrder=removeOrder;
window.removeStaff=removeStaff;
window.removeLink=removeLink;
window.logout=logout;

}
