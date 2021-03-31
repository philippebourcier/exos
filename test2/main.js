
function init() {

animateDiv(".a");
animateDiv(".b");
animateDiv(".c");

function updateScroll(){
    var h = $("#cons")[0].scrollHeight;
    $("#cons")[0].scrollTop = h;
    // after some time, cleanup the history
    if(h>=3000) {
	    $("#cons").text("");
            updateScroll();
    }
}

function getRotationDegrees(obj) {
	    var matrix = obj.css("transform");
	    if(matrix !== 'none') {
		            var values = matrix.split('(')[1].split(')')[0].split(',');
		            var a = values[0];
		            var b = values[1];
		            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		        } else { var angle = 0; }
	    return (angle < 0) ? angle + 360 : angle;
}

function addRotate(zdiv,add) {
    $(zdiv).css({ 'transform': 'rotate('+(getRotationDegrees($(zdiv))+1)+'deg)' });
}

function makeNewPosition(zdiv){
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 100;
    var w = $(window).width() - 100;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh,nw];    
}

function animateDiv(zdiv){
    var newq = makeNewPosition(zdiv);
    var oldq = $(zdiv).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    $(zdiv).animate(
	    { top: newq[0], left: newq[1] },
	    {
	      duration: speed,
              step: function(){ addRotate(zdiv,1); /* hint... */ },
              complete: function(){ animateDiv(zdiv); }
	    }
	    );
    $("#cons").append(zdiv+" going to ["+newq[0]+","+newq[1]+"]<br/>");
    updateScroll();
};

function calcSpeed(prev,next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = Math.random()/2;
    if(speedModifier<0.05) speedModifier = 0.05;
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
}

}

