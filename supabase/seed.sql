-- ITOLOGY Comprehensive Seed Data
-- 10 Popular Products per Category (80+ total)
-- Based on top IT websites: Apple, Dell, HP, Lenovo, ASUS, Samsung, Cisco, Fortinet, TP-Link, Logitech, Sony, Keychron, Razer, Microsoft, Intel, AMD, NVIDIA, Synology, Western Digital

-- ============================================================
-- BRANDS
-- ============================================================
INSERT INTO brands (name, slug, description) VALUES
  ('Apple', 'apple', 'Premium consumer electronics and software'),
  ('Dell', 'dell', 'Enterprise and consumer computers'),
  ('HP', 'hp', 'Personal systems and printing'),
  ('Lenovo', 'lenovo', 'PCs, tablets, and servers'),
  ('ASUS', 'asus', 'Motherboards, GPUs, and laptops'),
  ('Samsung', 'samsung', 'Electronics, displays, and storage'),
  ('Cisco', 'cisco', 'Enterprise networking and security'),
  ('Fortinet', 'fortinet', 'Cybersecurity and firewalls'),
  ('TP-Link', 'tp-link', 'Networking and smart home'),
  ('Logitech', 'logitech', 'Peripherals and accessories'),
  ('Sony', 'sony', 'Electronics and gaming'),
  ('Keychron', 'keychron', 'Mechanical keyboards'),
  ('Razer', 'razer', 'Gaming peripherals and laptops'),
  ('Microsoft', 'microsoft', 'Software, Surface, and Xbox'),
  ('Intel', 'intel', 'Processors and chipsets'),
  ('AMD', 'amd', 'Processors and graphics'),
  ('NVIDIA', 'nvidia', 'GPUs and AI hardware'),
  ('Synology', 'synology', 'NAS and network storage'),
  ('Western Digital', 'western-digital', 'Hard drives and SSDs'),
  ('Netgate', 'netgate', 'pfSense security gateways'),
  ('Ubiquiti', 'ubiquiti', 'Enterprise networking'),
  ('Corsair', 'corsair', 'Gaming peripherals and components'),
  ('Crucial', 'crucial', 'Memory and storage'),
  ('Seagate', 'seagate', 'Data storage solutions'),
  ('Netgear', 'netgear', 'Networking equipment');

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES
  ('Computers', 'computers', 'Laptops, desktops, and workstations from top brands', 1, true),
  ('Components', 'components', 'CPUs, GPUs, RAM, motherboards, and power supplies', 2, true),
  ('Networking', 'networking', 'Routers, switches, access points, and mesh systems', 3, true),
  ('Cybersecurity', 'cybersecurity', 'Firewalls, security gateways, and threat protection', 4, true),
  ('Servers & Storage', 'servers-storage', 'Rack servers, NAS, SAN, and enterprise storage', 5, true),
  ('Displays', 'displays', 'Monitors, projectors, and display accessories', 6, true),
  ('Accessories', 'accessories', 'Keyboards, mice, cables, adapters, and peripherals', 7, true),
  ('Gadgets', 'gadgets', 'Smart devices, wearables, IoT, and emerging tech', 8, true);

