function swipeCatch(swipeElm, swipeFunction, swipingLeft = true){

    let startTouchValue;
    let moveTouchValue;
    let endTouchValue;
    let deadZone = 50; //Deadzone bruges til at beskrive det område under minimum, hvor du ikke kan swipe eller have anden funktion

    let touchStartHandler = function(e){
        startTouchValue = e.touches[0].clientX; //Der hvor vi først røre ved skærmen
    }

    let touchMoveHandler = function(e){
        moveTouchValue = e.touches[0].clientX; //Når vi bevæger fingeren over skærmen
    }

    let touchEndHandler = function(e){
        endTouchValue = startTouchValue - moveTouchValue; //Hvor vi er når vi slipper fingeren fra skærmen, afstanden vi har swiped.

        if(Math.abs(endTouchValue) < deadZone){
            return
        }

        if((endTouchValue > 0 && swipingLeft) || (endTouchValue < 0 && !swipingLeft)){
            swipeFunction()
        }
    }

    swipeElm.addEventListener("touchstart", touchStartHandler);
    swipeElm.addEventListener("touchmove", touchMoveHandler);
    swipeElm.addEventListener("touchend", touchEndHandler)
}