$(document).ready(function() {
  var signup = $("#signup");
  signup
    .on("mouseover", function(event) {
    signup
      .css("top", Math.random()*$(document).height()*1-$(document).height()*0.5)
      .css("left", Math.random()*$(document).width()*1.2-$(document).width()*0.6);
  })
    .on("click", function() {
    alert("You don't actually need to sign up, just follow our updates on Facebook for more info!");
  });
});