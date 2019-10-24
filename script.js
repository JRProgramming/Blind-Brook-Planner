window.onload = function() {
    if(localStorage.getItem("class")) {
        document.getElementsByTagName("main")[0].innerHTML = localStorage.getItem("class")
        window.document.title = localStorage.getItem("name") + "'s Planner"
        document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
    } else {
        popUpDiv()
    }
    /*
    if(localStorage.getItem("resize") == "true") {
        document.getElementById("resizeMenu").innerHTML = "Disable resize (beta)"
    }
    */
    for(var i=0;i<document.getElementsByClassName("homework").length; i++) {
        document.getElementsByClassName("homework")[i].innerHTML = localStorage.getItem(i)
        checkBoxes(i)
    }
}
function identifyTextField(event, text) {
     if(event.keyCode === 13) {
        createCheckBox(text)
     }
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
    if(document.getElementsByClassName("textField")[text].value.trim() != "") {
        var checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("class", "cb" + text)
        checkbox.setAttribute("id", "cb" + id)
        checkbox.setAttribute("onclick", "checkBoxes(" + text + "," + id  + ")")
        var label = document.createElement("label")
        label.setAttribute("id", "l" + id)
        var size = document.getElementsByClassName("textField")[text].value.length
        label.innerHTML = "<p autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" contenteditable=\"true\" class=\"homeworkLabel\" id='i" + id + "'></p><br>"
        var hw = document.getElementsByClassName("textField")[text].value
        if(hw == hw.toUpperCase() || hw.includes("!")) {
            if(hw.includes("!")) {
                for(i=0;i<hw.length;i++) {
                    if(hw[i] == "!") {
                        hw = hw.split("")
                        hw.splice(i, 1)
                        hw = hw.join("")
                    }
                }
            }
            document.getElementsByClassName("homework")[text].insertBefore(checkbox, document.getElementsByClassName("homework")[text].childNodes[0])
            document.getElementsByClassName("homework")[text].insertBefore(label, document.getElementsByClassName("homework")[text].childNodes[1])
        } else {
            document.getElementsByClassName("homework")[text].appendChild(checkbox)
            document.getElementsByClassName("homework")[text].appendChild(label)
        }
        var p = document.getElementById("i" + id)
        var homeworkTitle = document.createTextNode(hw)
        p.appendChild(homeworkTitle)
        document.getElementsByClassName("textField")[text].value = ""
        p.setAttribute("onkeyup", "removeAssignment(" + text + "," + id + ")")
        for(j=0;j<removeButton.length;j++) {
            if(removeButton[j] == text) {
                removeButton.splice(j, 1)
            }
        }
        for(j=0;j<undoButton.length;j++) {
            if(undoButton[j] == text) {
                undoButton.splice(j, 1)
                
            }
        }
        for(j=0;j<originalHw.length;j++) {
            if(originalHw[j][0] == text) {
                originalHw[j] = []
            }
        }
        id ++
        localStorage.setItem("id", id)
    } else {
        document.getElementsByClassName("textField")[text].value = null
    }
    checkBoxes(text)
    localStorage.setItem(text, document.getElementsByClassName("homework")[text].innerHTML)
}
/*
function activateResize() {
    if(document.getElementById("resizeMenu").innerHTML == "Activate resize (beta)") {
        for(i=0;i<document.getElementsByClassName("class").length; i++) {
            document.getElementsByClassName("class")[i].style.resize = "vertical"
        }
        document.getElementById("resizeMenu").innerHTML = "Disable resize (beta)"
        localStorage.setItem("resize", true)
    } else {
        for(i=0;i<document.getElementsByClassName("class").length; i++) {
            document.getElementsByClassName("class")[i].style.height = "auto"
            document.getElementsByClassName("class")[i].style.resize = "none"
        }
        document.getElementById("resizeMenu").innerHTML = "Activate resize (beta)"
        localStorage.setItem("resize", false)
    }
    localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    closeMenu()
}
*/
var removeButton = []
var undoButton = []
function checkForActionButton(box) {
    var allBoxesChecked = true
    var checkBoxes = document.getElementsByClassName("cb" + box)
    if(checkBoxes.length != 0) {
        for(j=0;j<checkBoxes.length; j++) {
            if(!checkBoxes[j].checked) {
                allBoxesChecked = false
            }
        }
    } else {
        allBoxesChecked = false
    }
    if(allBoxesChecked) {
        if(!document.getElementById("Remove" + box) && !removeButton.includes(box)) {
            removeButton.push(box)
        }
    } else {
        for(i=0;i<removeButton.length;i++) {
            if(removeButton[i] == box) {
                removeButton.splice(i, 1)
            }
        }
    }
    if(originalHw.length != 0) {
        for(i=0;i<originalHw.length; i++) {
            if(originalHw[i][0] == box && !undoButton.includes(box)) {
                undoButton.push(box)
            }
        }
    }
}
function checkBoxes(box, id, loop) {
    if(document.getElementById("actionMenu" + box)) {
        document.getElementsByClassName("class")[box].removeChild(document.getElementById("actionMenu" + box))
    }
    if(loop) {
        for(box=0;box<document.getElementsByClassName("class").length;box++) {
            checkForActionButton(box)
        }
    } else {
        checkForActionButton(box)
        saveCheckBox(box, id)
    }
}
function changeColorPopUp() {
    closeMenu()
    document.getElementById("x-popup-removeClass").style.visibility = "visible"
    document.getElementById("changeColor-popup").style.visibility = "visible"
    document.getElementById("popup-background").style.visibility = "visible"
    document.getElementsByClassName("popup")[3].classList.add("animate-popup")
    setTimeout(function() {
        document.getElementsByClassName("popup")[3].classList.remove("animate-popup")
    }, 600)
}
function changeColor() {
    for(i=0;i<document.getElementsByClassName("class").length; i++) {
        document.getElementsByClassName("class")[i].style.backgroundColor = document.getElementById("colorWheel").value
        document.getElementsByClassName("textField")[i].style.backgroundColor = document.getElementById("colorWheel").value
    }
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
    var p = document.getElementById("i" + id)
    if(p.innerHTML.replace('<br>', '') == "") {
        while(document.getElementById("l" + id).hasChildNodes()) {
            document.getElementById("l" + id).removeChild(document.getElementById("l" + id).firstChild)
        }
        document.getElementsByClassName("homework")[box].removeChild(document.getElementById("cb" + id))
        localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
        checkBoxes(box)
    } else {
        localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
    }
}
var originalHw = []
function removeHomework(box) {
    if(confirm("Are you sure you want to remove all of your homeworks for " + document.getElementsByTagName("h3")[box].childNodes[0].nodeValue + "?")) {
        originalHw.push([box, document.getElementsByClassName("homework")[box].innerHTML])
        var homework = document.getElementsByClassName("homework")[box]
        while(homework.hasChildNodes()) {
            homework.removeChild(homework.firstChild)
        }
        document.getElementsByClassName("class")[box].removeChild(document.getElementById("actionMenu" + box))
        for(i=0;i<removeButton.length;i++) {
            if(removeButton[i] == box) {
                removeButton.splice(i, 1)
            }
        }
        undoButton.push(box)
        localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
    }
}
function undoHomework(box) {
    for(i=0;i<originalHw.length; i++) {
        if(originalHw[i][0] == box) {
            document.getElementsByClassName("homework")[box].innerHTML = originalHw[i][1]
            for(j=0;j<undoButton.length;j++) {
                if(undoButton[j] == box) {
                    undoButton.splice(j, 1)
                }
            }
            document.getElementsByClassName("class")[box].removeChild(document.getElementById("actionMenu" + box))
            originalHw[i] = []
            checkBoxes(box)
            localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
        }
    }
}
var ids = ["title-popup", "x-div-popup", "div-popup", "bottom-popup"]
var addClassChilds = ["<span>Add a class</span>", "<button id=\"x-popup\" onclick=\"closePopUp()\">Cancel</buttton>", "<h4 id=\"label-popup\">Type in the name of the class</h4><input type=\"text\" onkeyup=\"textEnter(event)\" class=\"popup-text\" id=\"classText\" placeholder=\"Class Name\">", "<button id=\"addClass\" onclick=\"addClass()\">Add Class</button>"]
var nameChilds = ["<span>Name</span>", "", "<h4 id=\"label-popup\">Type in your first name</h4><input type=\"text\" onkeyup=\"nameEnter(event)\" class=\"popup-text\" id=\"name-Text\" placeholder=\"First Name\">", "<button id=\"addClass\" onclick=\"registerName()\">Enter</button>"]
var changeColorChilds = ["<span>Change colors</span>", "<button id=\"x-popup\" onclick=\"resetColors()\">Cancel</button>", "", "<button id=\"addClass\" onclick=\"changeColors()\">Change colors</button>"]
function popUpDiv(popUpName) {
    closePopUp()
    for(box=0;box<document.getElementsByClassName("class").length;box++) {
        if(document.getElementsByClassName("class")[box].contains(document.getElementById("actionMenu" + box))) {
            document.getElementsByClassName("class")[box].removeChild(document.getElementById("actionMenu" + box))
        }
    }
    document.getElementById("popup").style.visibility = "visible"
    if(localStorage.getItem("name")) {
        if(popUpName == "addClass") {
            for(i=0;i<ids.length;i++) {
                document.getElementById(ids[i]).insertAdjacentHTML("afterbegin", addClassChilds[i])
            }
            if(document.getElementById("errorPopUpMessage")) {
               document.getElementById("div-popup").removeChild(document.getElementById("errorPopUpMessage"))
            }
            document.getElementById("popup").style.visibility = "visible"
            document.getElementById("popup").classList.add("animate-popup")
            setTimeout(function() {
                document.getElementById("popup").classList.remove("animate-popup")
            }, 600)
            window.document.title = localStorage.getItem("name") + "'s Planner"
            document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
            document.getElementById("classText").autofocus
        } else if (popUpName == "changeColors") {
            getOriginalColor()
            for(i=0;i<ids.length;i++) {
                document.getElementById(ids[i]).insertAdjacentHTML("afterbegin", changeColorChilds[i])
            }
            document.getElementById("popup").classList.add("animate-popup")
            setTimeout(function() {
                document.getElementById("popup").classList.remove("animate-popup")
            }, 600)
            var h3 = document.getElementsByTagName("h3")
            for(i=0; i<h3.length; i++) {
                var color = document.createElement("input")
                color.setAttribute("type", "color")
                color.setAttribute("id", "cc" + i)
                color.setAttribute("onchange", "changeColors(" + i + ")")
                color.setAttribute("class", "removeClassCB")
                color.setAttribute("value", rgb2hex(document.getElementsByClassName("class")[i].style.backgroundColor))
                var label = document.createElement("label")
                label.setAttribute("class", "changeColor-label")
                var labelText = document.createTextNode(h3[i].childNodes[0].nodeValue)
                label.appendChild(labelText)
                var br = document.createElement("br")
                label.appendChild(br)
                document.getElementById("div-popup").appendChild(color)
                document.getElementById("div-popup").appendChild(label)
            }
        }
    } else {
        document.getElementById("popup").style.visibility = "visible"
        for(i=0;i<ids.length;i++) {
            document.getElementById(ids[i]).insertAdjacentHTML("afterbegin", nameChilds[i])
        }
        document.getElementById("popup").classList.add("animate-popup")
        setTimeout(function() {
            document.getElementById("popup").classList.remove("animate-popup")
        }, 600)
        document.getElementById("name-Text").autofocus
    }
    document.getElementById("bar-setting").style.visibility = "hidden"
    document.getElementById("popup-background").style.visibility = "visible"
}
var originalColors = []
function getOriginalColor() {
    originalColors = []
    for(i=0;i<document.getElementsByClassName("class").length;i++) {
        originalColors.push(document.getElementsByClassName("class")[i].style.backgroundColor)
    }
}
function resetColors() {
    for(i=0;i<document.getElementsByClassName("class").length;i++) {
        document.getElementsByClassName("class")[i].style.backgroundColor = originalColors[i]
        document.getElementsByClassName("textField")[i].style.backgroundColor = originalColors[i]
    }
    closePopUp()
}
function changeColors(i) {
    if(i != null) {
        document.getElementsByClassName("class")[i].style.backgroundColor = document.getElementById("cc" + i).value
        document.getElementsByClassName("textField")[i].style.backgroundColor = document.getElementById("cc" + i).value
    } else {
        closePopUp()
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    }
}
function closePopUp() {
    document.getElementById("popup").style.visibility = "hidden"
    document.getElementById("popup-background").style.visibility = "hidden"
    window.getSelection().removeAllRanges()
    for(i=0;i<ids.length;i++) {
        while(document.getElementById(ids[i]).hasChildNodes()) {
            document.getElementById(ids[i]).removeChild(document.getElementById(ids[i]).firstChild)
        }
    }
}
function popMenu() {
    document.getElementById("bar-setting").style.visibility = "visible"
    document.getElementById("bar-setting").classList.add("animate-menu")
    setTimeout(function() {
        document.getElementById("bar-setting").classList.remove("animate-menu")
    }, 600)
}
function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb
    
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2)
    }
    if(rgb == null) {
        return "#D3D3D3"
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])
}
function closeMenu() {
    document.getElementById("bar-setting").style.visibility = "hidden"
}
function colorChooser() {
    
}
function removeClasses(box) {
    if(confirm("Are you sure that you want to remove " + document.getElementsByTagName("h3")[box].childNodes[0].nodeValue + "? You will not be able to recover this class once it is deleted.")) {
        originalHw = []
        undoButton = []
        for(i=0;i<document.getElementsByClassName("class").length;i++) {
            if(i >= box) {
                if(localStorage.getItem(i+1)) {
                    localStorage.setItem(i, localStorage.getItem(i+1))
                }
            }
        }
        for(i=0;i<removeButton.length;i++) {
            if(removeButton[i] >= box) {
                removeButton[i] = (removeButton[i]-1)
            }
        }
        document.getElementsByTagName("main")[0].removeChild(document.getElementsByClassName("class")[box])
        for(i=0;i<document.getElementsByClassName("textField").length;i++) {
            document.getElementsByClassName("textField")[i].removeAttribute("onkeyup")
            document.getElementsByClassName("textField")[i].setAttribute("onkeyup", "identifyTextField(event, " + i + ")")
        }
        for(i=0;i<document.getElementsByClassName("titleDiv").length;i++) {
            document.getElementsByClassName("titleDiv")[i].childNodes[1].setAttribute("id", "menu" + i)
            document.getElementsByClassName("titleDiv")[i].childNodes[1].setAttribute("onclick", "actionMenu(" + i + ")")
        }
        for(j=0; j<document.getElementsByClassName("class").length; j++) {
            for(i=0; i<document.getElementsByClassName("homework")[j].childNodes.length; i++) {
                if(document.getElementsByClassName("homework")[j].childNodes[i] != undefined && document.getElementsByClassName("homework")[j].childNodes[i].tagName == "INPUT" && document.getElementsByClassName("homework")[j].childNodes[i].type == "checkbox") {
                    document.getElementsByClassName("homework")[j].childNodes[i].removeAttribute("class")
                    document.getElementsByClassName("homework")[j].childNodes[i].setAttribute("class", "cb" + j)
                    var attribute = document.getElementsByClassName("homework")[j].childNodes[i].getAttribute("onclick")
                    document.getElementsByClassName("homework")[j].childNodes[i].removeAttribute("onclick")
                    attribute = attribute.split("")
                    attribute.splice(11, 1, j)
                    attribute = attribute.join("")
                    document.getElementsByClassName("homework")[j].childNodes[i].setAttribute("onclick", attribute)
                }
            }
        }
        for(j=0;j<document.getElementsByClassName("class").length;j++) {
            for(k=0;k<document.getElementsByTagName("p").length;k++) {
                for(i=0;i<localStorage.getItem("id");i++) {
                    if(document.getElementsByTagName("p")[k] && document.getElementsByTagName("p")[k].id == "i" + i && document.getElementsByClassName("class")[j].contains(document.getElementById("i" + i))) {
                        document.getElementById("i" + i).setAttribute("onkeyup" , "removeAssignment(" + j + ", " + i + ")")
                    }
                }
            }
        }
        closePopUp()
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    }
}
function registerName() {
    localStorage.setItem("name", document.getElementById("name-Text").value)
    window.document.title = document.getElementById("name-Text").value + "'s Planner"
    document.getElementById("heading").innerHTML = document.getElementById("name-Text").value + "'s Planner"
    closePopUp()
    popUpDiv("addClass")
}
function actionMenu(box) {
    if(!document.getElementsByClassName("class")[box].contains(document.getElementById("actionMenu" + box))) {
        var height = document.getElementsByClassName("class")[box].clientHeight
        var div = document.createElement("div")
        div.setAttribute("class", "actionMenu")
        div.setAttribute("id", "actionMenu" + box)
        for(i=0;i<removeButton.length;i++) {
            if(removeButton[i] == box) {
                var remove = document.createElement("button")
                remove.innerHTML = "Remove homework"
                remove.setAttribute("class", "actionMenu-Button")
                remove.setAttribute("id", "Remove" + box)
                remove.setAttribute("onclick", "removeHomework(" + box + ")")
                div.appendChild(remove)
            }
        }
        for(i=0;i<undoButton.length;i++) {
            if(undoButton[i] == box) {
                var undo = document.createElement("button")
                undo.innerHTML = "Undo"
                undo.setAttribute("class", "actionMenu-Button")
                undo.setAttribute("id", "Remove" + box)
                undo.setAttribute("onclick", "undoHomework(" + box + ")")
                div.appendChild(undo)
            }
        }
        var color = document.createElement("button")
        color.innerHTML = "Background color"
        color.setAttribute("class", "actionMenu-Button")
        color.setAttribute("onclick", "popUpDiv('changeColors')")
        div.appendChild(color)
        var removeClass = document.createElement("button")
        removeClass.innerHTML = "Remove Class"
        removeClass.setAttribute("class", "actionMenu-Button")
        removeClass.setAttribute("onclick", "removeClasses(" + box + ")")
        div.appendChild(removeClass)
        document.getElementsByClassName("class")[box].appendChild(div)
        document.getElementsByClassName("class")[box].clientHeight = height + "px"
    } else {
        document.getElementsByClassName("class")[box].removeChild(document.getElementById("actionMenu" + box))
    }
}
function addClass() {
    var acceptableClassTitle = "yes"
    if(document.getElementById("errorPopUpMessage")) {
       document.getElementById("div-popup").removeChild(document.getElementById("errorPopUpMessage"))
    }
    document.getElementById("classText").value = document.getElementById("classText").value.trim()
    for(i=0;i<document.getElementsByTagName("h3").length; i++) {
        if(document.getElementsByTagName("h3")[i].childNodes[0].nodeValue == document.getElementById("classText").value) {
            acceptableClassTitle = "sameClass"
        }
    }
    if(document.getElementById("classText").value == "") {
        acceptableClassTitle = "blankEntry"
    }
    if(acceptableClassTitle == "yes") {
        document.getElementById("popup").style.visibility = "hidden"
        document.getElementById("popup-background").style.visibility = "hidden"
        var div = document.createElement("div")
        div.setAttribute("class", "class")
        var titleDiv = document.createElement("div")
        titleDiv.setAttribute("class", "titleDiv")
        var h3 = document.createElement("h3")
        var classTitle = document.createTextNode(document.getElementById("classText").value)
        h3.appendChild(classTitle)
        titleDiv.appendChild(h3)
        var numberOfTextfields = document.getElementsByClassName("textField").length
        var button = document.createElement("button")
        button.innerHTML = "<i class=\"fa fa-bars\"></i>"
        button.setAttribute("id", "menu" + numberOfTextfields)
        button.setAttribute("class", "actionButton")
        button.setAttribute("onclick", "actionMenu(" + numberOfTextfields + ")")
        titleDiv.appendChild(button)
        div.appendChild(titleDiv)
        var div2 = document.createElement("div")
        div2.setAttribute("class", "homework")
        div.appendChild(div2)
        var divText = document.createElement("div")
        divText.setAttribute("class", "divText")
        var textfield = document.createElement("input")
        textfield.setAttribute("type", "text")
        textfield.setAttribute("class", "textField")
        textfield.setAttribute("placeholder", "New homework")
        textfield.setAttribute("autocomplete", "off")
        textfield.setAttribute("autocorrect", "off")
        textfield.setAttribute("autocapitalize", "off")
        textfield.setAttribute("spellcheck", "off")
        var numberOfTextfields = document.getElementsByClassName("textField").length
        textfield.setAttribute("onkeyup", "identifyTextField(event, " + numberOfTextfields + ")")
        divText.appendChild(textfield)
        div.appendChild(divText)
        document.getElementsByTagName("main")[0].appendChild(div)
        if(document.getElementsByClassName("class")[numberOfTextfields].clientWidth != 275) {
            document.getElementsByClassName("class")[numberOfTextfields].style.maxWidth = (document.getElementsByClassName("class")[numberOfTextfields].clientWidth + 1) + "px"
        } else {
            document.getElementsByClassName("class")[numberOfTextfields].style.maxWidth = document.getElementsByClassName("class")[numberOfTextfields].clientWidth + "px"
        }
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
        document.getElementById("classText").value = ""
        closePopUp()
    } else if(acceptableClassTitle == "sameClass") {
        var error = document.createElement("p")
        error.setAttribute("id", "errorPopUpMessage")
        error.style.color = "red"
        error.innerHTML = "This class already exists. You need to choose a different class name."
        document.getElementById("classText").value = ""
        document.getElementById("div-popup").appendChild(error)
    } else if(acceptableClassTitle == "blankEntry") {
        var error = document.createElement("p")
        error.setAttribute("id", "errorPopUpMessage")
        error.style.color = "red"
        error.innerHTML = "This class does not have a title. Please give this class a title."
        document.getElementById("classText").value = ""
        document.getElementById("div-popup").appendChild(error)
    }
}
