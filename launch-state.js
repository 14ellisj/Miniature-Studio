(function (root) {
 'use strict';
 const storeURL=value=>{try{const u=new URL(value);return u.protocol==='https:'&&u.hostname==='apps.apple.com'&&/\/id\d+\/?$/.test(u.pathname)?u.href:'';}catch{return '';}};
 function state(config, now=Date.now()) {
  const at=Date.parse(config.appleLaunchAt);
  const released=config.appleReleased===true||(Number.isFinite(at)&&now>=at);
  const url=storeURL(config.appleUrl);
  return {released,url,at};
 }
 function apply(document, config, now) {
  const current=state(config,now);
  if(!current.released)return current;
  const text={announcement:current.url?'Available on the App Store ↗':'App Store link coming shortly',cta:current.url?'Download now ↗':'App Store link coming shortly',heading:current.url?'Your studio is ready.':'Your studio is nearly ready.',status:current.url?'Available now':'App Store link coming shortly',price:'UK price; regional prices vary'};
  document.querySelectorAll('[data-launch-text]').forEach(node=>{node.textContent=text[node.dataset.launchText];});
  document.querySelectorAll('[data-launch-link]').forEach(node=>{
   node.removeAttribute('download');
   if(current.url){node.setAttribute('href',current.url);node.removeAttribute('aria-disabled');node.removeAttribute('tabindex');}
   else{node.removeAttribute('href');node.setAttribute('aria-disabled','true');node.setAttribute('tabindex','-1');}
  });
  document.querySelectorAll('#launch-reminder, [data-launch-calendar]').forEach(node=>{node.hidden=true;});
  const description='Freehand 3D miniature painting for iPhone and iPad. Explore Citadel, The Army Painter and Vallejo paint references, and mix your own colours. '+(current.url?'Available on the App Store.':'App Store link coming shortly.')+' '+(config.androidReleased?'Also on Google Play.':'Google Play planned '+config.androidTiming.toLowerCase()+'.');
  document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(node=>node.setAttribute('content',description));
  return current;
 }
 root.StudioLaunch={state,apply};
 if(typeof document==='undefined')return;
 const config=root.STUDIO||{};
 const refresh=()=>apply(document,config,Date.now());
 const initial=refresh();
 // Short intervals also recover from sleep, background-tab throttling and clock corrections.
 if(!initial.released){
  const timer=setInterval(()=>{if(refresh().released)clearInterval(timer);},1000);
  document.addEventListener('visibilitychange',refresh);
  root.addEventListener('pageshow',refresh);
  root.addEventListener('focus',refresh);
 }
})(typeof window==='undefined'?globalThis:window);
