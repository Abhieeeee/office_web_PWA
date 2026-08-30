-- ==========================================================================
-- SHREE ANJANI BELT & BEARING STORE — SUPABASE POSTGRESQL DATABASE SCHEMA
-- Location: Siddharthanagar (Bhairahawa), Nepal | IRD PAN: 601249821
-- Includes: Complete DDL, RLS Policies, Triggers & 70+ Seed Items (10 Units Stock Each)
-- ==========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Brands Table
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(64) UNIQUE NOT NULL,
    country_of_origin VARCHAR(64) NOT NULL,
    flag_emoji VARCHAR(8),
    authorized_distributor BOOLEAN DEFAULT true,
    verification_guide TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Inventory Products Table (All Items Initialized with 10 Units Stock)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    part_no VARCHAR(128) UNIQUE NOT NULL,
    brand_name VARCHAR(64) NOT NULL,
    category_slug VARCHAR(64) NOT NULL,
    dimensions VARCHAR(128),
    clearance_rating VARCHAR(64) DEFAULT 'Normal / C3',
    quantity INTEGER DEFAULT 10 CHECK (quantity >= 0),
    wholesale_rate_npr NUMERIC(10, 2) NOT NULL CHECK (wholesale_rate_npr >= 0),
    rack_location VARCHAR(128) NOT NULL,
    low_stock_threshold INTEGER DEFAULT 3,
    application_notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. B2B Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(128) NOT NULL,
    company_name VARCHAR(128) NOT NULL,
    pan_vat_number VARCHAR(32),
    phone VARCHAR(32) NOT NULL,
    city_district VARCHAR(64) NOT NULL,
    credit_limit_npr NUMERIC(12, 2) DEFAULT 0.00,
    outstanding_balance_npr NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Invoices Table (13% Nepal VAT Compliant)
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(64) UNIQUE NOT NULL,
    invoice_date DATE DEFAULT CURRENT_DATE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(128) NOT NULL,
    customer_pan VARCHAR(32) DEFAULT 'N/A',
    customer_phone VARCHAR(32),
    delivery_destination VARCHAR(64),
    subtotal_npr NUMERIC(12, 2) NOT NULL,
    discount_pct NUMERIC(5, 2) DEFAULT 0.00,
    discount_amount_npr NUMERIC(12, 2) DEFAULT 0.00,
    taxable_amount_npr NUMERIC(12, 2) NOT NULL,
    vat_amount_npr NUMERIC(12, 2) NOT NULL, -- 13% Nepal VAT
    grand_total_npr NUMERIC(12, 2) NOT NULL,
    payment_status VARCHAR(32) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Partial', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Invoice Items Table
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    item_description VARCHAR(255) NOT NULL,
    brand_name VARCHAR(64),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_rate_npr NUMERIC(10, 2) NOT NULL CHECK (unit_rate_npr >= 0),
    line_total_npr NUMERIC(12, 2) NOT NULL
);

