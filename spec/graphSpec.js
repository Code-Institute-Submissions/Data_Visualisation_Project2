describe("test d3.js", function() {
  var c;

  beforeEach(function () {
    //c = pieChart("#status_balance_pie");
    c = pieChart();
    c.render();
  });

  afterEach(function () {
    d3.selectAll("svg").remove();
  });

  describe("the svg", function () {
    it("should be created", function(){
      expect(getSvg()).not.toBeNull();
    });

    it("should have the center x coordinate position of 195", function () {
      expect(getSvg().attr("cx")).toBe("195");
    });

    it("should have the position y coordinate position of 175", function () {
      expect(getSvg().attr("cy")).toBe("175")
    });
  });

  function getSvg() {
    return d3.select("svg");
  }
});

























