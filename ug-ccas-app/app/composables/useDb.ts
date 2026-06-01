import Dexie, { type Table } from 'dexie'

export interface Note {
  id?: number
  text: string
  syncStatus: 'pending' | 'synced' | 'error'
  createdAt: string
  updatedAt: string
}

class AppDB extends Dexie {
  notes!: Table<Note>

  constructor() {
    super('pwa_demo_db')
    this.version(1).stores({
      notes: '++id, text, syncStatus, createdAt, updatedAt'
    })
  }
}

export const db = new AppDB()