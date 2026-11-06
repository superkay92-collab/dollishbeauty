(function(){
  const defaults = window.DOLLISH_CMS_DEFAULTS || {};
  let data = defaults;
  try { data = Object.assign({}, defaults, JSON.parse(localStorage.getItem('dollishCmsData') || '{}')); } catch(e) {}
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  function setText(el, value) { if (el && value != null) el.textContent = value; }
  function setImage(img, src, alt) { if (img && src) { img.src = src; if (alt) img.alt = alt; } }
  const hero = $('.hero h1'); if (hero && data.heroTitle) { const words=data.heroTitle.split(' '); const cut=Math.max(1,Math.ceil(words.length*0.62)); hero.innerHTML=''; hero.append(document.createTextNode(words.slice(0,cut).join(' ')+' ')); const em=document.createElement('em'); em.textContent=words.slice(cut).join(' '); hero.append(em); }
  setText($('.hero .eyebrow'), data.heroEyebrow);
  const heroDesc=$('.hero-description'); if(heroDesc && data.heroDescription) heroDesc.textContent=data.heroDescription;
  setText($('.hero-note span:last-child'), 'Professional beauty services in '+(data.serviceArea||'Accra, Ghana'));
  setImage($('.hero-visual img'),data.heroImage,'Dollish Beauty makeup and hair portfolio');
  const intro=$('.intro h2'); if(intro && data.introTitle){intro.textContent=data.introTitle;}
  setText($('.intro-copy'),data.introDescription);
  const shopTitle=$('.shop-heading h2'); if(shopTitle && data.shopTitle) shopTitle.textContent=data.shopTitle;
  const shopPara=$('.shop-heading p'); if(shopPara && data.shopDescription) shopPara.textContent=data.shopDescription;
  const aboutTitle=$('.about-copy h2'); if(aboutTitle && data.aboutTitle) aboutTitle.textContent=data.aboutTitle;
  const aboutPara=$$('.about-copy p:not(.eyebrow)'); if(aboutPara.length && data.aboutDescription){const chunks=data.aboutDescription.split(/(?<=[.!?])\s+/); aboutPara[0].textContent=chunks.slice(0,Math.ceil(chunks.length/2)).join(' '); if(aboutPara[1]) aboutPara[1].textContent=chunks.slice(Math.ceil(chunks.length/2)).join(' ');}
  $$('.brand-name').forEach(el=>setText(el,data.brand||'Dollish Beauty'));
  $$('.footer-main > p').forEach(el=>{if(data.tagline)el.textContent=data.tagline;});
  const wa=(data.whatsapp||'233535889669').replace(/\D/g,'');
  $$('a[href*="wa.me/"]').forEach(a=>{const old=new URL(a.href); old.pathname='/'+wa; a.href=old.toString();});
  const ig=$('a[href*="instagram.com/"]'); if(ig && data.instagram) ig.href='https://instagram.com/'+data.instagram.replace(/^@/,'');
  const tk=$('a[href*="tiktok.com/@"]'); if(tk && data.tiktok) tk.href='https://tiktok.com/@'+data.tiktok.replace(/^@/,'');
  const serviceGrid=$('.service-grid');
  if(serviceGrid && Array.isArray(data.services)) { serviceGrid.innerHTML=''; data.services.forEach((item,i)=>{const article=document.createElement('article');article.className='service-card'+(i===0?' service-makeup':'');article.innerHTML=`<div class="service-image"><img loading="lazy"></div><div class="service-info"><span class="service-number"></span><h3></h3><span class="service-price"></span><p></p><a href="#book" class="text-link service-link">Enquire about service <span>↗</span></a></div>`;setImage($('img',article),item.image,item.title);setText($('.service-number',article),item.label||String(i+1).padStart(2,'0')+' / SERVICE');setText($('h3',article),item.title);setText($('.service-price',article),item.price||'');setText($('p',article),item.description);const link=$('.service-link',article);link.dataset.service=item.title;link.firstChild.textContent='Enquire about '+item.title.toLowerCase()+' ';serviceGrid.append(article);}); }
  const gallery=$('.portfolio-grid'); if(gallery && Array.isArray(data.gallery)){gallery.innerHTML='';data.gallery.forEach((item,i)=>{const fig=document.createElement('figure');if(i===0)fig.className='portfolio-tall';fig.dataset.category=item.category||['makeup','bridal','hair'][i%3];const img=document.createElement('img');img.loading='lazy';setImage(img,item.image,item.caption||'Dollish Beauty portfolio');const cap=document.createElement('figcaption');cap.textContent=item.caption||'DOLLISH BEAUTY';fig.append(img,cap);gallery.append(fig);});}
  const productGrid=$('.product-grid'); if(productGrid && Array.isArray(data.products)){productGrid.innerHTML='';data.products.forEach(item=>{const card=document.createElement('article');card.className='product-card';card.innerHTML='<div class="product-image"><img loading="lazy"><span class="product-tag"></span></div><div class="product-meta"><div><h3></h3><p></p></div><button class="round-arrow product-enquire" aria-label="Enquire about product">↗</button></div>';setImage($('img',card),item.image,item.title);setText($('.product-tag',card),item.price||'ENQUIRE');setText($('h3',card),item.title);setText($('.product-meta p',card),item.description);const b=$('button',card);b.dataset.product=item.title;b.setAttribute('aria-label','Enquire about '+item.title);productGrid.append(card);});}
  document.addEventListener('click',e=>{const b=e.target.closest('.product-enquire');if(!b)return;const message=`Hello Dollish Beauty! I'd like to enquire about ${b.dataset.product}. Please share the available options, prices and delivery details. Thank you.`;window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`,'_blank','noopener');});
  window.DOLLISH_CMS_ACTIVE = data;
})();
