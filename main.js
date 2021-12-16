img = "";
Status = "";
objects = [];
namee = document.getElementById("object_name");


function preload()
{

}
function setup()
{
    canvas = createCanvas(380, 380);
   
    video = createCapture(VIDEO);
    video.size(380, 280);
    video.hide();

    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded()
{
    console.log("Model loaded!!")
    Status = true;
    
}
function draw()
{
    image(video, 0, 0, 380, 380);
   /*fill("#FF0000");
   text("dog", 45, 75);
   noFill();
   stroke("#FF0000");
   rect(30, 60, 450, 350);
   
   fill("#FF0000");
   text("cat", 320, 120);
   noFill();
   stroke("#FF0000");
   rect(300, 90, 270, 320); */

   if( Status != "")
  {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
         for ( i = 0; i < objects.length; i++)
         {
            
        
             document.getElementById("status").innerHTML = "Status : Object detected!!!";
             document.getElementById("noofobjects").innerHTML = " No. of objects detected : " + objects.length;

             fill(r, g, b);
             percent = floor(objects[i].confidence * 100);
             text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y );
             noFill();
             stroke(r, g, b);
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
             console.log(objects[i].label);

             if(objects[i].label == namee)
             {
                 document.getElementById("found").innerHTML = namee + "  found!";
                 song.stop();
             }
             else
             {
                 song.play();
                 document.getElementById("person").innerHTML = "Person not found! Seek help!!";
             }
         }
  }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects...";
    namee = document.getElementById("object_name").value;
}


function gotResult(error, results)
{
  if(error)
  {
      console.log(error);
  }
  console.log(results);
  objects = results;
}