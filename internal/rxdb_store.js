// internal/rxdb_store.js
/**
 * Shree Anjani Belt & Bearing Store — Offline-First RxDB Storage Engine
 * Module: rxdb_store.js
 * 
 * Local IndexedDB source-of-truth wrapped with RxDB & Dexie storage adapter.
 * Handles append-only double-entry transaction ledgers and real-time inventory caching.
 */

import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';

// Enable Leader Election plugin for multi-tab synchronization
addRxPlugin(RxDBLeaderElectionPlugin);

export const inventorySchema = {
  title: 'inventory schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    sku: { type: 'string' },
    name: { type: 'string' },
    stock_quantity: { type: 'number' },
    base_price: { type: 'number' },
    updated_at: { type: 'string' }
  },
  required: ['id', 'sku', 'name', 'base_price']
};

export const transactionSchema = {
  title: 'transaction schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    transaction_type: { type: 'string' },
    inventory_id: { type: 'string' },
    quantity_change: { type: 'number' },
    amount: { type: 'number' },
    client_name: { type: 'string' },
    performed_by: { type: 'string' },
    is_synced: { type: 'boolean', default: false }, // Local flag to track sync state
    created_at: { type: 'string' }
  },
  required: ['id', 'transaction_type', 'inventory_id', 'quantity_change']
};

let dbPromise = null;

export async function initLocalDB() {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = (async () => {
    const db = await createRxDatabase({
      name: 'shree_anjani_erp_db',
      storage: getRxStorageDexie()
    });

    await db.addCollections({
      inventory: { schema: inventorySchema },
      transactions: { schema: transactionSchema }
    });

    return db;
  })();

  return dbPromise;
}

// Global browser window attachment for vanilla script interoperability
if (typeof window !== 'undefined') {
  window.RxDBStore = {
    inventorySchema,
    transactionSchema,
    initLocalDB
  };
}
