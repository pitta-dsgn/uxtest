const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements={};const listeners={};
function element(){return{innerHTML:'',scrollTop:0,classList:{add(){},remove(){}},focus(){},querySelector(){return{focus(){}}}};}
const mapCalls=[];const tileCalls=[];const markers=[];
const mapLibrary={layerGroup(){return{addTo(){return this},clearLayers(){}}},icon(options){return options},divIcon(options){return options},marker(center,options){const m={center,options,addTo(){return this},on(event,fn){this.click=fn;return this}};markers.push(m);return m},map(id,options){const map={center:[0,0],zoom:0,removed:false,setView(center,zoom){this.center=center;this.zoom=zoom;return this},getCenter(){return{lat:this.center[0],lng:this.center[1]}},getZoom(){return this.zoom},zoomIn(){this.zoom++},zoomOut(){this.zoom--},project(c,z){return{x:c[1]*2**z,y:c[0]*2**z}},unproject(p,z){return[p[1]/2**z,p[0]/2**z]},flyTo(c,z){this.center=c;this.zoom=z;return this},on(){return this},remove(){this.removed=true}};mapCalls.push({id,options,map});return map},tileLayer(url,options){tileCalls.push({url,options});return{once(){return this},on(){return this},addTo(){return this}}}};
const location={hash:''};const context={console,Intl,Set,Map,JSON,Math,Object,Array,String,Number,RegExp,Date,setTimeout,clearTimeout,location,history:{pushState(a,b,h){location.hash=h},replaceState(a,b,h){location.hash=h}},sessionStorage:{getItem(){return null},setItem(){}},document:{activeElement:{blur(){}},getElementById(id){return elements[id]??=element()},addEventListener(n,fn,options){listeners[n+(options===true?':capture':'')]=fn},querySelector(){return{style:{}}}},window:{L:mapLibrary,addEventListener(){}},confirm:()=>true,FormData:class{constructor(f){this.f=f}get(){return this.f.code}}};
vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),context);
const run=s=>vm.runInContext(s,context),click=(action,id)=>listeners.click({target:{closest(){return{dataset:{action,id},disabled:false,classList:{contains(){return false}}}}}});
assert(elements.app.innerHTML.includes('1 402 ₽'));
click('start-map');assert(elements.app.innerHTML.includes('Солнцедарская'));
assert.equal((elements.app.innerHTML.match(/data-action="select-pharmacy"/g)||[]).length,28); // every address opens details; only Sun continues to checkout
assert(elements.app.innerHTML.includes('id="live-map"'));assert(!elements.app.innerHTML.includes('class="pin '));assert.equal(mapCalls[0].options.dragging,true);assert.equal(tileCalls[0].url,'https://tile.openstreetmap.org/{z}/{x}/{y}.png');click('zoom-in');assert.equal(mapCalls[0].map.zoom,14);click('zoom-out');assert.equal(mapCalls[0].map.zoom,13);
run("ui.query='СОЛНЦЕДАРСКАЯ 2Д'");assert.equal(run('filteredPharmacies().length'),1);
run("ui.query='<script>alert(1)</script>'");assert.equal(run('filteredPharmacies().length'),0);
run("ui.query='вымышленная улица'");assert.equal(run('filteredPharmacies().length'),0);
run("ui.query=''");click('select-pharmacy');assert(elements.app.innerHTML.includes('Под заказ'));
assert.equal(run("entries().filter(p=>p.id==='sinus').length"),1);
click('choose-pharmacy');assert.equal(run('state.mode'),null);assert(elements.app.innerHTML.includes('Выберите способ оформления'));
click('mode','split');assert(elements.app.innerHTML.includes('742 ₽'));assert(elements.app.innerHTML.includes('660 ₽'));
click('submit');assert.equal(run('state.orders.length'),2);assert.equal(run('state.orders[0].items.length'),2);assert.equal(run('state.orders[1].items[0].id'),'sinus');assert.equal(run('count(entries())'),0);assert(elements.app.innerHTML.includes('Оформлены 2 заказа'));
click('reset');click('start-map');click('select-pharmacy');click('choose-pharmacy');click('mode','stock');assert.equal(run('sum(chosenProducts())'),742);assert.equal(run('chosenProducts().some(p=>p.rx)'),false);click('submit');assert.equal(run('state.orders.length'),1);assert.equal(run('state.quantities.sinus'),1);
click('reset');click('start-map');click('select-pharmacy');click('choose-pharmacy');click('mode','together');click('promo');listeners.submit({target:{id:'promo-form',code:'APRIL20'},preventDefault(){}});assert(elements['overlay-root'].innerHTML.includes('Промокод не найден'));listeners.submit({target:{id:'promo-form',code:'APRIL200'},preventDefault(){}});assert.equal(run('state.promo'),true);assert(elements.app.innerHTML.includes('1 202 ₽'));click('submit');assert.equal(run('state.orders[0].discount'),200);
click('reset');
for(const id of ['para','sinus','thera']){click('remove',id);click('decrease',id);assert.equal(run(`state.quantities['${id}']`),1);assert(!run(`ui.removed['${id}']`));}
for(const id of ['energy','flu','linaqua']){
 assert(run(`showRecommendation('${id}')`));click('add',id);assert(!run(`showRecommendation('${id}')`));assert.equal(run(`state.quantities['${id}']`),1);
 click('remove',id);assert(!run(`showRecommendation('${id}')`));assert(!run(`entries().some(p=>p.id==='${id}')`));
 click('restore',id);assert(!run(`showRecommendation('${id}')`));assert(run(`entries().some(p=>p.id==='${id}')`));
}
click('clear');assert.equal(run('count(entries())'),3);assert.equal(run('entries().length'),3);assert(run('RECOMMENDED_PRODUCTS.every(showRecommendation)'));assert(run("showRecommendation('linaqua')"));
click('add','energy');click('add','flu');assert(!elements.app.innerHTML.includes('<h2>Добавить к заказу</h2>'));click('remove','energy');assert(!elements.app.innerHTML.includes('data-offer="energy"'));assert(!elements.app.innerHTML.includes('data-offer="flu"'));const deletionTimer=run('ui.removed.energy');deletionTimer._onTimeout();clearTimeout(deletionTimer);assert(elements.app.innerHTML.includes('data-offer="energy"'));assert(!elements.app.innerHTML.includes('data-product="energy"'));click('add','energy');assert(!run('ui.removed.energy'));assert.equal(run('state.quantities.energy'),1);click('clear');
for(const timer of run('Object.values(ui.removed)'))clearTimeout(timer);
const html=fs.readFileSync(__dirname+'/index.html','utf8');const js=fs.readFileSync(__dirname+'/app.js','utf8');for(const name of Object.values(run('ASSETS')))assert(fs.existsSync(__dirname+'/images/'+name),name); assert(!js.includes('data:image/')); assert(!html.includes('data:image/')); assert(!html.includes('assets/'));
console.log('PASS: main split order; one selectable pharmacy; arbitrary search; no results; stock-only; single order; promo error/correction; delete/restore; empty cart; local assets.');
elements.phone.clientHeight=874;elements.phone.contains=()=>true;
const scroll={scrollTop:100,setPointerCapture(){},hasPointerCapture(){return false}};
const target={closest(selector){return selector==='.scroll,.sheet-body'?scroll:null;}};
const pointer=(y,extra={})=>({pointerId:1,isPrimary:true,pointerType:'mouse',button:0,clientX:100,clientY:y,target,cancelable:true,preventDefault(){},...extra});
listeners.pointerdown(pointer(100));listeners.pointermove(pointer(140));assert.equal(scroll.scrollTop,60);listeners.pointerup(pointer(140));
let blocked=false;listeners['click:capture']({target,preventDefault(){blocked=true},stopImmediatePropagation(){}});assert(blocked,'a drag must not activate a product or button');
run("ui.route='pharmacies';ui.selected=false;ui.query=''");
const sheet={style:{},getBoundingClientRect(){return{height:this.style.height?parseFloat(this.style.height):400}},setPointerCapture(){},hasPointerCapture(){return false}};
const handle={closest(selector){return selector==='.sheet'?sheet:selector==='.handle'?handle:null;}};
listeners.pointerdown(pointer(100,{target:handle}));listeners.pointermove(pointer(420,{target:handle}));listeners.pointerup(pointer(420,{target:handle}));assert.equal(run('ui.collapsed'),true);
listeners.pointerdown(pointer(420,{target:handle}));listeners.pointermove(pointer(-100,{target:handle}));listeners.pointerup(pointer(-100,{target:handle}));assert.equal(run('ui.expanded'),true);
listeners.pointerdown(pointer(200,{pointerType:'touch',target:handle}));listeners.pointercancel(pointer(200,{pointerType:'touch',target:handle}));assert.equal(run('dragGesture'),null);
console.log('PASS: held-left-button scrolling; drag click suppression; sheet collapse/expand; cancelled pointer cleanup.');

