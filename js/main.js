$(document).ready(function () {
    var $app = $("#app"); /* our container */
    var $parallaxItems = $app.find(".parallax"); /* elements */
    var fixer = 0.0008; /* experiment with the value */

    $(document).on("mousemove", function (event) {
        var pageX = event.pageX - $app.width() * 0.5;
        /* get the mouseX - negative on left, positive on
                               right */
        var pageY = event.pageY - $app.height() * 0.5;
        /* same here, get the y. use console.log(pageY) to
                               see the values */

        /* here we move each item*/
        $parallaxItems.each(function () {
            var item = $(this);
            var speedX = item.data("speed-x");
            var speedY = item.data("speed-y");

            /*TweenLite.to(item, 0.5, {
                    x: (item.position().left + pageX * speedX )*fixer, //calculate the new X based on mouse position * speed
                    y: (item.position().top + pageY * speedY)*fixer
                    });*/

            /* or use set - not so smooth, but better performance */
            TweenLite.set(item, {
                x: (item.position().left + pageX * speedX) * fixer,
                y: (item.position().top + pageY * speedY) * fixer,
            });
        });
    });
});

window.addEventListener("resize", () => {
    document.querySelectorAll("[style]").forEach((el) => {
        if (!el.classList.contains("preload")) {
            el.removeAttribute("style");
        }
    });
});
window.addEventListener("load", (event) => {
    pageAnim();

    setInterval(() => {
        document.querySelector(".btn-yellow-big").classList.add("hover");
        setTimeout(() => {
            document.querySelector(".btn-yellow-big").classList.remove("hover");
        }, 1000);
    }, 10000);
});

function pageAnim() {
    let tl = new TimelineMax();
    tl.delay(1)
        .fromTo(
            ".preload .inner",
            1.5,
            { opacity: 1, scale: 1 },
            { opacity: 0, rotate: 360, scale: 0 },
            "start"
        )
        .fromTo(".preload", 0.5, { opacity: 1 }, { opacity: 0 }, "start+=0.8")
        .add("startPage")
        .from(".car", 0.8, { left: "-100%", opacity: 0.5 }, "start+=0.5")
        .from(".slogan", 1, { left: "-100%" }, "start+=1.2")
        .from(".rider", 0.5, { left: "-100%" }, "start+=1")
        .from(".dictor", 0.5, { right: "-100%" }, "start+=1")
        .from("nav .logo", 0.5, { left: "-100%" }, "start+=2")
        .from("nav .btn", 0.5, { right: "-100%" }, "start+=2")
        .fromTo(
            ".make-bet .btn",
            0.5,
            { scale: 0 },
            {
                scale: 1,
                ease: Bounce.easeOut,
                onComplete: function () {
                    document.querySelector(".preload").style.display = "none";
                },
            },
            "start+=2.5"
        )
        .fromTo(
            ".make-bet .bonus",
            0.5,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, ease: Power1.easeInOut },
            "start+=3.5"
        )
        .fromTo(
            ".make-bet .rules",
            0.5,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, ease: Power1.easeInOut },
            "start+=4"
        )
        .fromTo(
            ".look .btn",
            0.5,
            { scale: 0 },
            { scale: 1, ease: Bounce.easeOut },
            "start+=2.8"
        )
        .fromTo(
            ".look .bonus",
            0.5,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, ease: Power1.easeInOut },
            "start+=3.8"
        )
        .from("footer", 0.5, { opacity: 0, bottom: "-100%" }, "start+=3");
}