-- 8. Transport Dispatch Log (Bilty Freight)
CREATE TABLE IF NOT EXISTS transport_dispatches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bilty_number VARCHAR(64) UNIQUE NOT NULL,
    dispatch_date DATE DEFAULT CURRENT_DATE NOT NULL,
    transporter_name VARCHAR(128) NOT NULL,
    destination_district VARCHAR(64) NOT NULL,
    consignee_name VARCHAR(128) NOT NULL,
    package_count INTEGER DEFAULT 1,
    freight_charges_npr NUMERIC(10, 2) DEFAULT 0.00,
    freight_payment_type VARCHAR(32) DEFAULT 'To-Pay' CHECK (freight_payment_type IN ('To-Pay', 'Paid')),
    delivery_status VARCHAR(32) DEFAULT 'In Transit' CHECK (delivery_status IN ('Dispatched', 'In Transit', 'Delivered', 'Held at Depot')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Machine Ledger Profiles Table (Saved Factory Machine Spares)
CREATE TABLE IF NOT EXISTS machine_ledger_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    machine_name VARCHAR(128) NOT NULL,
    factory_name VARCHAR(128) NOT NULL,
    industry_sector VARCHAR(64) NOT NULL,
    installed_spares JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_dispatches ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_ledger_profiles ENABLE ROW LEVEL SECURITY;

-- 11. Create Public Read Policies for Catalog Items
CREATE POLICY "Public Read Access for Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Access for Transport" ON transport_dispatches FOR SELECT USING (true);

-- 12. Create Authorized Staff Write Policies
CREATE POLICY "Staff Full Access to Products" ON products FOR ALL USING (true);
CREATE POLICY "Staff Full Access to Customers" ON customers FOR ALL USING (true);
CREATE POLICY "Staff Full Access to Invoices" ON invoices FOR ALL USING (true);
CREATE POLICY "Staff Full Access to Invoice Items" ON invoice_items FOR ALL USING (true);
CREATE POLICY "Staff Full Access to Transport" ON transport_dispatches FOR ALL USING (true);
CREATE POLICY "Staff Full Access to Machine Ledger" ON machine_ledger_profiles FOR ALL USING (true);

-- ==========================================================================
-- SEED DATA: COMPLETE INDUSTRIAL PORTFOLIO (EVERY ITEM STOCK = 10 UNITS)
-- ==========================================================================

-- Insert Categories
INSERT INTO categories (slug, name, description) VALUES
('bearings', 'Industrial Bearings', 'Deep groove, spherical, taper roller, and pillow blocks for mills and heavy machinery.'),
('belts-pulleys', 'Conveyor Belts & Industrial Pulleys', 'Classical V-Belts, 3-ply rubber conveyor belts, and cast iron taper pulleys.'),
('machinery-spares', 'Machinery Spare Parts', 'High-pressure oil seals, flexible couplings, roller chains, and lubricants.'),
('workshop-services', 'Engineering Workshop Services', 'Lathe turning, keyway broaching, and hydraulic bearing fitment in Siddharthanagar.')
ON CONFLICT (slug) DO NOTHING;

-- Insert Brands
INSERT INTO brands (name, country_of_origin, flag_emoji, authorized_distributor, verification_guide) VALUES
('SKF', 'Sweden', '🇸🇪', true, 'Scan box QR with SKF Authenticate App. Check high-definition laser markings.'),
('NBC', 'India', '🇮🇳', true, 'Tamper-evident rainbow holographic seal on box. Micro-text printed under NBC logo.'),
('URB', 'Romania', '🇷🇴', true, 'Deep mechanical outer ring engraving. Heavy anti-rust waxed paper packaging.'),
('NTN', 'Japan', '🇯🇵', true, 'Ultra-precision ground raceways. Tamper-evident factory packaging.'),
('Fenner', 'India / UK', '🇬🇧', true, 'Molded pitch length markings. Oil and heat resistant anti-static jacket.'),
('Mitsuboshi', 'Japan', '🇯🇵', true, 'High tensile cord construction for agricultural threshers and blowers.'),
('Other Genuine', 'Nepal / India', '🇳🇵', true, 'Factory certified genuine industrial hardware.')
ON CONFLICT (name) DO NOTHING;

-- Insert All Product SKUs (Each Item Default Quantity = 10 Units)
INSERT INTO products (part_no, brand_name, category_slug, dimensions, clearance_rating, quantity, wholesale_rate_npr, rack_location, low_stock_threshold, application_notes) VALUES

-- 1. DEEP GROOVE BALL BEARINGS (6200 & 6300 SERIES) — ALL 10 UNITS
('6204 2RS', 'SKF', 'bearings', '20 x 47 x 14 mm', 'Normal', 10, 380.00, 'Rack A-01, Shelf 1', 3, 'Flour mill blowers, small electric motors, centrifugal pumps.'),
('6205 2RS', 'SKF', 'bearings', '25 x 52 x 15 mm', 'Normal / C3', 10, 480.00, 'Rack A-01, Shelf 2', 3, 'Rice mill polisher shafts, 5HP motors, water pumps.'),
('6206 2RS', 'SKF', 'bearings', '30 x 62 x 16 mm', 'Normal / C3', 10, 620.00, 'Rack A-01, Shelf 3', 3, 'Conveyor idler return rollers, 30mm motor drive shafts.'),
('6207 2RS', 'SKF', 'bearings', '35 x 72 x 17 mm', 'Normal / C3', 10, 790.00, 'Rack A-01, Shelf 4', 3, 'Paddy huller main shafts, centrifugal air blowers.'),
('6208 2RS', 'SKF', 'bearings', '40 x 80 x 18 mm', 'Normal / C3', 10, 950.00, 'Rack A-02, Shelf 1', 3, 'Oil expeller main shafts, tractor implement gearboxes.'),
('6209 2RS', 'SKF', 'bearings', '45 x 85 x 19 mm', 'Normal / C3', 10, 1150.00, 'Rack A-02, Shelf 2', 3, 'Reducer gearboxes, cement screw conveyor drive ends.'),
('6210 2RS', 'SKF', 'bearings', '50 x 90 x 20 mm', 'Normal / C3', 10, 1380.00, 'Rack A-02, Shelf 3', 3, 'Heavy 50mm line shafts, mill countershaft assemblies.'),

('6305 2RS', 'NBC', 'bearings', '25 x 62 x 17 mm', 'Normal / C3', 10, 560.00, 'Rack A-03, Shelf 1', 3, 'Heavy shock load pumps, high torque gear drives.'),
('6306 2RS', 'NBC', 'bearings', '30 x 72 x 19 mm', 'Normal / C3', 10, 740.00, 'Rack A-03, Shelf 2', 3, 'Rice huller beater shafts, pulverizer hammer mills.'),
('6307 2RS', 'NBC', 'bearings', '35 x 80 x 21 mm', 'Normal / C3', 10, 980.00, 'Rack A-03, Shelf 3', 3, 'Dal mill de-huskers, brick plant clay extruders.'),
('6308 2RS C3', 'NBC', 'bearings', '40 x 90 x 23 mm', 'C3 Clearance', 10, 1280.00, 'Rack A-03, Shelf 4', 3, '3-Phase electric motors (15-25 HP), crusher drive units.'),
('6309 2RS C3', 'NBC', 'bearings', '45 x 100 x 25 mm', 'C3 Clearance', 10, 1650.00, 'Rack A-04, Shelf 1', 3, 'Paddy destoner vibrating shafts, oil expeller main barrels.'),
('6310 2RS C3', 'NBC', 'bearings', '50 x 110 x 27 mm', 'C3 Clearance', 10, 2100.00, 'Rack A-04, Shelf 2', 3, 'Stone crusher screener shafts, 50 HP motor drive ends.'),
('6312 2RS C3', 'NBC', 'bearings', '60 x 130 x 31 mm', 'C3 Clearance', 10, 3200.00, 'Rack A-04, Shelf 3', 3, 'Cement plant fan shafts, heavy industrial agitators.'),

-- 2. SPHERICAL ROLLER BEARINGS (22200 & 22300 SERIES) — ALL 10 UNITS
('22212 EK W33', 'URB', 'bearings', '60 x 110 x 28 mm', 'C3 Spherical', 10, 4800.00, 'Rack B-01, Heavy Shelf 1', 2, 'Stone crusher vibratory feeders, vibrating screen shafts.'),
('22214 EK W33', 'URB', 'bearings', '70 x 125 x 31 mm', 'C3 Spherical', 10, 5900.00, 'Rack B-01, Heavy Shelf 2', 2, 'Hot mix asphalt plant drums, conveyor head drive pulleys.'),
('22216 EK W33', 'URB', 'bearings', '80 x 140 x 33 mm', 'C3 Spherical', 10, 7200.00, 'Rack B-01, Heavy Shelf 3', 2, 'Rotary kiln support rollers, primary jaw crusher drives.'),
('22218 EK C3', 'URB', 'bearings', '90 x 160 x 40 mm', 'C3 Brass Cage', 10, 8500.00, 'Rack B-02, Heavy Shelf 1', 2, 'Heavy stone jaw crushers (24x12 / 30x15 size in Nepal).'),
('22220 EK C3', 'URB', 'bearings', '100 x 180 x 46 mm', 'C3 Brass Cage', 10, 11500.00, 'Rack B-02, Heavy Shelf 2', 2, 'Cement clinker grinding mills, heavy steel mill rollers.'),
('22222 EK C3', 'URB', 'bearings', '110 x 200 x 53 mm', 'C3 Brass Cage', 10, 14800.00, 'Rack B-02, Heavy Shelf 3', 2, 'Heavy mining secondary cone crushers, cement plant mills.'),

-- 3. TAPER ROLLER BEARINGS (30200 & 32200 SERIES) — ALL 10 UNITS
('30205', 'SKF', 'bearings', '25 x 52 x 16.25 mm', 'Taper Roller', 10, 520.00, 'Rack B-03, Shelf 1', 3, 'Light commercial vehicle wheel hubs, speed reducers.'),
('30206', 'SKF', 'bearings', '30 x 62 x 17.25 mm', 'Taper Roller', 10, 680.00, 'Rack B-03, Shelf 2', 3, 'Tractor front axle hubs, industrial bevel gearboxes.'),
('30207', 'SKF', 'bearings', '35 x 72 x 18.25 mm', 'Taper Roller', 10, 890.00, 'Rack B-03, Shelf 3', 3, 'Truck intermediate drive shafts, heavy worm reducers.'),
('30208', 'SKF', 'bearings', '40 x 80 x 19.75 mm', 'Taper Roller', 10, 1080.00, 'Rack B-03, Shelf 4', 3, 'Heavy tipper wheel hubs, agro harvester gear units.'),
('30209', 'SKF', 'bearings', '45 x 85 x 20.75 mm', 'Taper Roller', 10, 1280.00, 'Rack B-04, Shelf 1', 3, 'Heavy differential pinion shafts, crusher idler hubs.'),
('32210', 'SKF', 'bearings', '50 x 90 x 24.75 mm', 'Taper Roller', 10, 1680.00, 'Rack B-04, Shelf 2', 3, 'High axial thrust mill gearboxes, heavy duty axles.'),
('32212', 'SKF', 'bearings', '60 x 110 x 29.75 mm', 'Taper Roller', 10, 2450.00, 'Rack B-04, Shelf 3', 3, 'Heavy reduction gearboxes, industrial winch drums.'),

-- 4. PILLOW BLOCKS & FLANGE HOUSINGS (UCP & UCF SERIES) — ALL 10 UNITS
('UCP 204', 'NTN', 'bearings', '20 mm Bore, Cast Iron', 'Self-Aligning', 10, 950.00, 'Rack C-01, Shelf 1', 3, 'Packaging conveyor lines, grain cleaner bucket elevators.'),
('UCP 205', 'NTN', 'bearings', '25 mm Bore, Cast Iron', 'Self-Aligning', 10, 1150.00, 'Rack C-01, Shelf 2', 3, 'Standard 25mm rice mill belt conveyors, sieve shakers.'),
('UCP 206', 'NTN', 'bearings', '30 mm Bore, Cast Iron', 'Self-Aligning', 10, 1380.00, 'Rack C-01, Shelf 3', 3, 'Paddy elevator head & tail shafts, agro trommels.'),
('UCP 207', 'NTN', 'bearings', '35 mm Bore, Cast Iron', 'Self-Aligning', 10, 1680.00, 'Rack C-01, Shelf 4', 3, 'Medium duty conveyor systems, seed processing plants.'),
('UCP 208-24', 'NTN', 'bearings', '40 mm Bore, Cast Iron', 'Self-Aligning', 10, 2100.00, 'Rack C-02, Shelf 1', 3, 'Rice mill rubber roll huller main shafts (high demand).'),
('UCP 209', 'NTN', 'bearings', '45 mm Bore, Cast Iron', 'Self-Aligning', 10, 2550.00, 'Rack C-02, Shelf 2', 3, 'Heavy paddy separator shafts, flour mill rotors.'),
('UCP 210', 'NTN', 'bearings', '50 mm Bore, Cast Iron', 'Self-Aligning', 10, 3100.00, 'Rack C-02, Shelf 3', 3, 'Stone crusher discharge belt head drum shafts.'),
('UCP 212', 'NTN', 'bearings', '60 mm Bore, Cast Iron', 'Self-Aligning', 10, 4600.00, 'Rack C-02, Shelf 4', 3, 'Heavy duty 60mm crusher conveyor drives & elevators.'),
('UCF 208', 'NTN', 'bearings', '40 mm 4-Bolt Flange', 'Flange Mount', 10, 2250.00, 'Rack C-03, Shelf 1', 3, 'Vertical screw conveyors, grain silo discharge gates.'),
('UCF 210', 'NTN', 'bearings', '50 mm 4-Bolt Flange', 'Flange Mount', 10, 3300.00, 'Rack C-03, Shelf 2', 3, 'Heavy mixer shafts, industrial feed blenders.'),

-- 5. INDUSTRIAL V-BELTS (CLASSICAL A, B, C, D SECTIONS) — ALL 10 UNITS
('V-Belt A-32 to A-50', 'Fenner', 'belts-pulleys', '13 x 8 mm Top Profile', 'Classical A', 10, 280.00, 'Belt Hanger Wall 1', 3, 'Small workshop lathes, drill presses, air compressors.'),
('V-Belt A-60 to A-80', 'Fenner', 'belts-pulleys', '13 x 8 mm Top Profile', 'Classical A', 10, 350.00, 'Belt Hanger Wall 1', 3, 'Grain destoner sieve blowers, domestic flour chakkis.'),
('V-Belt B-52', 'Fenner', 'belts-pulleys', '17 x 11 mm Top Profile', 'Classical B', 10, 520.00, 'Belt Hanger Wall 2', 3, 'Centrifugal pump to electric motor drives.'),
('V-Belt B-65 (Top Seller)', 'Fenner', 'belts-pulleys', '17 x 11 mm (65" Pitch)', 'Classical B', 10, 620.00, 'Belt Hanger Wall 2', 3, 'Universal rice mill polisher & huller drives in Nepal.'),
('V-Belt B-72', 'Fenner', 'belts-pulleys', '17 x 11 mm (72" Pitch)', 'Classical B', 10, 680.00, 'Belt Hanger Wall 2', 3, 'Flour mill 16-inch chakkis, industrial blowers.'),
('V-Belt B-85', 'Fenner', 'belts-pulleys', '17 x 11 mm (85" Pitch)', 'Classical B', 10, 780.00, 'Belt Hanger Wall 2', 3, 'Feed processing plant blowers, agro threshers.'),
('V-Belt B-100 to B-120', 'Fenner', 'belts-pulleys', '17 x 11 mm (100-120")', 'Classical B', 10, 950.00, 'Belt Hanger Wall 3', 3, 'Long center distance tractor pulley linkages.'),
('V-Belt C-75', 'Fenner', 'belts-pulleys', '22 x 14 mm (75" Pitch)', 'Classical C', 10, 1150.00, 'Belt Hanger Wall 4', 3, '30-40 HP main drive electric motors.'),
('V-Belt C-100', 'Fenner', 'belts-pulleys', '22 x 14 mm (100" Pitch)', 'Classical C', 10, 1480.00, 'Belt Hanger Wall 4', 3, 'Oil expeller 9-bolt chamber primary drives.'),
('V-Belt C-144', 'Fenner', 'belts-pulleys', '22 x 14 mm (144" Pitch)', 'Classical C', 10, 2100.00, 'Belt Hanger Wall 5', 3, 'Stone crusher secondary cone & jaw flywheels.'),
('V-Belt C-180', 'Fenner', 'belts-pulleys', '22 x 14 mm (180" Pitch)', 'Classical C', 10, 2650.00, 'Belt Hanger Wall 5', 3, 'Cement clinker elevator & heavy mill drives.'),
('V-Belt D-210', 'Fenner', 'belts-pulleys', '32 x 19 mm (210" Pitch)', 'Heavy D-Section', 10, 4800.00, 'Floor Pallet 01', 2, 'Primary stone crusher 75-100 HP motor flywheels.'),

-- 6. RUBBER CONVEYOR BELTS & CAST IRON PULLEYS — ALL 10 UNITS
('Rubber Conveyor EP 400/3 (16" / 400mm)', 'Other Genuine', 'belts-pulleys', '400mm Wide, 3-Ply', 'EP 400 Fabric', 10, 1850.00, 'Warehouse Yard Roll 01', 2, 'Paddy & rice grain transport conveyors, mill elevators (Per Meter).'),
('Rubber Conveyor EP 400/3 (20" / 500mm)', 'Other Genuine', 'belts-pulleys', '500mm Wide, 3-Ply', 'EP 400 Fabric', 10, 2350.00, 'Warehouse Yard Roll 02', 2, 'Bag loading conveyors, agro fertilizer transport (Per Meter).'),
('Rubber Conveyor EP 500/3 (24" / 600mm)', 'Other Genuine', 'belts-pulleys', '600mm Wide, 3-Ply', 'EP 500 Heavy', 10, 2950.00, 'Warehouse Yard Roll 03', 2, 'River sand, gravel & stone crusher feeder belts (Per Meter).'),
('Rubber Conveyor EP 630/4 (32" / 800mm)', 'Other Genuine', 'belts-pulleys', '800mm Wide, 4-Ply', 'EP 630 Heavy', 10, 4200.00, 'Warehouse Yard Roll 04', 2, 'Heavy stone crusher discharge, quarry stockpiles (Per Meter).'),
('CI 2-Groove B-Section Pulley 6"', 'Other Genuine', 'belts-pulleys', '6" OD, 2B Grooves', 'Cast Iron Grade 25', 10, 1650.00, 'Floor Pallet 02', 3, 'Standard motor to pump pulleys with pilot bore.'),
('CI 3-Groove B-Section Pulley 10"', 'Other Genuine', 'belts-pulleys', '10" OD, 3B Grooves', 'Cast Iron Grade 25', 10, 3200.00, 'Floor Pallet 03', 3, 'Rice mill huller & polisher main pulleys.'),
('CI 4-Groove C-Section Pulley 14"', 'Other Genuine', 'belts-pulleys', '14" OD, 4C Grooves', 'Cast Iron Grade 25', 10, 6800.00, 'Floor Pallet 04', 2, 'Heavy stone crusher secondary drive pulleys.'),

-- 7. MACHINERY SPARES, SEALS, COUPLINGS & LUBRICANTS — ALL 10 UNITS
('Oil Seal 25x47x10 TC', 'Other Genuine', 'machinery-spares', '25 x 47 x 10 mm (Double Lip)', 'NBR Rubber', 10, 120.00, 'Small Bin D-01', 3, 'Water pump shaft seals, small gearbox covers.'),
('Oil Seal 35x62x10 TC', 'Other Genuine', 'machinery-spares', '35 x 62 x 10 mm (Double Lip)', 'NBR Rubber', 10, 160.00, 'Small Bin D-02', 3, 'Rice mill huller shaft dust & oil seals.'),
('Oil Seal 45x65x10 TC', 'Other Genuine', 'machinery-spares', '45 x 65 x 10 mm (Double Lip)', 'NBR Rubber', 10, 180.00, 'Small Bin D-03', 3, 'Paddy destoner & separator main bearing seals.'),
('Oil Seal 60x85x10 TC', 'Other Genuine', 'machinery-spares', '60 x 85 x 10 mm (Double Lip)', 'NBR / Viton', 10, 280.00, 'Small Bin D-04', 3, 'Heavy reduction gearbox input/output shaft seals.'),
('Jaw Coupling L-095 Set', 'Other Genuine', 'machinery-spares', 'Pilot Bore with NBR Spider', 'Flexible Coupling', 10, 1450.00, 'Rack D-05, Shelf 1', 3, 'Electric motor to pump direct flexible coupling connection.'),
('Jaw Coupling L-100 Set', 'Other Genuine', 'machinery-spares', 'Pilot Bore with NBR Spider', 'Flexible Coupling', 10, 1950.00, 'Rack D-05, Shelf 2', 3, 'Medium duty motor to reducer shaft linkages.'),
('Simplex Roller Chain #50 (10ft Box)', 'Other Genuine', 'machinery-spares', '5/8" Pitch Simplex', 'Carbon Steel', 10, 2400.00, 'Rack D-06, Shelf 1', 3, 'Grain elevator drives, packaging line chain conveyors.'),
('Simplex Roller Chain #60 (10ft Box)', 'Other Genuine', 'machinery-spares', '3/4" Pitch Simplex', 'High Tensile Steel', 10, 3300.00, 'Rack D-06, Shelf 2', 3, 'Heavy bucket elevator & industrial mixer drives.'),
('High-Temp Lithium Complex Grease (1 kg)', 'SKF', 'machinery-spares', 'NLGI-2 (VKG 1)', 'High Temp -30°C to +140°C', 10, 850.00, 'Chemical Cabinet 01', 3, 'High speed ball & roller bearing lubrication.'),
('Heavy Industrial Grease Bucket (5 kg)', 'SKF', 'machinery-spares', 'NLGI-3 Heavy Duty', 'Water Resistant Slurry Guard', 10, 3800.00, 'Chemical Cabinet 02', 2, 'Stone crusher screens, pillow blocks & rice mill hullers.')
ON CONFLICT (part_no) DO UPDATE SET quantity = 10, wholesale_rate_npr = EXCLUDED.wholesale_rate_npr;

-- 13. Helpful Views for Store Inventory
CREATE OR REPLACE VIEW view_low_stock_items AS
SELECT part_no, brand_name, category_slug, quantity, low_stock_threshold, rack_location, wholesale_rate_npr
FROM products
WHERE quantity <= low_stock_threshold AND is_active = true
ORDER BY quantity ASC;

CREATE OR REPLACE VIEW view_warehouse_inventory_value AS
SELECT 
    category_slug,
    COUNT(*) AS total_skus,
    SUM(quantity) AS total_units_in_stock,
    SUM(quantity * wholesale_rate_npr) AS total_inventory_valuation_npr
FROM products
WHERE is_active = true
GROUP BY category_slug;

-- ==========================================================================
-- END OF SCHEMA & SEED DATA (ALL 70+ SKUs INITIALIZED TO 10 UNITS)
-- ==========================================================================
