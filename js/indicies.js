"use strict";
// functions to be run when the style of index.html is changed
const clock = new Canvas('clock');
var scripts = {
  index: () => {
    clearAll();
    clock.c.height = 400;
    clock.c.width = 400;
    let padding = 28, lineWidth = 32;
    const x = clock.width / 2, y = clock.height / 2;
    const radX = clock.width / 2 - padding, radY = clock.width / 2 - padding;
    clock.animate(() => {
      const now = new Date();
      const hr = now.getHours() % 12 + now.getMinutes() / 60 + now.getSeconds() / 360;
      const mn = now.getMinutes() + now.getSeconds() / 60;
      const sc = now.getSeconds() + now.getMilliseconds() / 1000;
      clock.drawEllipse(x, y, radX, radY,
        -1 * Math.PI/2, 0, 2*Math.PI * hr / 12,
        false, "hsl("+ 360 * hr / 12 +", 100%, 50%)", lineWidth + 1);
      clock.drawEllipse(x, y, radX - lineWidth, radY - lineWidth,
        -1 * Math.PI/2, 0, 2*Math.PI * mn / 60,
        false, "hsl("+ 360 * mn / 60 +", 100%, 50%)", lineWidth + 1);
      clock.drawEllipse(x, y, radX - 2 * lineWidth, radY - 2 * lineWidth,
        -1 * Math.PI/2, 0, 2*Math.PI * sc / 60,
        false, "hsl("+ 360 * sc / 60 +", 100%, 50%)", lineWidth + 1);
    });
  },
  rainbow: () => {
    clearAll();
    clock.c.height = 0;
    clock.c.width = 0;
  },
  nothing: () => {
    clearAll();
    // display time in text
    clock.c.height = 20;
    clock.c.width = 50;
    clock.animate(() => {
      const now = new Date();
      clock.drawText(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), 0, clock.c.height);
    });
  },
  pokemon: () => {
    clearAll();
    // have random pokemon run around screen
    const animes = ['pace', 'circle', 'speeder', 'circle3', 'shy', 'spin', 'shy2', 'bottom', "pace2", "pace3", "pace4"]
    const games = ['red-blue', 'red-green', 'yellow'];
    let game = games[Math.floor(games.length * Math.random())];
    let numPoke = 151;
    for (var i = 0; i < pages.length; i++) {
      let page = document.getElementById(pages[i]);
      let anime = animes[Math.floor(animes.length * Math.random())];
      let animeStyle = "animation: "+anime+" 9s linear infinite;";
      if (animes.length > 0)
        animes.splice([animes.indexOf(anime)], 1);
      else
        animeStyle = randomPokemonPath();
      let pokemon = Math.floor(numPoke * Math.random()) + 1;
      let imgStyle = "background-image: url('pictures/pokemon/pokemon_gen1_sprites/"+game+"/"+pokemon+".png');";
      page.setAttribute("style", animeStyle + imgStyle);
    }
    // make clock into pokemon battle
    clock.c.height = 600, clock.c.width = 600;
    let starters = [1, 3, 6];
    let starter = starters[Math.floor(starters.length * Math.random())];
    // build clock with special function
    function animation() {
      if (clock.playing) {
        const now = new Date();
        const hr = now.getHours() + now.getMinutes() / 60;
        const opp = Math.floor(hr * 151 / 24) + 1;
        var oppImg = new Image();
        oppImg.onload = () => {
          clock.clear();
          clock.drawImage(myImg, 0, 150, 150, 150);
          clock.drawImage(oppImg, 200, 0, 150, 150);
        }
        oppImg.src = "pictures/pokemon/pokemon_gen1_sprites/"+game+"/"+opp+".png";
        var myImg = new Image();
        myImg.onload = () => {
          clock.clear();
          clock.drawImage(myImg, 0, 150, 150, 150);
          clock.drawImage(oppImg, 200, 0, 150, 150);
          setTimeout(() => { window.requestAnimationFrame(() => { animation(); }); }, 10000);
        }
        let myPoke = starter + Math.floor(hr * 3 / 24) + 1;
        myImg.src = "pictures/pokemon/pokemon_gen1_sprites/"+game+"/back/"+myPoke +".png";
      }
    }
    clock.playing = true;
    animation();
    // add random music
  },
}

// build a randomize keyframes animation in css and return the 
// resulting animation style to be added to an element
function randomPokemonPath() {
  let animeIndex = Math.floor(Math.random() * 10000);
  let animeName = `random-path-${animeIndex}`;
  const minTop = 5,    maxTop = 95;
  const minRight = 5,  maxRight = 95;
  const minDeg = -360, maxDeg = 360;
  const transforms = 5;
  let keyframes = `@keyframes ${animeName} {\n`
  for (let i = 0; i < transforms; i++) {
    let top = minTop + Math.floor(Math.random() * (maxTop - minTop));
    let right = minRight + Math.floor(Math.random() * (maxRight - minRight));
    let deg = minDeg + Math.floor(Math.random() * (maxDeg - minDeg));
    let per = i * 100 / transforms;
    keyframes += 
      `${per}% { top: ${top}%; right: ${right}%; transform: rotate(${deg}deg)}`
    // to make path a cycle
    if (i == 0)
      keyframes += 
        `100% { top: ${top}%; right: ${right}%; transform: rotate(${deg}deg)}`
  } 
  addStyle(keyframes);
  return "animation: "+ animeName +" 9s linear infinite;";
}

function addStyle(styleText) {
  let styleElem = document.createElement("style");
  styleElem.appendChild(document.createTextNode(styleText));
  document.head.appendChild(styleElem); 
}

function swapStyle() {
  // get random styleSheet that is not the current one
  var currSheet = document.getElementById("style").href.match(/css\/indicies\/(\w+)\.css/)[1];
  var sheets = ["rainbow", "nothing", "index", "pokemon"];
  sheets.splice([sheets.indexOf(currSheet)], 1);
  let newSheet =  sheets[Math.floor(sheets.length * Math.random())];
  document.getElementById("style").setAttribute("href", "css/indicies/" + newSheet + ".css");
  scripts[newSheet]();
  window.location.hash = newSheet;
}

function clearAll() {
  clock.stop();
  clock.clear();
  for (var i = 0; i < pages.length; i++) {
    let page = document.getElementById(pages[i]);
    page.setAttribute("style", "");
  }
}

(function main() {
  let style_sheet = window.location.hash.substr(1);
  if (!(style_sheet in scripts))
    style_sheet = 'index';
  document.getElementById("style").setAttribute("href", "css/indicies/" + style_sheet + ".css");
  scripts[style_sheet]();
})();
