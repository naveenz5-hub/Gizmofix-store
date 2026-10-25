// GizmoFix starter storefront. Product entries are demos; replace with verified offers before selling.
const products = [
  {id:"light", name:"Motion Sensor Light", price:599, tag:"Everyday helper", description:"A handy lighting idea for hallways, cupboards and bedside spaces.", image:"https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=900&q=80"},
  {id:"stand", name:"Foldable Phone Stand", price:299, tag:"Desk essential", description:"A compact stand concept for video calls, study sessions and desks.", image:"https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=900&q=80"},
  {id:"cleaner", name:"Reusable Cleaning Tool", price:449, tag:"Clean smarter", description:"A cleaning-tool concept for tackling everyday messes.", image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"}
];
const cart = new Map();
const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotal = document.getElementById("subtotal");
const checkoutDialog = document.getElementById("checkoutDialog");
const toast = document.getElementById("toast");
document.getElementById("year").textContent = new Date().getFullYear();
const money = n => "₹" + n.toLocaleString("en-IN");

function renderProducts(){
  productGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-visual">
        <span class="product-tag">${p.tag}</span>
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='#dfe4d8'">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3><p>${p.description}</p>
        <div class="price-row"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">Add +</button></div>
      </div>
    </article>`).join("");
  productGrid.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", () => {
    const id=btn.dataset.add; cart.set(id,(cart.get(id)||0)+1); renderCart(); showToast("Added to your bag"); 
  }));
}
function renderCart(){
  let count=0,total=0;
  cart.forEach((qty,id)=>{const p=products.find(x=>x.id===id);count+=qty;total+=p.price*qty;});
  cartCount.textContent=count;subtotal.textContent=money(total);
  if(!count){cartItems.innerHTML='<p class="empty-cart">Your bag is empty. Find a useful fix to get started.</p>';return;}
  cartItems.innerHTML=[...cart.entries()].map(([id,qty])=>{const p=products.find(x=>x.id===id);return `
    <div class="cart-line"><div><strong>${p.name}</strong><small>${money(p.price)} each</small>
    <div class="quantity"><button data-dec="${id}" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-inc="${id}" aria-label="Increase quantity">+</button></div></div>
    <strong>${money(p.price*qty)}</strong></div>`}).join("");
  cartItems.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>{const id=b.dataset.dec,n=(cart.get(id)||0)-1;if(n<=0)cart.delete(id);else cart.set(id,n);renderCart();});
  cartItems.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>{const id=b.dataset.inc;cart.set(id,(cart.get(id)||0)+1);renderCart();});
}
function openCart(){cartPanel.classList.add("open");cartPanel.setAttribute("aria-hidden","false");overlay.hidden=false;}
function closeCart(){cartPanel.classList.remove("open");cartPanel.setAttribute("aria-hidden","true");overlay.hidden=true;}
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800);}
document.getElementById("cartToggle").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("continueShopping").onclick=closeCart;
overlay.onclick=closeCart;
document.getElementById("checkoutButton").onclick=()=>{
  if(cart.size===0){showToast("Your bag is empty");return;}
  closeCart();checkoutDialog.showModal();
};
document.getElementById("copyEnquiry").onclick=async()=>{
  const name=document.getElementById("customerName").value.trim();
  const email=document.getElementById("customerEmail").value.trim();
  const lines=[`GizmoFix demo order enquiry`,name?`Name: ${name}`:"",email?`Email: ${email}`:"",...([...cart.entries()].map(([id,qty])=>{const p=products.find(x=>x.id===id);return `${p.name} x ${qty} — ${money(p.price*qty)}`})),`Subtotal: ${money([...cart.entries()].reduce((sum,[id,qty])=>sum+products.find(p=>p.id===id).price*qty,0))}`,`Not a placed order. No payment collected.`].filter(Boolean).join("\n");
  const notice=document.getElementById("copyNotice");
  try{await navigator.clipboard.writeText(lines);notice.textContent="Demo summary copied. No order was placed.";}
  catch(e){notice.textContent="Copy isn't available in this browser. You can take a screenshot of your bag; no order was placed.";}
};
renderProducts();renderCart();
