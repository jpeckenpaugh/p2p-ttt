export class WorkspaceStorage {
  async open() { const root=await navigator.storage.getDirectory(); this.dir=await root.getDirectoryHandle('p2p-tic-tac-toe',{create:true}); this.file=await this.dir.getFileHandle('game.db',{create:true}); return new Uint8Array(await (await this.file.getFile()).arrayBuffer()); }
  async save(bytes) { const writable=await this.file.createWritable(); try { await writable.write(bytes); await writable.close(); } catch(error) { try{await writable.abort();}catch{} throw error; } }
  async load() { return new Uint8Array(await (await this.file.getFile()).arrayBuffer()); }
}
