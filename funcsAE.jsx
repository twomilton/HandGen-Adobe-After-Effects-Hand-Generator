//********************		HAND GEN PROGRAM FUNCTIONS		**********************//


// Random Integers for Color Variations
function rNm (min, max) {
	return Math.random()*(max - min) + min;
}

// Random Positive or Negative 1
var iO = Math.random() < 0.5 ? -1 : 1;

// New Shape Layer
function newShapeLayer (rep, layName, layerColorNumber) {

		// Get/Set New Layer in Comp
	var layerCollection = app.project.item(rep).layers;
	var theShapeLayer = layerCollection.addShape();

		// Naming Cloud Layer
	theShapeLayer.name = layName;

		// Define "Cloud Layer"s Layer's Color
	var theLayerCollection = app.project.item(rep).layer(theShapeLayer.name);
	theLayerCollection.label = layerColorNumber;

	return theShapeLayer;

}

// Add New Shape to Shape Layer
function addTheShape (shapeLayer, grpName, shapeSet, fillColor, shapesPosition, shapeScale) {

			// ADD SHAPE GROUP
		var shapeGroup = shapeLayer.property("ADBE Root Vectors Group")
		.addProperty("ADBE Vector Group");

			// NAME SHAPE GROUP
		shapeGroup.name = grpName;

			// ADD PATH
		var shapePath = shapeGroup.property("ADBE Vectors Group")
		.addProperty("ADBE Vector Shape - Group");
		shapePath.property("Path").setValue(shapeSet);

			// ADD FILL
		var shapeFill = shapeGroup.property("ADBE Vectors Group")
		.addProperty("ADBE Vector Graphic - Fill");

			// DECLARE COLOR
		var shapeColor = shapeFill.property("ADBE Vector Fill Color");
		shapeColor.setValue(fillColor);

			// POSITION
		var shpTransGrp = shapeGroup.property("ADBE Vector Transform Group");
		var shpPosition = shpTransGrp.property("ADBE Vector Position");
		shpPosition.setValue(shapesPosition);

			// SCALE
		var shpScale = shpTransGrp.property("ADBE Vector Scale");
		shpScale.setValue(shapeScale);

}

// Change Layer Anchor Position
function swapAnchor (whichLayer, newAnchor) {

		// Layer Transform Group
	var layerTransformGrp = whichLayer.property("ADBE Transform Group");

		// Position Layer Anchor Point
	var theLayerAnchor = layerTransformGrp.property("ADBE Anchor Point");
	theLayerAnchor.setValue(newAnchor);

}

// Duplicate, Rename, Position, & Scale New Cloud Shape Group
function toDuplicate (shapeLayer, newName, newPos, newScale) {

		// Duplicate Path
	var dupShapeGroup = shapeLayer.property("ADBE Root Vectors Group")
	.property("ADBE Vector Group").duplicate();

		// New Name
	dupShapeGroup.name = newName;

		// Re Position
	var dupShapeTransGrp = dupShapeGroup.property("ADBE Vector Transform Group");
	var dupShapeGrpPosition = dupShapeTransGrp.property("ADBE Vector Position");
	dupShapeGrpPosition.setValue(newPos);

		// Re Scale
	var dupShapeGrpScale = dupShapeTransGrp.property("ADBE Vector Scale");
	dupShapeGrpScale.setValue(newScale);

}

// Add Stroke Line & Remove Fill from Shape Group
function addStrokeDeleteFill (shapeLayer, grpName, lineColor, lineWt) {

			// GET SHAPE GROUP
		var shapeGroup = shapeLayer.property("ADBE Root Vectors Group")
		.property(grpName);

			// DELETE FILL
		var shapeFill = shapeGroup.property("ADBE Vectors Group")
		.property("ADBE Vector Graphic - Fill").remove();

			// ADD STROKE
		var shapeStroke = shapeGroup.property("ADBE Vectors Group")
		.addProperty("ADBE Vector Graphic - Stroke");

			// DECLARE COLOR
		var lnColor = shapeStroke.property("ADBE Vector Stroke Color");
		lnColor.setValue(lineColor);

			// DECLARE WIDTH
		var lnWeight = shapeStroke.property("ADBE Vector Stroke Width");
		lnWeight.setValue(lineWt);

			// ROUNDING OFF LINE CAPS
		shapeStroke.property("ADBE Vector Stroke Line Cap").setValue(2);
}
