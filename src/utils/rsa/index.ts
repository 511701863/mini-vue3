import Encrypt from 'wxmp-rsa';
// import {Base64} from 'js-base64';
const cryptFirst = new Encrypt();
//为RSA对象设置公钥
export function setPublicKey(publicKey:any){
  cryptFirst.setPublicKey(publicKey);
}
//执行公钥加密
export function getRsaPin(userPwd:any){
  const code =cryptFirst.encrypt(userPwd.toString());
  return code;
}

// const str = `
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlm7VVIe3fiKOvNr9JK9R
// 5hq8bQ1oifNg7tsBwaqO6RIhXgLlJSP7bQKdV6Q6JCWk5oUxSgFUoRZoHqYX8D9c
// bOgYCJXLbRcEiDl6WfLXEL3OPTibgZ55m+jy3nC/mVOi6zBIqIRgxOgXpnbyr/hQ
// GY9jcXS+emWpGR2iTK4mzBVWf5zRHrmTnt4kbVy9AN4qFiow+jMmQ4UZFDSLcnG1
// RLfeuNnb+Oetxvr2mZ+A9dz7pdL7SXPaux85otHZ++QQf7PXMALfRxZon3NSxM19
// MrPc/tFo8HWviV04QKDYj/KNPpAMWLdSMJj5pwdz7oRyCZ77I34tONjeCJd9zJn2
// TwIDAQAB
// -----END PUBLIC KEY-----
// `;
