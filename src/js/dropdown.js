document.addEventListener("DOMContentLoaded", function () {

    const dropdown = document.getElementsByClassName("collapsible__btn");
    
    if (dropdown) {
        var i;

        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function () {
                
                //this.classList.toggle("active");
                var content = this.nextElementSibling;
                //console.log(content)
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }


                var arrow = this.querySelector(".fa-chevron-right")
                if(arrow.classList.contains("rotated")){
                    arrow.classList.remove("rotated")
                } else {
                    arrow.classList.add("rotated");
                }
            });
        }
    }

})