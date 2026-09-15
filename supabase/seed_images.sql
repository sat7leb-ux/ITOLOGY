-- Add Product Images (using Unsplash placeholders for demonstration)
-- In production, replace with actual product images from Supabase Storage

-- Computers
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'MBP16-M4MAX'), 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'MBA15-M4'), 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'DELL-XPS15-OLED'), 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'HP-SP360-16'), 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LEN-X1C-G12'), 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'ASU-ROG-G16'), 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-GB4-ULT'), 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'MS-SRF-LAP6'), 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'RAZ-BLD16'), 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LEN-LEG5-PRO'), 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', 0);

-- Components
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'INT-I9-14900K'), 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'AMD-R9-7950X3D'), 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'NV-RTX-4090'), 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'AMD-RX7900XTX'), 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'ASU-Z790-E'), 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'COR-DDR5-64GB'), 'https://images.unsplash.com/photo-1562976540-1502c4042498?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'CRU-T700-2TB'), 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SEA-BARR-4TB'), 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'COR-RM1000X'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'ASU-RYJ3-360'), 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80', 0);

-- Networking
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'TPL-BE805'), 'https://images.unsplash.com/photo-1606904825846-647eb07f5be3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'UBI-UDM-PRO'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'CIS-C9200L-48P'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'TPL-DECO-BE95'), 'https://images.unsplash.com/photo-1606904825846-647eb07f5be3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'NETG-RS700'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'UBI-U6-LITE'), 'https://images.unsplash.com/photo-1606904825846-647eb07f5be3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'CIS-MER-MR46'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'TPL-SG2428P'), 'https://images.unsplash.com/photo-1606904825846-647eb07f5be3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'UBI-USW-24POE'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'NETG-GS316PP'), 'https://images.unsplash.com/photo-1606904825846-647eb07f5be3?w=800&q=80', 0);

-- Cybersecurity
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'FG-60F'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'NETG-8300-MAX'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'FG-100F'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'FW-ORANGE'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'CIS-MER-MX68'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'FG-40F'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'NETG-6100'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'FG-FCEMS'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'CIS-SFW-1120'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'FG-FAZ-200F'), 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80', 0);

-- Servers & Storage
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'HP-DL380-G10'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'DELL-R750'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SYN-DS1821P'), 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'WD-RED-PRO-16TB'), 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SEA-IWP-20TB'), 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'DELL-XE9685L'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'HP-MSA-2060'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SYN-RS1221P'), 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'CRU-MX500-4TB'), 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-PM1743-15TB'), 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80', 0);

-- Displays
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'SAM-ONEO8'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'DELL-U3224KB'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LG-34GR95QE'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'ASU-PG32UQX'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-ODG9'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'DELL-U2724D'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'HP-Z27K-G3'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LEN-P27U-20'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-VFS9'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'ASA-PA32UCG'), 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 0);

-- Accessories
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'LOG-MX3S'), 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'KEY-Q1PRO'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'RAZ-BWV4P'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LOG-MXKS'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'COR-K100'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SONY-XM5'), 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LOG-BRIO4K'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'RAZ-DAV3P'), 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'KEY-K3PRO'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'LOG-C920'), 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 0);

-- Gadgets
INSERT INTO product_images (product_id, url, sort_order) VALUES
  ((SELECT id FROM products WHERE sku = 'SAM-S25U'), 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'APL-WU2'), 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-GW7'), 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SONY-WF5'), 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-GB3P'), 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'MS-XSX'), 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SONY-PS5P'), 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-GR'), 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'APL-APP2'), 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 0),
  ((SELECT id FROM products WHERE sku = 'SAM-TS10U'), 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80', 0);
