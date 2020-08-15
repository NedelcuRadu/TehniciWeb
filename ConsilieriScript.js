//set preference units
var originalRulerPref = app.preferences.rulerUnits;
var originalTypePref = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;

//CONSTANTE
var size = 1; //IN CAZ CA TREBUIE FACUTE MAI MICI/MARI
var imgWidth = 320*size;
var prefabHeight = 400*size;
var margine = 84; // MINIM 84 
var margine_jos = 36; //MINIM 36
var spatiu_lateral = 20*size;
var spatiu_jos = 40*size;


var docHeight = 2551;
var docWidth = 1789;
var doc_name = "MachetaConsilieri"
var docRef = app.documents.add(docWidth, docHeight, 300, doc_name, NewDocumentMode.CMYK);

var color = new RGBColor();
color.hexValue = "0f142d"; //Culoarea textului
//var inputFolder = Folder.selectDialog("Select a folder to process");
var inputFolder = new Folder("/e/Consilieri/NormalizedPhotos/");
var fileList = inputFolder.getFiles("*");

var startx = margine;
var starty = margine_jos;
for (var i = 0; i < fileList.length; i++) {
    createImageLayer(decodeURI(fileList[i]), startx, starty);

    startx += imgWidth + spatiu_lateral;
    if (docWidth - startx - margine < imgWidth) {
        startx = margine;
        starty += prefabHeight + spatiu_jos;
    }

}

function createTextLayer(text, x, y) {
    app.activeDocument = docRef;
    // Added the Art Layer to the document.
    var textLayer = docRef.artLayers.add();

    // Set the kind of Art Layer to TEXT. Can say now it’s a TextLayer.
    textLayer.kind = LayerKind.TEXT;

    // TextItem of the text layer.
    var textItem = textLayer.textItem;

    // TextItem type : Point or Paragraph.
    textItem.kind = TextType.POINTTEXT;
    //Justification could be left, right or center.
    textItem.justification = Justification.CENTER;
    textItem.color.rgb = color;
    textItem.size = 10;
    textItem.contents = text;
    // Position/coordinate at which the text has to be placed in the document.
    MoveLayerTo(textLayer, x, y);
    return textLayer;
}

function MoveLayerTo(fLayer, fX, fY) {

    var Position = fLayer.bounds;
    Position[0] = fX - Position[0];
    Position[1] = fY - Position[1];

    fLayer.translate(-Position[0], -Position[1]);
}

function createImageLayer(path, x, y) {
    app.open(new File(path));
    app.activeDocument.activeLayer.duplicate(app.documents.getByName(doc_name));
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    app.activeDocument = docRef;
    var imgLayer = docRef.activeLayer;
    MoveLayerTo(imgLayer, x, y);

    path = path.substr(path.lastIndexOf("/") + 1);
    path = path.substr(1, path.lastIndexOf(".") - 1);
    var nume = path.substr(0, path.lastIndexOf("-"));
    var job = path.substr(path.lastIndexOf("-") + 1);
    groupLayers(nume, createTextLayer(nume, x, y + imgWidth+10*size), createTextLayer("- " + job + " -", x, y + imgWidth+25*size), imgLayer);
}


function alignLayers(layer1, layer2) {
    var Hoffset = (layer1.width - layer2.width) / 2;
    var Voffset = (layer1.height - layer2.height) / 2;

    layer1.translate(Hoffset, 0);
}

function groupLayers(nume, layer1, layer2, layer3) {
    var newGroup = app.activeDocument.layerSets.add();
    newGroup.name = nume;
    layer1.move(newGroup, ElementPlacement.PLACEATEND);
    layer2.move(newGroup, ElementPlacement.PLACEATEND);
    layer3.move(newGroup, ElementPlacement.PLACEATEND);
    newGroup.resize( size*100, size*100, AnchorPosition.MIDDLECENTER );
}