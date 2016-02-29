$(document).ready(function() {
  var title = $("h1");
  title
    .on("mouseover", function(event) {
        title
          .css("top", Math.random()*$(document).height())
          .css("left", Math.random()*$(document).width());
    });

    float();

});

function newPosAndSize(){
	var left = Math.floor($(document).width()*Math.random());
	var top = Math.floor($(document).height()*Math.random());
	//var size = Math.floor((Math.random()*10) + 10);
	return [left, top];
}

function float(){
	var pos = newPosAndSize();
	$(".floater").animate({left: pos[0], top:pos[1]}, "slow", function(){
		float();
	});

}