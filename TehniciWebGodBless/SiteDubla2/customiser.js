var json_settings = localStorage.getItem("customSettings");
var settings = JSON.parse(json_settings);
var previewWindow;
document.getElementById("start").onclick = function() {
 change()
};
this.onload = change();
//Scroll to top
this.addEventListener("keydown", () => {
 if (event.key === "W" || event.key == "w")
  document.documentElement.scrollTop = 0;
});

// Background color input
let colorRandom = document.querySelector("#colorrandom");
let colorInput = document.querySelector('#color');
let hexInput = document.querySelector('#hex');
hexInput.value = settings.background_color;
colorInput.value = settings.background_color;
colorRandom.addEventListener("click", () => {
 colorise(hexInput, colorInput, "background_color");
 event.stopPropagation();
});

colorInput.addEventListener('input', () => {
 let color = colorInput.value;
 hexInput.value = color;
 settings.background_color = color;
 save();
});
hexInput.addEventListener('input', () => {
 let color = hexInput.value;
 colorInput.value = color;
 settings.background_color = color;
 save();
});

// Nav Color Input
let navcolorRandom = document.querySelector("#navcolorrandom");
let navcolorInput = document.querySelector('#navcolor');
let navhexInput = document.querySelector('#navhex');
navhexInput.value = settings.nav_color;
navcolorInput.value = settings.nav_color;
navcolorRandom.addEventListener("click", () => {
 colorise(navhexInput, navcolorInput, "nav_color");
});
navcolorInput.addEventListener('input', () => {
 let color = navcolorInput.value;
 navhexInput.value = color;
 settings.nav_color = color;
 save();
}, true);
navhexInput.addEventListener("keypress", checkletter, false)
navhexInput.addEventListener('input', () => {
 let color = navhexInput.value;
 navcolorInput.value = color;
 settings.nav_color = color;
 save();
}, true);

//Font Color
let fontRandom = document.querySelector("#fontrandom");
let fontcolorInput = document.querySelector('#fontcolor');
let fonthexInput = document.querySelector('#fonthex');
fonthexInput.value = settings.font_color;
fontcolorInput.value = settings.font_color;
fontRandom.addEventListener("click", () => {
 colorise(fonthexInput, fontcolorInput, "font_color");
});
fontcolorInput.addEventListener('input', () => {
 let color = fontcolorInput.value;
 fonthexInput.value = color;
 settings.font_color = color;
 save();
}, true);
fonthexInput.addEventListener('input', () => {
 let color = fonthexInput.value;
 fontcolorInput.value = color;
 settings.font_color = color;
 save();
}, true);

// Time Display
let timeInput = document.getElementById("time");
timeInput.checked = settings.time;
timeInput.addEventListener('click', () => {
 settings.time = timeInput.checked;
 save();
})

// Reset Button
let resetButton = document.querySelector('#reset');
resetButton.onclick = function() {
 localStorage.removeItem("customSettings");
 location.reload();
}

// Preview Buttons
let openPreview = document.querySelector("#openPreview");
let closePreview = document.querySelector("#closePreview");
openPreview.addEventListener("click", () => {
 let font = document.forms[2];
 for (var i = 0; i < font.length; i++)
  if (font[i].checked)
   settings.font_size = font[i].value;
 save();
 previewWindow = window.open("customizer.html", "_blank", "left=400,width=400,height=400");
});
closePreview.addEventListener("click", () => {
 previewWindow.close();
});
window.onscroll = function() {
 scrollBarFunction()
};
this.addEventListener("click", () => {
 if (3 * window.screen.width / 4 < event.clientX) {
  colorise(fonthexInput, fontcolorInput, "font_color");
  colorise(hexInput, colorInput, "background_color");
  colorise(navhexInput, navcolorInput, "nav_color");
 } else {
  let target = event.target;
  if (target.id == "colorrandom")
   colorise(hexInput, colorInput, "background_color");
  if (target.id == "fontrandom")
   colorise(fonthexInput, fontcolorInput, "font_color");
  if (target.id == "navcolorrandom")
   colorise(navhexInput, navcolorInput, "nav_color");
 }

}, true);

function save() {
 var JSONCSS = JSON.stringify(settings);
 localStorage.setItem("customSettings", JSONCSS);
}

function change() {
 if (settings == null) {
  settings = {
   background_color: "#0e0e0e",
   nav_color: "transparent",
   font_size: "16px",
   font_color: "white",
   time: false
  };
 } else {
  let font = document.forms[2];
  for (var i = 0; i < font.length; i++)
   if (font[i].checked)
    settings.font_size = font[i].value;
  save();
  for (var i = 0; i < font.length; i++)
   if (font[i].value == settings.font_size)
    font[i].checked = true;
  let text = document.querySelectorAll("h1, h2, p, a, span, aside, button, div");
  let topnav = document.getElementsByClassName("topnav");
  for (var i = 0; i < topnav.length; i++)
   topnav[i].style.backgroundColor = settings.nav_color;
  text.forEach(function(textItem) {
   if (textItem.parentElement.className != "topnav" && textItem.classList[0] != "dropbtn")
    textItem.style.fontSize = settings.font_size;
   textItem.style.color = settings.font_color;


  });
  if (settings.time) {
   if (document.getElementById("timp") == null) {
    var timp = document.createElement("p");
    timp.id = "timp";
    setInterval(update_time, 10, timp);
    document.getElementById("navbar").appendChild(timp);
   }
  } else {
   let timp = document.getElementById("timp");
   if (timp != null)
    document.getElementById("navbar").removeChild(timp);
  }
  var elemente = document.body.children;
  document.body.style.backgroundColor = settings.background_color;
  for (var i = 0; i < elemente.length; i++) {
   changeBackground(elemente[i]);
  }
 }
 var para = document.getElementById("demo");
 var styles = window.getComputedStyle(para);
 para.textContent = "Current font size is " + styles.getPropertyValue('font-size') + ", font color is " + styles.getPropertyValue("color") + " and background color is ";
 styles = window.getComputedStyle(document.body);
 para.textContent += styles.getPropertyValue("background-color");
}

function update_time(myelement) {
 var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 var d = new Date();
 var moment = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
 var zi = d.getDate() + "-" + month[d.getMonth()] + "-" + d.getFullYear();
 myelement.innerHTML = moment.concat(" ", zi);
}

function checkletter(event) {
 var charCode = event.charCode;
 if (charCode < 65 || charCode > 130) {
  console.log(charCode);
  event.preventDefault();
 }
}

function colorise(hexInput, colorInput, background_color) {
 count = 0
 var x = setInterval(function() {
  let color = '#' + Math.random().toString(16).substr(-6); // Luam reprezentarea in hexa a unui numar random si luam ultimele 6 cifre
  hexInput.value = color;
  colorInput.value = color;
  settings[background_color] = color;
  save();
  if (count > 8)
   clearInterval(x);
  count++;
 }, 100);

}

function changeBackground(element) {
 element.style.backgroundColor = settings.background_color;
}

function scrollBarFunction() {
 var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
 var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
 var scrolled = (winScroll / height) * 100;
 document.getElementById("scrollBar").style.width = scrolled + "%";
}