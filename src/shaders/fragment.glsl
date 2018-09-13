uniform sampler2D tDiffuse;
uniform vec2 offSet;
uniform float pixels;
uniform float gap;
varying vec2 vUv;

void main() {
  vec2 mainUV = vUv + offSet;
  vec2 uvMulti = vec2(pixels,pixels*0.5625);
  vec2 testA = fract(mainUV * uvMulti);
  vec2 pixelatedUV = (floor(mainUV * uvMulti) / uvMulti) - offSet;
  vec4 texelColor = texture2D( tDiffuse, pixelatedUV );
  if(testA.x < gap || testA.y < gap){
    texelColor = vec4(0.0);
  }
  gl_FragColor = vec4(texelColor.xyz, 1.0);
}