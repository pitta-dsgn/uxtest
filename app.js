'use strict';
const products={
 para:{id:'para',name:'Парацетамол таблетки 500 мг №20',price:62,regular:75},
 sinus:{id:'sinus',name:'Синусэфрин спрей назальный, флакон 15 мл',price:660,regular:878,rx:true},
 thera:{id:'thera',name:'Терафлю порошок для приготовления раствора для приёма внутрь Лимон пакетики',price:680,regular:931},
 linaqua:{id:'linaqua',name:'ЛинАква норм аэрозоль назальный 0,9% флакон 150мл',price:545,regular:725},
 energy:{id:'energy',name:'Energy Sol/Энерджи Сол Витамин С таблетки шипучие 900мг №20',price:329,regular:433},
 flu:{id:'flu',name:'Флюфайт таблетки №10',price:199,regular:257}
};
// Real directory locations; fixed mock availability for UX testing.
const pharmacies=[
 {
  "id": "sun",
  "address": "г. Геленджик, ул. Солнцедарская, 2Д",
  "hours": "Ежедневно 08:00–22:00",
  "distance": "448 м",
  "lat": 44.599635,
  "lng": 38.034089,
  "preorder": [
   "sinus"
  ],
  "missing": []
 },
 {
  "id": "hospital",
  "address": "г. Геленджик, пер. Больничный, 1 к2",
  "hours": "Ежедневно 09:00–21:00",
  "distance": "3 км",
  "lat": 44.58258,
  "lng": 38.070986,
  "preorder": [],
  "missing": [
   "sinus"
  ]
 },
 {
  "id": "pharmacy_0",
  "address": "г. Геленджик, просп. Геленджикский, 168А",
  "hours": "Ежедневно 08:00–22:00",
  "distance": "3 км",
  "lat": 44.57797,
  "lng": 38.070509,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_1",
  "address": "г. Геленджик, ул. Ленина, 1",
  "hours": "Ежедневно 10:00–19:00",
  "distance": "5 км",
  "lat": 44.561716,
  "lng": 38.07729,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_2",
  "address": "г. Геленджик, ул. Островского, 67Д",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.556893,
  "lng": 38.091928,
  "preorder": [
   "sinus"
  ],
  "missing": []
 },
 {
  "id": "pharmacy_3",
  "address": "г. Геленджик, ул. Кирова, 62",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.56104,
  "lng": 38.083622,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_4",
  "address": "г. Геленджик, ул. Крымская, 22",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.549795,
  "lng": 38.06063,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_5",
  "address": "г. Геленджик, ул. Ленина, 27А",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.566036,
  "lng": 38.081017,
  "preorder": [
   "para",
   "thera"
  ],
  "missing": []
 },
 {
  "id": "pharmacy_6",
  "address": "г. Геленджик, ул. Халтурина, 30",
  "hours": "Ежедневно 09:00–21:00",
  "distance": "4 км",
  "lat": 44.573042,
  "lng": 38.077142,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_7",
  "address": "г. Геленджик, ул. Чайковского, 6",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.555727,
  "lng": 38.07837,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_8",
  "address": "г. Геленджик, ул. Туристическая, 3Д",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.589998,
  "lng": 38.048137,
  "preorder": [
   "sinus"
  ],
  "missing": []
 },
 {
  "id": "pharmacy_9",
  "address": "г. Геленджик, ул. Халтурина, 11",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "4 км",
  "lat": 44.5684,
  "lng": 38.079662,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_10",
  "address": "г. Геленджик, ул. Советская, 69А",
  "hours": "Ежедневно 09:00–21:00",
  "distance": "6 км",
  "lat": 44.553086,
  "lng": 38.087595,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_11",
  "address": "г. Геленджик, ул. Свердлова, 16",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "6 км",
  "lat": 44.548837,
  "lng": 38.084696,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_12",
  "address": "г. Геленджик, ул. Полевая, 37А",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.550834,
  "lng": 38.068575,
  "preorder": [
   "sinus"
  ],
  "missing": []
 },
 {
  "id": "pharmacy_13",
  "address": "г. Геленджик, ул. Тельмана, 135",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.568087,
  "lng": 38.090166,
  "preorder": [],
  "missing": [
   "para",
   "thera"
  ]
 },
 {
  "id": "pharmacy_14",
  "address": "г. Геленджик, ул. Приморская, 1, пом. 45",
  "hours": "Ежедневно 09:00–21:00",
  "distance": "5 км",
  "lat": 44.55475,
  "lng": 38.074872,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_15",
  "address": "г. Геленджик, ул. Розы Люксембург, 66",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.563591,
  "lng": 38.091785,
  "preorder": [],
  "missing": []
 },
 {
  "id": "pharmacy_16",
  "address": "г. Геленджик, ул. Красногвардейская, 26",
  "hours": "Ежедневно 09:00–21:00",
  "distance": "5 км",
  "lat": 44.55323,
  "lng": 38.070054,
  "preorder": [
   "sinus"
  ],
  "missing": []
 },
 {
  "id": "pharmacy_17",
  "address": "г. Геленджик, ул. Гринченко, 37",
  "hours": "Ежедневно 08:00–20:00",
  "distance": "",
  "lat": 44.549258,
  "lng": 38.072969,
  "preorder": [],
  "missing": []
 },
 {
  "id": "slavyansky",
  "address": "с. Архипо-Осиповка, пер. Славянский, 5Б",
  "lat": 44.371512,
  "lng": 38.527902,
  "hours": "Ежедневно 08:00–20:00",
  "distance": "46 км",
  "preorder": [],
  "missing": []
 },
 {
  "id": "kabardinka",
  "address": "с. Кабардинка, ул. Октябрьская, 58",
  "lat": 44.650459,
  "lng": 37.938451,
  "hours": "Ежедневно 08:00–20:00",
  "distance": "9 км",
  "preorder": [
   "para"
  ],
  "missing": []
 },
 {
  "id": "bazarny",
  "address": "с. Архипо-Осиповка, пер. Базарный, 4Б",
  "lat": 44.370441,
  "lng": 38.53539,
  "hours": "Ежедневно 08:00–20:00",
  "distance": "46 км",
  "preorder": [],
  "missing": []
 },
 {
  "id": "north",
  "address": "г. Геленджик, мкр. Северный, 27Б",
  "lat": 44.600727,
  "lng": 38.030207,
  "hours": "Ежедневно 08:00–20:00",
  "distance": "669 м",
  "preorder": [],
  "missing": []
 },
 {
  "id": "divnomorskoe",
  "address": "с. Дивноморское, ул. Кирова, 6Б",
  "lat": 44.504031,
  "lng": 38.130704,
  "hours": "Ежедневно 09:00–21:00",
  "distance": "12 км",
  "preorder": [],
  "missing": []
 },
 {
  "id": "vostochny",
  "address": "г. Геленджик, пер. Восточный, 40А",
  "lat": 44.559535,
  "lng": 38.093419,
  "hours": "Ежедневно 08:00–20:00",
  "distance": "6 км",
  "preorder": [],
  "missing": []
 },
 {
  "id": "kurortnaya",
  "address": "г. Геленджик, ул. Курортная, 14Б к2",
  "lat": 44.57375,
  "lng": 38.084388,
  "hours": "Ежедневно 09:00–21:00",
  "distance": "4 км",
  "preorder": [
   "para",
   "thera"
  ],
  "missing": []
 },
 {
  "id": "vitebskaya",
  "address": "г. Геленджик, ул. Витебская, 8 к11",
  "lat": 44.556894,
  "lng": 38.103126,
  "hours": "Ежедневно 09:00–21:00",
  "distance": "6 км",
  "preorder": [],
  "missing": [
   "sinus",
   "thera"
  ]
 }
];
// Stable test inventory: 8/28 preorder pharmacies, 1/28 unavailable pharmacy.
const preorderIndexes=new Set([0,4,7,11,14,18,23,26]);
let preorderNumber=0;
for(const [index,pharmacy] of pharmacies.entries()){
 pharmacy.preorder=preorderIndexes.has(index)?(++preorderNumber%2?['sinus']:['para','thera']):[];
 pharmacy.missing=index===1?['sinus']:[];
}
const USER_LOCATION=Object.freeze({address:'г. Геленджик, ул. Солнцедарская, 8',lat:44.598501,lng:38.030582});
function distanceMeters(a,b){
 const radians=d=>d*Math.PI/180,lat=radians(b.lat-a.lat),lng=radians(b.lng-a.lng);
 const h=Math.sin(lat/2)**2+Math.cos(radians(a.lat))*Math.cos(radians(b.lat))*Math.sin(lng/2)**2;
 return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
}
function distanceLabel(meters){return meters<1000?Math.max(10,Math.round(meters/10)*10)+' м':new Intl.NumberFormat('ru-RU',{maximumFractionDigits:1}).format(meters/1000)+' км';}
for(const pharmacy of pharmacies){pharmacy.distanceMeters=distanceMeters(USER_LOCATION,pharmacy);pharmacy.distance=distanceLabel(pharmacy.distanceMeters);}
pharmacies[0].hours='Ежедневно 08:00–20:00';
const initial=()=>({favorites:[],quantities:{para:1,sinus:1,thera:1},mode:null,payment:'pickup',promo:false,orders:null,chosen:false});
let state=initial();
try{const saved=JSON.parse(sessionStorage.getItem('april-uxtest-v2'));if(saved&&saved.quantities)state={...state,...saved};}catch{}
const ui={route:'cart',query:'',selected:false,selectedId:'sun',expanded:false,collapsed:false,favorites:false,saved:new Set(),openRows:new Set(),removed:{},zoom:1};
const app=document.getElementById('app');
let liveMap=null;
let mapMountId=0;
let markerLayer=null;
let focusSelectedMarker=false;
const mapView={center:[USER_LOCATION.lat,USER_LOCATION.lng],zoom:13};
const money=v=>new Intl.NumberFormat('ru-RU').format(v)+' ₽';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ASSETS={"para": "product_paracetamol.png", "sinus": "product_sinusefrin.png", "thera": "product_theraflu.png", "linaqua": "product_linaqua.png", "energy": "product_energy_sol.png", "flu": "product_flufight.png", "catalog": "navigation_catalog.svg", "offers": "navigation_offers.svg", "home": "icon_home.svg", "cart": "icon_cart.svg", "profile": "icon_profile.svg", "heart": "icon_heart_outline.svg", "heart-filled": "icon_heart_filled.svg", "heart-disabled": "icon_heart_disabled.svg", "trash": "icon_delete.svg", "back": "icon_back_button.svg", "chevron": "icon_chevron_down.svg", "chevron-up": "icon_chevron_up.svg", "chevron-right": "icon_chevron_right.svg", "search": "icon_search_icon.svg", "info": "icon_info.svg", "bookmark": "icon_bookmark_outline.svg", "bookmark-filled": "icon_bookmark_filled.svg", "location": "icon_location_icon.svg", "plus": "icon_plus.svg", "minus": "icon_minus.svg", "zoom-in": "icon_zoom_in_button.svg", "zoom-out": "icon_zoom_out_button.svg", "success": "icon_order_success.svg", "close": "icon_close_icon.svg", "clear": "icon_clear_button.svg", "radio": "icon_radio_unselected.svg", "radio-selected": "icon_radio_selected.svg", "radio-disabled": "icon_radio_disabled.svg", "marker-green": "marker_available.svg", "marker-orange": "marker_on_order.svg", "marker-red": "marker_unavailable.svg", "marker-selected-green": "marker_selected_available.svg", "marker-selected-orange": "marker_selected_on_order.svg", "marker-selected-red": "marker_selected_unavailable.svg", "cluster": "map_cluster.svg"};
const PRODUCT_IMAGE_REVISIONS={"para": "bf3c30f56222", "sinus": "86fc33092967", "thera": "3999a1f8fece", "linaqua": "792880bc46cf", "energy": "b6d5f36a6005", "flu": "55d5969ccada"};
const image=(id,cls='')=>`<img src="images/${ASSETS[id]}?v=${(PRODUCT_IMAGE_REVISIONS[id]||'asset')+'-20261101d'}" alt="" class="${products[id]?'product-photo '+id+' ':''}${cls}" decoding="async" draggable="false">`;
const radio=(selected,disabled=false)=>`<span class="radio">${image(disabled?'radio-disabled':selected?'radio-selected':'radio')}</span>`;
const entries=()=>Object.entries(state.quantities).filter(([id,q])=>products[id]&&q>0&&!ui.removed[id]).map(([id,q])=>({...products[id],qty:q}));
const sum=(items,field='price')=>items.reduce((n,p)=>n+p[field]*p.qty,0);
const count=items=>items.reduce((n,p)=>n+p.qty,0);
const noun=n=>n%10===1&&n%100!==11?'товар':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'товара':'товаров';
function save(){try{sessionStorage.setItem('april-uxtest-v2',JSON.stringify(state));}catch{}}
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('visible'),2400);}
function button(label,action,cls='',extra=''){return `<button type="button" class="button ${cls}" data-action="${action}" ${extra}>${label}</button>`;}
function nav(){const n=count(entries());return `<nav class="bottom-nav" aria-label="Нижнее меню">${[['catalog','Каталог'],['offers','Акции'],['home','Главная'],['cart','Корзина'],['profile','Профиль']].map(([id,label])=>`<button type="button" class="nav-item ${id==='cart'?'active':''}" ${id==='cart'?'data-action="cart"':''} aria-label="${label}"><span class="nav-icon">${image(id)}</span><span>${label}</span>${id==='cart'&&n?`<span class="badge">${n}</span>`:''}</button>`).join('')}</nav>`;}
function header(title,back){return `<header class="app-header">${back?`<button class="icon-button back" data-action="${back}" aria-label="Назад">${image('back')}</button>`:''}<h1>${title}</h1></header>`;}
function price(p){return `<div class="price-row"><strong class="price pink">${money(p.price*p.qty)}</strong><span class="price-hint">с клубной картой</span></div><div class="price-hint">${money(p.regular*p.qty)} без карты</div>`;}
function cartCard(p){const removed=!!ui.removed[p.id];return `<article class="cart-item ${removed?'removed':''}" data-product="${p.id}"><div class="product-info"><div class="product-image">${image(p.id,p.id)}</div><div class="product-details"><p class="product-name">${esc(p.name)}</p>${p.rx?'<span class="prescription">По рецепту</span>':''}${price(p)}</div></div><div class="product-actions"><div class="action-pair"><button class="icon-button pale" data-action="favorite-product" data-id="${p.id}" aria-pressed="${state.favorites.includes(p.id)}" aria-label="${state.favorites.includes(p.id)?'Убрать из избранного':'В избранное'}" ${removed?'disabled':''}>${image(removed?'heart-disabled':state.favorites.includes(p.id)?'heart-filled':'heart')}</button>${removed?'':`<button class="icon-button pale" data-action="remove" data-id="${p.id}" aria-label="Удалить ${esc(p.name)}">${image('trash')}</button>`}</div>${removed?button('Вернуть','restore','secondary-button restore',`data-id="${p.id}"`):`<div class="counter"><button data-action="decrease" data-id="${p.id}" aria-label="Уменьшить количество">${image('minus')}</button><output aria-label="Количество">${p.qty}</output><button data-action="increase" data-id="${p.id}" aria-label="Увеличить количество">${image('plus')}</button></div>`}</div></article>`;}
function offer(id){const p={...products[id],qty:1};return `<article class="offer"><div class="product-image">${image(id)}</div><p>${esc(p.name)}</p><div class="offer-prices"><strong class="price pink">${money(p.price)}</strong><span class="price-hint">с клубной картой</span><span class="price-hint">${money(p.regular)} без карты</span></div>${button('Добавить','add','outline',`data-id="${id}"`)}</article>`;}
function cart(){const active=entries(),n=count(active),all=Object.entries(state.quantities).filter(([id,q])=>q>0&&products[id]).map(([id,q])=>({...products[id],qty:q}));let body='';
if(all.length){body=`<div class="scroll" id="main-scroll"><section class="delivery-block"><h2>Способ получения</h2><div class="tabs"><button class="tab" aria-pressed="true">Самовывоз</button><button class="tab" disabled>Доставка</button></div><div class="notice"><span class="info">${image('info')}</span><p>В заказе есть рецептурные препараты — их можно получить только в аптеке</p></div></section>${all.map(p=>cartCard(p)+(p.id==='sinus'&&!ui.removed.sinus?`<aside class="recommendation"><h2>Может пригодиться</h2><div class="related-row"><div class="product-image">${image('linaqua')}</div><div class="product-details"><p class="product-name">${products.linaqua.name}</p>${price({...products.linaqua,qty:1})}${button('Добавить','add','outline','data-id="linaqua"')}</div></div></aside>`:'')+'<div class="divider"></div>').join('')}<aside class="recommendation"><h2>Добавить к заказу</h2><div class="offers">${offer('energy')}${offer('flu')}</div></aside><img class="ad-banner" src="images/banner_cart.png" alt="Рекламное предложение"></div>${n?`<section class="cart-summary"><div class="savings">С вашей клубной картой заказ дешевле на <span class="pink">${money(sum(active,'regular')-sum(active))}</span></div><div class="summary-action"><div class="summary-total"><p class="small">Итого · ${n} ${noun(n)}</p><div class="sum-line"><strong>${money(sum(active))}</strong></div></div>${button('К оформлению','start-map')}</div><p class="small">Цены действуют только при заказе через приложение</p></section>`:''}`;}
else body=`<section class="empty"><h2>В корзине пока нет товаров</h2><p>Добавьте товары из каталога, чтобы оформить заказ</p>${button('Перейти в каталог','reset')}</section>`;
app.innerHTML=`<header class="app-header cart-header"><div><h1>Корзина</h1><div class="city">Геленджик ${image('chevron-right')}</div></div>${all.length?'<button class="clear" data-action="clear">Очистить</button>':''}</header>${body}${nav()}`;
}
function destroyLiveMap(){
 mapMountId++;
 if(!liveMap)return;
 const center=liveMap.getCenter();mapView.center=[center.lat,center.lng];mapView.zoom=liveMap.getZoom();
 liveMap.remove();liveMap=null;markerLayer=null;
}
async function mountLiveMap(){
 const mountId=++mapMountId;
 const loading=document.getElementById('map-loading');
 try{
  if(!window.L)await new Promise((resolve,reject)=>{
   const script=document.getElementById('leaflet-js');
   if(!script){reject(new Error('Map library is unavailable'));return;}
   const timeout=setTimeout(()=>reject(new Error('Map loading timed out')),15000);
   script.addEventListener('load',()=>{clearTimeout(timeout);resolve();},{once:true});
   script.addEventListener('error',()=>{clearTimeout(timeout);reject(new Error('Map loading failed'));},{once:true});
  });
  if(mountId!==mapMountId||ui.route!=='pharmacies')return;
  const L=window.L;
  liveMap=L.map('live-map',{zoomControl:false,attributionControl:false,minZoom:10,maxZoom:18,scrollWheelZoom:true,dragging:true,touchZoom:true}).setView(mapView.center,mapView.zoom);
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{minZoom:10,maxZoom:18,referrerPolicy:'strict-origin-when-cross-origin'});
  tiles.on('tileload',()=>{if(mountId===mapMountId)loading.hidden=true;});
  tiles.on('tileerror',()=>{if(mountId===mapMountId){loading.hidden=false;loading.textContent='Не удалось загрузить карту. Проверьте подключение к интернету';}});
  tiles.addTo(liveMap);
  markerLayer=L.layerGroup().addTo(liveMap);
  L.marker([USER_LOCATION.lat,USER_LOCATION.lng],{icon:L.divIcon({className:'user-location-marker',html:'<span></span>',iconSize:[24,24],iconAnchor:[12,12]}),title:'Вы здесь · Солнцедарская, 8',alt:'Ваше местоположение: Солнцедарская, 8',interactive:false,keyboard:false,zIndexOffset:1000}).addTo(liveMap);
  refreshMapMarkers();
  liveMap.on('moveend zoomend',()=>{if(!liveMap)return;const c=liveMap.getCenter();mapView.center=[c.lat,c.lng];mapView.zoom=liveMap.getZoom();refreshMapMarkers();});
  if(focusSelectedMarker){focusSelectedMarker=false;focusPharmacyMarker();}
 }catch(error){if(mountId===mapMountId&&loading){loading.hidden=false;loading.textContent='Карта недоступна. Аптеку можно выбрать из списка';}}
}
function selectPharmacy(id='sun'){
 const p=pharmacies.find(p=>p.id===id);if(!p)return;
 ui.selected=true;ui.selectedId=id;ui.collapsed=false;ui.expanded=false;
 focusSelectedMarker=true;document.activeElement?.blur();render();
}
function focusPharmacyMarker(){
 if(!liveMap||!ui.selected)return;
 const p=pharmacies.find(p=>p.id===ui.selectedId)||pharmacies[0],zoom=16;
 const sheet=document.querySelector('.sheet.selected'),height=sheet?.getBoundingClientRect?.().height||320;
 // Center the pin in the visible map area above the selected pharmacy panel.
 const point=liveMap.project([p.lat,p.lng],zoom);
 const center=liveMap.unproject([point.x,point.y+Math.max(0,(height-112)/2)],zoom);
 liveMap.flyTo(center,zoom,{duration:.7});
}
function stockInfo(p){
 const ids=new Set(entries().map(item=>item.id));
 const missing=p.missing.filter(id=>ids.has(id)),preorder=p.preorder.filter(id=>ids.has(id));
 const n=missing.length||preorder.length;
 return {missing,preorder,color:missing.length?'red':preorder.length?'orange':'green',status:missing.length?`${n} ${n===1?'товар недоступен':'товара недоступны'}`:preorder.length?`${n} ${n===1?'товар':'товара'} под заказ`:'Все в наличии'};
}
function clusterPharmacies(items,project,zoom){
 const groups=[];
 for(const p of items){const point=project(p),group=zoom<18&&groups.find(g=>g.points.every(q=>Math.hypot(point.x-q.x,point.y-q.y)<56));if(group){group.items.push(p);group.points.push(point);}else groups.push({items:[p],points:[point]});}
 return groups.map(g=>g.items);
}
// A cluster is anchored on a member pharmacy, never the bay's geometric center.
function clusterAnchor(group,project){
 const points=group.map(p=>({pharmacy:p,point:project(p)}));
 return points.reduce((best,p)=>{
  const cost=points.reduce((sum,q)=>sum+(p.point.x-q.point.x)**2+(p.point.y-q.point.y)**2,0);
  return !best||cost<best.cost?{pharmacy:p.pharmacy,cost}:best;
 },null).pharmacy;
}
function refreshMapMarkers(){
 if(!liveMap||!markerLayer)return;
 const L=window.L;markerLayer.clearLayers();
 const markerPharmacies=ui.selected?pharmacies:filteredPharmacies();
 const groups=clusterPharmacies(markerPharmacies,p=>liveMap.project([p.lat,p.lng],liveMap.getZoom()),liveMap.getZoom());
 for(const group of groups){
  const multiple=group.length>1,p=multiple?clusterAnchor(group,p=>liveMap.project([p.lat,p.lng],liveMap.getZoom())):group[0],center=[p.lat,p.lng];
  const info=stockInfo(p),label=multiple?`${group.length} аптек`:p.address+' — '+info.status;
  const selected=!multiple&&ui.selected&&p.id===ui.selectedId;const icon=multiple?L.divIcon({className:'pharmacy-cluster',html:`${image('cluster')}<span>${group.length}</span>`,iconSize:[48,48],iconAnchor:[24,24]}):L.icon({className:'pharmacy-marker',iconUrl:'images/'+ASSETS[(selected?'marker-selected-':'marker-')+info.color],iconSize:selected?[36,46]:[28,36],iconAnchor:selected?[18,46]:[14,36]});
  L.marker(center,{icon,title:label,alt:label,keyboard:true}).addTo(markerLayer).on('click',()=>{
   if(multiple){liveMap.setView(center,Math.min(18,liveMap.getZoom()+2));return;}
   selectPharmacy(p.id);
  });
 }
}
function sheetStops(){
 const phone=document.getElementById('phone'),height=phone.clientHeight;
 const back=document.querySelector('.map-back'),backBottom=back?.getBoundingClientRect?.().bottom,phoneTop=phone.getBoundingClientRect?.().top||0;
 const max=Math.round(height-(backBottom?backBottom-phoneTop+8:112));
 const sheet=document.querySelector('.sheet'),search=sheet?.querySelector?.('.search-row'),handle=sheet?.querySelector?.('.handle');
 const chrome=12+(handle?.getBoundingClientRect?.().height||20)+(search?.getBoundingClientRect?.().height||48)+24;
 const rows=sheet?.querySelectorAll?.('.pharmacy-row');
 const rowHeight=rows?.length?Array.from(rows).slice(0,2).reduce((n,row)=>n+row.getBoundingClientRect().height,0):264;
 return [chrome,Math.min(max,chrome+16+rowHeight),max];
}
function applySheetHeight(){const sheet=document.querySelector('.sheet');if(!sheet||ui.selected)return;const stops=sheetStops();sheet.style.height=stops[ui.collapsed?0:ui.expanded?2:1]+'px';sheet.style.maxHeight='none';}
function miniProduct(p,status){const cls=status==='Под заказ'?'preorder':status==='Временно отсутствует'?'missing':'';return `<article class="mini-product ${cls}"><div class="mini-image">${image(p.id)}</div><div class="mini-details"><p class="mini-name">${esc(p.name)}</p><p class="mini-status ${status==='Под заказ'?'orange':status==='Временно отсутствует'?'red':'green'}">${status}</p></div><span class="mini-qty">×${p.qty}</span></article>`;}
function miniList(pharmacy){return `<div class="mini-list" id="stock-${pharmacy.id}">${entries().map(p=>miniProduct(p,pharmacy.missing.includes(p.id)?'Временно отсутствует':pharmacy.preorder.includes(p.id)?'Под заказ':'В наличии')).join('')}</div>`;}
function availability(pharmacy,expandable=true){const {status,color}=stockInfo(pharmacy),canExpand=expandable&&color!=='green',open=ui.openRows.has(pharmacy.id);if(!canExpand)return `<p class="availability ${color}">${status}</p>`;return `<button type="button" class="availability ${color}" data-action="expand-row" data-id="${pharmacy.id}" aria-expanded="${open}" aria-controls="stock-${pharmacy.id}">${status}<span class="disclosure-icon" aria-hidden="true" style="--icon:url('images/${ASSETS[open?'chevron-up':'chevron']}')"></span></button>`;}
function pharmacyRow(p){return `<article class="pharmacy-row" id="pharmacy-row-${p.id}"><div class="address-row"><div><button class="address" data-action="select-pharmacy" data-id="${p.id}">${p.address}</button><p class="pharmacy-meta" title="Расстояние по прямой от Солнцедарской, 8">${p.hours}${p.distance?' · '+p.distance:''}</p></div><button class="bookmark ${ui.saved.has(p.id)?'saved':''}" data-action="bookmark" data-id="${p.id}" aria-label="${ui.saved.has(p.id)?'Убрать из избранного':'Добавить в избранное'}" aria-pressed="${ui.saved.has(p.id)}">${image(ui.saved.has(p.id)?'bookmark-filled':'bookmark')}</button></div>${availability(p)}${ui.openRows.has(p.id)?miniList(p):''}</article>`;}
function normalize(s){return s.toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/[^а-яa-z0-9]+/g,' ').trim();}
function filteredPharmacies(){const tokens=normalize(ui.query).split(' ').filter(Boolean);return pharmacies.filter(p=>(!ui.favorites||ui.saved.has(p.id))&&tokens.every(t=>normalize(p.address).includes(t))).sort((a,b)=>a.distanceMeters-b.distanceMeters||a.address.localeCompare(b.address,'ru'));}
function listHtml(){const list=filteredPharmacies(),emptyFavorites=ui.favorites&&!ui.query;return list.length?list.map(pharmacyRow).join(''):`<div class="no-results ${emptyFavorites?'empty-favorites':''}"><div class="empty-copy"><h2>${emptyFavorites?'Нет избранных аптек':'Аптеки не найдены'}</h2><p>${emptyFavorites?'Сохраните аптеку с помощью закладки рядом с её адресом':'Проверьте адрес или измените запрос'}</p></div>${ui.favorites?button('Показать все аптеки','all-pharmacies','secondary-button'):''}</div>`;}
function map(){const p=pharmacies.find(p=>p.id===ui.selectedId)||pharmacies[0];app.innerHTML=`<section class="map-screen" aria-label="Выбор аптеки"><div id="live-map" class="live-map" aria-label="Интерактивная карта Геленджика"></div><div id="map-loading" class="map-loading" role="status">Загрузка карты…</div><a class="map-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a><button class="icon-button map-back" data-action="${ui.selected?'back-list':'cart'}" aria-label="Назад">${image('back')}</button><button class="icon-button map-location" data-action="locate" aria-label="Показать моё местоположение">${image('location')}</button><div class="map-controls"><button data-action="zoom-in" aria-label="Увеличить карту">${image('zoom-in')}</button><button data-action="zoom-out" aria-label="Уменьшить карту">${image('zoom-out')}</button></div><section class="sheet ${ui.selected?'selected':ui.collapsed?'collapsed':ui.expanded?'expanded':''}"><button class="handle" data-action="toggle-sheet" aria-label="${ui.collapsed?'Развернуть':'Изменить высоту'} список"><span></span></button>${ui.selected?`<div class="sheet-body"><div class="address-row"><div><h2>${p.address}</h2><p class="pharmacy-meta" title="Расстояние по прямой от Солнцедарской, 8">${p.hours}${p.distance?' · '+p.distance:''}</p></div><button class="bookmark ${ui.saved.has(p.id)?'saved':''}" data-action="bookmark" data-id="${p.id}" aria-label="Добавить аптеку в избранное">${image(ui.saved.has(p.id)?'bookmark-filled':'bookmark')}</button></div>${availability(p,false)}${stockInfo(p).color!=='green'?miniList(p):''}</div>${button('Выбрать аптеку','choose-pharmacy','',p.id!=='sun'?'disabled':'')}`:`<div class="search-row"><button class="icon-button favorite-filter ${ui.favorites?'is-active':''}" data-action="toggle-favorites" aria-label="Избранные аптеки" aria-pressed="${ui.favorites}"><span class="favorite-filter-icon" aria-hidden="true"></span></button><label class="search-field">${image('search')}<input id="pharmacy-search" type="search" autocomplete="off" enterkeyhint="search" placeholder="Поиск по улице или адресу" aria-label="Поиск аптеки по улице или адресу" value="${esc(ui.query)}"></label></div><div class="sheet-body" id="pharmacy-results">${listHtml()}</div>`}</section></section>`;document.getElementById('phone').classList.add('map-active');applySheetHeight();mountLiveMap();}
function checkoutProduct(p){return `<article class="checkout-product"><div class="mini-image">${image(p.id)}</div><div><p class="name">${esc(p.name)}</p><p class="amount">${money(p.price*p.qty)}</p>${ui.route==='checkout'&&p.id==='sinus'&&state.mode!=='stock'&&state.mode!=='split'?'<p class="product-stock orange">Под заказ</p>':''}</div><span class="quantity-small">×${p.qty}</span></article>`;}
function orderGroups(){const active=entries(),stock=active.filter(p=>p.id!=='sinus'),preorder=active.filter(p=>p.id==='sinus');if(state.mode==='split')return[{title:`Заказ 1 · <span class="green">В наличии · ${count(stock)}</span>`,items:stock},{title:`Заказ 2 · <span class="orange">Под заказ · ${count(preorder)}</span>`,items:preorder}].filter(g=>g.items.length);if(state.mode==='stock')return[{title:`Товары · ${count(stock)}`,items:stock}];return[{title:`Товары · ${count(active)}`,items:active}];}
function chosenProducts(){return state.mode==='stock'?entries().filter(p=>p.id!=='sinus'):entries();}
function checkout(){const p=pharmacies[0],items=chosenProducts(),rx=items.some(p=>p.rx),hasPreorder=entries().some(p=>p.id==='sinus');if(!hasPreorder&&!state.mode)state.mode='together';const modes=[['stock','Только товары в наличии','Товары под заказ останутся в корзине'],['together','Все товары одним заказом','Заказ будет готов к получению после поступления всех товаров в аптеку'],['split','Двумя заказами','Товары в наличии и под заказ будут оформлены отдельными заказами']];const discount=state.promo?200:0;
app.innerHTML=header('Оформление','back-map')+`<div class="scroll checkout-scroll" id="main-scroll"><section class="block"><div class="block-header"><h2>Выбранная аптека</h2><button class="link" data-action="change-pharmacy">Изменить</button></div><p class="checkout-address">${p.address}</p><p class="checkout-meta">${p.hours}${p.distance?' · '+p.distance:''}</p><p class="availability ${hasPreorder?'orange':'green'}">${hasPreorder?'1 товар под заказ':'Все в наличии'}</p></section><section class="block"><h2 style="margin-bottom:12px">Телефон получателя</h2><p class="phone-number">+7 953 346-51-84</p><p class="muted">Проверьте номер: на него придёт уведомление о готовности заказа</p></section>${hasPreorder?`<section class="block"><h2 style="margin-bottom:12px">Способ оформления</h2><div class="options" role="radiogroup" aria-label="Способ оформления">${modes.map(([id,title,description])=>`<button class="option ${state.mode===id?'selected':''}" role="radio" aria-checked="${state.mode===id}" data-action="mode" data-id="${id}">${radio(state.mode===id)}<div><p class="option-title">${title}</p>${state.mode===id&&description?`<p class="option-description">${description}</p>`:''}</div></button>`).join('')}</div></section>`:''}${orderGroups().map(g=>`<section class="block"><h2 class="order-group-title">${g.title}</h2>${g.items.map(checkoutProduct).join('')}</section>`).join('')}<section class="block compact">${state.promo?`<h2 style="margin-bottom:12px">Промокод применён</h2><div class="promo-actions"><span>APRIL200</span><div><button class="link" data-action="promo">Изменить</button><button class="link" data-action="remove-promo">Удалить</button></div></div>`:`<button class="block-header" style="width:100%;margin:0;padding:0" data-action="promo"><h2>Есть промокод?</h2>${image('chevron-right')}</button>`}</section><section class="block"><h2>Способ оплаты</h2>${[['pickup','При получении в аптеке'],['online','Картой онлайн'],['sbp','Через СБП']].map(([id,label])=>`<button class="payment-row ${state.payment===id?'selected':''} ${rx&&id!=='pickup'?'disabled':''}" style="width:100%;text-align:left;padding:0" role="radio" aria-checked="${state.payment===id}" data-action="payment" data-id="${id}" ${rx&&id!=='pickup'?'disabled':''}>${radio(state.payment===id,rx&&id!=='pickup')}<span>${label}</span></button>`).join('')}${rx?'<p class="muted">Онлайн-оплата и СБП недоступны: в заказе есть рецептурный препарат</p>':''}</section><section class="block"><h2 style="margin-bottom:12px">Сумма заказа</h2><div class="total-row"><span>${count(items)} ${noun(count(items))}</span><span>${money(sum(items,'regular'))}</span></div><div class="total-row"><span>Выгода с клубной картой</span><span class="pink">−${money(sum(items,'regular')-sum(items))}</span></div>${state.promo?'<div class="total-row"><span>Скидка по промокоду</span><span>−200 ₽</span></div>':''}${state.mode==='split'?`<div class="total-row"><span>Заказ 1</span><span>${money(sum(items.filter(p=>p.id!=='sinus'))-discount)}</span></div><div class="total-row"><span>Заказ 2</span><span>${money(sum(items.filter(p=>p.id==='sinus')))}</span></div>`:''}<div class="total-row big"><span>Итого</span><strong>${money(sum(items)-discount)}</strong></div>${button(state.mode?(state.mode==='split'?'Оформить 2 заказа':'Оформить заказ'):'Выберите способ оформления','submit','',!state.mode?'disabled':'')}</section></div>`;
}
function orderCard(order,index){return `<section class="block"><h2 style="margin-bottom:8px">Заказ №${242246406+index*2}</h2><p class="secondary order-status">${order.preorder?(state.orders.length===1?'Получение после поступления товаров':'Товары под заказ'):'Товары в наличии'}</p>${order.items.map(checkoutProduct).join('')}${order.discount?`<div class="total-row"><span>Скидка по промокоду</span><span>−${money(order.discount)}</span></div>`:''}<div class="total-row" style="margin:16px 0"><span>К оплате</span><strong style="font-size:20px;line-height:28px">${money(sum(order.items)-(order.discount||0))}</strong></div>${button(order.cancelled?'Заказ отменён':'Отменить заказ','cancel-order','secondary-button',`data-id="${index}" ${order.cancelled?'disabled':''}`)}</section>`;}
function complete(){if(!state.orders){navigate('checkout',true);return;}const orders=state.orders;app.innerHTML=`<div class="scroll confirmation-scroll" id="main-scroll"><section class="block"><div class="success-heading"><span class="confirmation-icon">${image('success')}</span><h1>${orders.length===2?'Оформлены 2 заказа':'Заказ оформлен'}</h1></div><p class="blue" style="font-weight:500;margin-bottom:8px">${orders.length===2?'Заказы находятся в обработке':'Заказ находится в обработке'}</p><p class="secondary">${orders.length===2?'Уведомления о готовности каждого заказа поступят':'Уведомление о готовности заказа поступит'} на +7 953 346-51-84</p></section><section class="block"><h2 style="margin-bottom:12px">Выбранная аптека</h2><p class="checkout-address">${pharmacies[0].address}</p><p class="checkout-meta">${pharmacies[0].hours} · ${pharmacies[0].distance}</p><p class="secondary" style="margin-top:12px">${state.payment==='pickup'?'Оплата при получении в аптеке':state.payment==='online'?'Оплата картой онлайн':'Оплата через СБП'}</p></section>${orders.map(orderCard).join('')}<section class="block marketing"><img src="images/banner_order_bonus.png" alt="Бонус за заказ">${button('Забрать','bonus','secondary-button')}</section><img class="ad-banner" style="width:100%;margin:0 0 16px" src="images/banner_after_order.png" alt="Рекламное предложение"><section class="block complete-summary">${orders.length===2?`<div class="total-row big"><span>Итого</span><strong>${money(orders.reduce((s,o)=>s+sum(o.items)-(o.discount||0),0))}</strong></div>`:''}${button('К моим заказам','orders')}</section></div>${nav()}`;}
function ordersPage(){app.innerHTML=header('Мои заказы','complete')+`<div class="scroll confirmation-scroll">${(state.orders||[]).map(orderCard).join('')}</div>${nav()}`;}
function render(preserve=false){destroyLiveMap();const scroll=preserve?document.getElementById('main-scroll')?.scrollTop||0:0;document.getElementById('phone').classList.remove('map-active');if(ui.route==='pharmacies')map();else if(ui.route==='checkout')checkout();else if(ui.route==='complete')complete();else if(ui.route==='orders')ordersPage();else cart();if(preserve){const el=document.getElementById('main-scroll');if(el)el.scrollTop=scroll;}save();}
function navigate(route,replace=false){ui.route=route;if(replace)history.replaceState(null,'','#'+route);else if(location.hash!=='#'+route)history.pushState(null,'','#'+route);document.getElementById('overlay-root').innerHTML='';render();}
function promoDialog(value=state.promo?'APRIL200':'',error=false){const root=document.getElementById('overlay-root');root.innerHTML=`<div class="dialog-backdrop" data-action="close-dialog"><form class="dialog" id="promo-form"><div class="handle"><span></span></div><div class="dialog-header"><h2>Промокод</h2><button type="button" class="icon-button" data-action="close-dialog" aria-label="Закрыть">${image('close')}</button></div><input name="code" type="text" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Введите промокод" value="${esc(value)}" aria-label="Промокод" ${error?'aria-invalid="true" aria-describedby="promo-error"':''}>${error?'<p class="error" id="promo-error">Промокод не найден. Проверьте код</p>':''}<button class="button" type="submit">Применить</button></form></div>`;root.querySelector('input').focus();}
document.addEventListener('submit',e=>{if(e.target.id!=='promo-form')return;e.preventDefault();const code=new FormData(e.target).get('code').trim().toUpperCase();if(code==='APRIL200'){state.promo=true;document.getElementById('overlay-root').innerHTML='';render(true);}else promoDialog(code,true);});
document.addEventListener('input',e=>{if(e.target.id!=='pharmacy-search')return;ui.query=e.target.value;ui.collapsed=false;ui.expanded=true;const sheet=e.target.closest('.sheet');sheet.classList.add('expanded');sheet.classList.remove('collapsed');document.getElementById('pharmacy-results').innerHTML=listHtml();applySheetHeight();refreshMapMarkers();});
document.addEventListener('focusin',e=>{if(e.target.id==='pharmacy-search'){ui.expanded=true;ui.collapsed=false;e.target.closest('.sheet').classList.add('expanded');e.target.closest('.sheet').classList.remove('collapsed');applySheetHeight();}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action,id=b.dataset.id;if(a==='close-dialog'&&e.target.closest('.dialog')&&b.classList.contains('dialog-backdrop'))return;
if(a==='cart')navigate('cart');else if(a==='start-map'){ui.selected=false;ui.query='';ui.expanded=false;ui.collapsed=false;navigate('pharmacies');}
else if(a==='select-pharmacy'){selectPharmacy(id||'sun');}
else if(a==='back-list'){ui.selected=false;render();}else if(a==='back-map'||a==='change-pharmacy'){ui.selected=true;ui.selectedId='sun';focusSelectedMarker=true;navigate('pharmacies');}
else if(a==='choose-pharmacy'){if(ui.selectedId!=='sun')return;state.chosen=true;navigate('checkout');}
else if(a==='expand-sheet'){ui.expanded=true;ui.collapsed=false;render();}else if(a==='toggle-sheet'){if(ui.selected){ui.selected=false;ui.expanded=true;ui.collapsed=false;}else if(ui.collapsed){ui.collapsed=false;ui.expanded=false;}else if(ui.expanded){ui.expanded=false;ui.collapsed=true;}else{ui.expanded=true;}render();}
else if(a==='expand-row'){ui.openRows.has(id)?ui.openRows.delete(id):ui.openRows.add(id);const results=document.getElementById('pharmacy-results'),top=results.scrollTop;results.innerHTML=listHtml();results.scrollTop=top;ui.collapsed=false;ui.expanded=true;applySheetHeight();}
else if(a==='bookmark'){ui.saved.has(id)?ui.saved.delete(id):ui.saved.add(id);render();}
else if(a==='toggle-favorites'){ui.favorites=!ui.favorites;ui.expanded=true;ui.collapsed=false;render();}else if(a==='all-pharmacies'){ui.favorites=false;render();}
else if(a==='locate'){if(liveMap)liveMap.setView([USER_LOCATION.lat,USER_LOCATION.lng],Math.max(15,liveMap.getZoom()));}
else if(a==='zoom-in'||a==='zoom-out'){if(liveMap){a==='zoom-in'?liveMap.zoomIn():liveMap.zoomOut();}}
else if(a==='mode'){state.mode=id;state.payment='pickup';render(true);}else if(a==='payment'){state.payment=id;render(true);}
else if(a==='increase'||a==='decrease'){if(a==='decrease'&&state.quantities[id]===1){removeProduct(id);return;}state.quantities[id]=Math.max(1,state.quantities[id]+(a==='increase'?1:-1));render(true);}
else if(a==='remove')removeProduct(id);else if(a==='restore'){clearTimeout(ui.removed[id]);delete ui.removed[id];render(true);}
else if(a==='add'){state.quantities[id]=(state.quantities[id]||0)+1;render(true);toast('Товар добавлен в корзину');}
else if(a==='favorite-product'){state.favorites=state.favorites.includes(id)?state.favorites.filter(v=>v!==id):[...state.favorites,id];render(true);}else if(a==='clear'){for(const t of Object.values(ui.removed))clearTimeout(t);ui.removed={};state.quantities={};render();}
else if(a==='reset'){state=initial();ui.removed={};navigate('cart',true);}
else if(a==='promo')promoDialog();else if(a==='remove-promo'){state.promo=false;render(true);}else if(a==='close-dialog')document.getElementById('overlay-root').innerHTML='';
else if(a==='submit'){if(!state.mode)return;const active=entries(),stock=active.filter(p=>p.id!=='sinus'),pre=active.filter(p=>p.id==='sinus');state.orders=state.mode==='split'?[{items:stock,preorder:false,discount:state.promo?200:0},{items:pre,preorder:true,discount:0}].filter(o=>o.items.length):[{items:chosenProducts(),preorder:state.mode==='together'&&pre.length>0,discount:state.promo?200:0}];for(const o of state.orders)for(const p of o.items)delete state.quantities[p.id];save();navigate('complete');}
else if(a==='complete')navigate('complete');else if(a==='orders')navigate('orders');else if(a==='bonus')toast('Бонус получен');else if(a==='cancel-order'){if(confirm('Отменить этот заказ?')){state.orders[Number(id)].cancelled=true;render(true);}}
});
function removeProduct(id){if(ui.removed[id])return;ui.removed[id]=setTimeout(()=>{delete state.quantities[id];delete ui.removed[id];render(true);},3000);render(true);}
window.addEventListener('popstate',()=>{ui.route=location.hash.slice(1)||'cart';if(ui.route==='complete'&&!state.orders)ui.route='cart';render();});
if(['cart','pharmacies','checkout','complete','orders'].includes(location.hash.slice(1)))ui.route=location.hash.slice(1);
if(['checkout','complete','orders'].includes(ui.route)&&!state.chosen)ui.route='cart';
render();

