$(document).ready(function() {
  var title = $("h1");
  title
    .on("mouseover", function(event) {
        title
          .css("top", Math.random()*$(document).height()*1-$(document).height()*0.5)
          .css("left", Math.random()*$(document).width()*1.2-$(document).width()*0.6);
    });
});
