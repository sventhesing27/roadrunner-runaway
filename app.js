const accounts=[
{user:'admin',pass:'shelby123'},
{user:'mitarbeiter',pass:'1234'},
{user:'verwalter',pass:'verwalter123'}
];

document.getElementById('loginBtn').addEventListener('click',()=>{

const u=document.getElementById('username').value.trim();
const p=document.getElementById('password').value.trim();

const acc=accounts.find(a=>a.user===u && a.pass===p);

if(acc){
document.getElementById('loginCard').style.display='none';
document.getElementById('dashboard').style.display='block';
loadStaff();
loadInventory();
loadOrders();
}else{
document.getElementById('errorMsg').textContent='Falscher Login';
}

});

function showSection(id){
['inventory','orders','staff'].forEach(s=>{
document.getElementById(s).style.display=(s===id)?'block':'none';
});
}

/* STAFF */

function loadStaff(){

db.collection("staff").onSnapshot(snapshot=>{

const tbody=document.querySelector('#staffTable tbody');
tbody.innerHTML='';

const select=document.getElementById('invEmployee');
select.innerHTML='';

snapshot.forEach(doc=>{

const s=doc.data().name;

const tr=document.createElement('tr');
tr.innerHTML=`<td>${s}</td>`;
tbody.appendChild(tr);

const opt=document.createElement('option');
opt.value=s;
opt.text=s;
select.add(opt);

});

});

}

document.getElementById('addStaff').addEventListener('click',()=>{

const name=document.getElementById('newEmployee').value.trim();

if(!name)return;

db.collection("staff").add({name});

});

/* INVENTORY */

function loadInventory(){

db.collection("inventory").onSnapshot(snapshot=>{

const tbody=document.querySelector('#entriesTable tbody');
tbody.innerHTML='';

snapshot.forEach(doc=>{

const e=doc.data();

const tr=document.createElement('tr');
tr.innerHTML=`
<td>${e.employee}</td>
<td>${e.material}</td>
<td>${e.quantity}</td>
<td>${e.price}</td>
`;

tbody.appendChild(tr);

});

});

}

document.getElementById('addInv').addEventListener('click',()=>{

const e={
employee:document.getElementById('invEmployee').value,
material:document.getElementById('material').value,
quantity:Number(document.getElementById('quantity').value),
price:Number(document.getElementById('price').value)
};

db.collection("inventory").add(e);

});

/* ORDERS */

function loadOrders(){

db.collection("orders").onSnapshot(snapshot=>{

const tbody=document.querySelector('#orderTable tbody');
tbody.innerHTML='';

snapshot.forEach(doc=>{

const o=doc.data();

const tr=document.createElement('tr');
tr.innerHTML=`
<td>${o.client}</td>
<td>${o.item}</td>
`;

tbody.appendChild(tr);

});

});

}

document.getElementById('addOrder').addEventListener('click',()=>{

const o={
client:document.getElementById('orderClient').value,
item:document.getElementById('orderItem').value
};

db.collection("orders").add(o);

});