assert(mapCalls.length>0);assert(mapCalls.slice(0,-1).every(c=>c.map.removed));console.log("PASS: live OSM map initialization; clustered markers; zoom controls; old map instance cleanup.");

click('reset');
assert.equal(run('pharmacies.length'),28);
assert.equal(run("pharmacies.filter(p=>stockInfo(p).color==='green').length"),19);
assert.equal(run("pharmacies.filter(p=>stockInfo(p).color==='orange').length"),8);
assert.equal(run("pharmacies.filter(p=>stockInfo(p).color==='red').length"),1);
assert.equal(run("stockInfo(pharmacies[0]).preorder.join(',')"),'sinus');
assert(run("pharmacies.every(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng))"));
assert.equal(run("clusterPharmacies(pharmacies,()=>({x:0,y:0}),13)[0].length"),28);
assert.equal(run("clusterPharmacies(pharmacies,()=>({x:0,y:0}),18).length"),28);
click('start-map');assert(markers.length>0);assert(markers.some(m=>m.options.icon.className==='pharmacy-cluster'));
assert.equal(run('ui.expanded'),false);assert.equal(run('ui.collapsed'),false);
click('toggle-sheet');assert.equal(run('ui.expanded'),true);
click('toggle-sheet');assert.equal(run('ui.collapsed'),true);
click('toggle-sheet');assert.equal(run('ui.collapsed'),false);assert.equal(run('ui.expanded'),false);
const stops=run('sheetStops()');assert(stops[0]<stops[1]&&stops[1]<stops[2]);
console.log('PASS: 28 real locations; stock distribution: 19 available, 8 preorder, 1 unavailable; clustering preserves counts and separates at maximum zoom; three panel stops.');

