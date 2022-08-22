function playTLWithDelay(delay, withAnimation) {
    var tl = gsap.timeline({
        defaults: { transformOrigin: "center", opacity: 1, ease: "bounce.out" }
    });
    setTimeout(() => {
        tl.to("#dice1,#dice2,#dice3,#dice4,#dice5", { opacity: 0, duration: 0.25, ease: "none", onComplete: () => {
            playTL(withAnimation);
        }
    });
    }, delay);
}

function playTL(withAnimation) {
    console.log(withAnimation)
    //Reset dice
    var tl = gsap.timeline({
        defaults: { transformOrigin: "center", opacity: 1, ease: "bounce.out" }
    });

    if(withAnimation) {
        tl.to("#dice1,#dice2,#dice3,#dice4,#dice5", { y: -100, opacity: 0, duration: 1, ease: "power3.inOut" });
        tl.to("#dice1,#dice2,#dice3,#dice4,#dice5", { rotate: 0, opacity: 0, duration: 0, onComplete: add });
    } else {
        tl.to("#dice1,#dice2,#dice3,#dice4,#dice5", { rotate: 0, opacity: 0, duration: 0, onComplete: () => {add(); console.log("adding")}});
    }



    //Add front to dice
    function add() {
        for (let i = 1; i < 6; i++) {
            var rndInt = randomIntFromInterval(1, 6);
            var element = document.getElementById("dice" + i);
            element.style.fill = "url(#side" + rndInt + ")";
        }

        //Show dice
        tl.to("#dice1", { y: 0, rotate: 360, duration: 2 });
        tl.to("#dice2", { y: 0, rotate: -360, duration: 2 }, "-=1.8");
        tl.to("#dice3", { y: 0, rotate: 360, duration: 2 }, "-=1.8");
        tl.to("#dice4", { y: 0, rotate: -360, duration: 2 }, "-=1.8");
        tl.to("#dice5", { y: 0, rotate: 360, duration: 2, onComplete: ()=>{
            playTLWithDelay(500, false)} 
        }, "-=1.8");
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}