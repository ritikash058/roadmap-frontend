var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
            this.querySelector('span').innerHTML = '<i class="fa fa-plus"></i>';
        } else {
            panel.style.display = "block";
            this.querySelector('span').innerHTML = '<i class="fa fa-minus"></i>';
        }
    });
}