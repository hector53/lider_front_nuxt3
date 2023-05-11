import * as jose from "jose";

interface tokenPayload {
  id: string;
  email: string;
  r: string;
}

export let payloadToken = {} as tokenPayload

export function setPayloadToken(payload: tokenPayload) {
  payloadToken = payload;
  return payloadToken;
}
