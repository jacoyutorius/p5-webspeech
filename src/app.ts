import p5 from "p5";

// https://infosmith.biz/blog/it/p5js-technique
const sketch = (p: p5) => {
  let recognition;
  let messages = [];

  p.setup = () => {
    p.createCanvas(innerWidth, innerHeight);
    p.background("#111");
    p.frameRate(10);

    recognition = new webkitSpeechRecognition();
    console.log({recognition});
    recognition.continuous = true; 
    recognition.interimResults = true; 
    recognition.lang = "ja-JP";
    recognition.addEventListener("result", onResult);
    recognition.addEventListener("end", onEnd);
    recognition.start();
  }

  p.draw = () => {
    const message = messages.shift();
    
    if (message) {
      console.log({message});

      p.background("#111");
      p.textSize(32);
      p.fill(p.color("#fff"));
      p.text(message[0].transcript, innerWidth/2 - 50, innerHeight/2);
    }
  }

  function onResult(event) {
    recognition.stop();
    messages.push(event.results[0]);
  }

  function onEnd() {
    recognition.start();
  }
}

new p5(sketch);