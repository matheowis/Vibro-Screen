uniform sampler2D tDiffuse;
uniform vec2 offSet;
uniform float pixels;
varying vec2 vUv;

void main() {
  vec2 mainUV = vUv + offSet;
  vec2 uvMulti = vec2(pixels,pixels*0.5625);
  vec2 pixelatedUV = (floor(mainUV * uvMulti) / uvMulti) - offSet;
  vec4 texelColor = texture2D( tDiffuse, pixelatedUV );

  gl_FragColor = vec4(texelColor.xyz, 1.0);
}