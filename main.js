song = "";
Status = "";
objects = [];

function setup(){
    canvas = createCanvas(400, 330);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function preload() {
    song = loadSound("music.mp3");
}

function draw(){
    image(video, 0, 0, 400, 330);

    if(Status != ""){
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";

            if( objects[i].label == "person"){
                document.getElementById("baby_found").innerHTML = "Baby Found";
                song.stop();
            }
            else{
                document.getElementById("baby_found").innerHTML = "Baby Not Found";
                song.play();
            }
        }

        if(objects.length < 0){
            document.getElementById("baby_found").innerHTML = "Baby Not Found";
            song.play();
        }
    }
}

function modelLoaded() {
    console.log("model is loaded");
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
