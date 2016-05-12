var doc;
var elements;
var scroll = function() {
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    Array.prototype.forEach.call(elements, function(element) {
        var rect = element.getBoundingClientRect();
        if (rect.top + (rect.bottom-rect.top)/2 >= top) {
            element.classList.remove("terrible-on");
        } else {
            element.classList.add("terrible-on");
        }
    });
};

window.onload = function() {
    doc = document.documentElement;
    elements = document.getElementsByClassName("terrible");
    window.requestAnimationFrame(scroll);
    window.addEventListener("scroll", function() {
        window.requestAnimationFrame(scroll);
    });
};
