-- =====================================================================
-- Shree Anjani Store ERP — Phase 1: Database Schema & Double-Entry Ledger
-- Migration: 01_erp_schema_and_ledger.sql
-- =====================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: inventory
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    stock_quantity INT DEFAULT 0,
    base_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: transactions (Double-Entry Ledger)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_type VARCHAR(20) CHECK (transaction_type IN ('SALE', 'RESTOCK', 'CREDIT_MEMO', 'DEBIT_MEMO')),
    inventory_id UUID REFERENCES inventory(id),
    quantity_change INT NOT NULL,
    amount DECIMAL(10, 2),
    client_name VARCHAR(255),
    performed_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Indexes for high-speed counter lookup & ledger audit
CREATE INDEX IF NOT EXISTS idx_inventory_sku ON inventory(sku);
CREATE INDEX IF NOT EXISTS idx_transactions_inventory_id ON transactions(inventory_id);
CREATE INDEX IF NOT EXISTS idx_transactions_performed_by ON transactions(performed_by);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
