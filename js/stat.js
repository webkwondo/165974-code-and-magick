'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BLEED = 20;
var BAR_GAP = 50;
var FONT_GAP = 16;
var CHART_HEIGHT = 150;
var CHART_INDENT = 25;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = CHART_HEIGHT - GAP;
var chartX = CLOUD_X + BLEED;
var legendY = CLOUD_Y + BLEED + FONT_GAP;
var legendHeight = legendY + FONT_GAP;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  var offset = 10;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + CLOUD_HEIGHT / 3);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - offset);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - offset, y + CLOUD_HEIGHT / 3);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; typeof arr !== 'undefined' && arr.length > 0 && i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', chartX, legendY);
  ctx.fillText('Список результатов:', chartX, legendY + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var k = times[i] / maxTime;
    var barHeight = MAX_BAR_HEIGHT * k;
    var randomSaturation = Math.round(Math.random() * (100 - 40) + 40);
    ctx.fillText(Math.round(times[i]), chartX + CHART_INDENT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + BLEED + legendHeight + MAX_BAR_HEIGHT * (1 - k));
    ctx.fillText(players[i], chartX + CHART_INDENT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + BLEED + legendHeight + GAP + MAX_BAR_HEIGHT + FONT_GAP);
    ctx.fillStyle = 'hsl(241, ' + randomSaturation + '%, 50%)';
    if (players[i] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(chartX + CHART_INDENT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + BLEED + legendHeight + GAP + MAX_BAR_HEIGHT * (1 - k), BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
  }
};
