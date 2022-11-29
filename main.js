 prediction1=" "
 prediction2=" "
 
 Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aFnh3hZKn/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speakData1="The first prediction is"+prediction1;
    speakData2="The second prediction is"+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('capture_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results)
    document.getElementById("resultemotionname1").innerHTML=results[0].label;
    document.getElementById("resultemotionname2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2-results[1].label;
    speak();
    if(results[0].label=="happy"){
        document.getElementById("resultemoji1").innerHTML="&#128522;";
    }
    if(results[0].label=="sad"){
        document.getElementById("resultemoji1").innerHTML="&#128532;";
    }
    if(results[0].label=="angry"){
        document.getElementById("resultemoji1").innerHTML="&#128548;";
    }
    if(results[0].label=="funny"){
        document.getElementById("resultemoji1").innerHTML="&#128540;";
    }
    if(results[1].label=="funny"){
        document.getElementById("resultemoji2").innerHTML="&#128540;";
    }
    if(results[1].label=="happy"){
        document.getElementById("resultemoji2").innerHTML="&#128522;";
    }
    if(results[1].label=="sad"){
        document.getElementById("resultemoji2").innerHTML="&#128532;";
    }
    if(results[1].label=="angry"){
        document.getElementById("resultemoji2").innerHTML="&#128548;";
    }
}
}