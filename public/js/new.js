function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var image = document.forms["myForm"]["image"].value;
    var stars = document.forms["myForm"]["stars"].value;
    var desc = document.forms["myForm"]["description"].value;
    var loc = document.forms["myForm"]["location"].value;
    
    if (name === "" || image === "" || stars === "" || desc === "" || loc ==="") {
        alert("Please Fill Out All Input Spaces");
        return false;
    }
    if (stars > 5 || stars < 1){
        alert("Please give a rating between 1-5");
        return false;
    }
} 

