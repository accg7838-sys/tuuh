'use strict';
const speakers=window.SPEAKERS, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const title=s=>esc(s).replace(/\n/g,'<br>');
const image=(id,cls='backdrop',depth='')=>`<img class="${cls}" src="assets/${id}.jpg" alt="${esc(({panorama:'Жүгдэрийн Хүрээний панорам, 1913',hunter:'Хүрээ орчмын анчин, морь, 1913',hill:'Цагаан толгой дээрх лам нар, 1913',market:'Хүрээний панорамын зах худалдааны хэсэг, 1913',treaty:'Монгол–Төвөдийн гэрээ, 1913',gandan:'Гандангийн суваргын дэргэдэх хүү, 1913',detail:'Богдын Цагаан ордон, 1913',bogd:'Б.Шаравын Богд хааны хөрөг'})[id]||id)}" ${depth?`data-depth="${depth}"`:''} loading="lazy">`;
const concepts=items=>`<div class="concepts">${(items||[]).map(([a,b])=>`<div><b>${esc(a)}</b><p>${esc(b)}</p></div>`).join('')}</div>`;
$('#navigation').innerHTML=speakers.map(s=>`<a href="#speaker-${s.id}" title="${esc(s.name+' · '+s.title)}" aria-label="${esc(s.name+' · '+s.title)}">${String(s.id).padStart(2,'0')}</a>`).join('');
$('#exhibition').innerHTML=`<section id="home" class="scene hero" data-speaker="0"><img class="backdrop" src="assets/panorama.jpg" alt="Хүрээний панорам · Жүгдэр · 1913" fetchpriority="high" data-depth=".11"><div class="shade"></div><div class="hero-copy"><div class="eyebrow">ТҮҮХИЙН ХУУДАСНААС · 01</div><h1>Богд хаант<br><span class="gold">Монгол</span></h1><p>Эдийн засаг, соёл<br><span class="gold">1911 — 1919</span></p></div>${image('bogd','portrait','.045')}<span class="scroll-hint">ДООШ ГҮЙЛГЭЖ ТҮҮХЭЭР АЯЛАХ ↓</span><span class="caption">Жүгдэр · Хүрээний панорам, 1913<br>Б.Шарав · Богд хааны хөрөг, 1924 оноос өмнө</span></section>`+speakers.map(s=>s.scenes.map((d,j)=>{
const heading=`<h2 class="section-title">${title(d.title)}</h2>`, lead=d.lead?`<p class="lede">${esc(d.lead)}</p>`:'', note=d.note?`<p class="small-note">${esc(d.note)}</p>`:'', art=d.image?`<figure class="artwork" data-depth="${s.id===4?'-.035':'.04'}">${image(d.image,'')}<figcaption>${esc(d.caption||'')}</figcaption></figure>`:'';
let body='';
switch(d.layout){
case 'royal':body=`<div class="big-year" data-depth="-.04">${d.year}</div>${heading}${lead}<div class="section-divider"></div><p class="small-note">1911 оны 12 дугаар сарын 29<br>VIII Богд Жавзандамбыг хаанд өргөмжлөв.</p><figure class="royal-portrait" data-depth=".055">${image(d.image,'portrait')}<figcaption><span class="portrait-credit-title">${esc(d.caption.split(' · ').slice(0,2).join(' · '))}</span><span class="portrait-credit-date">${esc(d.caption.split(' · ').slice(2).join(' · '))}</span></figcaption></figure>`;break;
case 'timeline':body=heading+`<div class="timeline">${d.items.map(([a,b])=>`<div><strong>${a}</strong><p>${b}</p></div>`).join('')}</div>`+note;break;
case 'landscape':body=image(d.image,'backdrop','.13')+'<div class="shade"></div>'+heading+lead+concepts(d.items)+`<p class="caption">${esc(d.caption)}</p>`;break;
case 'split':case 'archive':case 'gallery':body=`<div class="split"><div>${heading}${lead}${concepts(d.items)}${note}</div>${art}</div>`;break;
case 'quiet':body=heading+`<div class="quiet-words">${d.items.map(([a,b])=>`<div><b>${a}</b><p>${b}</p></div>`).join('')}</div>`;break;
case 'flow':body=(d.image?image(d.image,'backdrop',s.id===3?'-.09':'.1')+'<div class="shade"></div>':'')+heading+`<div class="flow">${d.flow.map((x,i)=>(i?'<i aria-hidden="true">→</i>':'')+`<span>${esc(x)}</span>`).join('')}</div>`+lead+note;break;
case 'newspaper':body=`<span class="print-date">1913</span><h2 class="newspaper">${title(d.title)}</h2>${lead}<div class="print-columns">${d.items.map(([a,b])=>`<div><h3>${a}</h3><p>${b}</p></div>`).join('')}</div>${note}`;break;
case 'education':body=`<div class="big-year" data-depth="-.06">1912</div>${heading}${lead}${concepts(d.items)}`;break;
case 'wordstage':body=(d.image?image(d.image,'backdrop','.17')+'<div class="shade"></div>':'')+heading+`<div class="display-word" data-depth="-.045">${title(d.word)}</div><div class="keyword-line">${(d.keywords||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div>`+(d.caption?`<p class="image-label">${esc(d.caption)}</p>`:'');break;
case 'ledger':body=heading+`<div class="ledger-word" data-depth="-.09" aria-hidden="true">${esc(d.word)}</div><div class="ledger-rows">${d.items.map(([a,b],i)=>`<div><span class="row-number">0${i+1}</span><h3>${esc(a)}</h3><p>${esc(b)}</p></div>`).join('')}</div>`;break;
case 'comparison':body=heading+`<div class="comparison-columns">${[d.left,d.right].map(([a,b])=>`<div><h3>${esc(a)}</h3><p>${esc(b)}</p></div>`).join('')}</div>`+(d.image?image(d.image,'comparison-art','.12')+`<p class="image-label">${esc(d.caption)}</p>`:'');break;
case 'focus':body=`<div class="focus-grid"><div>${heading}<div class="focus-word">${esc(d.word)}</div></div><figure class="focus-art" data-depth=".12">${image(d.image,'')}<figcaption>${esc(d.caption)}</figcaption></figure></div>`;break;
case 'finale':body=image(d.image,'backdrop','.12')+'<div class="shade"></div><div class="endmark">✧</div>'+`<h2 class="final-quote">${esc(d.title)}</h2>${note}<button class="primary" data-sources>ЭХ СУРВАЛЖИЙГ ҮЗЭХ ↗</button>`;break;
default:body=(d.image?image(d.image,'backdrop','.1')+'<div class="shade"></div>':'')+heading+lead+concepts(d.items)+note;
}
return `<section id="${j?'speaker-'+s.id+'-'+(j+1):'speaker-'+s.id}" class="scene narrated theme-${s.theme} layout-${d.layout} motion-${d.motion}" data-speaker="${s.id}" data-stage="${d.layout}" data-slide="${j+1}">${d.image&&['split','archive','gallery','focus'].includes(d.layout)?image(d.image,'ghost-layer','-.12'):''}<div class="motion-orbit" data-depth="-.08" data-x=".06" aria-hidden="true"></div><div class="ornament" data-depth="-.055" data-x="-.04" aria-hidden="true">✧</div><div class="stage-body">${body}</div><aside class="talk-track"><span>ЯРИХ САНАА</span><p>${esc(d.talk)}</p></aside></section>`;
}).join('')).join('');
let stages=$$('.scene'), current=0, currentSpeaker=0, transitionTimeout, lockUntil=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function updatePagination(){
  const panel=$('#stage-pagination'), s=speakers[currentSpeaker-1];
  panel.hidden=!s;
  if(!s)return;
  if(panel.dataset.speaker!==String(s.id)){
    panel.dataset.speaker=s.id;
    panel.innerHTML=s.scenes.map((_,k)=>`<button data-jump="speaker-${s.id}${k?'-'+(k+1):''}" aria-label="${esc(s.name)} · Слайд ${k+1}"></button>`).join('');
  }
  panel.querySelectorAll('button').forEach((button,k)=>{if(k+1===Number(stages[current].dataset.slide))button.setAttribute('aria-current','step');else button.removeAttribute('aria-current')});
}
function updateCurrent(index){current=index;const s=Number(stages[index].dataset.speaker);currentSpeaker=s;updatePagination();$$('#navigation a').forEach((a,i)=>{a.classList.toggle('active',i+1===s);a.setAttribute('aria-current',i+1===s?'true':'false')});if(s)history.replaceState(null,'','#'+stages[index].id);else history.replaceState(null,'','#home');}
function showTransition(s){if(!s||reduced.matches)return;clearTimeout(transitionTimeout);const panel=$('#transition');panel.querySelector('span').textContent='';panel.querySelector('h2').textContent=s.title;panel.classList.remove('visible');void panel.offsetWidth;panel.classList.add('visible');transitionTimeout=setTimeout(()=>panel.classList.remove('visible'),1100);}
function go(index,transition=true,instant=false){index=Math.max(0,Math.min(stages.length-1,index));const s=Number(stages[index].dataset.speaker);if(transition&&s!==currentSpeaker&&s)showTransition(speakers[s-1]);lockUntil=performance.now()+900;updateCurrent(index);stages[index].scrollIntoView({behavior:reduced.matches||instant?'instant':'smooth',block:'start'});}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const i=stages.findIndex(s=>'#'+s.id===a.hash);if(i>=0){e.preventDefault();go(i)}}));
let slideSwitching=false;
async function slideSideways(index,source){
  const destination=stages[index];
  if(!destination||destination===source||slideSwitching)return;
  if(reduced.matches){go(index,false,true);return;}
  const forward=index>stages.indexOf(source);
  slideSwitching=true;
  document.documentElement.dataset.slideDirection=forward?'forward':'backward';
  try{
    if(document.startViewTransition){
      source.style.viewTransitionName='slide-stage';
      const transition=document.startViewTransition(()=>{
        source.style.viewTransitionName='';
        destination.style.viewTransitionName='slide-stage';
        go(index,false,true);
        frame();
      });
      await transition.finished;
    }else{
      go(index,false,true);
      frame();
      await destination.animate([
        {transform:`translateX(${forward?'':'-'}100vw)`},
        {transform:'translateX(0)'}
      ],{duration:850,easing:'cubic-bezier(.22,.75,.2,1)'}).finished;
    }
  }catch{
    go(index,false,true);
  }finally{
    source.style.viewTransitionName='';
    destination.style.viewTransitionName='';
    delete document.documentElement.dataset.slideDirection;
    slideSwitching=false;
  }
}
$('#stage-pagination').onclick=e=>{const button=e.target.closest('[data-jump]');if(button)slideSideways(stages.findIndex(s=>s.id===button.dataset.jump),stages[current])};
let ticking=false;
function frame(){ticking=false;let best=0,dist=Infinity;const top=0;stages.forEach((el,i)=>{const r=el.getBoundingClientRect(),d=Math.abs(r.top-top);if(d<dist){dist=d;best=i}if(!reduced.matches&&r.bottom>0&&r.top<innerHeight){const p=Math.max(-1,Math.min(1,(innerHeight*.5-r.top-r.height*.5)/innerHeight)), mobile=innerWidth<=600, amount=mobile?.28:1;el.style.setProperty('--travel',p.toFixed(3));el.querySelectorAll('[data-depth]').forEach(x=>{const depth=Number(x.dataset.depth),dx=Number(x.dataset.x||0),back=x.classList.contains('backdrop'), archive=x.closest('.motion-archive'),gallery=x.closest('.motion-gallery');let scale=back?1.04+Math.abs(p)*.055:archive&&x.classList.contains('artwork')?1.015+Math.abs(p)*.05:1;const rotation=archive&&x.classList.contains('artwork')?3+p*2:gallery&&x.classList.contains('artwork')?p*1.5:0;x.style.transform=`translate3d(${p*innerWidth*dx*amount}px,${p*innerHeight*depth*amount}px,0) rotate(${rotation}deg) scale(${scale})`})}});if(performance.now()>lockUntil&&best!==current)updateCurrent(best)}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(frame);ticking=true}},{passive:true});reduced.addEventListener('change',()=>{$$('[data-depth]').forEach(x=>x.style.transform='');frame()});
addEventListener('resize',()=>requestAnimationFrame(frame));
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else return}catch{}}
let notes=null,credits=null;
const ready=Promise.all([fetch('notes.json').then(r=>r.json()).then(x=>notes=x),fetch('assets-manifest.json').then(r=>r.json()).then(x=>credits=x)]).catch(()=>{$('#drawer-content').textContent='Өгөгдөл уншиж чадсангүй. README дахь локал серверээр ажиллуулна уу.'});
function openDrawer(label,html){$('#drawer-label').textContent=label;$('#drawer-content').innerHTML=html;if(!$('#drawer').open)$('#drawer').showModal();$('#drawer').scrollTop=0;}
async function showNotes(){await ready;const s=speakers[(currentSpeaker||1)-1];openDrawer(`${s.name} · ${s.range} · ${s.minutes} минут`,`<h2>${esc(s.title)}</h2>${(notes?.[s.id-1]||'').split(/\n\n+/).map(p=>`<p>${esc(p)}</p>`).join('')}<h3>Эх сурвалж</h3><p>Хэрэглэгчийн өгсөн бүрэн эх. Доорх бүртгэлээс судалгааны холбоосуудыг үзнэ үү.</p><button class="primary" data-sources>Эх сурвалж ↗</button>`)}
async function showSources(){await ready;openDrawer('Эх сурвалж · Зургийн бүртгэл',`<h2>Түүхийн мөрөөр</h2><p>Агуулга нь өгсөн 40 минутын эхэд тулгуурласан. Номын бүрэн эхийг шалгасан мэт эшлээгүй. Зургийн бүртгэлд Commons-ийн лицензийн мэдээллийг хадгалсан.</p><h3>Судалгаа, унших материал</h3>${[
['Монгол улсын түүх, V боть (2003); О.Батсайхан (2007); XX зууны монгол (1995); Л.Жамсран','Номын бүрэн эхийг энэ бэлтгэлд шалгаагүй.'],
['Монголын төр ба мал сүрэг — З.Лонжид','https://journal.num.edu.mn/HistMon/article/download/5522/4826/10764'],['Богдын засгийн газрын санхүү, зээлийн судалгаа','https://journal.num.edu.mn/HistMon/article/download/5520/4828/10766'],['Монгол–Оросын 1912 оны гэрээ','https://mongoltoli.mn/history/h/708'],['Тусгаар тогтнолоо сэргээсний 110 жилийн ойн хуралдаан','https://www.parliament.mn/nn/15748/'],['1912 оны анхны бага сургууль','https://bulgan.khural.mn/n/216229'],['1912 оны сургууль байгуулах саналын судалгаа','https://naog.org/files/original/d8227b3fe33f9018d72ad6008cac130119ed698e.pdf'],['Н.Балжинням — Шинэ толь дахь гадаад улсын нэр','https://journal.num.edu.mn/actamongolica/article/view/6509'],['Монголбанк — 1 Төгрөг','https://www.mongolbank.mn/mn/r/9702']].map(([a,b])=>`<div class="credit">${esc(a)}<br>${b.startsWith('https:')?`<a href="${b}" target="_blank" rel="noopener">Эх материалыг нээх ↗</a>`:esc(b)}</div>`).join('')}<h3>Зургийн бүртгэл</h3>${(credits||[]).map(c=>`<div class="credit"><a href="${esc(c.source)}" target="_blank" rel="noopener">${esc(c.title)}</a><br>${esc(c.author||'Зохиогч тодорхойгүй')} · ${esc(c.date)}<br>${esc(c.license)}<br>${esc(c.description)}</div>`).join('')}<p><a href="assets-manifest.json" target="_blank">Зургийн бүртгэлийн JSON</a> · <a href="source-material.md" download>Өгсөн бүрэн эхийг татах</a></p>`)}
$('#close-drawer').onclick=()=>$('#drawer').close();document.addEventListener('click',e=>{if(e.target.closest('[data-sources]'))showSources()});$('#drawer').addEventListener('click',e=>{if(e.target===$('#drawer')){const r=$('#drawer').getBoundingClientRect();if(e.clientX<r.left)$('#drawer').close()}});
addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;if($('#drawer').open){if(e.key.toLowerCase()==='n'){e.preventDefault();$('#drawer').close()}return}if(['ArrowRight','PageDown','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(current+(['ArrowRight','PageDown'].includes(e.key)?1:-1))}else if(/^[1-9]$/.test(e.key)){e.preventDefault();go(stages.findIndex(s=>s.id==='speaker-'+e.key))}else if(e.key.toLowerCase()==='f'){e.preventDefault();fullscreen()}else if(e.key.toLowerCase()==='n'){e.preventDefault();showNotes()}});
addEventListener('hashchange',()=>{const i=stages.findIndex(x=>'#'+x.id===location.hash);if(i>=0)go(i,false)});
const initial=stages.findIndex(x=>'#'+x.id===location.hash);
if(initial>=0){
  go(initial,false,true);
  let initialPending=true;
  ['pointerdown','wheel','touchstart','keydown'].forEach(event=>addEventListener(event,()=>{initialPending=false},{once:true,passive:true}));
  const loaded=new Promise(resolve=>document.readyState==='complete'?resolve():addEventListener('load',resolve,{once:true}));
  Promise.all([document.fonts.ready,loaded]).then(()=>requestAnimationFrame(()=>{if(initialPending)go(initial,false,true)}));
}else updateCurrent(0);
const textSelectors='.eyebrow,h1,h2,.lede,.small-note,.concepts>div,.timeline>div,.quiet-words>div,.flow>span,.display-word,.keyword-line,.ledger-rows>div,.comparison-columns>div,.focus-word,.print-columns>div,.talk-track,.hero-copy>p,.scroll-hint,figcaption,.caption,.image-label';
stages.forEach(stage=>{
  const targets=[...stage.querySelectorAll(textSelectors)];
  targets.filter(el=>!targets.some(parent=>parent!==el&&parent.contains(el))).forEach((el,i)=>{
    el.classList.add('text-reveal');
    el.style.setProperty('--text-delay',Math.min(i*95,475)+'ms');
  });
});
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>e.target.classList.toggle('is-revealed',e.isIntersecting));
},{threshold:.15});
stages.forEach(s=>revealObserver.observe(s));
