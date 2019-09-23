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
        label.innerHTML = "<textarea class=\"homeworkLabel\" id='i" + id + "'>" + document.getElementsByClassName("textField")[text].value + "</textarea><br>"
        document.getElementsByClassName("homework")[text].appendChild(checkbox)
        document.getElementsByClassName("homework")[text].appendChild(label)
        document.getElementsByClassName("textField")[text].value = "";
        var textArea = document.getElementById("i" + id)
        textArea.setAttribute("onkeyup", "removeAssignment(" + text + "," + id + "," + "event" + ")")
        textArea.style.height = "25px";
        if(textArea.scrollHeight > textArea.clientHeight) {
            textArea.style.height = textArea.scrollHeight + "px"
        }
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
function removeAssignment(box, id, event) {
    var textArea = document.getElementById("i" + id)
    if(textArea.value == "") {
        while(document.getElementById("l" + id).hasChildNodes()) {
            document.getElementById("l" + id).removeChild(document.getElementById("l" + id).firstChild)
        }
        document.getElementsByClassName("homework")[box].removeChild(document.getElementById("cb" + id))
        localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
        checkBoxes(box)
    } else {
        textArea.style.height = "25px";
        if(textArea.scrollHeight > textArea.clientHeight) {
            textArea.style.height = textArea.scrollHeight + "px"
        }
        textArea.innerHTML = textArea.value
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
        document.getElementById("popup").classList.add("animate-popup")
        setTimeout(function() {
            document.getElementById("popup").classList.remove("animate-popup");
        }, 600)
        window.document.title = localStorage.getItem("name") + "'s Planner"
        document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
        document.getElementById("classText").autofocus
    } else {
        document.getElementById("name-popup").style.visibility = "visible"
        document.getElementById("name-popup").classList.add("animate-popup")
        setTimeout(function() {
                   document.getElementById("name-popup").classList.remove("animate-popup");
        }, 600)
        document.getElementById("name-Text").autofocus
    }
    document.getElementById("popup-background").style.visibility = "visible"
}
function closePopUp() {
    document.getElementById("popup").style.visibility = "hidden"
    document.getElementById("popup-background").style.visibility = "hidden"
    document.getElementById("x-popup").style.visibility = "hidden"
    document.getElementById("removeClass-popup").style.visibility = "hidden"
    document.getElementById("x-popup-removeClass").style.visibility = "hidden"
    var checkbox = document.getElementById("checkbox-removeClass-popup")
    while(checkbox.hasChildNodes()) {
        checkbox.removeChild(checkbox.firstChild)
    }
}
function popMenu() {
    document.getElementById("bar-setting").style.visibility = "visible"
    document.getElementById("bar-setting").classList.add("animate-menu")
    setTimeout(function() {
        document.getElementById("bar-setting").classList.remove("animate-menu")
    }, 600)
}
function closeMenu() {
    document.getElementById("bar-setting").style.visibility = "hidden"
}
function removeClassPopup() {
    closeMenu()
    document.getElementById("x-popup-removeClass").style.visibility = "visible"
    document.getElementById("removeClass-popup").style.visibility = "visible"
    document.getElementById("popup-background").style.visibility = "visible"
    var h3 = document.getElementsByTagName("h3")
    for(i=0; i<h3.length; i++) {
        var checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", "dc" + i)
        checkbox.setAttribute("class", "removeClassCB")
        var label = document.createElement("label")
        label.setAttribute("class", "removeCheckbox-label")
        label.innerHTML = h3[i].innerHTML + "<br>"
        document.getElementById("checkbox-removeClass-popup").appendChild(checkbox)
        document.getElementById("checkbox-removeClass-popup").appendChild(label)
    }
}
function removeClasses() {
    if (confirm("Are you sure that you want to remove these classes?")) {
        var checkBoxes = []
        for(i=0;i<document.getElementsByTagName("h3").length;i++) {
            if(document.getElementById("dc" + i).checked) {
                checkBoxes.push(document.getElementsByTagName("h3")[i].innerHTML)
            }
        }
        var elements = []
        for(j=0;j<checkBoxes.length;j++) {
            for(i=0;i<document.getElementsByClassName("class").length;i++) {
                if(document.getElementsByClassName("class")[i].innerHTML.includes("<h3>" + checkBoxes[j] + "</h3>")) {
                    elements.push(document.getElementsByClassName("class")[i])
                }
            }
        }
        for(i=0;i<elements.length;i++) {
            document.getElementsByTagName("main")[0].removeChild(elements[i])
        }
        closePopUp()
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    }
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
    var numberOfTextfields = document.getElementsByClassName("textField").length
    textfield.setAttribute("onkeyup", "identifyTextField(" + numberOfTextfields + ")")
    div.appendChild(textfield)
    document.getElementsByTagName("main")[0].appendChild(div)
    localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    document.getElementById("classText").value = ""
    document.getElementById("x-popup").style.visibility = "hidden"
}
