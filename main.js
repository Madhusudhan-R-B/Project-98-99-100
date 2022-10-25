var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition;

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event){
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if(Content=="selfie"){
        console.log("taking selfie in 5 seconds");
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;

    Webcam.attach(camera);
    photoId = 1;
    speak_data = document.getElementById("textbox").innerHTML;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    setTimeout(function(){
        take_snapshot();

        console.log(photoId);
        photoId = 2;
        speak_data = "Taking your second selfie in 5 seconds";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }, 5000);
    setTimeout(function(){
        take_snapshot();

        photoId = 3;
        speak_data = "Taking your third selfie in 5 seconds";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }, 10000);
    setTimeout(function(){
        take_snapshot();
    }, 15000);
}

camera = document.getElementById("camera");
Webcam.set({
    width:360,
    height:260,
    image_format:"jpeg",
    jpeg_quality: 90
});

function take_snapshot(){
    Webcam.snap(function(data_uri){
        if(photoId == 1){
            document.getElementById("photo1").innerHTML = '<img id="photo1_image" src="'+data_uri+'"/>';
        }
        if(photoId == 2){
            document.getElementById("photo2").innerHTML = '<img id="photo2_image" src="'+data_uri+'"/>';
        }
        if(photoId == 3){
            document.getElementById("photo3").innerHTML = '<img id="photo3_image" src="'+data_uri+'"/>';
        }
    });
}