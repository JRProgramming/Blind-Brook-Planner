window.onload = function() {
    for(var i=0;i<document.getElementsByClassName("homework").length; i++) {
        document.getElementsByClassName("homework")[i].innerHTML = localStorage.getItem(i)
        checkBoxes(i)
    }
}
function identifyTextField(text) {
    document.getElementsByClassName("textField")[text].addEventListener("keyup", function(event) {
         if (event.keyCode === 13) {
             createCheckBox(text)
         }
    })
}
var id = 0
function createCheckBox(text) {
    if(document.getElementsByClassName("textField")[text].value != "") {
        var checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("class", "cb" + text)
        checkbox.setAttribute("id", "cb" + id)
        checkbox.setAttribute("onclick", "checkBoxes(" + text + "," + id  + ")")
        var label = document.createElement("label")
        var size = document.getElementsByClassName("textField")[text].value.length
        label.innerHTML = "<input type=\"text\" class=\"homeworkLabel\" size=" + size + " value='" + document.getElementsByClassName("textField")[text].value + "'><br>"
        document.getElementsByClassName("homework")[text].appendChild(checkbox)
        document.getElementsByClassName("homework")[text].appendChild(label)
        document.getElementsByClassName("textField")[text].value = "";
        id += 1
    }
    checkBoxes(text)
    localStorage.setItem(text, document.getElementsByClassName("homework")[text].innerHTML)
}
function checkBoxes(box, id) {
    var allBoxesChecked = true
    var checkBoxes = document.getElementsByClassName("cb" + box)
    if(checkBoxes.length != 0) {
        for(i=0;i<checkBoxes.length; i++) {
            if(!checkBoxes[i].checked) {
                allBoxesChecked = false
            }
        }
    } else {
        allBoxesChecked = false
    }
    if(allBoxesChecked) {
        if(!document.getElementById("b" + box)) {
            var button = document.createElement("button")
            button.innerHTML = "Remove"
            button.setAttribute("style", "color: grey; background-color: lightgrey; border: solid lightgrey; display: inline; float: right;")
            button.setAttribute("id", "b" + box)
            button.setAttribute("onclick", "removeHomework(" + box + ")")
            document.getElementsByTagName("h3")[box].appendChild(button)
        }
    } else if(document.getElementById("b" + box)) {
        document.getElementsByTagName("h3")[box].removeChild(document.getElementById("b" + box))
    }
    saveCheckBox(box, id)
}
function saveCheckBox(box, id) {
    if(id != null) {
       if(document.getElementById("cb" + id).checked) {
           document.getElementById("cb" + id).setAttribute("checked", true)
       } else {
           document.getElementById("cb" + id).removeAttribute("checked")
       }
       localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
    }
}
function removeHomework(box) {
    var homework = document.getElementsByClassName("homework")[box]
    while(homework.hasChildNodes()) {
        homework.removeChild(homework.firstChild)
    }
    document.getElementsByTagName("h3")[box].removeChild(document.getElementById("b" + box))
    localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
}
