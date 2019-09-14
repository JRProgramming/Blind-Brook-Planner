window.onload = function() {
    if(localStorage.getItem("class")) {
        document.getElementsByTagName("main")[0].innerHTML = localStorage.getItem("class")
        window.document.title = localStorage.getItem("name") + "'s Planner"
        document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
    } else {
        popUpDiv()
    }
    for(var i=0;i<document.getElementsByClassName("homework").length; i++) {
        document.getElementsByClassName("homework")[i].innerHTML = localStorage.getItem(i)
        checkBoxes(i)
    }
    document.getElementById("x-popup").style.visibility = "hidden"
}
function identifyTextField(text) {
    document.getElementsByClassName("textField")[text].addEventListener("keyup", function(event) {
         if (event.keyCode === 13) {
             createCheckBox(text)
         }
    })
}
function textEnter(event) {
    if(event.keyCode == 13) {
        addClass()
    }
}
function nameEnter(event) {
    if(event.keyCode == 13) {
        registerName()
    }
}
function createCheckBox(text) {
    var id
    if(localStorage.getItem("id")){
        id = localStorage.getItem("id")
    } else {
        id = 0
    }
    if(document.getElementsByClassName("textField")[text].value != "") {
        var checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("class", "cb" + text)
        checkbox.setAttribute("id", "cb" + id)
        checkbox.setAttribute("onclick", "checkBoxes(" + text + "," + id  + ")")
        var label = document.createElement("label")
        label.setAttribute("id", "l" + id)
        var size = document.getElementsByClassName("textField")[text].value.length
        label.innerHTML = "<input type=\"text\" class=\"homeworkLabel\" id='i" + id + "' size=" + size + " value='" + document.getElementsByClassName("textField")[text].value + "'><br>"
        document.getElementsByClassName("homework")[text].appendChild(checkbox)
        document.getElementsByClassName("homework")[text].appendChild(label)
        document.getElementsByClassName("textField")[text].value = "";
        document.getElementById("i" + id).setAttribute("onkeyup", "removeAssignment(" + text + "," + id + ")")
        id ++
        localStorage.setItem("id", id)
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
function removeAssignment(box, id) {
    if(document.getElementById("i" + id).value == "") {
        while(document.getElementById("l" + id).hasChildNodes()) {
            document.getElementById("l" + id).removeChild(document.getElementById("l" + id).firstChild)
        }
        document.getElementsByClassName("homework")[box].removeChild(document.getElementById("cb" + id))
        localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
        checkBoxes(box)
    } else {
        document.getElementById("i" + id).setAttribute("value", document.getElementById("i" + id).value)
        document.getElementById("i" + id).setAttribute("size", document.getElementById("i" + id).value.length)
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
function popUpDiv(x) {
    if(x) {
        document.getElementById("x-popup").style.visibility = "visible"
    }
    if(localStorage.getItem("name")) {
        document.getElementById("popup").style.visibility = "visible"
        window.document.title = localStorage.getItem("name") + "'s Planner"
        document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
    } else {
        document.getElementById("name-popup").style.visibility = "visible"
    }
    document.getElementById("popup-background").style.visibility = "visible"
}
function closePopUp() {
    document.getElementById("popup").style.visibility = "hidden"
    document.getElementById("popup-background").style.visibility = "hidden"
    document.getElementById("x-popup").style.visibility = "hidden"
}
function registerName() {
    localStorage.setItem("name", document.getElementById("name-Text").value)
    document.getElementById("name-popup").style.visibility = "hidden"
    window.document.title = document.getElementById("name-Text").value + "'s Planner"
    document.getElementById("heading").innerHTML = document.getElementById("name-Text").value + "'s Planner"
    popUpDiv()
}
function addClass() {
    document.getElementById("popup").style.visibility = "hidden"
    document.getElementById("popup-background").style.visibility = "hidden"
    var div = document.createElement("div")
    div.setAttribute("class", "class")
    var h3 = document.createElement("h3")
    h3.innerHTML = document.getElementById("classText").value
    div.appendChild(h3)
    var div2 = document.createElement("div")
    div2.setAttribute("class", "homework")
    div.appendChild(div2)
    var numberOfTextfields = document.getElementsByClassName("textField").length
    var textfield = document.createElement("input")
    textfield.setAttribute("type", "text")
    textfield.setAttribute("class", "textField")
    textfield.setAttribute("placeholder", "New homework")
    textfield.setAttribute("onkeyup", "identifyTextField(" + numberOfTextfields + ")")
    div.appendChild(textfield)
    document.getElementsByTagName("main")[0].appendChild(div)
    localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    document.getElementById("classText").value = ""
    document.getElementById("x-popup").style.visibility = "hidden"
}