click('select-pharmacy');assert.equal(mapCalls.at(-1).map.zoom,16);assert(!elements.app.innerHTML.includes('id="pharmacy-search"'));assert(elements.app.innerHTML.includes('Выбрать аптеку'));assert.equal(run('ui.selectedId'),'sun');
run("pharmacies.find(p=>p.id==='hospital').missing=['sinus'];selectPharmacy('hospital')");assert(elements.app.innerHTML.includes('пер. Больничный'));assert(elements.app.innerHTML.includes('Временно отсутствует'));assert(!elements.app.innerHTML.includes('id="pharmacy-search"'));assert.equal(mapCalls.at(-1).map.zoom,16);click('choose-pharmacy');assert.equal(run('ui.route'),'pharmacies');
run("pharmacies.find(p=>p.id==='hospital').missing=['sinus']");click('back-list');assert(elements.app.innerHTML.includes('id="pharmacy-search"'));
console.log('PASS: selected pharmacy pin focus; correct address/stock panel; hidden search; return to list; Sun-only checkout.');

const screenshotAddresses=JSON.parse(fs.readFileSync(__dirname+'/screenshot-addresses.json','utf8')).addresses;
for(const p of screenshotAddresses){assert.equal(run(`pharmacies.filter(p=>p.id===${JSON.stringify(p.id)}).length`),1);assert.equal(run(`pharmacies.find(p=>p.id===${JSON.stringify(p.id)}).address`),p.address);}
assert.equal(run('new Set(pharmacies.map(p=>p.address)).size'),28);
click('select-pharmacy','north');assert(elements.app.innerHTML.includes('мкр. Северный, 27Б'));assert.equal(run('ui.selectedId'),'north');click('choose-pharmacy');assert.equal(run('ui.route'),'pharmacies');
console.log('PASS: all 18 screenshot addresses represented exactly once; new address details; Sun-only checkout retained.');

