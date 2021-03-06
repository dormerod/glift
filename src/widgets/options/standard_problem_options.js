/**
 * Additional Options for the GameViewers
 */
glift.widgets.options.STANDARD_PROBLEM = {
  stoneClick: function(event, widget, pt) {
    var currentPlayer = widget.controller.getCurrentPlayer();
    var data = widget.controller.addStone(pt, currentPlayer);
    var problemResults = glift.enums.problemResults;
    if (data.result === problemResults.FAILURE) {
      // Illegal move -- nothing to do.  Don't make the player fail based on
      // an illegal move.
      return;
    }
    widget.applyBoardData(data);
    var callback = widget.sgfOptions.problemCallback;
    if (data.result === problemResults.CORRECT) {
        widget.iconBar.setCenteredTempIcon('multiopen-boxonly', 'check', '#0CC');
        widget.correctness = problemResults.CORRECT;
        callback(problemResults.CORRECT);
    } else if (data.result === problemResults.INCORRECT) {
      widget.iconBar.destroyTempIcons();
      widget.iconBar.setCenteredTempIcon('multiopen-boxonly', 'cross', 'red');
      widget.correctness = problemResults.INCORRECT;
      callback(problemResults.INCORRECT);
    }
  },

  showVariations: glift.enums.showVariations.NEVER,

  // TODO(kashomon): Consider using multiopen-boxonly instead of checkbox
  icons: [
    'undo-problem-move',
    'problem-explanation',
    'multiopen-boxonly'
  ],

  controllerFunc: glift.controllers.staticProblem,

  statusBarIcons: [
    'fullscreen'
  ]
};
