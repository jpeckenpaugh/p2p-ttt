export function createClient() {
  const buildId=new URL(import.meta.url).searchParams.get('v')||'';
  const worker = new Worker(new URL(`./worker.js${buildId?`?v=${encodeURIComponent(buildId)}`:''}`, import.meta.url));
  let next = 0; const pending = new Map();
  worker.onmessage = ({data}) => { const item=pending.get(data.id); if(!item)return; pending.delete(data.id); data.error ? item.reject(new Error(data.error)) : item.resolve(data.result); };
  worker.onerror = event => { for(const item of pending.values())item.reject(new Error(event.message)); pending.clear(); };
  return {call(op,payload={}) { return new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});worker.postMessage({id,op,payload});}); }};
}