click('reset');
assert(!elements.app.innerHTML.includes('<del>'));
click('favorite-product','para');assert(run("state.favorites.includes('para')"));assert(elements.app.innerHTML.includes('images/icon_heart_filled.svg'));
click('favorite-product','para');assert(!run("state.favorites.includes('para')"));
click('start-map');
assert(elements.app.innerHTML.includes('icon_chevron_down.svg'));
click('expand-row','sun');assert.equal(run('ui.route'),'pharmacies');assert(!run('ui.selected'));assert(run("ui.openRows.has('sun')"));assert(elements['pharmacy-results'].innerHTML.includes('icon_chevron_up.svg'));assert(elements['pharmacy-results'].innerHTML.includes('Синусэфрин'));assert(elements['pharmacy-results'].innerHTML.includes('Под заказ'));
click('expand-row','sun');assert(!run("ui.openRows.has('sun')"));assert(elements['pharmacy-results'].innerHTML.includes('icon_chevron_down.svg'));
click('select-pharmacy','sun');assert(!elements.app.innerHTML.includes('disclosure-icon'));assert(elements.app.innerHTML.includes('Под заказ'));
click('choose-pharmacy');click('mode','split');click('submit');
assert(elements.app.innerHTML.includes('images/banner_after_order.png'));assert(elements.app.innerHTML.indexOf('images/banner_after_order.png')<elements.app.innerHTML.indexOf('К моим заказам'));
assert(elements.app.innerHTML.includes('images/icon_order_success.svg'));assert(!elements.app.innerHTML.includes('class="badge"'));assert.equal(run('count(entries())'),0);
for(const timer of run('Object.values(ui.removed)'))clearTimeout(timer);
console.log('PASS: no crossed-out total, persistent favorite state, in-place stock disclosure, selected pharmacy without disclosure, new images and confirmation menu.');

click('reset');click('start-map');
assert.equal(run("pharmacies.filter(p=>p.preorder.length>0).length"),8);
assert.equal(run("pharmacies.filter(p=>p.missing.length>0).length"),1);
assert(run("pharmacies.filter(p=>p.preorder.length>0).every(p=>p.preorder.length===1||p.preorder.length===2)"));
assert(run("pharmacies.every(p=>p.missing.length<=1)"));
assert.equal(run("pharmacies.find(p=>p.id==='sun').preorder.join(',')"),'sinus');
assert(run("pharmacies.every(p=>p.distance&&Number.isFinite(p.distanceMeters))"));
assert.equal(run("Math.round(distanceMeters(USER_LOCATION,USER_LOCATION))"),0);
assert(run("filteredPharmacies().every((p,i,all)=>i===0||p.distanceMeters>=all[i-1].distanceMeters)"));
assert(run("pharmacies[0].distanceMeters>4000&&pharmacies[0].distanceMeters<7000"));
const point=run('USER_LOCATION');
assert(markers.some(m=>m.options.icon.className==='user-location-marker'&&m.center[0]===point.lat&&m.center[1]===point.lng));
for(const m of markers){if(m.options.icon.className==='pharmacy-cluster')assert(run(`pharmacies.some(p=>p.lat===${m.center[0]}&&p.lng===${m.center[1]})`),'cluster center must be an actual pharmacy');}
run("ui.query='';ui.saved=new Set();ui.favorites=true;render()");assert(elements.app.innerHTML.includes('favorite-filter is-active'));assert(elements.app.innerHTML.includes('empty-favorites'));assert(elements.app.innerHTML.includes('Сохраните аптеку с помощью закладки рядом с её адресом'));
click('all-pharmacies');assert(!run('ui.favorites'));
click('bookmark','sun');click('toggle-favorites');assert.equal(run('filteredPharmacies().length'),1);assert.equal(run('filteredPharmacies()[0].id'),'sun');
click('locate');assert.equal(mapCalls.at(-1).map.center[0],point.lat);assert.equal(mapCalls.at(-1).map.center[1],point.lng);
console.log('PASS: clusters anchored on pharmacy coordinates, fixed user-location pin, Haversine distances, nearest-first ordering, 8 preorder/1 unavailable, selected favorite filter and empty-state copy.');

