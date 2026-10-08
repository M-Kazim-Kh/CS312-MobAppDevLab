(function(){
  var views=[].slice.call(document.querySelectorAll('[data-view]'));
  var links=[].slice.call(document.querySelectorAll('#nav a[data-id]'));
  var side=document.getElementById('side'),scrim=document.getElementById('scrim'),menu=document.getElementById('menu');
  var main=document.getElementById('main');
  var titleBase=document.title;

  function closeMenu(){side.classList.remove('open');scrim.hidden=true;menu.setAttribute('aria-expanded','false');}
  function openMenu(){side.classList.add('open');scrim.hidden=false;menu.setAttribute('aria-expanded','true');}
  menu.addEventListener('click',function(){side.classList.contains('open')?closeMenu():openMenu();});
  scrim.addEventListener('click',closeMenu);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});

  function show(){
    var id=decodeURIComponent(location.hash.slice(1))||'home';
    var target=views.filter(function(v){return v.id==='v-'+id})[0];
    if(!target){target=views[0];id='home';}
    views.forEach(function(v){v.hidden=(v!==target);});
    links.forEach(function(a){
      var on=a.dataset.id===id;
      if(on){a.setAttribute('aria-current','page');var d=a.closest('details');if(d)d.open=true;
        a.scrollIntoView({block:'nearest'});}
      else a.removeAttribute('aria-current');
    });
    var h=target.querySelector('h1');
    document.title=(id==='home'?'':h.textContent+' | ')+titleBase;
    window.scrollTo(0,0);
    closeMenu();
  }
  window.addEventListener('hashchange',show);
  show();

  // search
  var q=document.getElementById('q'),none=document.getElementById('none');
  q.addEventListener('input',function(){
    var s=q.value.trim().toLowerCase(),any=false;
    links.forEach(function(a){
      var ok=!s||a.dataset.q.indexOf(s)>-1;
      a.parentNode.hidden=!ok;if(ok)any=true;
    });
    [].forEach.call(document.querySelectorAll('.grp'),function(g){
      var vis=g.querySelectorAll('li:not([hidden])').length;
      g.hidden=!vis;if(s&&vis)g.open=true;
      g.querySelector('.cnt').textContent=vis;
    });
    none.hidden=any;
  });

  // copy
  var toast=document.getElementById('toast'),tt;
  function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},1800);}
  document.addEventListener('click',function(e){
    var b=e.target.closest('.copy');if(!b)return;
    var code=b.closest('.file').querySelector('code').innerText.replace(/\n$/,'');
    function ok(){b.classList.add('done');b.textContent='Copied';say('Code copied');
      setTimeout(function(){b.classList.remove('done');b.textContent='Copy';},1800);}
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(code).then(ok,fallback);}else fallback();
    function fallback(){
      var t=document.createElement('textarea');t.value=code;t.style.position='fixed';t.style.opacity='0';
      document.body.appendChild(t);t.select();
      try{document.execCommand('copy');ok();}catch(_){say('Could not copy, please select the code manually');}
      document.body.removeChild(t);
    }
  });

  // lightbox
  var lb=document.getElementById('lightbox'),lbi=lb.querySelector('img');
  document.addEventListener('click',function(e){
    var im=e.target.closest('.out-body img');
    if(im&&lb.showModal){lbi.src=im.currentSrc||im.src;lb.showModal();}
    else if(e.target===lb)lb.close();
  });
})();
