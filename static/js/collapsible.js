function openCollapsible(collapsibleID){
  var collElem = document.getElementById(collapsibleID)
  if (collElem.classList.contains("active")) {
    console.log(collElem + " classList already contains class: 'active'")
  } else {
    var allHeights = 0;
    var contents = document.getElementsByClassName("collapsible-content");
    var j;

    for (j = 0; j < contents.length; j++) {
      var h = document.getElementsByClassName("collapsible-content")[j].scrollHeight;
      allHeights += h;
    }

    collElem.classList.add('active')
    var content = collElem.nextElementSibling;
    content.style.maxHeight = allHeights + "px";
  }
}

function initCollapsibles(){
  var allHeights = 0;
  var contents = document.getElementsByClassName("collapsible-content");
  var j;

  for (j = 0; j < contents.length; j++) {
    var h = document.getElementsByClassName("collapsible-content")[j].scrollHeight;
    allHeights += h;
  }

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      var content = this.nextElementSibling;

      if (this.classList.contains("active")){
        this.classList.remove("active")
        content.style.maxHeight = "0px";
      } else {
        this.classList.add("active")
        content.style.maxHeight = allHeights + "px";
      }
    });
  }
}

initCollapsibles()