-- ============================================================
-- COMPUTERS (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('MacBook Pro 16" M4 Max', 'macbook-pro-16-m4-max', 1, 1, 'MBP16-M4MAX', 'Apple MacBook Pro 16-inch with M4 Max chip, 48GB unified memory, 1TB SSD, Liquid Retina XDR display', 349900, 329900, 15, true, true, true, true, '1-year Apple warranty'),
  ('MacBook Air 15" M4', 'macbook-air-15-m4', 1, 1, 'MBA15-M4', 'Apple MacBook Air 15-inch with M4 chip, 16GB RAM, 512GB SSD, fanless design', 129900, NULL, 25, true, true, true, false, '1-year Apple warranty'),
  ('Dell XPS 15 OLED', 'dell-xps-15-oled', 2, 1, 'DELL-XPS15-OLED', 'Dell XPS 15 with 3.5K OLED display, Intel Core Ultra 9, 32GB RAM, 1TB SSD', 219900, 189900, 12, true, true, false, false, '2-year Dell warranty'),
  ('HP Spectre x360 16', 'hp-spectre-x360-16', 3, 1, 'HP-SP360-16', 'HP Spectre x360 16-inch 2-in-1, Intel Core Ultra 7, 32GB RAM, 2TB SSD, OLED display', 189900, NULL, 8, true, false, true, true, '1-year HP warranty'),
  ('Lenovo ThinkPad X1 Carbon Gen 12', 'lenovo-thinkpad-x1-carbon-g12', 4, 1, 'LEN-X1C-G12', 'Lenovo ThinkPad X1 Carbon Gen 12, Intel Core Ultra 7, 32GB RAM, 1TB SSD, 2.8K OLED', 179900, 159900, 18, true, true, true, false, '3-year Lenovo warranty'),
  ('ASUS ROG Strix G16 Gaming Laptop', 'asus-rog-strix-g16', 5, 1, 'ASU-ROG-G16', 'ASUS ROG Strix G16, Intel Core i7-14650HX, RTX 5060, 16GB DDR5, 1TB SSD, 165Hz', 169900, NULL, 10, true, true, false, true, '2-year ASUS warranty'),
  ('Samsung Galaxy Book4 Ultra', 'samsung-galaxy-book4-ultra', 6, 1, 'SAM-GB4-ULT', 'Samsung Galaxy Book4 Ultra, Intel Core Ultra 9, 32GB RAM, 1TB SSD, AMOLED display', 239900, 209900, 6, true, false, false, true, '1-year Samsung warranty'),
  ('Microsoft Surface Laptop 6', 'microsoft-surface-laptop-6', 14, 1, 'MS-SRF-LAP6', 'Microsoft Surface Laptop 6, Intel Core Ultra 7, 32GB RAM, 1TB SSD, 13.5" PixelSense', 159900, NULL, 14, true, false, true, false, '1-year Microsoft warranty'),
  ('Razer Blade 16 Gaming Laptop', 'razer-blade-16', 13, 1, 'RAZ-BLD16', 'Razer Blade 16, Intel Core i9-14900HX, RTX 4080, 32GB DDR5, 1TB SSD, 240Hz OLED', 299900, 269900, 5, true, true, false, true, '2-year Razer warranty'),
  ('Lenovo Legion Pro 5', 'lenovo-legion-pro-5', 4, 1, 'LEN-LEG5-PRO', 'Lenovo Legion Pro 5, AMD Ryzen 9, RTX 4070, 32GB RAM, 1TB SSD, 240Hz display', 189900, 169900, 9, true, false, true, false, '2-year Lenovo warranty');

-- ============================================================
-- COMPONENTS (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('Intel Core i9-14900K Processor', 'intel-core-i9-14900k', 15, 2, 'INT-I9-14900K', 'Intel Core i9-14900K, 24 cores (8P+16E), 3.2GHz base, 6.0GHz boost, unlocked', 58900, 54900, 30, true, true, true, false, '3-year Intel warranty'),
  ('AMD Ryzen 9 7950X3D', 'amd-ryzen-9-7950x3d', 16, 2, 'AMD-R9-7950X3D', 'AMD Ryzen 9 7950X3D, 16 cores, 32 threads, 4.2GHz base, 5.7GHz boost, 3D V-Cache', 69900, NULL, 22, true, true, true, true, '3-year AMD warranty'),
  ('NVIDIA GeForce RTX 4090', 'nvidia-geforce-rtx-4090', 17, 2, 'NV-RTX-4090', 'NVIDIA GeForce RTX 4090, 24GB GDDR6X, Ada Lovelace architecture, DLSS 3', 159900, 149900, 8, true, true, true, false, '3-year NVIDIA warranty'),
  ('AMD Radeon RX 7900 XTX', 'amd-radeon-rx-7900xtx', 16, 2, 'AMD-RX7900XTX', 'AMD Radeon RX 7900 XTX, 24GB GDDR6, RDNA 3 architecture, 2.5GHz game clock', 99900, 89900, 12, true, false, false, false, '3-year AMD warranty'),
  ('ASUS ROG Strix Z790-E Motherboard', 'asus-rog-strix-z790e', 5, 2, 'ASU-Z790-E', 'ASUS ROG Strix Z790-E Gaming WiFi, LGA 1700, DDR5, PCIe 5.0, WiFi 6E', 47900, NULL, 15, true, true, false, true, '3-year ASUS warranty'),
  ('Corsair Vengeance DDR5 64GB', 'corsair-vengeance-ddr5-64gb', 22, 2, 'COR-DDR5-64GB', 'Corsair Vengeance DDR5 64GB (2x32GB), 5600MHz, CL36, Intel XMP 3.0', 24900, 21900, 45, true, false, true, false, 'Lifetime Corsair warranty'),
  ('Crucial T700 2TB NVMe SSD', 'crucial-t700-2tb', 23, 2, 'CRU-T700-2TB', 'Crucial T700 2TB PCIe Gen5 NVMe M.2 SSD, 12,400 MB/s read, 11,800 MB/s write', 34900, NULL, 35, true, true, true, true, '5-year Crucial warranty'),
  ('Seagate Barracuda 4TB HDD', 'seagate-barracuda-4tb', 24, 2, 'SEA-BARR-4TB', 'Seagate Barracuda 4TB 3.5" HDD, 5400 RPM, 256MB cache, SATA 6Gb/s', 8900, 7900, 60, true, false, true, false, '2-year Seagate warranty'),
  ('Corsair RM1000x Power Supply', 'corsair-rm1000x-psu', 22, 2, 'COR-RM1000X', 'Corsair RM1000x, 1000W, 80+ Gold, fully modular, zero RPM mode', 18900, 16900, 20, true, false, false, false, '10-year Corsair warranty'),
  ('ASUS ROG Ryujin III 360 AIO', 'asus-rog-ryujin-iii-360', 5, 2, 'ASU-RYJ3-360', 'ASUS ROG Ryujin III 360mm AIO liquid cooler, 3.5" LCD display, Noctua fans', 34900, NULL, 10, true, true, false, true, '6-year ASUS warranty');

-- ============================================================
-- NETWORKING (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('TP-Link Archer BE805 WiFi 7 Router', 'tp-link-archer-be805', 9, 3, 'TPL-BE805', 'TP-Link Archer BE805, BE19000 Tri-Band WiFi 7, dual 10G ports, 12-stream', 59900, 54900, 18, true, true, true, true, '2-year TP-Link warranty'),
  ('Ubiquiti UniFi Dream Machine Pro', 'ubiquiti-udm-pro', 21, 3, 'UBI-UDM-PRO', 'Ubiquiti UniFi Dream Machine Pro, 3.5 Gbps throughput, 8-port switch, UniFi OS', 39900, NULL, 12, true, true, true, false, '1-year Ubiquiti warranty'),
  ('Cisco Catalyst 9200L-48P Switch', 'cisco-catalyst-9200l-48p', 7, 3, 'CIS-C9200L-48P', 'Cisco Catalyst 9200L, 48-port Gigabit Ethernet, PoE+, 4x10G uplinks', 450000, 420000, 5, true, false, false, false, 'Limited lifetime warranty'),
  ('TP-Link Deco BE95 Mesh System', 'tp-link-deco-be95', 9, 3, 'TPL-DECO-BE95', 'TP-Link Deco BE95, BE33000 Quad-Band WiFi 7 Mesh, 10G ports, 3-pack', 129900, 119900, 8, true, true, false, true, '2-year TP-Link warranty'),
  ('Netgear Nighthawk RS700 WiFi 7', 'netgear-nighthawk-rs700', 25, 3, 'NETG-RS700', 'Netgear Nighthawk RS700, BE19000 WiFi 7, 10G port, link aggregation', 69900, NULL, 14, true, false, true, false, '1-year Netgear warranty'),
  ('Ubiquiti UniFi 6 Lite Access Point', 'ubiquiti-u6-lite', 21, 3, 'UBI-U6-LITE', 'Ubiquiti UniFi 6 Lite, WiFi 6 access point, 1.5 Gbps, PoE powered', 12900, 10900, 40, true, false, true, false, '1-year Ubiquiti warranty'),
  ('Cisco Meraki MR46 Access Point', 'cisco-meraki-mr46', 7, 3, 'CIS-MER-MR46', 'Cisco Meraki MR46, WiFi 6, cloud-managed, 2.5 Gbps, enterprise-grade', 149900, NULL, 7, true, true, false, true, 'Lifetime Cisco warranty'),
  ('TP-Link TL-SG2428P Switch', 'tp-link-tl-sg2428p', 9, 3, 'TPL-SG2428P', 'TP-Link TL-SG2428P, 24-port Gigabit PoE+, 4x SFP, 384W PoE budget', 44900, 39900, 16, true, false, false, false, '5-year TP-Link warranty'),
  ('Ubiquiti UniFi Switch Pro 24 PoE', 'ubiquiti-usw-pro-24-poe', 21, 3, 'UBI-USW-24POE', 'Ubiquiti UniFi Switch Pro 24 PoE, 24-port, 10G SFP+, 400W PoE++', 54900, NULL, 9, true, true, false, true, '1-year Ubiquiti warranty'),
  ('Netgear GS316PP Switch', 'netgear-gs316pp', 25, 3, 'NETG-GS316PP', 'Netgear GS316PP, 16-port Gigabit PoE+, 183W, fanless, metal housing', 24900, 21900, 25, true, false, true, false, 'Lifetime Netgear warranty');

-- ============================================================
-- CYBERSECURITY (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('Fortinet FortiGate 60F', 'fortinet-fortigate-60f', 8, 4, 'FG-60F', 'Fortinet FortiGate 60F, 10 Gbps firewall, 1.5 Gbps IPS, NGFW, SD-WAN', 85000, 72000, 15, true, true, true, false, '1-year Fortinet warranty'),
  ('Netgate 8300 MAX pfSense Gateway', 'netgate-8300-max', 20, 4, 'NETG-8300-MAX', 'Netgate 8300 MAX, pfSense Plus, Intel Xeon 8-core, 32GB RAM, quad 10G SFP+', 529900, NULL, 3, true, true, false, true, '1-year Netgate warranty'),
  ('Fortinet FortiGate 100F', 'fortinet-fortigate-100f', 8, 4, 'FG-100F', 'Fortinet FortiGate 100F, 20 Gbps firewall, 3 Gbps IPS, enterprise NGFW', 189000, 169000, 8, true, true, false, false, '1-year Fortinet warranty'),
  ('Firewalla Orange', 'firewalla-orange', 8, 4, 'FW-ORANGE', 'Firewalla Orange, 2 Gbps firewall, WiFi 7, Zero Trust, intrusion prevention', 39900, NULL, 20, true, false, true, true, '1-year Firewalla warranty'),
  ('Cisco Meraki MX68 Security Appliance', 'cisco-meraki-mx68', 7, 4, 'CIS-MER-MX68', 'Cisco Meraki MX68, cloud-managed security, 450 Mbps, SD-WAN, VPN', 49900, 44900, 10, true, false, false, false, 'Lifetime Cisco warranty'),
  ('Fortinet FortiGate 40F', 'fortinet-fortigate-40f', 8, 4, 'FG-40F', 'Fortinet FortiGate 40F, 6 Gbps firewall, 1 Gbps IPS, small business NGFW', 45000, 39000, 22, true, false, true, false, '1-year Fortinet warranty'),
  ('Netgate 6100 pfSense Gateway', 'netgate-6100', 20, 4, 'NETG-6100', 'Netgate 6100, pfSense Plus, Intel Atom, 8GB RAM, 2.5G ports', 89900, NULL, 6, true, true, false, true, '1-year Netgate warranty'),
  ('Fortinet FortiClient EMS', 'fortinet-forticlient-ems', 8, 4, 'FG-FCEMS', 'Fortinet FortiClient EMS, endpoint management, EDR, zero-trust agent', 12900, 10900, 30, true, false, false, false, '1-year Fortinet warranty'),
  ('Cisco Secure Firewall 1120', 'cisco-secure-firewall-1120', 7, 4, 'CIS-SFW-1120', 'Cisco Secure Firewall 1120, 2.5 Gbps, VPN, threat defense, enterprise', 129000, NULL, 4, true, true, false, true, '1-year Cisco warranty'),
  ('Fortinet FortiAnalyzer 200F', 'fortinet-fortianalyzer-200f', 8, 4, 'FG-FAZ-200F', 'Fortinet FortiAnalyzer 200F, log management, 5 GB/day, 8TB storage', 249000, 219000, 2, true, false, false, false, '1-year Fortinet warranty');

-- ============================================================
-- SERVERS & STORAGE (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('HP ProLiant DL380 Gen10+', 'hp-proliant-dl380-gen10', 3, 5, 'HP-DL380-G10', 'HP ProLiant DL380 Gen10+, dual Xeon Scalable, 64GB RAM, 8x2.5" SAS/SAS', 890000, 849000, 4, true, true, false, false, '3-year HP warranty'),
  ('Dell PowerEdge R750', 'dell-poweredge-r750', 2, 5, 'DELL-R750', 'Dell PowerEdge R750, dual Xeon Scalable, 128GB RAM, 8x2.5" SAS, iDRAC9', 1299000, NULL, 3, true, true, false, true, '3-year Dell warranty'),
  ('Synology DS1821+ NAS', 'synology-ds1821-plus', 18, 5, 'SYN-DS1821P', 'Synology DS1821+, 8-bay NAS, AMD Ryzen, 4GB RAM, 4x1GbE, expandable', 109900, 99900, 10, true, true, true, false, '3-year Synology warranty'),
  ('Western Digital Red Pro 16TB', 'wd-red-pro-16tb', 19, 5, 'WD-RED-PRO-16TB', 'Western Digital Red Pro 16TB, NAS HDD, 7200 RPM, 256MB cache, CMR', 44900, 39900, 25, true, false, true, false, '5-year WD warranty'),
  ('Seagate IronWolf Pro 20TB', 'seagate-ironwolf-pro-20tb', 24, 5, 'SEA-IWP-20TB', 'Seagate IronWolf Pro 20TB, NAS HDD, 7200 RPM, 256MB cache, CMR', 54900, NULL, 18, true, false, false, false, '5-year Seagate warranty'),
  ('Dell PowerEdge XE9685L AI Server', 'dell-poweredge-xe9685l', 2, 5, 'DELL-XE9685L', 'Dell PowerEdge XE9685L, dual AMD EPYC, 8x NVIDIA HGX B200, liquid cooled', 24999000, NULL, 1, true, true, false, true, '3-year Dell warranty'),
  ('HP MSA 2060 Storage Array', 'hp-msa-2060', 3, 5, 'HP-MSA-2060', 'HP MSA 2060 SAN storage, 24x2.5" SAS, dual controller, 10GbE iSCSI', 1899000, NULL, 2, true, false, false, false, '3-year HP warranty'),
  ('Synology RS1221+ RackStation', 'synology-rs1221-plus', 18, 5, 'SYN-RS1221P', 'Synology RS1221+, 8-bay rack NAS, AMD Ryzen, 4GB RAM, 4x1GbE', 139900, 129900, 7, true, true, false, false, '3-year Synology warranty'),
  ('Crucial MX500 4TB SSD', 'crucial-mx500-4tb', 23, 5, 'CRU-MX500-4TB', 'Crucial MX500 4TB 2.5" SATA SSD, 560 MB/s read, 510 MB/s write', 34900, 31900, 30, true, false, true, false, '5-year Crucial warranty'),
  ('Samsung PM1743 15.36TB NVMe', 'samsung-pm1743-15tb', 6, 5, 'SAM-PM1743-15TB', 'Samsung PM1743 15.36TB U.2 NVMe enterprise SSD, 6.8 GB/s read, 2600K IOPS', 2499000, NULL, 3, true, true, false, true, '5-year Samsung warranty');

-- ============================================================
-- DISPLAYS (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('Samsung 32" Odyssey Neo G8', 'samsung-odyssey-neo-g8', 6, 6, 'SAM-ONEO8', 'Samsung 32" Odyssey Neo G8, 4K Mini LED, 240Hz, 1ms, HDR10+', 129900, 99900, 8, true, true, true, false, '3-year Samsung warranty'),
  ('Dell UltraSharp U3224KB', 'dell-ultrasharp-u3224kb', 2, 6, 'DELL-U3224KB', 'Dell UltraSharp U3224KB, 32" 6K IPS Black, USB-C hub, 90W PD', 219900, NULL, 5, true, true, false, true, '3-year Dell warranty'),
  ('LG 34" UltraGear OLED', 'lg-34-ultragear-oled', 6, 6, 'LG-34GR95QE', 'LG 34" UltraGear OLED, WQHD, 240Hz, 0.03ms, curved, HDR10', 129900, 109900, 10, true, true, true, false, '2-year LG warranty'),
  ('ASUS ROG Swift PG32UQX', 'asus-rog-swift-pg32uqx', 5, 6, 'ASU-PG32UQX', 'ASUS ROG Swift PG32UQX, 32" 4K Mini LED, 144Hz, G-Sync Ultimate', 249900, 219900, 4, true, true, false, false, '3-year ASUS warranty'),
  ('Samsung 49" Odyssey G9', 'samsung-odyssey-g9', 6, 6, 'SAM-ODG9', 'Samsung 49" Odyssey G9, DQHD, 240Hz, 1ms, curved, HDR1000', 149900, 129900, 6, true, false, true, false, '3-year Samsung warranty'),
  ('Dell UltraSharp U2724D', 'dell-ultrasharp-u2724d', 2, 6, 'DELL-U2724D', 'Dell UltraSharp U2724D, 27" QHD IPS, USB-C hub, 90W PD, IPS Black', 54900, NULL, 15, true, false, true, true, '3-year Dell warranty'),
  ('HP Z27k G3 4K Monitor', 'hp-z27k-g3', 3, 6, 'HP-Z27K-G3', 'HP Z27k G3, 27" 4K USB-C, 90W PD, DreamColor, factory calibrated', 69900, 62900, 12, true, false, false, false, '3-year HP warranty'),
  ('Lenovo ThinkVision P27u-20', 'lenovo-thinkvision-p27u-20', 4, 6, 'LEN-P27U-20', 'Lenovo ThinkVision P27u-20, 27" 4K, Thunderbolt 4, 98% DCI-P3', 89900, NULL, 8, true, true, false, true, '3-year Lenovo warranty'),
  ('Samsung ViewFinity S9', 'samsung-viewfinity-s9', 6, 6, 'SAM-VFS9', 'Samsung ViewFinity S9, 27" 5K, matte display, Thunderbolt 4, 96W PD', 159900, 139900, 7, true, true, false, true, '3-year Samsung warranty'),
  ('ASUS ProArt PA32UCG', 'asus-proart-pa32ucg', 5, 6, 'ASA-PA32UCG', 'ASUS ProArt PA32UCG, 32" 4K Mini LED, 120Hz, 1152 zones, HDR1400', 349900, NULL, 3, true, false, false, false, '3-year ASUS warranty');

-- ============================================================
-- ACCESSORIES (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('Logitech MX Master 3S', 'logitech-mx-master-3s', 10, 7, 'LOG-MX3S', 'Logitech MX Master 3S, wireless mouse, 8K DPI, quiet clicks, USB-C', 9900, 8900, 50, true, true, true, false, '1-year Logitech warranty'),
  ('Keychron Q1 Pro Keyboard', 'keychron-q1-pro', 12, 7, 'KEY-Q1PRO', 'Keychron Q1 Pro, wireless mechanical, QMK/VIA, gasket mount, RGB', 19900, NULL, 30, true, true, true, true, '2-year Keychron warranty'),
  ('Razer BlackWidow V4 Pro', 'razer-blackwidow-v4-pro', 13, 7, 'RAZ-BWV4P', 'Razer BlackWidow V4 Pro, mechanical gaming keyboard, Razer Green switches, RGB', 22900, 19900, 20, true, false, false, false, '2-year Razer warranty'),
  ('Logitech MX Keys S', 'logitech-mx-keys-s', 10, 7, 'LOG-MXKS', 'Logitech MX Keys S, wireless keyboard, backlit, USB-C, multi-device', 10900, 9900, 40, true, false, true, false, '1-year Logitech warranty'),
  ('Corsair K100 RGB Keyboard', 'corsair-k100-rgb', 22, 7, 'COR-K100', 'Corsair K100 RGB, mechanical gaming, AXON 8000Hz, iCUE control', 24900, 21900, 15, true, true, false, true, '2-year Corsair warranty'),
  ('Sony WH-1000XM5 Headphones', 'sony-wh1000xm5', 11, 7, 'SONY-XM5', 'Sony WH-1000XM5, wireless noise-canceling, 30-hour battery, LDAC', 34900, 27900, 25, true, true, true, false, '1-year Sony warranty'),
  ('Logitech Brio 4K Webcam', 'logitech-brio-4k', 10, 7, 'LOG-BRIO4K', 'Logitech Brio 4K, HDR webcam, 90fps, Windows Hello, noise-canceling', 19900, 16900, 35, true, false, true, false, '2-year Logitech warranty'),
  ('Razer DeathAdder V3 Pro', 'razer-deathadder-v3-pro', 13, 7, 'RAZ-DAV3P', 'Razer DeathAdder V3 Pro, wireless gaming mouse, 30K DPI, 90-hour battery', 14900, 12900, 18, true, true, false, true, '2-year Razer warranty'),
  ('Keychron K3 Pro Keyboard', 'keychron-k3-pro', 12, 7, 'KEY-K3PRO', 'Keychron K3 Pro, low-profile wireless mechanical, QMK/VIA, RGB', 12900, NULL, 28, true, false, false, true, '2-year Keychron warranty'),
  ('Logitech C920 HD Webcam', 'logitech-c920-hd', 10, 7, 'LOG-C920', 'Logitech C920 HD, 1080p webcam, autofocus, stereo mics, universal clip', 7900, 6900, 60, true, false, true, false, '2-year Logitech warranty');

-- ============================================================
-- GADGETS (10 Products)
-- ============================================================
INSERT INTO products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('Samsung Galaxy S25 Ultra', 'samsung-galaxy-s25-ultra', 6, 8, 'SAM-S25U', 'Samsung Galaxy S25 Ultra, 200MP camera, Snapdragon 8 Elite, S Pen, 6.9" AMOLED', 129900, 119900, 12, true, true, true, true, '1-year Samsung warranty'),
  ('Apple Watch Ultra 2', 'apple-watch-ultra-2', 1, 8, 'APL-WU2', 'Apple Watch Ultra 2, titanium case, 3000 nits, dual-frequency GPS, 36-hour battery', 79900, NULL, 18, true, true, true, false, '1-year Apple warranty'),
  ('Samsung Galaxy Watch 7', 'samsung-galaxy-watch-7', 6, 8, 'SAM-GW7', 'Samsung Galaxy Watch 7, 44mm, BioActive sensor, Wear OS, sapphire crystal', 34900, 29900, 22, true, false, false, true, '1-year Samsung warranty'),
  ('Sony WF-1000XM5 Earbuds', 'sony-wf1000xm5', 11, 8, 'SONY-WF5', 'Sony WF-1000XM5, wireless earbuds, noise-canceling, 8.5-hour battery, LDAC', 27900, 24900, 30, true, true, true, false, '1-year Sony warranty'),
  ('Samsung Galaxy Buds3 Pro', 'samsung-galaxy-buds3-pro', 6, 8, 'SAM-GB3P', 'Samsung Galaxy Buds3 Pro, ANC, 360 Audio, blade lights, IPX7', 24900, NULL, 25, true, false, false, true, '1-year Samsung warranty'),
  ('Microsoft Xbox Series X', 'microsoft-xbox-series-x', 14, 8, 'MS-XSX', 'Microsoft Xbox Series X, 1TB SSD, 4K gaming, 120fps, ray tracing, Quick Resume', 49900, 44900, 15, true, true, true, false, '1-year Microsoft warranty'),
  ('Sony PlayStation 5 Pro', 'sony-playstation-5-pro', 11, 8, 'SONY-PS5P', 'Sony PlayStation 5 Pro, 2TB SSD, 4K 120fps, ray tracing, AI upscaling', 69900, NULL, 10, true, true, false, true, '1-year Sony warranty'),
  ('Samsung Galaxy Ring', 'samsung-galaxy-ring', 6, 8, 'SAM-GR', 'Samsung Galaxy Ring, health tracking, sleep monitoring, titanium, 7-day battery', 39900, NULL, 20, true, true, false, true, '1-year Samsung warranty'),
  ('Apple AirPods Pro 2', 'apple-airpods-pro-2', 1, 8, 'APL-APP2', 'Apple AirPods Pro 2, ANC, Adaptive Audio, USB-C, 6-hour battery', 24900, 19900, 35, true, false, true, false, '1-year Apple warranty'),
  ('Samsung Galaxy Tab S10 Ultra', 'samsung-galaxy-tab-s10-ultra', 6, 8, 'SAM-TS10U', 'Samsung Galaxy Tab S10 Ultra, 14.6" AMOLED, S Pen, IP68, DeX mode', 119900, 109900, 8, true, true, false, true, '1-year Samsung warranty');

-- ============================================================
-- PRODUCT IMAGES (Sample Unsplash images for each product)
-- ============================================================
-- Note: In production, replace with actual product images from Supabase Storage
-- These are placeholder URLs for demonstration

-- ============================================================
-- ATTRIBUTES & VALUES (for filtering)
-- ============================================================
INSERT INTO attributes (name, input_type) VALUES
  ('RAM', 'select'),
  ('Storage', 'select'),
  ('Processor', 'select'),
  ('Screen Size', 'select'),
  ('Color', 'select'),
  ('Warranty', 'select'),
  ('Port Type', 'select'),
  ('Speed', 'select');

INSERT INTO attribute_values (attribute_id, value) VALUES
  (1, '8GB'), (1, '16GB'), (1, '32GB'), (1, '64GB'), (1, '128GB'),
  (2, '256GB'), (2, '512GB'), (2, '1TB'), (2, '2TB'), (2, '4TB'),
  (3, 'Intel Core i5'), (3, 'Intel Core i7'), (3, 'Intel Core i9'), (3, 'Intel Core Ultra 7'), (3, 'Intel Core Ultra 9'),
  (3, 'AMD Ryzen 5'), (3, 'AMD Ryzen 7'), (3, 'AMD Ryzen 9'), (3, 'Apple M4'), (3, 'Apple M4 Max'),
  (4, '13"'), (4, '14"'), (4, '15"'), (4, '16"'), (4, '17"'), (4, '24"'), (4, '27"'), (4, '32"'), (4, '34"'), (4, '49"'),
  (5, 'Black'), (5, 'Silver'), (5, 'Space Gray'), (5, 'White'), (5, 'Gold'),
  (6, '1 Year'), (6, '2 Years'), (6, '3 Years'), (6, '5 Years'), (6, 'Lifetime'),
  (7, 'USB-C'), (7, 'Thunderbolt 4'), (7, 'HDMI'), (7, 'DisplayPort'), (7, 'Ethernet'),
  (8, '1 Gbps'), (8, '2.5 Gbps'), (8, '10 Gbps'), (8, '100 Mbps'), (8, 'WiFi 6'), (8, 'WiFi 7');
