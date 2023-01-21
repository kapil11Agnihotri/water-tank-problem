let calculateBtn = d3.select("#calculate-btn");
let inputField = d3.select("#heights-input");
let outputContainer = d3.select("#output-container");
let resultP = document.getElementById("result");

calculateBtn.on("click", function () {
  let input = inputField.property("value");
  let blockHeights = input.split(",").map(function (item) {
    return parseInt(item);
  });
  let waterUnits = calculateWater(blockHeights);
  resultP.innerHTML = "Water units: " + waterUnits;

  outputContainer.html("");
  let svg = outputContainer
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  let blockWidth = 50;
  let blockPadding = 2;
  let waterFill = "aqua";

  for (let i = 0; i < blockHeights.length; i++) {
    svg
      .append("rect")
      .attr("x", i * (blockWidth + blockPadding))
      .attr("y", 500 - blockHeights[i] * 20)
      .attr("width", blockWidth)
      .attr("height", blockHeights[i] * 20)
      .attr("fill", "yellow");
  }

  for (let i = 0; i < blockHeights.length; i++) {
    if (blockHeights[i] < Math.min(blockHeights[i - 1], blockHeights[i + 1])) {
      svg
        .append("rect")
        .attr("x", i * (blockWidth + blockPadding))
        .attr(
          "y",
          500 - Math.min(blockHeights[i - 1], blockHeights[i + 1]) * 20
        )
        .attr("width", blockWidth)
        .attr(
          "height",
          (Math.min(blockHeights[i - 1], blockHeights[i + 1]) -
            blockHeights[i]) *
            20
        )
        .attr("fill", waterFill);
    }
  }
});

function calculateWater(height) {
  let start = 0;
  let end = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let trapedWater = 0;

  while (start < end) {
    if (height[start] <= height[end]) {
      if (leftMax < height[start]) {
        leftMax = height[start];
      } else {
        trapedWater += leftMax - height[start];
      }
      start++;
    } else {
      if (rightMax < height[end]) {
        rightMax = height[end];
      } else {
        trapedWater += rightMax - height[end];
      }
      end--;
    }
  }
  return trapedWater;
}
