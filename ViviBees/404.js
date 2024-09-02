//TweenLite.ticker.fps(24)
var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  beeSVG = select('.beeSVG'),
  bee = select('#bee'),
  beeGroup = select('#beeGroup'),
  movingPath = select('#movingPath'),
  waveyLine = select('#waveyLine'),
  wingL = select('#wingL'),
  wingR = select('#wingR'),
  bulletTimeGroup = select('#bulletTimeGroup'),
  speedLinesGroup = select('#speedLinesGroup'),
  allSpeedLines = selectAll('#speedLinesGroup line'),
  mouth = select('#mouth'),
  mouthPath = mouth.getAttribute('d')



TweenMax.set(bee, {
  transformOrigin: '50% 50%'

})
TweenMax.set(bulletTimeGroup, {
  transformOrigin: '50% 50%',
  x: 500,
  y: 20

})
TweenMax.set(speedLinesGroup, {
  transformOrigin: '50% 50%',
  x: -80,
  y: 0
})
TweenMax.set(allSpeedLines, {
  drawSVG: '0% 0%'
})

TweenMax.set(wingL, {
  transformOrigin: '100% 100%'
})
TweenMax.set(wingR, {
  transformOrigin: '0% 100%'
})

var beeSmileTl = new TimelineMax({
  paused: true
});
beeSmileTl
  .to('#mouth', 0.4, {
    morphSVG: {
      shape: '#smile'
    },
    fill: '#FFF'
  })
  .to('#eyeShine', 0.6, {
    attr: {
      cx: 99
    },
    ease: Back.easeOut

  }, '-=0.4')

  .fromTo('#ting', 2, {
    scale: 0,
    rotation: -360,
    transformOrigin: '50% 50%'
  }, {
    scale: 1,
    rotation: 0
  }, '-=1')
  .to('#ting', 0.5, {
    alpha: 0,
    ease: Linear.easeNone
  }, '-=0.5')
  .to('#stinger', 0.12, {
    rotation: -13,
    transformOrigin: '100% 50%',
    repeat: 7,
    yoyo: true
  }, '-=2.3')
  .addPause()

  .to('#eyeShine', 0.6, {
    attr: {
      cx: 103
    },
    ease: Back.easeOut

  })
  .to('#mouth', 0.4, {
    morphSVG: {
      shape: mouthPath
    },
    fill: 'none'
  }, '-=0.4')

beeSmileTl.timeScale(1.5);

var beePathBezier = MorphSVGPlugin.pathDataToBezier(waveyLine.getAttribute('d'), {
  offsetX: 50, // -(bee.getBBox().width),
  offsetY: -80 // -(bee.getBBox().height)
})

var tl = new TimelineMax({
  repeat: -1,
  paused: false
});
tl.to(bee, 6, {
    bezier: {
      type: "cubic",
      values: beePathBezier,
      autoRotate: false
    },
    ease: Linear.easeNone
  })
  .to([movingPath, beeGroup], 6, {
    x: -1200,
    ease: Linear.easeNone
  }, '-=6')

function flapWings() {

  var flapTl = new TimelineMax();

  var wl = TweenMax.to(wingL, 0.09, {
    scaleY: 0.25,
    delay: 0.01,
    repeat: -1,
    skewX: 40,
    yoyo: true,
    ease: Sine.easeInOut
  })
  var wr = TweenMax.to(wingR, 0.09, {
    scaleY: 0.25,
    skewX: -40,
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut
  })

  flapTl.add(wl, 0);
  flapTl.add(wr, 0);

  return flapTl;

}

function doSpeedLines() {

  var tl = new TimelineMax({
    repeat: -1
  });
  tl.staggerTo(allSpeedLines, 1, {
      drawSVG: '30% 0%',
      ease: Linear.easeNone
    }, 1)
    .staggerTo(allSpeedLines, 2, {
      drawSVG: '100% 70%',
      ease: Linear.easeNone
    }, 1, '-=3')
    .staggerTo(allSpeedLines, 1, {
      drawSVG: '100% 100%',
      ease: Linear.easeNone
    }, 1, '-=3')

  tl.timeScale(6)
  return tl;
}


var bulletTl = new TimelineMax({paused:true});
bulletTl.from('#bullet', 1, {
    x:-40,
  ease:Back.easeOut
  })
  .to('#b', 1, {
    attr:{
      x:72
    },
  ease:Back.easeOut
  },'-=1')
  .set('#b', {
    attr:{
      x:-10
    },
  ease:Back.easeOut
  })
  .addPause()
  .to('#bullet', 1, {
    x:40,
  ease:Back.easeOut
  })
  .to('#b', 1, {
    attr:{
      x:32
    },
  ease:Back.easeOut
  },'-=1')  



function blink(){
  
  TweenMax.to('#eyeGroup', 0.1, {
    scaleY: 0.2,
    yoyo: true,
    repeat: 1,
    transformOrigin: '50% 50%',
    delay: Math.random() * 5,
    onComplete:blink
  })
}

blink();

var mainTl = new TimelineMax();
mainTl.add(tl, 0);
mainTl.add(doSpeedLines(), 0);

mainTl.add(flapWings(), 0)

mainTl.timeScale(3);
bulletTl.timeScale(3);

bulletTimeGroup.addEventListener('click', function(e) {

  if (mainTl.timeScale() < 1) {
    //mainTl.timeScale(3)
    TweenMax.to(mainTl, 1, {
      timeScale: 3,
      ease: Linear.easeNone
    })
    beeSmileTl.resume();
    bulletTl.resume();

  } else {
    //mainTl.timeScale(0.3);
    TweenMax.to(mainTl, 1, {
      timeScale: 0.3,
      ease: Linear.easeNone
    })

    bulletTl.play(0);
    
    TweenMax.delayedCall(1.6, function() {
      beeSmileTl.play(0);
    })

  }

})

TweenMax.set('svg', {
  visibility: 'visible'
})