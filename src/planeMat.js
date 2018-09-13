import { ShaderMaterial, WebGLRenderTarget, Vector2 } from 'three';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export const renderTarget = new WebGLRenderTarget(1280, 720);
export const TextureOffSet = new Vector2(0.1, 0.1);

const uniforms = {
  tDiffuse: { value: renderTarget.texture },
  offSet: { value: TextureOffSet },
  pixels: { value: 256 },
  gap: { value: 0.2 }
}

export const planeMat = new ShaderMaterial({ fragmentShader, vertexShader, uniforms });