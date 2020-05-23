var container = document.getElementById("comms");
var formButton = document.getElementById("send");
window.onload = function () {
    change();
    if (container != null)
    {
        this.formButton.addEventListener("click", createComm);
                     getComms();
                 }
                }

this.addEventListener("keydown", () => {
    if (event.key === "W" || event.key == "w")
        document.documentElement.scrollTop = 0;
});

function change() {
    var json_settings = localStorage.getItem("customSettings");
var settings = JSON.parse(json_settings);
    if(settings!=null)
    {let text = document.querySelectorAll("h1, h2, p, a, span, aside, button, div");
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
    for(var i=0;i<elemente.length;i++)
        {
            changeBackground(elemente[i]);
        }}

}

function update_time(myelement) {
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var moment = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var zi = d.getDate() + "-" + month[d.getMonth()] + "-" + d.getFullYear();
    myelement.innerHTML = moment.concat(" ", zi);
}

function changeBackground(element)
{   var json_settings = localStorage.getItem("customSettings");
var settings = JSON.parse(json_settings);
    element.style.backgroundColor = settings.background_color;
}

window.onscroll = function() {scrollBarFunction()};
//alert(document.getElementById("overlay").parentElement.nodeName);
function scrollBarFunction() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("scrollBar").style.width = scrolled + "%";
}

function render(data)
{
    let html = "<div class='row'><div class='column card'> Name: " + data.getAttribute('NAME') + "<br> Date: " + data.getAttribute('DATE') + "</div><div class='column text'> Opinion: <br> " + data.getAttribute("BODY")+"</div></div>";
    container.innerHTML+=html;
}
function render2(json) {
    let html = "<div class='row'><div class='column card'> Name: " + json['NAME'] + "<br> Date: " +json['DATE'] + "</div><div class='column text'> Opinion: <br> " + json["BODY"] + "</div></div>";
    container.innerHTML += html;
}
function createComm() {
    let temp = {
        NAME: "",
        DATE: "",
        UPVOTES: "",
        DOWNVOTES: "",
        BODY: ""
    };
    let dateOb = new Date();
    // Current day
    let date = ("0" + dateOb.getDate()).slice(-2);

    // current month
    let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

    // current year
    let year = dateOb.getFullYear();

    temp.NAME = document.getElementById("name").value
    temp.DATE = date + '-' + month + '-' + year;
    temp.UPVOTES = 0;
    temp.DOWNVOTES = 0;
    temp.BODY = document.getElementById("content").value;
    render2(temp);

}
function getComms()
{ 
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        xmlDoc = this.responseXML;
    x = xmlDoc.getElementsByTagName("COMMENT");
            for(var i=0;i<x.length;i++)
                {
                    render(x[i]);
            }
        }
}
xhttp.open("GET", "comments.xml", true);
xhttp.send();
}