// Mouse dragging follows the same direction as a finger on a touchscreen.
let dragGesture=null;
let suppressDragClickUntil=0;
const dragClamp=(value,min,max)=>Math.max(min,Math.min(max,value));
function endDrag(event,cancelled=false){
 const g=dragGesture;if(!g||event.pointerId!==g.pointerId)return;
 dragGesture=null;document.getElementById('phone').classList.remove('is-dragging');
 if(g.capture?.hasPointerCapture?.(g.pointerId))g.capture.releasePointerCapture(g.pointerId);
 if(!g.moved)return;
 suppressDragClickUntil=Date.now()+400;
 if(g.mode==='sheet'){
  const phoneHeight=document.getElementById('phone').clientHeight;
  const [min,middle,max]=sheetStops();
  const height=g.sheet.getBoundingClientRect().height;
  const snaps=[min,middle,max];
  let target=snaps.reduce((best,n)=>Math.abs(n-height)<Math.abs(best-height)?n:best,snaps[0]);
  const travel=event.clientY-g.startY;
  if(!cancelled&&Math.abs(travel)>48&&Math.abs(height-g.startHeight)<48){
   target=travel<0?Math.min(max,middle>g.startHeight+16?middle:max):Math.max(min,middle<g.startHeight-16?middle:min);
  }
  ui.collapsed=target===min;ui.expanded=target===max;
  if(ui.collapsed&&ui.selected)ui.selected=false;
  render();
  const sheet=document.querySelector('.sheet');
  if(sheet){sheet.style.maxHeight='none';sheet.style.height=target+'px';}
 }
}
document.addEventListener('pointerdown',event=>{
 if(!event.isPrimary||(event.pointerType==='mouse'&&event.button!==0))return;
 if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
 const sheet=event.target.closest('.sheet');
 const handle=event.target.closest('.handle');
 const scroller=event.target.closest('.scroll,.sheet-body');
 const bareSheet=sheet&&event.target===sheet;
 if(event.pointerType!=='mouse'&&!sheet&&!handle&&!bareSheet)return;
 if(!scroller&&!handle&&!bareSheet)return;
 dragGesture={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startScroll:scroller?.scrollTop||0,startHeight:sheet?.getBoundingClientRect().height||0,sheet,scroller,mode:handle||bareSheet?'sheet':null,moved:false,capture:null};
});
document.addEventListener('pointermove',event=>{
 const g=dragGesture;if(!g||event.pointerId!==g.pointerId)return;
 const dy=event.clientY-g.startY,dx=event.clientX-g.startX;
 if(!g.moved){
  if(Math.abs(dy)<6||Math.abs(dy)<Math.abs(dx))return;
  g.moved=true;
  if(!g.mode){
   // At the top of the list, a downward gesture lowers the sheet. An upward
   // gesture first expands a small sheet, then scrolls its contents.
   const sheetCanExpand=g.sheet&&g.startHeight<sheetStops()[2]-4;
   g.mode=g.sheet&&g.startScroll<=0&&(dy>0||sheetCanExpand)?'sheet':'scroll';
  }
  g.capture=g.mode==='sheet'?g.sheet:g.scroller;
  g.capture?.setPointerCapture?.(event.pointerId);
  document.getElementById('phone').classList.add('is-dragging');
 }
 if(event.cancelable)event.preventDefault();
 if(g.mode==='scroll')g.scroller.scrollTop=g.startScroll-dy;
 else if(g.sheet){
  const [min,,max]=sheetStops();
  g.sheet.style.maxHeight='none';
  g.sheet.style.height=dragClamp(g.startHeight-dy,min,max)+'px';
 }
},{passive:false});
document.addEventListener('pointerup',event=>endDrag(event));
document.addEventListener('pointercancel',event=>endDrag(event,true));
document.addEventListener('click',event=>{
 if(Date.now()<suppressDragClickUntil&&document.getElementById('phone').contains(event.target)){
  event.preventDefault();event.stopImmediatePropagation();
 }
},true);
document.addEventListener('dragstart',event=>{
 if(document.getElementById('phone').contains(event.target)&&!event.target.closest('input,textarea'))event.preventDefault();
});

window.addEventListener('resize',()=>{if(ui.route==='pharmacies'){applySheetHeight();liveMap?.invalidateSize();}});
