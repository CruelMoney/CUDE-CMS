
export const REGISTER_EDITS = 'REGISTER_EDITS'  
export function registerEdits (endpoint, id, edits) {  
  return { type: REGISTER_EDITS, endpoint, id, edits }
}

export const REGISTER_PROMISE = 'REGISTER_PROMISE'  
export function registerPromise (promise) {  
  return { type: REGISTER_PROMISE, promise }
}