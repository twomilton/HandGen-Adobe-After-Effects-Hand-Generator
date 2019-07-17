//****************************HAND GEN FINGERS*******************************//


			//	4	CREATE FOUR "RUBBER HOSE" STYLE FINGERS ON SHAPE LAYER IN COMP


			// Create New Layer for Shapes
		var fngShapeLayer = newShapeLayer(j, "FINGERS", 10);

			// Change Layer's Anchor Position to *Follow Eventually* Palm's Anchor
	//	swapAnchor(fngShapeLayer, nwPvAnchor);

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
	//	app.project.item(j).layer("FINGERS").moveBefore(pvShapeLayer);
