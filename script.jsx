/******************************************************************************

							HAND GENERATOR SCRIPT
						Creates Stylistic Cartoon Hand
					in  1080p Resolution, 1:1 Aspect Ratio
									v1.0
							(c) LUX LUV STUDIOS

******************************************************************************/

						/**	Version 1.0	***/
//		Generates One Basic Humanoid Hand in a Rubber Hose Cartoon Style

//****************************PROGRAM FUNCTIONS*********************************//


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

//***************************END of PROGRAM FUNCTIONS*********************************//


					// Start Undo Group
app.beginUndoGroup("Generate Hands");


// Start of Number of Hands to Make Function
var runReps = 1;

function runIt (reps) {

	var existItems = app.project.items.length;
	var cleanRun;
	if (existItems == 0) {
		cleanRun = 0;
	}else {
		cleanRun = existItems;
		reps = reps + existItems;
	}

	for (var j = 1 + cleanRun; j <= reps; j++) {

							// BASE SKIN COLOR
		var baseSkinColor = [rNm(1,1), rNm(1, 0.8), rNm(1, 0.8), 1] * rNm(0.1, 1);


						//	1	CREATE NEW COMP


		var theComp = app.project.items;
		theComp.addComp("Hand Model " + (j - cleanRun), 1080, 1080, 1.0, 50, 30)


						//	2	ADD SOLID BG LAYER TO COMP


		.layers.addSolid([ 1 - baseSkinColor[0], 
						1 - baseSkinColor[1], 
						1 - baseSkinColor[2] ], 
						"BG LAYER", 3840, 2160, 1.0, 50);

			// Define "BG LAYER"s Layer Color
		//var bgLayerCol = app.project.item(j).layer("BG LAYER");
		//bgLayerCol.label = 8;

			// Open Comp in Viewer
		app.project.item(1).openInViewer();


						//	4	ADD "HAND" (PALM) SHAPE TO NEW SHAPE LAYER IN COMP


			// Create New Layer for Hand Shape
		var plmShapeLayer = newShapeLayer(j, "PALM", 9);
			
		var plmVertOne = [rNm(-200,-200), 0];
		var plmVertTwo = [0, rNm(200,200)];
		var plmVertThree = [Math.abs(plmVertOne[0]), 0];
		var plmVertFour = [0, -plmVertTwo[1]];

			//Defining Hand Characteristics
		var palmGirth = plmVertThree[0] - plmVertOne[0];
		var palmWidth = rNm(0,0);
		var wrstGirth = rNm(0,0);
		var wrstWidth = rNm(plmVertOne[1], plmVertOne[1]);
		var palmHeight = plmVertTwo[1] * 2;

			//In & Out Tangents
		var plmTanOneIn = [0, .5*plmVertFour[1]];
		var plmTanOneOut = [0, .5*plmVertTwo[1]];

		var plmTanTwoIn = [.5*plmVertOne[0], 0];
		var plmTanTwoOut = [.5*plmVertThree[0], 0];

		var plmTanThreeIn = [0, .5*plmVertTwo[1]];
		var plmTanThreeOut = [0, .5*plmVertFour[1]];

		var plmTanFourIn = [.5*plmVertThree[0], 0];
		var plmTanFourOut = [.5*plmVertOne[0], 0];

			//Defining the Shape of Hand
		var plmShape = new Shape();
		plmShape.vertices = [plmVertOne, plmVertTwo, plmVertThree, plmVertFour];
		plmShape.inTangents = [plmTanOneIn, plmTanTwoIn, plmTanThreeIn, plmTanFourIn];
		plmShape.outTangents = [plmTanOneOut, plmTanTwoOut, plmTanThreeOut, plmTanFourOut];
		plmShape.closed = true;

			// Color Ways for Hand Skin
		var plmColors = baseSkinColor;
			// Hand Shape Position
		var plmPos = [0,0];
			// Hand Shape Scale
		var plmScale = [100,100];

			// Add the shape to this Layer
		addTheShape(plmShapeLayer, "Hand Palm", plmShape, plmColors, plmPos, plmScale);


						//	X	CREATE FOUR "RUBBER HOSE" STYLE FINGERS ON SHAPE LAYER IN COMP


			// Create New Layer for Shapes
		var fngShapeLayer = newShapeLayer(j, "FINGERS", 10);

			// Change Layer's Anchor Position to *Follow Eventually* Palm's Anchor
		//swapAnchor(fngShapeLayer, nwPvAnchor);

			// Defining Size of Fingers
		// fng size is based on palmGirth
		var fngSize;
		if (palmGirth < 50) {
			fngSize = rNm(50,75);
		
		} else if (palmGirth > 100) {
			fngSize = rNm(75,90);
		}
		
			//Defining Shape Vertices
		var fngVertOne = [ plmVertOne[0] + (0.5 * fngSize), 0 ]; 
		var fngVertTwo = [ fngVertOne[0],  - .95*palmHeight ];
		
			//Defining Shape Tangent Pairs
		var fngTanOneIn = [0,0];
		var fngTanOneOut = [0,0];
				// brows arch set
		var fngTanTwoIn =[-20,100];
		var fngTanTwoOut = [0,0];
		
			//Defining the Shape of the Fingers
		var fngShape = new Shape();
		fngShape.vertices = [fngVertOne, fngVertTwo];
		fngShape.inTangents = [fngTanOneIn, fngTanTwoIn];
		fngShape.outTangents = [fngTanOneOut, fngTanTwoOut];
		fngShape.closed = false;

			// Defining Finger Color Ways
		var fngColors = plmColors;

			// Defining fng Position
		var xPos = 0;
		var yPos = 0;
		var fngPos = [ xPos, yPos ];

			// Defining fng Scale
		var fngScale = [rNm(100,100), rNm(100,100)];

			// Adding fng Shape to Layer
		addTheShape(fngShapeLayer, "Pinky Finger", fngShape, fngColors, fngPos, fngScale, fngColors);

			// Swap Fill for Stroke
		addStrokeDeleteFill(fngShapeLayer, "Pinky Finger", fngColors, fngSize);
					
			// Duplicate for the Rest of the Fingers
		var nwExPos = (palmGirth / 5) + (fngSize/4)	;
		var fngGrpNm;
		for (var i = 1; i < 4; i++) {		
			switch(i) {
				case 1:
					fngGrpNm = "Ring Finger";
					fngScale[1] = 1.15 * fngScale[1];
					break;
				case 2:
					fngGrpNm = "Middle Finger";
					fngScale[1] = 1.05 * fngScale[1];
					break;
				default:
					fngGrpNm = "Pointer Finger";		        
					fngScale[1] = 0.85 * fngScale[1];
			}		
			toDuplicate(fngShapeLayer,fngGrpNm, [fngPos[0]+=nwExPos, fngPos[1]], fngScale);
		}

			// Move fngS Layer Over Pelvis Layer
		//app.project.item(j).layer("FINGERS").moveBefore(pvShapeLayer);


			//	X	CREATE THUMB ON NEW SHAPE LAYER IN COMP


			// Create New Layer for Thumb Shape
		var tmbShapeLayer = newShapeLayer(j, "THUMB", 10);

			// Change Layer's Anchor Position to *Follow Eventually* Pelvis Anchor
		//swapAnchor(fngShapeLayer, nwPvAnchor);

			// Defining Size of fngs
		// fng size is based on palmGirth

		if (palmGirth < 50) {
			tmbSize = rNm(50,75);
		
		} else if (palmGirth > 100) {
			tmbSize = rNm(75,90);
		}
		
			//Defining Shape Vertices
		var tmbVertOne = [ plmVertThree[0] - (0.10 * tmbSize), 0.05 * palmHeight ]; 
		var tmbVertTwo = [ plmVertThree[0] + 100, -0.5 * palmHeight ];
		
			//Defining Shape Tangent Pairs
		var tmbTanOneIn = [0,0];
		var tmbTanOneOut = [0,0];
				// thmb arch handle
		var tmbTanTwoIn =[45, 0.25*palmHeight];
		var tmbTanTwoOut = [0,0];
		
			//Defining the Shape of the fngs
		var tmbShape = new Shape();
		tmbShape.vertices = [tmbVertOne, tmbVertTwo];
		tmbShape.inTangents = [tmbTanOneIn, tmbTanTwoIn];
		tmbShape.outTangents = [tmbTanOneOut, tmbTanTwoOut];
		tmbShape.closed = false;

			// Defining fng Color Ways
		var tmbColors = plmColors;

			// Defining fng Position
		var xPosition = 0;
		var yPosition = 0.05 * palmHeight;
		var tmbPos = [ xPosition, yPosition ];

			// Defining Thumb Scale
		var tmbScale = [rNm(100,100), rNm(100,100)];

			// Adding Thumb Shape to Layer
		addTheShape(tmbShapeLayer, "the Thumb", tmbShape, tmbColors, tmbPos, tmbScale, tmbColors);

			// Swap Fill for Stroke
		addStrokeDeleteFill(tmbShapeLayer, "the Thumb", tmbColors, tmbSize);
					
			// Move THUMB Layer Over ____ Layer
		//app.project.item(j).layer("THUMB").moveBefore(___ShapeLayer);


			//	X	ADD NULL LAYER TO COMP & ATTATCH ALL LAYERS

		var thisComp = app.project.item(j);
		thisComp.layers.addNull(50);
		var handNull = thisComp.layer(1);
		handNull.name = "HAND RIG TARGET NULL";

		// Set Handle Position
		var thisComp = app.project.item(j);

		handNull.property("ADBE Transform Group").property("ADBE Position")
			.setValue([thisComp.width/2, 
				(thisComp.height/2) + plmVertTwo[1] ]);	 

		// Parent Layers to Null Object

		//Loop through Layers by index and parent to Null Layer
		var i, curLayer;  
		for (i = 2; i < thisComp.layers.length; i++) {  
			curLayer = thisComp.layers[i];  
				//add Parent  
			curLayer.parent = handNull;  
		};  

		// Reposition Hand
		handNull.property("ADBE Transform Group").property("ADBE Position")
			.setValue([(thisComp.width/2) - (0.1*(thisComp.width/2)), 
				(thisComp.height/2) + 0.70*(thisComp.height/2) ]);	 	      


			//	10	ADD COMP TO RENDER QUEUE

		/*
		var bgComp = app.project.item(j);
		var rQ = app.project.renderQueue;
		rQ.items.add(bgComp);
		*/

	}
}

