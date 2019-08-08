/**************************************

		HAND GENERATOR SCRIPT
Creates Stylistic Cartoon Hand
in  1080p Resolution, 1:1 Aspect Ratio
				v1.0.1
		(c) LUX LUV STUDIOS

**************************************/


//****PROGRAM GLOBALS & FUNCTIONS****//

#include "functions.jsx"
#include "controller.jsx"

//**** PROG ****//

	// Start Undo Group
app.beginUndoGroup("Generate Hands");


	// Start of Number of Hands to Make Function
function makeHand(reps) {

	var existItems = app.project.items.length;
	var cleanRun;
	if (existItems == 0) {
		cleanRun = 0;
	}else {
		cleanRun = existItems;
		reps = reps + existItems;
	}

	for (var j = 1; j <= reps; j++) {

		// BASE SKIN COLOR
		var baseSkinColor = [rNm(1,1), rNm(1, 0.8), rNm(1, 0.8), 1] * rNm(0.1, 1);


			//	1	CREATE NEW COMP


		var theComp = app.project.items;
		theComp.addComp("Hand Model " + j, 1080, 1080, 1.0, 50, 30)


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


			//	3	ADD "HAND" (PALM) SHAPE TO NEW SHAPE LAYER IN COMP


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


			//	4	CREATE FOUR "RUBBER HOSE" STYLE FINGERS ON SHAPE LAYER IN COMP

		#include "fingers.jsx"


			//	5	CREATE "RUBBER HOSE" STYLE THUMB ON NEW SHAPE LAYER IN COMP


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
		var tmbTanTwoIn = [45, 0.25*palmHeight];
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


			//	6	ADD NULL LAYER TO COMP & ATTATCH ALL LAYERS


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

		// Delete Background Layer for Adding Hands to Body Prog
		if(!bGs){
			app.project.item(j).layer("BG LAYER").remove();
		}

			//	7	ADD COMP TO RENDER QUEUE

		if(addToQueue){
			var bgComp = app.project.item(j);
			var rQ = app.project.renderQueue;
			rQ.items.add(bgComp);
		}
	}
}

// Number of Faces to Produce
makeHand(handRunReps);


// End the undo group
app.endUndoGroup();


	//	8	SEND RENDER QUEUE TO MEDIA ENCODER & RENDER


if(ameRenderSend){
	// Queue Comps in AME to Media Encoder
	if (app.project.renderQueue.canQueueInAME == true)
		{
		// Send queued items to AME, but do not start rendering.
		app.project.renderQueue.queueInAME(yesQueue);
		}
}
