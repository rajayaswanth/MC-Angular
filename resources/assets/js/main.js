function toggle() {
    var x = document.getElementById("password");
    var y = document.getElementById("eye");
    if (x.type === "password") {
        x.type = "text";
        y.className = "glyphicon glyphicon-eye-close"
    } else {
        x.type = "password";
        y.className = "glyphicon glyphicon-eye-open"
    }
}
