window.onload = function() {
    if(localStorage.getItem("class")) {
        document.getElementsByTagName("main")[0].innerHTML = localStorage.getItem("class")
        window.document.title = localStorage.getItem("name") + "'s Planner"
        document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
    } else {
        popUpDiv()
    }
    if(localStorage.getItem("resize") == "true") {
        document.getElementById("resizeMenu").innerHTML = "Disable resize (beta)"
    }
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
        updateScrollHeight(text)
        id ++
        localStorage.setItem("id", id)
    }
    checkBoxes(text)
    localStorage.setItem(text, document.getElementsByClassName("homework")[text].innerHTML)
}
function activateResize() {
    if(document.getElementById("resizeMenu").innerHTML == "Activate resize (beta)") {
        console.log("wowza")
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
function updateScrollHeight(text) {
    if(text) {
        const classHW = document.getElementsByClassName("class")[text];
        const expandedHeight = classHW.style.height
        classHW.style.height = "auto"
        classHW.style.minHeight = 0
        classHW.style.minHeight = classHW.scrollHeight + "px"
        classHW.style.height = expandedHeight
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    } else {
        for(i=0;i<document.getElementsByClassName("class").length;i++) {
            const classHW = document.getElementsByClassName("class")[i];
            const expandedHeight = classHW.style.height
            classHW.style.height = "auto"
            classHW.style.minHeight = 0
            classHW.style.minHeight = classHW.scrollHeight + "px"
            classHW.style.height = expandedHeight
        }
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
    }
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
            button.setAttribute("style", "color: black; background-color: transparent; border: none; display: inline; float: right;")
            button.setAttribute("id", "b" + box)
            button.setAttribute("onclick", "removeHomework(" + box + ")")
            document.getElementsByTagName("h3")[box].appendChild(button)
        }
    } else if(document.getElementById("b" + box)) {
        document.getElementsByTagName("h3")[box].removeChild(document.getElementById("b" + box))
    }
    updateScrollHeight(box)
    saveCheckBox(box, id)
}
function changeColorPopUp() {
    closeMenu()
    document.getElementById("x-popup-removeClass").style.visibility = "visible"
    document.getElementById("changeColor-popup").style.visibility = "visible"
    document.getElementById("popup-background").style.visibility = "visible"
    document.getElementsByClassName("popup")[3].classList.add("animate-popup")
    setTimeout(function() {
        document.getElementsByClassName("popup")[3].classList.remove("animate-popup");
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
        updateScrollHeight(box)
        localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
    }
}

function removeHomework(box) {
    var homework = document.getElementsByClassName("homework")[box]
    while(homework.hasChildNodes()) {
        homework.removeChild(homework.firstChild)
    }
    document.getElementsByTagName("h3")[box].removeChild(document.getElementById("b" + box))
    updateScrollHeight(box)
    localStorage.setItem(box, document.getElementsByClassName("homework")[box].innerHTML)
}
var ids = ["title-popup", "x-div-popup", "div-popup", "bottom-popup"]
var addClassChilds = ["<span>Add a class</span>", "<button id=\"x-popup\" onclick=\"closePopUp()\">Cancel</buttton>", "<h4 id=\"label-popup\">Type in the name of the class</h4><input type=\"text\" onkeyup=\"textEnter(event)\" class=\"popup-text\" id=\"classText\" placeholder=\"Class Name\">", "<button id=\"addClass\" onclick=\"addClass()\">Add Class</button>"]
var nameChilds = ["<span>Name</span>", "", "<h4 id=\"label-popup\">Type in your first name</h4><input type=\"text\" onkeyup=\"nameEnter(event)\" class=\"popup-text\" id=\"name-Text\" placeholder=\"First Name\">", "<button id=\"addClass\" onclick=\"registerName()\">Enter</button>"]
var removeClassChilds = ["<span>Remove Class</span>", "<button id=\"x-popup\" onclick=\"closePopUp()\">Cancel</buttton>", "", "<button id=\"addClass\" onclick=\"removeClasses()\">Remove Class</button>"]
var changeColorChilds = ["<span>Change colors</span>", "<button id=\"x-popup\" onclick=\"resetColors()\">Cancel</button>", "", "<button id=\"addClass\" onclick=\"changeColors()\">Change colors</button>"]

function popUpDiv(popUpName) {
    closePopUp()
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
                document.getElementById("popup").classList.remove("animate-popup");
            }, 600)
            window.document.title = localStorage.getItem("name") + "'s Planner"
            document.getElementById("heading").innerHTML = localStorage.getItem("name") + "'s Planner"
            document.getElementById("classText").autofocus
        } else if(popUpName == "removeClass") {
            for(i=0;i<ids.length;i++) {
                document.getElementById(ids[i]).insertAdjacentHTML("afterbegin", removeClassChilds[i])
            }
            document.getElementById("popup").classList.add("animate-popup")
            setTimeout(function() {
                document.getElementById("popup").classList.remove("animate-popup");
            }, 600)
            var h3 = document.getElementsByTagName("h3")
            for(i=0; i<h3.length; i++) {
                var checkbox = document.createElement("input")
                checkbox.setAttribute("type", "checkbox")
                checkbox.setAttribute("id", "dc" + i)
                checkbox.setAttribute("class", "removeClassCB")
                var label = document.createElement("label")
                label.setAttribute("class", "removeCheckbox-label")
                label.innerHTML = h3[i].innerHTML + "<br>"
                document.getElementById("div-popup").appendChild(checkbox)
                document.getElementById("div-popup").appendChild(label)
            }
        } else if (popUpName == "changeColors") {
            getOriginalColor()
            for(i=0;i<ids.length;i++) {
                document.getElementById(ids[i]).insertAdjacentHTML("afterbegin", changeColorChilds[i])
            }
            document.getElementById("popup").classList.add("animate-popup")
            setTimeout(function() {
                document.getElementById("popup").classList.remove("animate-popup");
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
                label.innerHTML = h3[i].innerHTML + "<br>"
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
                   document.getElementById("popup").classList.remove("animate-popup");
        }, 600)
        document.getElementById("name-Text").autofocus
    }
    document.getElementById("bar-setting").style.visibility = "hidden"
    document.getElementById("popup-background").style.visibility = "visible"
}
var originalColors = [];
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
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
    
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    console.log(rgb)
    if(rgb == null) {
        return "#D3D3D3"
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function closeMenu() {
    document.getElementById("bar-setting").style.visibility = "hidden"
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
    window.document.title = document.getElementById("name-Text").value + "'s Planner"
    document.getElementById("heading").innerHTML = document.getElementById("name-Text").value + "'s Planner"
    closePopUp()
    popUpDiv("addClass")
}
function addClass() {
    var acceptableClassTitle = "yes"
    if(document.getElementById("errorPopUpMessage")) {
       document.getElementById("div-popup").removeChild(document.getElementById("errorPopUpMessage"))
    }
    document.getElementById("classText").value = document.getElementById("classText").value.trim()
    for(i=0;i<document.getElementsByTagName("h3").length; i++) {
        if(document.getElementsByTagName("h3")[i].innerHTML == document.getElementById("classText").value) {
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
        var h3 = document.createElement("h3")
        h3.innerHTML = document.getElementById("classText").value
        div.appendChild(h3)
        var div2 = document.createElement("div")
        div2.setAttribute("class", "homework")
        div.appendChild(div2)
        var numberOfTextfields = document.getElementsByClassName("textField").length
        var divText = document.createElement("div")
        divText.setAttribute("class", "divText")
        var textfield = document.createElement("input")
        textfield.setAttribute("type", "text")
        textfield.setAttribute("class", "textField")
        textfield.setAttribute("placeholder", "New homework")
        var numberOfTextfields = document.getElementsByClassName("textField").length
        textfield.setAttribute("onkeyup", "identifyTextField(" + numberOfTextfields + ")")
        divText.appendChild(textfield)
        div.appendChild(divText)
        document.getElementsByTagName("main")[0].appendChild(div)
        localStorage.setItem("class", document.getElementsByTagName("main")[0].innerHTML)
        document.getElementById("classText").value = ""
        updateScrollHeight(numberOfTextfields)
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
