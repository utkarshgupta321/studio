function changeBg(){
    var navbar= document.getElementById('navbar');
    var scrollValue= window.scrollY;

    if(scrollValue<50){
        navbar.classList.remove('bgColor');
        document.getElementById("gta_nav").style.color = "#00f0ff";
    }

    else{
        navbar.classList.add('bgColor');
        document.getElementById("gta_nav").style.color = "black";
    }
}

window.addEventListener('scroll',changeBg);