// Number of Faces to Produce
runIt(runReps);

	//	12	RENDER COMP

	// Queue Comp in AME to Media Encoder
//rQ.queueInAME(false);				


// End the undo group
app.endUndoGroup();




/*
			CAN REUSE THIS BLOCK FOR FINGER NAILS


		// Create New Layer for Shapes
	var ebrwShapeLayer = newShapeLayer(j, "EYE BROWS", 10);

			// Change Layer's Anchor Position	
	//var ebrwAnchor = [1920,1080];
	//swapAnchor(ebrwShapeLayer, ebrwAnchor);
	
		//Defining Shape Vertices
	var ebrwVertOne = [ plmVertOne[0] + 20, -15]; 
	
	var archPoint = rNm(-55, -55 );
	var ebrwVertTwo = [archPoint, rNm(-23,-15)];
	
	var ebrwVertThree = [ rNm(-3,-1), rNm(-30, -10)];
	
		//Defining Shape Tangent Pairs
	var ebrwTanOneIn = [rNm(10, 20), rNm(-20, -10)];
	var ebrwTanOneOut = [rNm(0, 5), rNm(0, 5)];
			// brows arch set
	var ebrwTanTwoIn =[0,0];
	var ebrwTanTwoOut = [5,-2];
			// brows inlet
	var ebrwTanThreeIn = [0,0];
	var ebrwTanThreeOut = [rNm(-30, -15), rNm(-20, -10)];

		//Defining the Shape of the Brows
	var ebrwShape = new Shape();
	ebrwShape.vertices = [ebrwVertOne, ebrwVertTwo, ebrwVertThree];
	ebrwShape.inTangents = [ebrwTanOneIn, ebrwTanTwoIn, ebrwTanThreeIn];
	ebrwShape.outTangents = [ebrwTanOneOut, ebrwTanTwoOut, ebrwTanThreeOut];
	ebrwShape.closed = true;

		// Defining Brow Color Ways
	var ebrwColors = [rNm(0, 0), rNm(0, 0), rNm(0,0), 1];

		// Defining Brow Position
	var xPosition = -10;
	var yPosition = rNm(-25,-25);
	var ebrwPosition = [ xPosition, yPosition ];

		// Defining Brow Scale
	var ebrwScale = [rNm(100,115), rNm(100,115)];

		// Adding Brow Shape to Layer
	addTheShape(ebrwShapeLayer, "Eye Brow", ebrwShape, ebrwColors, ebrwPosition, ebrwScale);
				
		// Duplicate for Right Brow
	toDuplicate(ebrwShapeLayer, "Right Brow", [-xPosition, yPosition], [-ebrwScale[0], ebrwScale[1]]);
*/
		/*	//Might Use this Code Block to Animate Blinking, or Something
			var cldAnimPos = cloudShapeLayer.property("ADBE Root Vectors Group").property("Cloud " + i)
			.property("ADBE Vector Transform Group").property("ADBE Vector Position");
			cldAnimPos.setValueAtTime(0, [xPosition, yPosition]);
			cldAnimPos.setValueAtTime(50, [xPosition - (rNm(-1000,1000)), yPosition]);	
		*/
