(function() {
  var previous = d3.select("#previous"),
      current = d3.select("#current"),
      next = d3.select("#next"),
      query = "",
      previousIndex,
      currentIndex = +location.hash.substring(1) || 0,
      nextIndex;

  resize();
  step(0);

  d3.selectAll("iframe").on("load", function() {
    this.contentWindow.focus();

	d3.select(this.contentWindow).on("click", function() {
console.log("x="+d3.event.x);
console.log("y="+d3.event.y);

	});
    d3.select(this.contentWindow).on("keydown", function() {

console.log(d3.event.keyCode);	
      switch (d3.event.keyCode) {
        case 39: // right arrow
        case 32: // space
        case 34: { // page down
          step(+1);
          break;
        }
        case 8: { // delete
          step(d3.event.shiftKey ? +1 : -1);
          break;
        }
        case 37: // left arrow
        case 33: { // page up
          step(-1);
          break;
        }
        case 36: { // home
          currentIndex = 0;
          step(0);
          break;
        }
        case 35: { // end
          currentIndex = slides.length - 1;
          step(0);
          break;
        }
        default: return;
      }
      d3.event.preventDefault();
    });
  });

  d3.select(window).on("resize", resize).on("hashchange", function hashchange() {
    var that = d3.select(this).on("hashchange", null);
    currentIndex = +location.hash.substring(1);
    step(0);
    that.on("hashchange", hashchange);
  });

  function resize() {
    d3.select("body").style("margin-top", (window.innerHeight - 800) / 3 + "px");
  }

  function step(delta) {
    if (delta > 0) {
      var temp = previous;
      previousIndex = currentIndex;
      previous = current.attr("id", "previous");
      currentIndex = nextIndex;
      current = next.attr("id", "current");
      nextIndex = nextIndex >= slides.length - 1 ? 0 : nextIndex + 1;
      next = temp.attr("id", "next");
    } else if (delta < 0) {
      var temp = next;
      nextIndex = currentIndex;
      next = current.attr("id", "next");
      currentIndex = previousIndex;
      current = previous.attr("id", "current");
      previousIndex = previousIndex <= 0 ? slides.length - 1 : previousIndex - 1;
      previous = temp.attr("id", "previous");
    } else {
      nextIndex = currentIndex >= slides.length - 1 ? 0 : currentIndex + 1;
      previousIndex = currentIndex <= 0 ? slides.length - 1 : currentIndex - 1;
    }
    location.hash = currentIndex;
console.log(slides[currentIndex]);
console.log(slides[nextIndex]);
    previous.attr("src", slides[previousIndex]);
    current.attr("src", slides[currentIndex]);
    next.attr("src", slides[nextIndex]);
  }
})();