click('reset');click('start-map');click('select-pharmacy','sun');click('choose-pharmacy');
assert(!elements.app.innerHTML.includes('Товары под заказ останутся в корзине'));
click('mode','stock');assert(elements.app.innerHTML.includes('Товары под заказ останутся в корзине'));assert(!elements.app.innerHTML.includes('class="option-description">Заказ будет готов'));
assert(elements.app.innerHTML.includes('Проверьте номер: на него придёт уведомление о готовности заказа'));
click('mode','together');assert(elements.app.innerHTML.includes('Заказ будет готов к получению после поступления всех товаров в аптеку'));assert(!elements.app.innerHTML.includes('Товары под заказ останутся в корзине'));assert(elements.app.innerHTML.includes('product-stock orange'));
click('mode','split');assert(elements.app.innerHTML.includes('Товары в наличии и под заказ будут оформлены отдельными заказами'));assert(!elements.app.innerHTML.includes('product-stock orange'));
for(const id of ['para','sinus','thera','linaqua','energy','flu']){
 const markup=run(`image('${id}')`);
 assert(markup.includes('images/product_'));
 assert(markup.includes('?v='+run(`PRODUCT_IMAGE_REVISIONS['${id}']`)));
 assert(markup.includes('product-photo '+id));
}
console.log('PASS: exact Figma comments for all order modes, stock-only phone caption, preorder label only outside split mode, versioned images folder references for every product.');

assert.equal(run("pharmacies.find(p=>p.id==='pharmacy_8').preorder.length"),0);
assert.equal(run("pharmacies.find(p=>p.id==='pharmacy_8').missing.length"),0);
for(const mode of [null,"stock","together","split"]){run(`state.mode=${JSON.stringify(mode)};checkout()`);assert(elements.app.innerHTML.includes("Проверьте номер: на него придёт уведомление о готовности заказа"));assert(!elements.app.innerHTML.includes("уведомление о заказе"));}
console.log("PASS: Tourist pharmacy all in stock and identical phone caption in every checkout mode.");

assert.equal(run("USER_LOCATION.address"),"г. Геленджик, ул. Кирова, 25");
assert.equal(run("USER_LOCATION.lat"),44.5583876);
assert.equal(run("USER_LOCATION.lng"),38.0793139);
const mapCSS=fs.readFileSync("styles.css","utf8");assert(/\.leaflet-marker-icon\.pharmacy-cluster\s*\{[^}]*position:absolute;[^}]*top:0;[^}]*left:0;/.test(mapCSS));
console.log("PASS: Kirova 25 reference location and cluster CSS keeps Leaflet absolute positioning.");

assert(run("pharmacyRow(pharmacies[0]).startsWith('<article class=\"pharmacy-row\" id=\"pharmacy-row-sun\" data-action=\"select-pharmacy\"')"));
