// After editing, run node build.mjs. GitHub Actions also builds automatically.
window.STUDIO = {
 siteUrl:'https://14ellisj.github.io/MiniatureStudio/',
 appleUrl:'', appleReleased:false, appleLaunchDate:'2026-10-23', price:'£2.99',
 androidUrl:'', androidReleased:false, androidTiming:'Later in 2026',
 instagramUrl:'', tiktokUrl:'',
 launchReminder:{enabled:true},
 // Raw screenshots receive device borders automatically.
 // Add your iPad screen recording here; poster and captions are optional.
 tablet:{type:'video',src:'',poster:'',captions:'',alt:'Painting a miniature on iPad',label:'A painting session on iPad',device:'ipad'},
 phone:{src:'',alt:'Painting workspace on iPhone',label:'Your iPhone workspace',device:'iphone'},
 video:{src:'',poster:'',captions:'',transcript:'',title:'From first coat to finishing touch'},
 gallery:[
  {src:'',title:'The finished piece',alt:'Finished miniature',device:'ipad',note:'The one you’re proud of.',stage:'01 / THE RESULT'},
  {src:'',title:'Get lost in the details',alt:'Close-up painted highlights',device:'iphone',note:'Yes, even that tiny edge.',stage:'02 / UP CLOSE'},
  {src:'',title:'A palette of possibilities',alt:'Paint library',device:'iphone',note:'Citadel, The Army Painter and Vallejo, side by side.',stage:'03 / THE COLOURS'},
  {src:'',title:'A colour of your own',alt:'Colour mixer with paints from different brands and their ratios',device:'ipad',note:'Up to four paints. One new shade.',stage:'04 / THE MIX'},
  {src:'',title:'Let the texture do the talking',alt:'Drybrushed raised surfaces',device:'ipad',note:'A lighter touch. A different finish.',stage:'05 / THE TECHNIQUE'},
  {src:'',title:'Start with your own sculpt',alt:'STL preparation',device:'ipad',note:'Your next project starts here.',stage:'06 / THE START'}
 ]
};
