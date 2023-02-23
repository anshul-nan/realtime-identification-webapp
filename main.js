function setup() {
  canvas = createCanvas(270, 270);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded()
{
  console.log('Model Loaded!');
}
function preload()
{

}
function draw()
{
  image(video,0,0,270,270);
  classifier.classify(video,gotResult);

}

previous_results = '';
function gotResult(error,results)
{
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence > 0.5)&&(previous_results != results[0].label)){
      console.log(results);
      previous_results = results[0].label;
    var synth = window.speechSynthesis;
      speak_data='Object Detected is-'+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById('object_name').innerHTML = results[0].label;
      document.getElementById('accuracy_name').innerHTML=results[0].confidence.toFixed(3);
    }
  }
}




