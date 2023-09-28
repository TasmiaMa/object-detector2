status=""
video=""

function preload(){
    video=createVideo("video.mp4")
    video.hide()
}


function setup(){
    canvas=createCanvas(480,480)
    canvas.center()
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modal_loaded)
    document.getElementById("status").innerHTML="status: Object is detecting"
}



function modal_loaded(){
    console.log("model is loaded")
    status=true
    video.loop()
    video.speed(1)
    video.volume(0)
}


function draw(){
    image(video,0,0,480,460)
    if (status!="") {
    objectDetector.detect(video,got_result)        
    }
}


function got_result(error,results){
if (error) {
    console.log(error)
} else {
   console.log(results) 
   for (let i = 0; i < results.length; i++) {
    document.getElementById("status").innerHTML="status:object is detected"
   document.getElementById("number_of_objects").innerHTML="number of objects detected:"+results.length
   fill("red")
   percent=floor(results[i].confidence*100)
   text(results[i].label+" "+percent+"%",results[i].x,results[i].y)
   noFill()
   stroke("red")
   rect(results[i].x,results[i].y,results[i].width,results[i].height)
   }
   
}
}