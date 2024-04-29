function main() {
  var CANVAS = document.getElementById("myCanvas");


  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;


//   var autoTranslate = function(time) {
//     var t = time * 0.003; // Convert time to seconds
    
//     // Calculate translation values based on time
//     translateX= 0 // Oscillate translation along the x-axis
//     translateY = Math.sin(t) * 5; // Keep translation along the y-axis constant
//     translateZ = 0 // Keep translation along the z-axis constant
//     // Request the next animation frame
//     window.requestAnimationFrame(autoTranslate);
// }

// // Start the animation loop
// autoTranslate(0);

  var drag = false;
  var dX = 0;
  var dY = 0;


  var X_prev = 0;
  var Y_prev = 0;


  var THETA = 0;
  var ALPHA = 0;


  var FRICTION = 0.2;

//   var translateX = 0;
// var translateY = 0;
// var translateZ = 0;

// var rotateX = 0;
// var rotateY = 0;
// var rotateZ = 0;


  var mouseDown = function (e) {
    drag = true;
    X_prev = e.pageX;
    Y_prev = e.pageY;
  }


  var mouseUp = function (e) {
    drag = false;
  }


  var mouseMove = function (e) {
    if (!drag) { return false; }
    dX = e.pageX - X_prev;
    dY = e.pageY - Y_prev;
    // console.log(dX + " " + dY);
    X_prev = e.pageX;
    Y_prev = e.pageY;


    THETA += dX * 2 * Math.PI / CANVAS.width;
    ALPHA += dY * 2 * Math.PI / CANVAS.height;
  }


  var keyDown = function (e) {
    e.preventDefault();
  }


  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);
  CANVAS.addEventListener("keydown", keyDown);



  try {
    GL = CANVAS.getContext("webgl", { antialias: true });
  } catch (e) {
    alert("WebGL context cannot be initialized");
    return false;
  }
  var shader_vertex_source = `
      attribute vec3 position;
      attribute vec3 color;


      uniform mat4 PMatrix;
      uniform mat4 VMatrix;
      uniform mat4 MMatrix;
     
      varying vec3 vColor;
      void main(void) {
      gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
      vColor = color;


      gl_PointSize=20.0;
      }`;
  var shader_fragment_source = `
      precision mediump float;
      varying vec3 vColor;
      // uniform vec3 color;


      uniform float greyScality;


      void main(void) {
      float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
      vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
      vec3 color = mix(greyScaleColor, vColor, greyScality);
      gl_FragColor = vec4(color, 1.);
      }`;
  var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 2, 2000);
  var VIEW_MATRIX = LIBS.get_I4();
  var MODEL_MATRIX = LIBS.get_I4();
  var MODEL_MATRIX2 = LIBS.get_I4();


  LIBS.translateZ(VIEW_MATRIX, -110);


  var main = new MyObject(bola(-20, 0, 0, 3, 2.8, 3, 100, 100, 1, 0.9882352941176471, 0.01568627450980392).vertis, bola(0, 0, 0, 2, 2, 2, 100, 100, 0, 0, 0).indices, shader_vertex_source, shader_fragment_source);
  var body = new MyObject(tabungVertices(-20, -6.3, 0, 2, -2, 4.8, 1, 0.9882352941176471, 0.01568627450980392), tabungIndices(), shader_vertex_source, shader_fragment_source);
  var leftHand = new MyObject(bola(-18, -3.5, 0, 3, 0.8, 0.5, 100, 100, 1, 1, 0).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var rightHand = new MyObject(bola(-22, -3.5, 0, 3, 0.8, 0.5, 100, 100, 1, 1, 0).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var rightFoot = new MyObject(bola(-19.1, -6.6, 1.2, 0.8, 0.3, 2.5, 100, 100, 1, 0.9882352941176471, 0.01568627450980392).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var leftFoot = new MyObject(bola(-21.1, -6.6, 1.2, 0.8, 0.3, 2.5, 100, 100, 1, 0.9882352941176471, 0.01568627450980392).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var leftEye = new MyObject(bola(-20.6, 0.5, 2.33, 0.7, 0.7, 0.7, 100, 100, 0, 0, 0).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var rightEye = new MyObject(bola(-19.4, 0.5, 2.33, 0.7, 0.7, 0.7, 100, 100, 0, 0, 0).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var leftWhiteEye = new MyObject(bola(-20.6, 0.7, 2.73, 0.3, 0.3, 0.3, 100, 100, 1, 1, 1).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var rightWhiteEye = new MyObject(bola(-19.4, 0.7, 2.73, 0.3, 0.3, 0.3, 100, 100, 1, 1, 1).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var leftCheek = new MyObject(bola(-21.3, -0.5, 1.65, 1, 1, 1, 100, 100, 1, 0.611764705882353, 0.9882352941176471).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var rightCheek = new MyObject(bola(-18.3, -0.5, 1.65, 1, 1, 1, 100, 100, 1, 0.611764705882353, 0.9882352941176471).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);
  var mouth = new MyObject(mulutVertices(-20.0, 0.5, 2.9, 2, 0.48627450980392156, 0.20392156862745098, 0.23529411764705882), mulutIndices(), shader_vertex_source, shader_fragment_source);
  var leftEar = new MyObject(telingaVertices(-21.4, 1.9, 0.5, 1.2, 5, 1, 1, 0.9882352941176471, 0.01568627450980392), telingaIndices(), shader_vertex_source, shader_fragment_source);
  var rightEar = new MyObject(telingaVertices(-18.7, 1.9, 0.5, 1.2, 5, 1, 1, 0.9882352941176471, 0.01568627450980392), telingaIndices(), shader_vertex_source, shader_fragment_source);
  tailControlPoints = [
    -20, -5, -2, 0, 0, 0,
    -20, 0, -3, 0, 0, 0,
    -20, -2, -5, 0, 0, 0
  ];
  var tail = new MyObject(Curve3D(tailControlPoints, 1).vertices, Curve3D(tailControlPoints, 1).indices, shader_vertex_source, shader_fragment_source);
  var tie1 = new MyObject(mulutVertices(-20.3, -2, 2, 1.5, 0, 0, 0), mulutIndices(), shader_vertex_source, shader_fragment_source);
  var tie2 = new MyObject(mulutVertices(-19.5, -2, 2, 1.5, 0, 0, 0), mulutIndices(), shader_vertex_source, shader_fragment_source);
  var nose = new MyObject(bola(-20, 0, 2.51, 0.5, 0.5, 0.5, 100, 100, 0, 0, 0).vertis, bola(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices, shader_vertex_source, shader_fragment_source);

  var headA = new MyObject(
    createSphere(0, 0, 0, 3, 2.8, 3, 100, 100, 0.529, 0.808, 0.922).positions,
    createSphere(0, 0, 0, 2, 2, 2, 100, 100, 0, 0, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  headA.setup();

  var mouthA = new MyObject(
    createHalfSphere(0, -0.35, -0.1, 3, 2.8, 3, 100, 100, 1, 0, 0).positions,
    createHalfSphere(0, 0, 0, 2, 2, 2, 100, 100, 0, 0, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  mouthA.setup();

  var bodyA = new MyObject(
    createSphere(0, -5.2, 0, 3.5, 3.9, 3, 100, 100, 0.992, 0.875, 0.761).positions,
    createSphere(0, -6.3, 0, 4, 3, 3, 100, 100, 1, 0, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  bodyA.setup();

  var punggungA = new MyObject(
    createSphere(0, -5.2, -0.1, 3.56, 3.9, 3, 100, 100, 0.545, 0.271, 0.075).positions,
    createSphere(0, -6.3, 0, 4, 3, 3, 100, 100, 1, 0, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  punggungA.setup();

  var leftHandA = new MyObject(
    createSphere(2, -3.5, 0.85, 4.5, 0.9, 1.1, 100, 100, 0.529, 0.808, 0.922).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  leftHandA.setup();
  //   // Panggil fungsi autoRotate untuk tangan kiri
  // autoRotate(leftHand, 0);

  var rightHandA = new MyObject(
    createSphere(-2, -3.5, 0.85, 4.5, 0.9, 1.1, 100, 100, 0.529, 0.808, 0.922).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  rightHandA.setup();
  //   // Panggil fungsi autoRotate untuk tangan kanan
  // autoRotate(rightHand, 0);


  var rightFootA = new MyObject(tabungVertices(2, -9.8, 1, 1, 1, 3, 0.529,0.808,0.922),
  tabungIndices(), shader_vertex_source,shader_fragment_source);rightFootA.setup();
  var leftFootA = new MyObject(tabungVertices(-2, -9.8, 1, 1, 1, 3, 0.529,0.808,0.922),
    tabungIndices(),shader_vertex_source,shader_fragment_source);leftFootA.setup();

  var leftEyeA = new MyObject(
    createSphere(-1.3, 0.5, 2.1, 0.7, 1, 0.7, 100, 100, 0, 0, 0).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  leftEyeA.setup();

  var rightEyeA = new MyObject(
    createSphere(1.3, 0.5, 2.1, 0.7, 1, 0.7, 100, 100, 0, 0, 0).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  rightEyeA.setup();

  var leftWhiteEyeA = new MyObject(
    createSphere(-1.3, 1, 2.55, 0.3, 0.3, 0.3, 100, 100, 1, 1, 1).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  leftWhiteEyeA.setup();

  var rightWhiteEyeA = new MyObject(
    createSphere(1.3, 1, 2.55, 0.3, 0.3, 0.3, 100, 100, 1, 1, 1).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  rightWhiteEyeA.setup();

  var tail1A = new MyObject(
    generateTailVertices(0, -7, -1.5, 3, 1, 0.7, 0.529, 0.808, 0.922),
    generateTailIndices(),
    shader_vertex_source,
    shader_fragment_source
  );
  tail1A.setup();

  var tail2A = new MyObject(
    createSphere(0, -6.5, -5, 1, 1, 1, 100, 100, 0.529, 0.808, 0.922).positions,
    createSphere(0, 0, 0, 2, 2, 2, 100, 100, 0, 0, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  tail2A.setup();

  var noseA = new MyObject(
    createSphere(0.48, -0.2, 2.445, 0.5, 0.5, 0.5, 100, 100, 0, 0, 0).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  noseA.setup();

  var nose1A = new MyObject(
    createSphere(-0.48, -0.2, 2.445, 0.5, 0.5, 0.5, 100, 100, 0, 0, 0).positions,
    createSphere(2, 2, 2, 3, 1.25, 0.5, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  nose1A.setup();

  var groundA = new MyObject(
    createSphere(0, -13, 0, 80, 2.8, 80, 100, 100, 0.2, 0.6, 0.2).positions,
    createSphere(0, 0, 0, 20, 20, 20, 100, 100, 0, 1, 0).indices,
    shader_vertex_source,
    shader_fragment_source
  );
  groundA.setup();


  main.setup();
  body.setup();
  leftHand.setup();
  rightHand.setup();
  rightFoot.setup();
  leftFoot.setup();
  leftEye.setup();
  rightEye.setup();
  leftWhiteEye.setup();
  rightWhiteEye.setup();
  leftCheek.setup();
  rightCheek.setup();
  mouth.setup();
  leftEar.setup();
  rightEar.setup();
  tail.setup();
  tie1.setup();
  tie2.setup();
  nose.setup();


  var temp;
  var decX = -250;
  var decY = 350;
  var mulX = 20;
  var mulY = 10;

  var hairsCoordinates1 = [];
  for (var i = 0; i < 35; i += 0.1) {
    var hair =
      [(743 - decX) * (mulX), (242 - decY) * (mulY - i)
        , (735 - decX) * (mulX), (209 - decY) * (mulY - i)
        , (747 - decX) * (mulX), (187 - decY) * (mulY - i)
        , (760 - decX) * (mulX), (192 - decY) * (mulY - i)
        , (772 - decX) * (mulX), (195 - decY) * (mulY - i)
        , (760 - decX) * (mulX), (211 - decY) * (mulY - i)
        , (746 - decX) * (mulX), (242 - decY) * (mulY - i)];
    hairsCoordinates1.push(hair);
  }

  decX = -200;
  decY = 340;
  mulX = 20;
  mulY = 10;

  var hairsCoordinates2 = [];
  for (var i = 0; i < 30; i += 0.1) {
    var hair =
      [(743 - decX) * (mulX + (i / 15)), (242 - decY) * (mulY - i)
        , (735 - decX) * (mulX + (i / 15)), (209 - decY) * (mulY - i)
        , (747 - decX) * (mulX + (i / 15)), (187 - decY) * (mulY - i)
        , (760 - decX) * (mulX + (i / 15)), (192 - decY) * (mulY - i)
        , (772 - decX) * (mulX + (i / 15)), (195 - decY) * (mulY - i)
        , (760 - decX) * (mulX + (i / 15)), (211 - decY) * (mulY - i)
        , (746 - decX) * (mulX + (i / 15)), (242 - decY) * (mulY - i)];
    hairsCoordinates2.push(hair);
  }

  decX = -300;
  decY = 340;
  mulX = 20;
  mulY = 10;

  var hairsCoordinates3 = [];
  for (var i = 0; i < 35; i += 0.1) {
    var hair =
      [(743 - decX) * (mulX - i), (242 - decY) * (mulY - i)
        , (735 - decX) * (mulX - (i / 40)), (209 - decY) * (mulY - i)
        , (747 - decX) * (mulX - (i / 40)), (187 - decY) * (mulY - i)
        , (760 - decX) * (mulX - (i / 40)), (192 - decY) * (mulY - i)
        , (772 - decX) * (mulX - (i / 40)), (195 - decY) * (mulY - i)
        , (760 - decX) * (mulX - (i / 40)), (211 - decY) * (mulY - i)
        , (746 - decX) * (mulX - (i / 40)), (242 - decY) * (mulY - i)];
    hairsCoordinates3.push(hair);
  }

  temp = createSphere2(3.2, 255, 189, 59, 25, .72, 0, 1.2, 1, 1);
  var headJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  headJ.setup();

  for (var i = 0; i < 35; i++) {
    temp = createHair(hairsCoordinates1[i]);
    var hairCurve1 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
    hairCurve1.setup();
    headJ.child.push(hairCurve1);
  }

  for (var i = 0; i < 30; i++) {
    temp = createHair(hairsCoordinates2[i]);
    var hairCurve2 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
    hairCurve2.setup();
    headJ.child.push(hairCurve2);
  }

  for (var i = 0; i < 35; i++) {
    temp = createHair(hairsCoordinates3[i]);
    var hairCurve3 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
    hairCurve3.setup();
    headJ.child.push(hairCurve3);
  }


  temp = createSphere2(0.88, 255, 255, 255, 23.8, 1.4, 2.25, 1.72, 1.1, 1);
  var leftEyeJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  leftEyeJ.setup();

  temp = createSphere2(0.88, 255, 255, 255, 26.2, 1.4, 2.25, 1.72, 1.1, 1);
  var rightEyeJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  rightEyeJ.setup();

  temp = createSphere2(0.45, 0, 0, 0, 23.63, 1.52, 2.67, 1, 1, 1);
  var leftEyeBallJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  leftEyeBallJ.setup();

  temp = createSphere2(0.45, 0, 0, 0, 26.37, 1.52, 2.67, 1, 1, 1);
  var rightEyeBallJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  rightEyeBallJ.setup();

  temp = createSphere2(2, 255, 245, 165, 25, -0.2, 3.3, 1, 0.55, 2);
  var paruhJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  paruhJ.setup();

  temp = createSphere2(5, 255, 189, 59, 25, -5.4, 0, 1, 0.9, 1);
  var bodyJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  bodyJ.setup();

  temp = createTube(
    19, -7, 0,
    23, -2, 0,
    1.3, 0, 1.3,
    1.3, 0, 1.3,
    255, 189, 59);

  var leftHandJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  leftHandJ.setup();


  temp = createTube(
    31, -7, 0,
    27, -2, 0,
    1.3, 0, 1.3,
    1.3, 0, 1.3,
    255, 189, 59);

  var rightHandJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  rightHandJ.setup();

  temp = createTube(
    22, -10.2, 0,
    24, -9.2, 0,
    1.3, 0, 1.3,
    1.3, 0, 1.3,
    255, 245, 165);

  var leftFootJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  leftFootJ.setup();

  temp = createTube(
    28, -10.2, 0,
    26, -9.2, 0,
    1.3, 0, 1.3,
    1.3, 0, 1.3,
    255, 245, 165);

  var rightFootJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  rightFootJ.setup();

  temp = createCone(25, -6, -2.5, 2, -7, 72, 255, 189, 59);
  var tailJ = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  tailJ.setup();

  // Environment
  temp = createTube(
    48, 20, 0,
    46, -14, 0,
    4, 0, 4,
    4, 0, 4,
    69, 50, 46);
  var tree1 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  tree1.setup();

  temp = createSphere2(6, 4, 189, 9, 41, 20, 0, 1.2, 1, 1);
  var treeBush1 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush1.setup();

  temp = createSphere2(6, 4, 189, 9, 45, 28, 0, 1.2, 1, 1);
  var treeBush2 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush2.setup();

  temp = createSphere2(6, 4, 189, 9, 52, 20, 4, 1.2, 1, 1);
  var treeBush3 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush3.setup();

  temp = createSphere2(6, 4, 189, 9, 55, 26, 2, 1.2, 1, 1);
  var treeBush4 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush4.setup();

  temp = createSphere2(6, 4, 189, 9, 50, 24, -4, 1.2, 1, 1);
  var treeBush5 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush5.setup();


  temp = createTube(
    -48, 20, 21,
    -46, -14, 21,
    4, 0, 4,
    4, 0, 4,
    69, 50, 46);
  var tree2 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  tree2.setup();

  temp = createSphere2(6, 4, 189, 9, -41, 20, 21, 1.2, 1, 1);
  var treeBush6 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush6.setup();

  temp = createSphere2(6, 4, 189, 9, -45, 28, 21, 1.2, 1, 1);
  var treeBush7 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush7.setup();

  temp = createSphere2(6, 4, 189, 9, -52, 20, 25, 1.2, 1, 1);
  var treeBush8 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush8.setup();

  temp = createSphere2(6, 4, 189, 9, -55, 26, 23, 1.2, 1, 1);
  var treeBush9 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush9.setup();

  temp = createSphere2(6, 4, 189, 9, -50, 24, 17, 1.2, 1, 1);
  var treeBush10 = new MyObject(temp.vertex, temp.faces, shader_vertex_source, shader_fragment_source);
  treeBush10.setup();


  // KG
  if (true) {
    main.child.push(body);
    main.child.push(leftHand);
    main.child.push(rightHand);
    main.child.push(rightFoot);
    main.child.push(leftFoot);
    main.child.push(leftEye);
    main.child.push(rightEye);
    main.child.push(leftWhiteEye);
    main.child.push(rightWhiteEye);
    main.child.push(leftCheek);
    main.child.push(rightCheek);
    main.child.push(mouth);
    main.child.push(leftEar);
    main.child.push(rightEar);
    main.child.push(tail);
    main.child.push(tie1);
    main.child.push(tie2);
    main.child.push(nose);
  }

  // Andreas
  if (true) {
    headA.child.push(mouthA);
    headA.child.push(bodyA);
    headA.child.push(punggungA);
    headA.child.push(leftHandA);
    headA.child.push(rightHandA);
    headA.child.push(rightFootA);
    headA.child.push(leftFootA);
    headA.child.push(leftEyeA);
    headA.child.push(rightEyeA);
    headA.child.push(leftWhiteEyeA);
    headA.child.push(rightWhiteEyeA);
    headA.child.push(tail1A);
    headA.child.push(tail2A);
    headA.child.push(noseA);
    headA.child.push(nose1A);
    headA.child.push(groundA);
  }

  // Jeffry
  if (true) {
    headJ.child.push(leftEyeJ);
    headJ.child.push(rightEyeJ);
    headJ.child.push(leftEyeBallJ);
    headJ.child.push(rightEyeBallJ);
    headJ.child.push(paruhJ);
    headJ.child.push(bodyJ);
    headJ.child.push(leftHandJ);
    headJ.child.push(rightHandJ);
    headJ.child.push(leftFootJ);
    headJ.child.push(rightFootJ);
    headJ.child.push(tailJ);
  }

  // Environment
  tree1.child.push(treeBush1);
  tree1.child.push(treeBush2);
  tree1.child.push(treeBush3);
  tree1.child.push(treeBush4);
  tree1.child.push(treeBush5);
  tree1.child.push(tree2);
  tree1.child.push(treeBush6);
  tree1.child.push(treeBush7);
  tree1.child.push(treeBush8);
  tree1.child.push(treeBush9);
  tree1.child.push(treeBush10);

  GL.clearColor(185 / 255, 235 / 255, 250 / 255, 1);


  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);

  var time_prev = 0;

  var leftFootRotationX = 0;
  var leftFootDirection = false;
  var rightFootRotationX = 0;
  var rightFootDirection = false;
  var bodyTranslationZ = 0;
  var bodyDirection = false;
  var stopWalking = false;
  var bodyRotationY = 0;


  var eyeScaling = 1;
  var closeEyes = false;

  var handWaving = 0;
  var handTranslateY = 0;
  var stopWaving = false;
  var waveDirection = false;

  var jump = 0;
  var fall = false;
  var jumpStatus = false;
  var stopJumping = false;

  var animate = function (time) {
    if (time > 0) {
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
      var dt = time - time_prev;


      if (!drag) {
        dX *= FRICTION;
        dY *= FRICTION;


        THETA += dX * 2 * Math.PI / CANVAS.width;
        ALPHA += dY * 2 * Math.PI / CANVAS.height;
      }


      MODEL_MATRIX = LIBS.get_I4();
      MODEL_MATRIX2 = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX, THETA);
      LIBS.rotateX(MODEL_MATRIX, ALPHA);

      LIBS.rotateY(MODEL_MATRIX2, THETA);
      LIBS.rotateX(MODEL_MATRIX2, ALPHA);

      LIBS.rotateY(MODEL_MATRIX, rotateY);
        LIBS.rotateX(MODEL_MATRIX, rotateX);
        LIBS.rotateZ(MODEL_MATRIX, rotateZ);
        LIBS.translateX(MODEL_MATRIX, translateX);
        LIBS.translateY(MODEL_MATRIX, translateY);
        LIBS.translateZ(MODEL_MATRIX, translateZ);
        
      // Kevin
      main.MODEL_MATRIX = MODEL_MATRIX;
      body.MODEL_MATRIX = MODEL_MATRIX;
      leftHand.MODEL_MATRIX = MODEL_MATRIX;
      rightHand.MODEL_MATRIX = MODEL_MATRIX;
      rightFoot.MODEL_MATRIX = MODEL_MATRIX;
      leftFoot.MODEL_MATRIX = MODEL_MATRIX;
      leftEye.MODEL_MATRIX = MODEL_MATRIX;
      rightEye.MODEL_MATRIX = MODEL_MATRIX;
      leftWhiteEye.MODEL_MATRIX = MODEL_MATRIX;
      rightWhiteEye.MODEL_MATRIX = MODEL_MATRIX;
      leftCheek.MODEL_MATRIX = MODEL_MATRIX;
      rightCheek.MODEL_MATRIX = MODEL_MATRIX;
      mouth.MODEL_MATRIX = MODEL_MATRIX;
      leftEar.MODEL_MATRIX = MODEL_MATRIX;
      rightEar.MODEL_MATRIX = MODEL_MATRIX;
      tail.MODEL_MATRIX = MODEL_MATRIX;
      tie1.MODEL_MATRIX = MODEL_MATRIX;
      tie2.MODEL_MATRIX = MODEL_MATRIX;
      nose.MODEL_MATRIX = MODEL_MATRIX;
      main.render(VIEW_MATRIX, PROJECTION_MATRIX);

      //Andreas
      headA.MODEL_MATRIX = MODEL_MATRIX;
      mouthA.MODEL_MATRIX = MODEL_MATRIX;
      bodyA.MODEL_MATRIX = MODEL_MATRIX;
      punggungA.MODEL_MATRIX = MODEL_MATRIX;
      leftHandA.MODEL_MATRIX = MODEL_MATRIX;
      rightHandA.MODEL_MATRIX = MODEL_MATRIX;
      rightFootA.MODEL_MATRIX = MODEL_MATRIX;
      leftFootA.MODEL_MATRIX = MODEL_MATRIX;
      leftEyeA.MODEL_MATRIX = MODEL_MATRIX;
      rightEyeA.MODEL_MATRIX = MODEL_MATRIX;
      leftWhiteEyeA.MODEL_MATRIX = MODEL_MATRIX;
      rightWhiteEyeA.MODEL_MATRIX = MODEL_MATRIX;
      tail1A.MODEL_MATRIX = MODEL_MATRIX;
      tail2A.MODEL_MATRIX = MODEL_MATRIX;
      noseA.MODEL_MATRIX = MODEL_MATRIX;
      nose1A.MODEL_MATRIX = MODEL_MATRIX;
      groundA.MODEL_MATRIX = MODEL_MATRIX;
      // necklace.MODEL_MATRIX = MODEL_MATRIX;
      headA.render(VIEW_MATRIX, PROJECTION_MATRIX);

      // Jeffry
      LEFT_EYE_MATRIX = LIBS.get_I4();
      RIGHT_EYE_MATRIX = LIBS.get_I4();
      LEFT_EYE_BALL_MATRIX = LIBS.get_I4();
      RIGHT_EYE_BALL_MATRIX = LIBS.get_I4();
      LEFT_FOOT_MATRIX = LIBS.get_I4();
      RIGHT_FOOT_MATRIX = LIBS.get_I4();
      LEFT_HAND_MATRIX = LIBS.get_I4();

      headJ.MODEL_MATRIX = MODEL_MATRIX;
      headJ.model(MODEL_MATRIX);
      leftEyeJ.MODEL_MATRIX = MODEL_MATRIX;
      rightEyeJ.MODEL_MATRIX = MODEL_MATRIX;
      leftEyeBallJ.MODEL_MATRIX = MODEL_MATRIX;
      rightEyeBallJ.MODEL_MATRIX = MODEL_MATRIX;
      paruhJ.MODEL_MATRIX = MODEL_MATRIX;
      bodyJ.MODEL_MATRIX = MODEL_MATRIX;
      leftHandJ.MODEL_MATRIX = MODEL_MATRIX;
      rightHandJ.MODEL_MATRIX = MODEL_MATRIX;
      leftFootJ.MODEL_MATRIX = MODEL_MATRIX;
      rightFootJ.MODEL_MATRIX = MODEL_MATRIX;
      tailJ.MODEL_MATRIX = MODEL_MATRIX;

      // Environment
      tree1.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush1.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush2.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush3.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush4.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush5.MODEL_MATRIX = MODEL_MATRIX2;
      tree2.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush6.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush7.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush8.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush9.MODEL_MATRIX = MODEL_MATRIX2;
      treeBush10.MODEL_MATRIX = MODEL_MATRIX2;


      time_prev = time;
    }

    if (time > 1000 && time <= 3000) {
      if (!closeEyes) {
        leftEyeJ.MODEL_MATRIX = LEFT_EYE_MATRIX;
        rightEyeJ.MODEL_MATRIX = RIGHT_EYE_MATRIX;
        leftEyeBallJ.MODEL_MATRIX = LEFT_EYE_BALL_MATRIX;
        rightEyeBallJ.MODEL_MATRIX = RIGHT_EYE_BALL_MATRIX;
        LIBS.scalling(leftEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(leftEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        eyeScaling -= 0.01;
        if (eyeScaling <= 0) {
          closeEyes = true;
        }
      }
      if (closeEyes) {
        leftEyeJ.MODEL_MATRIX = LEFT_EYE_MATRIX;
        rightEyeJ.MODEL_MATRIX = RIGHT_EYE_MATRIX;
        leftEyeBallJ.MODEL_MATRIX = LEFT_EYE_BALL_MATRIX;
        rightEyeBallJ.MODEL_MATRIX = RIGHT_EYE_BALL_MATRIX;
        LIBS.scalling(leftEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(leftEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        eyeScaling += 0.015;
        if (eyeScaling >= 1) {
          eyeScaling = 1.0001;
        }
      }
    }
    if (time > 3000) {
      if (time <= 3600)
        closeEyes = false;

      if (!closeEyes) {
        leftEyeJ.MODEL_MATRIX = LEFT_EYE_MATRIX;
        rightEyeJ.MODEL_MATRIX = RIGHT_EYE_MATRIX;
        leftEyeBallJ.MODEL_MATRIX = LEFT_EYE_BALL_MATRIX;
        rightEyeBallJ.MODEL_MATRIX = RIGHT_EYE_BALL_MATRIX;
        LIBS.scalling(leftEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(leftEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        eyeScaling -= 0.01;
        if (eyeScaling <= 0) {
          closeEyes = true;
        }
      }
      if (closeEyes) {
        leftEyeJ.MODEL_MATRIX = LEFT_EYE_MATRIX;
        rightEyeJ.MODEL_MATRIX = RIGHT_EYE_MATRIX;
        leftEyeBallJ.MODEL_MATRIX = LEFT_EYE_BALL_MATRIX;
        rightEyeBallJ.MODEL_MATRIX = RIGHT_EYE_BALL_MATRIX;
        LIBS.scalling(leftEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(leftEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        LIBS.scalling(rightEyeBallJ.MODEL_MATRIX, 1, eyeScaling, eyeScaling);
        eyeScaling += 0.015;
        if (eyeScaling >= 1) {
          eyeScaling = 1.0001;

          leftEyeJ.MODEL_MATRIX = MODEL_MATRIX;
          rightEyeJ.MODEL_MATRIX = MODEL_MATRIX;
          leftEyeBallJ.MODEL_MATRIX = MODEL_MATRIX;
          rightEyeBallJ.MODEL_MATRIX = MODEL_MATRIX;
        }
      }
    }

    if (time > 5500 && time < 8400) {
      leftHandJ.MODEL_MATRIX = LEFT_HAND_MATRIX;
      LIBS.rotateX(leftHandJ.MODEL_MATRIX, LIBS.degToRad(handWaving * -1));
      LIBS.translateY(leftHandJ.MODEL_MATRIX, -1 * handTranslateY);
      handWaving += 1;

      if (handWaving >= 140 && !waveDirection) {
        waveDirection = true;
      }

      if (waveDirection) {
        handWaving -= 2;
        if (handWaving <= 0) {
          waveDirection = false;
        }
      }

      if (handTranslateY <= 4 && !stopWaving) {
        handTranslateY += 0.1;
        if (handTranslateY > 3)
          stopWaving = true;
      }
      if (handTranslateY <= 0 || stopWaving) {
        handTranslateY -= 0.01;
        if (handTranslateY <= 0) {
          handTranslateY = 0.1;
          stopWaving = false;
        }
      }
    }

    if (time > 8400 && time < 10900) {
      leftHandJ.MODEL_MATRIX = LEFT_HAND_MATRIX;
      LIBS.rotateX(leftHandJ.MODEL_MATRIX, LIBS.degToRad(handWaving * -1));
      LIBS.translateY(leftHandJ.MODEL_MATRIX, -1 * handTranslateY);
      handWaving += 1;

      if (handWaving >= 140 && !waveDirection) {
        waveDirection = true;
      }

      if (waveDirection) {
        handWaving -= 2;
        if (handWaving <= 0) {
          waveDirection = false;
        }
      }

      if (handTranslateY <= 4 && !stopWaving) {
        handTranslateY += 0.1;
        if (handTranslateY > 3)
          stopWaving = true;
      }
      if (handTranslateY <= 0 || stopWaving) {
        handTranslateY -= 0.01;
        if (handTranslateY <= 0) {
          handTranslateY = 0.1;
          stopWaving = false;
        }
      }
    }

    if (time > 10900 && time < 15000) {
      leftHandJ.MODEL_MATRIX = MODEL_MATRIX;
      LIBS.translateY(headJ.MODEL_MATRIX, jump);
      if (jump < 5 && !stopJumping) {
        jump += 0.1;
        if (jump >= 5 && !stopJumping) {
          fall = true;
        }
      }
      if (fall && !stopJumping) {
        jump -= 0.15;
        if (jump <= 0) {
          fall = false;
          jump = 0.00001;
        }
      }
    }

    if (time >= 15000) {
      stopJumping = true;
      jump = 0.00000001;
      LIBS.translateY(headJ.MODEL_MATRIX, jump);
      leftFootJ.MODEL_MATRIX = LEFT_FOOT_MATRIX;
      rightFootJ.MODEL_MATRIX = RIGHT_FOOT_MATRIX;

      if (leftFootRotationX <= 10 && !leftFootDirection) {
        LIBS.rotateX(leftFootJ.MODEL_MATRIX, LIBS.degToRad(leftFootRotationX * -1));
        leftFootRotationX += 0.3;
        if (leftFootRotationX > 10) {
          leftFootDirection = true;
        }
      }
      if (leftFootDirection && !stopWalking) {
        LIBS.rotateX(leftFootJ.MODEL_MATRIX, LIBS.degToRad(leftFootRotationX * -1));
        leftFootRotationX -= 0.3;
        if (leftFootRotationX <= 0) {
          leftFootDirection = false;
        }
      }

      if (!bodyDirection && !stopWalking) {
        LIBS.translateZ(leftFootJ.MODEL_MATRIX, bodyTranslationZ);
        LIBS.translateZ(rightFootJ.MODEL_MATRIX, bodyTranslationZ);
        LIBS.translateZ(headJ.MODEL_MATRIX, bodyTranslationZ);
        bodyTranslationZ += 0.12;
        if (bodyTranslationZ > 30) {
          bodyDirection = true;
        }
      }

      if (bodyDirection && bodyTranslationZ > 0 && !stopWalking) {
        LIBS.translateZ(leftFootJ.MODEL_MATRIX, bodyTranslationZ);
        LIBS.translateZ(rightFootJ.MODEL_MATRIX, bodyTranslationZ);
        LIBS.translateZ(headJ.MODEL_MATRIX, bodyTranslationZ);
        bodyTranslationZ -= 0.12;
      }
      else if (bodyTranslationZ <= 0 && !stopWalking) {
        LIBS.rotateY(leftFootJ.MODEL_MATRIX, LIBS.degToRad(-bodyRotationY));
        LIBS.rotateY(rightFootJ.MODEL_MATRIX, LIBS.degToRad(-bodyRotationY));
        LIBS.rotateY(headJ.MODEL_MATRIX, LIBS.degToRad(-bodyRotationY));
        bodyRotationY += 1;
        if (bodyRotationY >= 360) {
          stopWalking = true;
          leftFootJ.MODEL_MATRIX = MODEL_MATRIX;
          rightFootJ.MODEL_MATRIX = MODEL_MATRIX;
        }
      }
    }

    if (time > 15300) {
      if (rightFootRotationX <= 10 && !rightFootDirection && !stopWalking) {
        LIBS.rotateX(rightFootJ.MODEL_MATRIX, LIBS.degToRad(rightFootRotationX * -1));
        rightFootRotationX += 0.3;
        if (rightFootRotationX > 10) {
          rightFootDirection = true;
        }
      }
      if (rightFootDirection && !stopWalking) {
        LIBS.rotateX(rightFootJ.MODEL_MATRIX, LIBS.degToRad(rightFootRotationX * -1));
        rightFootRotationX -= 0.3;
        if (rightFootRotationX <= 0) {
          rightFootDirection = false;
        }
      }
    }


    console.log(time);
    headJ.render1(VIEW_MATRIX, PROJECTION_MATRIX);
    tree1.render(VIEW_MATRIX, PROJECTION_MATRIX);

    for (let i = 0; i < headJ.child.length; i++) {
      let objectChild = headJ.child[i];
      if (i >= 0 && i < 95) {
        objectChild.render2(VIEW_MATRIX, PROJECTION_MATRIX);
      }
      else {
        objectChild.render1(VIEW_MATRIX, PROJECTION_MATRIX);
      }
    }


    window.requestAnimationFrame(animate);

  };
  animate(0);
}
window.addEventListener('load', main);