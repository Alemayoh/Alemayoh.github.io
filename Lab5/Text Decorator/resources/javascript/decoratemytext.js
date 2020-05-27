function TextDecorator() {
    var mytext = document.getElementById('decorate_text');
    var computedStyle = window.getComputedStyle ?
        getComputedStyle(mytext) // Standards
        :
        mytext.currentStyle; // Old IE
    var fontSize;

    if (computedStyle) { // This will be true on nearly all browsers
        fontSize = parseInt(computedStyle && computedStyle.fontSize);
        fontSize += 2;
    }
    mytext.style.fontSize = fontSize + "pt";
}

function BlingText(checkBox, target) {
    if (checkBox.checked) {
        document.getElementById(target).style.fontWeight = "bold";
        document.getElementById(target).style.color = "green";
        document.getElementById(target).style.textDecoration = "underline";

    } else { document.getElementById(target).style.fontWeight = "normal"; }
}