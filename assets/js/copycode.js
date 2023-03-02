function copyCode(code_name){
    var range = document.createRange();
    range.selectNode(document.getElementById(code_name));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

