img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('Me and champ.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Modal Loaded!");
    status = true;
    objectDetector.detect(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    } 
}

function draw() {
    image(img, 0, 0, 640, 420);
    /*
    fill("#FF0000");
    text("Champ", 190, 210);
    noFill();
    stroke("#FF0000");
    rect(180, 200, 450, 350);

    fill("#FF0000");
    text("Karthikeya", 25, 25);
    noFill();
    stroke("#FF0000");
    rect(00, 00, 450, 350); */

    if(status != "") {
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].lable + " " + percent + "%",objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}