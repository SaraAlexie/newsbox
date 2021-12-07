document.addEventListener("DOMContentLoaded", function(){

    let goBackElm = document.querySelector(".goBack");
    //console.log(goBackElm);

    if(goBackElm){

        goBackElm.addEventListener("click", function(){
            history.back();
        })
    }
})