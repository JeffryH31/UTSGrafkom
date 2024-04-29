function tabungVertices(x_awal, y_awal, z_awal, radius_sumbu_x, radius_sumbu_z, height, r, g, b) {
  var vertices = [];
  vertices.push(x_awal);
  vertices.push(y_awal);
  vertices.push(z_awal);
  vertices.push(r);
  vertices.push(g);
  vertices.push(b);
  for (let i = 0; i <= 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var x_baru = x_awal + Math.cos(angleInRadians) * radius_sumbu_x;
    var y_baru = y_awal;
    var z_baru = z_awal + Math.sin(angleInRadians) * radius_sumbu_z;
    vertices.push(x_baru);
    vertices.push(y_baru);
    vertices.push(z_baru);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
  }
  vertices.push(x);
  vertices.push(y + height);
  vertices.push(z);
  vertices.push(r);
  vertices.push(g);
  vertices.push(b);
  for (let i = 0; i <= 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var x_baru = x + Math.cos(angleInRadians) * radius_sumbu_x;
    var y_baru = y + height; // y ditambah ketinggiannya
    var z_baru = z + Math.sin(angleInRadians) * radius_sumbu_z;
    vertices.push(x_baru);
    vertices.push(y_baru);
    vertices.push(z_baru);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
  }
  return vertices;
}
function tabungVertices(x, y, z, radius_sumbu_x, radius_sumbu_z, height, r, g, b) {
  var vertices = [];
  vertices.push(x);
  vertices.push(y);
  vertices.push(z);
  vertices.push(r);
  vertices.push(g);
  vertices.push(b);
  for (let i = 0; i <= 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var x_baru = x + Math.cos(angleInRadians) * radius_sumbu_x;
    var y_baru = y;// muter di sumbu y, y tidak berubah, sesuai sama y awal
    var z_baru = z + Math.sin(angleInRadians) * radius_sumbu_z;
    vertices.push(x_baru);
    vertices.push(y_baru);
    vertices.push(z_baru);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
  }
  vertices.push(x);
  vertices.push(y + height);
  vertices.push(z);
  vertices.push(r);
  vertices.push(g);
  vertices.push(b);
  for (let i = 0; i <= 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var newX = x + Math.cos(angleInRadians) * radius_sumbu_x;
    var y_baru = y + height; //y nya ditambah sm ketinggian
    var z_baru = z + Math.sin(angleInRadians) * radius_sumbu_z;
    vertices.push(newX);
    vertices.push(y_baru);
    vertices.push(z_baru);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
  }
  return vertices;
}
function tabungIndices() {
  var faces = [];

  for (let i = 0; i <= 360; i++) {
    faces.push(0);
    faces.push(i + 1);
    faces.push(i + 2);
  }
  for (let i = 362; i < 722; i++) {
    faces.push(362);
    faces.push(i + 1);
    faces.push(i + 2);
  }
  for (let i = 1; i <= 361; i++) {
    faces.push(i);
    faces.push(360 + i);
    faces.push(361 + i);

    faces.push(361 + i);
    faces.push(i);
    faces.push(i + 1);
  }
  return faces;
}
function bola(x_awal, y_awal, z_awal, radius_x, radius_y, radius_z, latitudeBands, longitudeBands, r, g, b) {
  const vertis = [];
  const indices = [];

  for (let lat = 0; lat <= latitudeBands; lat++) {
    const theta = lat * Math.PI / latitudeBands;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let long = 0; long <= longitudeBands; long++) {
      const phi = long * 2 * Math.PI / longitudeBands;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const xPosition = x_awal + radius_x * cosPhi * sinTheta;
      const yPosition = y_awal + radius_y * sinPhi * sinTheta;
      const zPosition = z_awal + radius_z * cosTheta;

      vertis.push(xPosition, yPosition, zPosition, r, g, b);
    }
  }

  for (let lat = 0; lat < latitudeBands; lat++) {
    for (let long = 0; long < longitudeBands; long++) {
      const first = (lat * (longitudeBands + 1)) + long;
      const second = first + longitudeBands + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { vertis, indices };
}

function mulutVertices(x_awal, y_awal, z_awal, r, red, green, blue) {
  var vertices = [];

  vertices.push(x_awal + (r / 2), y_awal, z_awal, red, green, blue);//0-kanan
  vertices.push(x_awal - (r / 2), y_awal, z_awal, red, green, blue);//1-kiri
  vertices.push(x_awal, y_awal - r, z_awal, red, green, blue);// 2-bawah

  vertices.push(x_awal + (r / 2), y_awal, z_awal - 2, red, green, blue);//3-kanan
  vertices.push(x_awal - (r / 2), y_awal, z_awal - 2, red, green, blue);//4-kiri
  vertices.push(x_awal, y_awal - r, z_awal - 2, red, green, blue);//5-bawah

  return vertices;
}
function mulutIndices() {
  var indices = [];

  indices.push(0);
  indices.push(2);
  indices.push(5);

  indices.push(0);
  indices.push(1);
  indices.push(2);

  indices.push(2);
  indices.push(4);
  indices.push(5);

  indices.push(0);
  indices.push(3);
  indices.push(5);

  indices.push(0);
  indices.push(1);
  indices.push(3);

  indices.push(1);
  indices.push(4);
  indices.push(3);

  indices.push(3);
  indices.push(4);
  indices.push(5);


  return indices;
}
function telingaVertices(x_awal, y_awal, z_awal, radius, height, thickness, red, green, blue) {
  var vertices = [];

  var xRatio = 0.75;
  var yRatio = 0.5;

  //Depan
  vertices.push(x_awal + (xRatio * radius), y_awal, z_awal, red, green, blue);//0 - KananBawah
  vertices.push(x_awal - (xRatio * radius), y_awal, z_awal, red, green, blue);//1 - KiriBawah
  vertices.push(x_awal - radius, y_awal + (yRatio * height), z_awal + (0.25 * thickness), red, green, blue);//2 - Kiri Atas
  vertices.push(x_awal + radius, y_awal + (yRatio * height), z_awal + (0.25 * thickness), red, green, blue);//3 - Kanan Atas
  vertices.push(x_awal, y_awal + height, z_awal - (0.25 * thickness), 0, 0, 0);//4 - Puncak

  //Belakang
  vertices.push(x_awal + (xRatio * radius), y_awal, z_awal - (0.5 * thickness), red, green, blue);//5 - KananBawah
  vertices.push(x_awal - (xRatio * radius), y_awal, z_awal - (0.5 * thickness), red, green, blue);//6 - KiriBawah
  vertices.push(x_awal - radius, y_awal + (yRatio * height), z_awal - (0.75 * thickness), red, green, blue);//7 - Kiri Atas
  vertices.push(x_awal + radius, y_awal + (yRatio * height), z_awal - (0.75 * thickness), red, green, blue);//8 - Kanan Atas

  //Hitam
  vertices.push(x_awal - radius, y_awal + (yRatio * height), z_awal + (0.25 * thickness), 0, 0, 0);//9 - Kiri Atas
  vertices.push(x_awal + radius, y_awal + (yRatio * height), z_awal + (0.25 * thickness), 0, 0, 0);//10 - Kanan Atas

  vertices.push(x_awal - radius, y_awal + (yRatio * height), z_awal - (0.75 * thickness), 0, 0, 0);//11 - Kiri Atas
  vertices.push(x_awal + radius, y_awal + (yRatio * height), z_awal - (0.75 * thickness), 0, 0, 0);//12 - Kanan Atas

  return vertices;
}

function telingaIndices() {
  var indices = [];

  indices.push(1);
  indices.push(6);
  indices.push(2);

  indices.push(2);
  indices.push(7);
  indices.push(6);

  indices.push(4);
  indices.push(9);
  indices.push(11);
  //-----------------------
  indices.push(3);
  indices.push(0);
  indices.push(5);

  indices.push(3);
  indices.push(5);
  indices.push(8);

  indices.push(10);
  indices.push(12);
  indices.push(4);
  //-----------------------
  indices.push(3);
  indices.push(0);
  indices.push(1);

  indices.push(3);
  indices.push(1);
  indices.push(2);

  indices.push(9);
  indices.push(10);
  indices.push(4);
  //-----------------------
  indices.push(8);
  indices.push(5);
  indices.push(6);

  indices.push(8);
  indices.push(6);
  indices.push(7);

  indices.push(11);
  indices.push(12);
  indices.push(4);
  //-----------------------
  indices.push(1);
  indices.push(6);
  indices.push(5);

  indices.push(1);
  indices.push(5);
  indices.push(0);

  return indices;
}

function generateBSpline(controlPoint, m, degree) {
  var curves = [];
  var knotVector = [];

  var n = controlPoint.length / 6;


  // Calculate the knot values based on the degree and number of control points
  for (var i = 0; i < n + degree + 1; i++) {
    if (i < degree + 1) {
      knotVector.push(0);
    } else if (i >= n) {
      knotVector.push(n - degree);
    } else {
      knotVector.push(i - degree);
    }
  }



  var basisFunc = function (i, j, t) {
    if (j == 0) {
      if (knotVector[i] <= t && t < (knotVector[(i + 1)])) {
        return 1;
      } else {
        return 0;
      }
    }

    var den1 = knotVector[i + j] - knotVector[i];
    var den2 = knotVector[i + j + 1] - knotVector[i + 1];

    var term1 = 0;
    var term2 = 0;


    if (den1 != 0 && !isNaN(den1)) {
      term1 = ((t - knotVector[i]) / den1) * basisFunc(i, j - 1, t);
    }

    if (den2 != 0 && !isNaN(den2)) {
      term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc(i + 1, j - 1, t);
    }

    return term1 + term2;
  }


  for (var t = 0; t < m; t++) {
    var x = 0;
    var y = 0;
    var z = 0;
    var r = 0;
    var g = 0;
    var b = 0;

    var u = (t / m * (knotVector[controlPoint.length / 6] - knotVector[degree])) + knotVector[degree];

    //C(t)
    for (var key = 0; key < n; key++) {

      var C = basisFunc(key, degree, u);
      x += (controlPoint[key * 6] * C);
      y += (controlPoint[key * 6 + 1] * C);
      z += (controlPoint[key * 6 + 2] * C);
      r += (controlPoint[key * 6 + 3] * C);
      g += (controlPoint[key * 6 + 4] * C);
      b += (controlPoint[key * 6 + 5] * C);
    }
    curves.push(x);
    curves.push(y);
    curves.push(z);
    curves.push(r);
    curves.push(g);
    curves.push(b);

  }
  return curves;
}
function Curve3D(titik_kontrol, jari_jari) {
  var totalPoints = 100

  var vertices = [];
  var indices = [];
  var points = generateBSpline(titik_kontrol, totalPoints, (titik_kontrol.length / 6) - 1);

  for (let i = 0; i < totalPoints * 2; i++) {
    for (let j = 0; j < 360; j++) {
      var angleInRadians = (j * Math.PI) / 180;
      var x_baru = points[i * 6] + Math.cos(angleInRadians) * jari_jari;
      var y_baru = points[i * 6 + 1] + Math.sin(angleInRadians) * jari_jari;
      var z_baru = points[i * 6 + 2]; // Z nya konstan
      var r = points[i * 6 + 3]
      var g = points[i * 6 + 4]
      var b = points[i * 6 + 5]
      vertices.push(x_baru);
      vertices.push(y_baru);
      vertices.push(z_baru);
      vertices.push(r);
      vertices.push(g);
      vertices.push(b);
    }
  }
  for (let i = 0; i < totalPoints * 2; i++) {
    for (let j = 0; j < 360; j++) {
      indices.push(j + (i * 360));
      indices.push(j + 360 + (i * 360));
      indices.push(j + 361 + (i * 360));

      indices.push(j + (i * 360));
      indices.push(j + 1 + (i * 360));
      indices.push(j + 361 + (i * 360));
    }
  }

  return { vertices, indices };
}
function drawCircle(x, y, z, radius, r, g, b) {
  var vertices = [];
  for (let i = 0; i <= 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var newX = x; // X-coordinate remains the same
    var newY = y + Math.cos(angleInRadians) * radius; // Rotate around X-axis
    var newZ = z + Math.sin(angleInRadians) * radius; // Translate along Z-axis
    vertices.push(newX);
    vertices.push(newY);
    vertices.push(newZ);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
  }
  return vertices;
}

function createSphere(x, y, z, xRadius, yRadius, zRadius, latitudeBands, longitudeBands, r, g, b) {
  const positions = [];
  const indices = [];

  for (let lat = 0; lat <= latitudeBands; lat++) {
    const theta = (lat * Math.PI) / latitudeBands;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let long = 0; long <= longitudeBands; long++) {
      const phi = (long * 2 * Math.PI) / longitudeBands;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const xPosition = x + xRadius * cosPhi * sinTheta;
      const yPosition = y + yRadius * sinPhi * sinTheta;
      const zPosition = z + zRadius * cosTheta;

      positions.push(xPosition, yPosition, zPosition, r, g, b);
    }
  }

  for (let lat = 0; lat < latitudeBands; lat++) {
    for (let long = 0; long < longitudeBands; long++) {
      const first = lat * (longitudeBands + 1) + long;
      const second = first + longitudeBands + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { positions, indices };
}


function generateTailVertices(
  startX,
  startY,
  startZ,
  p,
  l,
  t,
  red,
  green,
  blue
) {
  var vertices = [];

  vertices.push(startX + l / 2, startY, startZ, red, green, blue); //0-kanan bawah
  vertices.push(startX - l / 2, startY, startZ, red, green, blue); //1- kiribawah
  vertices.push(startX - l / 2, startY + t, startZ, red, green, blue); //2 - kiri atas
  vertices.push(startX + l / 2, startY + t, startZ, red, green, blue); //3 - kanan atas

  vertices.push(startX + l / 2, startY, startZ - p, red, green, blue); //4 - kanan bawah
  vertices.push(startX - l / 2, startY, startZ - p, red, green, blue); //5 - kiri bawah
  vertices.push(startX - l / 2, startY + t, startZ - p, red, green, blue); //6 - kiri atas
  vertices.push(startX + l / 2, startY + t, startZ - p, red, green, blue); //7 - kanan atas

  return vertices;
}

function generateTailIndices() {
  var indices = [];

  indices.push(0);
  indices.push(1);
  indices.push(2);

  indices.push(0);
  indices.push(2);
  indices.push(3);

  indices.push(4);
  indices.push(5);
  indices.push(6);

  indices.push(4);
  indices.push(6);
  indices.push(7);

  indices.push(0);
  indices.push(3);
  indices.push(4);

  indices.push(3);
  indices.push(4);
  indices.push(7);

  indices.push(1);
  indices.push(2);
  indices.push(5);

  indices.push(2);
  indices.push(5);
  indices.push(6);

  indices.push(2);
  indices.push(3);
  indices.push(6);

  indices.push(3);
  indices.push(6);
  indices.push(7);

  indices.push(1);
  indices.push(0);
  indices.push(4);

  indices.push(1);
  indices.push(4);
  indices.push(5);

  return indices;
}

function createHalfSphere(
  x,
  y,
  z,
  xRadius,
  yRadius,
  zRadius,
  latitudeBands,
  longitudeBands,
  r,
  g,
  b
) {
  const positions = [];
  const indices = [];

  for (let lat = 0; lat <= latitudeBands / 7; lat++) {
    const theta = (lat * Math.PI) / latitudeBands;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let long = 0; long <= longitudeBands; long++) { // Mengubah loop menjadi penuh lingkaran
      const phi = (long * 2 * Math.PI) / longitudeBands;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const xPosition = x + xRadius * cosPhi * sinTheta;
      const yPosition = y + yRadius * sinPhi * sinTheta;
      const zPosition = z + zRadius * cosTheta;

      positions.push(xPosition, yPosition, zPosition, r, g, b);
    }
  }

  for (let lat = 0; lat < latitudeBands / 7; lat++) {
    for (let long = 0; long < longitudeBands; long++) { // Mengubah loop menjadi penuh lingkaran
      const first = lat * (longitudeBands + 1) + long;
      const second = first + longitudeBands + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { positions, indices };
};


function normalizeScreen(x, y, width, height) {
  var nx = 2 * x / width - 1
  var ny = -2 * y / height + 1

  return [nx, ny]
}

function generateBSpline2(controlPoint, m, degree) {
  var curves = [];
  var knotVector = []

  var n = controlPoint.length / 2;

  // Calculate the knot values based on the degree and number of control points
  for (var i = 0; i < n + degree + 1; i++) {
    if (i < degree + 1) {
      knotVector.push(0);
    } else if (i >= n) {
      knotVector.push(n - degree);
    } else {
      knotVector.push(i - degree);
    }
  }



  var basisFunc2 = function (i, j, t) {
    if (j == 0) {
      if (knotVector[i] <= t && t < (knotVector[(i + 1)])) {
        return 1;
      } else {
        return 0;
      }
    }

    var den1 = knotVector[i + j] - knotVector[i];
    var den2 = knotVector[i + j + 1] - knotVector[i + 1];

    var term1 = 0;
    var term2 = 0;


    if (den1 != 0 && !isNaN(den1)) {
      term1 = ((t - knotVector[i]) / den1) * basisFunc2(i, j - 1, t);
    }

    if (den2 != 0 && !isNaN(den2)) {
      term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc2(i + 1, j - 1, t);
    }

    return term1 + term2;
  }


  for (var t = 0; t < m; t++) {
    var x = 0;
    var y = 0;
    var z = 0;
    var u = (t / m * (knotVector[controlPoint.length / 2] - knotVector[degree])) + knotVector[degree];

    //C(t)
    for (var key = 0; key < n; key++) {

      var C = basisFunc2(key, degree, u);
      x += (controlPoint[key * 2] * C);
      y += (controlPoint[key * 2 + 1] * C);

    }
    curves.push(x, y, z, 0 / 255, 0 / 255, 0 / 255);

  }
  return curves;
}


function createSphere2(radius, red, green, blue, xAdd, yAdd, zAdd, xMul, yMul, zMul) {
  var vertex = [], faces = [];
  var stackAngle, sectorAngle;
  const stackCount = 36;
  const sectorCount = 36;
  var sectorStep = 2 * Math.PI / sectorCount;
  var stackStep = Math.PI / stackCount;
  var x, y;

  for (let i = 0; i <= stackCount; ++i) {
    stackAngle = Math.PI / 2 - i * stackStep;
    var xy = radius * Math.cos(stackAngle);
    var z = radius * Math.sin(stackAngle);
    for (let j = 0; j <= sectorCount; ++j) {
      sectorAngle = j * sectorStep;
      var x = xy * Math.cos(sectorAngle);
      var y = xy * Math.sin(sectorAngle);
      vertex.push(x * xMul + xAdd, y * yMul + yAdd, z * zMul + zAdd);
      vertex.push(red / 255, green / 255, blue / 255);
    }
  }

  var k1, k2;
  for (let i = 0; i < stackCount; ++i) {
    k1 = i * (sectorCount + 1);
    k2 = k1 + sectorCount + 1;
    for (let j = 0; j < sectorCount; ++j, ++k1, ++k2) {
      if (i != 0) {
        faces.push(k1, k2, k1 + 1);
      }
      if (i != (stackCount - 1)) {
        faces.push(k1 + 1, k2, k2 + 1);
      }
    }
  }

  return { vertex: vertex, faces: faces };
}

var createTube = function (x1, y1, z1, x2, y2, z2, rX1, rY1, rZ1, rX2, rY2, rZ2, r, g, b) {
  var tube_vertex = [];
  var tube_faces = [];
  tube_vertex.push(x1, y1, z1);
  tube_vertex.push(r / 255, g / 255, b / 255);

  for (var i = 0; i <= 360; i++) {
    var radian = i / Math.PI;
    var x = rX1 * Math.cos(radian);
    var z = rZ1 * Math.sin(radian);
    tube_vertex.push(x + x1, rY1 + y1, z + z1);
    tube_vertex.push(r / 255, g / 255, b / 255);
  }

  tube_vertex.push(x2, y2, z2);
  tube_vertex.push(r / 255, g / 255, b / 255);

  for (var i = 0; i <= 360; i++) {
    var radian = i / Math.PI;
    var x = rX2 * Math.cos(radian);
    var z = rZ2 * Math.sin(radian);
    tube_vertex.push(x + x2, rY2 + y2, z + z2);
    tube_vertex.push(r / 255, g / 255, b / 255);
  }

  for (var i = 1; i < 360; i++) {
    tube_faces.push(0, i, i + 1);
  }

  for (var i = 1; i < 360; i++) {
    tube_faces.push(361, i + 361, i + 361 + 1);
  }

  for (var i = 1; i < 360; i++) {
    tube_faces.push(i, i + 361, i + 1);
    tube_faces.push(i + 361, i + 361 + 1, i + 1);
  }

  return { vertex: tube_vertex, faces: tube_faces };
}

var createCone = function (x, y, z, radius, height, segments, r, g, b) {
  var cone_vertex = [];
  var cone_faces = [];

  cone_vertex.push(x, y, z + height); // Apex of the cone
  cone_vertex.push(r / 255, g / 255, b / 255); // Color

  for (var i = 0; i <= segments; i++) {
    var angle = (i / segments) * Math.PI * 2;
    var xSegment = x + radius * Math.cos(angle);
    var ySegment = y + radius * Math.sin(angle);
    cone_vertex.push(xSegment, ySegment, z);
    cone_vertex.push(r / 255, g / 255, b / 255);
  }

  for (var i = 1; i <= segments; i++) {
    cone_faces.push(0, i, i + 1);
  }

  cone_faces.push(0, segments + 1, 1); // Connect last segment to first to close the cone

  return { vertex: cone_vertex, faces: cone_faces };
}

function createHair(input) {
  var hair1_vertex = [];
  var hair1_faces = [];

  curve = [];
  var hair1 = input;
  for (let i = 0; i < 14;) {
    var node = normalizeScreen(hair1[i], hair1[i + 1], 1536, 730);
    curve.push(node[0], node[1]);
    i += 2;
  }
  hair1_vertex = generateBSpline2(curve, 100, 2);
  hair1_faces = [];
  for (let i = 0; i < hair1_vertex.length / 6; i++) {
    hair1_faces.push(i);
  }

  return { vertex: hair1_vertex, faces: hair1_faces };
}

