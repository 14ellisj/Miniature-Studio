// After editing, run node build.mjs. GitHub Actions also builds automatically.
window.STUDIO = {
 siteUrl:'https://miniature-studio.co.uk/',
 appleUrl:'https://apps.apple.com/app/id6821610088', appleReleased:false, appleLaunchDate:'2026-10-23', price:'£2.99',
 // Midnight Friday 23 October in Europe/London (BST): 22 October, 23:00 UTC.
 appleLaunchAt:'2026-10-23T00:00:00+01:00',
 androidUrl:'', androidReleased:false, androidTiming:'Later in 2026',
 instagramUrl:'', tiktokUrl:'',
 launchReminder:{enabled:true},
 // Raw screenshots receive device borders automatically.
 // Add your iPad screen recording here; poster and captions are optional.
 tablet:{type:'video',src:'',poster:'assets/screenshots/ipad-canvas.webp',captions:'',alt:'Blue miniature in the iPad painting workspace',label:'A painting session on iPad',device:'ipad'},
 phone:{src:'assets/screenshots/iphone-controls.webp',alt:'Purple miniature and floating paint controls on iPhone',label:'Your iPhone workspace',device:'iphone'},
 video:{src:'',poster:'',captions:'',transcript:'',title:'From first coat to finishing touch'},
 gallery:[
  {title:'Your canvas. Your colours.',alt:'Painted miniature in the full painting workspace',note:'A different scheme. The same miniature.',stage:'01 / THE CANVAS',variants:[{device:'ipad',src:'assets/screenshots/ipad-canvas.webp'},{device:'iphone',src:'assets/screenshots/iphone-canvas.webp'},{device:'duo',src:'assets/screenshots/duo-canvas.webp'}]},
  {title:'Get lost in the details',alt:'Zoomed-in painted armour and sculpted details',note:'Move closer. Make your next mark.',stage:'02 / UP CLOSE',variants:[{device:'iphone',src:'assets/screenshots/iphone-detail.webp'},{device:'ipad',src:'assets/screenshots/ipad-detail.webp'},{device:'duo',src:'assets/screenshots/duo-detail.webp'}]},
  {title:'A palette of possibilities',alt:'Paint library with the Citadel, The Army Painter and Vallejo brand selector open',note:'Three paint brands. Plenty of possibilities.',stage:'03 / THE COLOURS',variants:[{device:'iphone',src:'assets/screenshots/iphone-library.webp'},{device:'ipad',src:'assets/screenshots/ipad-library.webp'}]},
  {title:'A colour of your own',alt:'Colour mixer showing paint ingredients, ratios and the resulting swatch',note:'Up to four paints. One new shade.',stage:'04 / THE MIX',variants:[{device:'duo',src:'assets/screenshots/duo-mixing.webp'},{device:'ipad',src:'assets/screenshots/ipad-mixing.webp'},{device:'iphone',src:'assets/screenshots/iphone-mixing.webp'}]},
  {title:'Keep your tools close',alt:'Floating paint controls over the miniature painting canvas',note:'Choose your brush. Then get back to painting.',stage:'05 / THE TOOLS',variants:[{device:'duo',src:'assets/screenshots/duo-controls.webp'},{device:'iphone',src:'assets/screenshots/iphone-controls.webp'}]},
  {title:'Start with your own sculpt',alt:'STL preparation screen with the Choose an STL button',note:'Your next project starts here.',stage:'06 / THE START',variants:[{device:'ipad',src:'assets/screenshots/ipad-prepare.webp'},{device:'iphone',src:'assets/screenshots/iphone-prepare.webp'},{device:'duo',src:'assets/screenshots/duo-prepare.webp'}]}
 ]
};
