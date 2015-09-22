$(document).ready(function() {
  var title = $("h1");
  title
    .on("mouseover", function(event) {
        title
          .css("top", Math.random()*$(document).height())
          .css("left", Math.random()*$(document).width());
    });
});
