# scripts/generate_all_seeds.py
import json
import math
import os
from datetime import datetime, timedelta

import sys
sys.path.append(os.path.dirname(__file__))

from data_part1 import PART1_PRODUCTS
from data_part2 import PART2_PRODUCTS
from data_inquiries_scenarios import INQUIRIES_CONFIG, DEMO_SCENARIOS

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'server', 'data')
os.makedirs(OUTPUT_DIR, exist_ok=True)

all_products = PART1_PRODUCTS + PART2_PRODUCTS

# Helper to compute volume tiers deterministically with floor protection
def make_tiers(price, total_cost):
    # Ensure tier 4 price is strictly > total_cost
    margin_amount = price - total_cost
    # Max discount allowed without breaching total_cost + 5% safety margin
    safe_floor = math.ceil(total_cost * 1.05)
    max_discount_rs = max(0, price - safe_floor)
    max_discount_pct = min(15, math.floor((max_discount_rs / price) * 100))

    if max_discount_pct <= 4:
        t2_d = 2
        t3_d = 3
        t4_d = max(4, max_discount_pct)
    else:
        t2_d = max(2, round(max_discount_pct * 0.35))
        t3_d = max(t2_d + 2, round(max_discount_pct * 0.65))
        t4_d = max_discount_pct

    p1 = price
    p2 = round(price * (1 - t2_d / 100))
    p3 = round(price * (1 - t3_d / 100))
    p4 = round(price * (1 - t4_d / 100))

    # Strict floor protection check
    if p4 < total_cost:
        p4 = math.ceil(total_cost * 1.02)
    if p3 < p4:
        p3 = math.ceil(p4 * 1.03)
    if p2 < p3:
        p2 = math.ceil(p3 * 1.03)

    return [
        {"min": 1, "max": 9, "discountPercent": 0, "price": p1, "label": "Sample Batch (1–9 units)"},
        {"min": 10, "max": 24, "discountPercent": t2_d, "price": p2, "label": f"Wholesale Tier 1 (10–24 units)"},
        {"min": 25, "max": 49, "discountPercent": t3_d, "price": p3, "label": f"Bulk Tier 2 (25–49 units)"},
        {"min": 50, "max": 100, "discountPercent": t4_d, "price": p4, "label": f"Volume Sourcing (50+ units)"}
    ]

# 1. PROCESS PRODUCTS
final_products = []
for idx, p in enumerate(all_products):
    pid = f"p{idx + 1}"
    mc = p["materialCost"]
    lh = p["labourHours"]
    lr = p["labourRate"]
    pkg = p["packagingCost"]
    tc = p["transportCost"]
    oc = p["otherCost"]
    total_cost = round(mc + (lh * lr) + pkg + tc + oc)

    # Price verification
    price = p["price"]
    if price <= total_cost:
        price = round(total_cost * 1.35)

    tiers = make_tiers(price, total_cost)

    prod = {
        "id": pid,
        "artisanId": p["artisanId"],
        "name": p["name"],
        "productName": p["name"],
        "titleEn": p["titleEn"],
        "titleHi": p["titleHi"],
        "craftType": p["craftType"],
        "category": p["category"],
        "craftCategory": p["craftCategory"],
        "material": p["material"],
        "materials": p.get("materials", p["material"]),
        "technique": p["technique"],
        "origin": p["origin"],
        "description": p["description"],
        "descriptionHi": p["descriptionHi"],
        "dimensions": p["dimensions"],
        "weight": p["weight"],
        "productionTime": p["productionTime"],
        "capacity": p["capacity"],
        "minimumOrderQuantity": p["moq"],
        "images": [p["imageUrl"]],
        "imageUrl": p["imageUrl"],
        "costBreakdown": {
            "materialCost": mc,
            "labourHours": lh,
            "labourRate": lr,
            "packagingCost": pkg,
            "transportCost": tc,
            "otherCost": oc,
            "totalCost": total_cost
        },
        "price": price,
        "currentPrice": price,
        "b2bPricingTiers": tiers,
        "marketComparables": p["comparables"],
        "stock": p["stock"],
        "estimatedHours": lh,
        "tags": p["tags"],
        "seoTitle": f"{p['titleEn']} | KarigarSetu Direct B2B",
        "seoDescription": f"Source authentic {p['titleEn']} directly from GI-certified artisans in {p['origin']}. Tiered wholesale pricing with guaranteed fair trade wages.",
        "status": "in_stock",
        "isDemoData": True
    }
    final_products.append(prod)

# Write productsSeed.ts
products_ts = f"""export interface B2BVolumeTier {{
  min: number;
  max: number;
  discountPercent: number;
  price: number;
  label: string;
}}

export interface ProductSeed {{
  id: string;
  artisanId: string;
  name: string;
  productName: string;
  titleEn: string;
  titleHi: string;
  craftType: string;
  category: string;
  craftCategory: string;
  material: string;
  materials: string;
  technique: string;
  origin: string;
  description: string;
  descriptionHi: string;
  dimensions: string;
  weight: string;
  productionTime: string;
  capacity: string;
  minimumOrderQuantity: number;
  images: string[];
  imageUrl: string;
  costBreakdown: {{
    materialCost: number;
    labourHours: number;
    labourRate: number;
    packagingCost: number;
    transportCost: number;
    otherCost: number;
    totalCost: number;
  }};
  price: number;
  currentPrice: number;
  b2bPricingTiers: B2BVolumeTier[];
  marketComparables: Array<{{
    source: string;
    price: number;
    region?: string;
  }}>;
  stock: number;
  estimatedHours: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: 'active' | 'in_stock' | 'made_to_order';
  isDemoData: boolean;
}}

export const SEED_PRODUCTS: ProductSeed[] = {json.dumps(final_products, indent=2, ensure_ascii=False)};
"""

with open(os.path.join(OUTPUT_DIR, 'productsSeed.ts'), 'w', encoding='utf-8') as f:
    f.write(products_ts)
print(f"Generated server/data/productsSeed.ts ({len(final_products)} products)")

# 2. PROCESS INQUIRIES
now = datetime.now()
final_inquiries = []
for inq in INQUIRIES_CONFIG:
    created_at = (now - timedelta(days=inq.get("daysAgo", 1), hours=3)).isoformat() + "Z"
    item = {
        "id": inq["id"],
        "productId": inq["productId"],
        "productName": inq["productName"],
        "artisanId": inq["artisanId"],
        "buyerId": inq["buyerId"],
        "buyerName": inq["buyerName"],
        "buyerOrg": inq["buyerOrg"],
        "quantity": inq["quantity"],
        "targetPrice": inq["targetPrice"],
        "timeline": inq["timeline"],
        "notes": inq["notes"],
        "status": inq["status"],
        "createdAt": created_at,
        "isDemoData": True
    }
    final_inquiries.append(item)

inquiries_ts = f"""export interface InquirySeed {{
  id: string;
  productId: string;
  productName: string;
  artisanId: string;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  quantity: number;
  targetPrice: number;
  timeline: string;
  notes: string;
  status: 'New' | 'Viewed' | 'Responded' | 'Negotiating' | 'Accepted' | 'Fulfilled' | 'Closed' | 'received' | 'in_negotiation' | 'confirmed';
  createdAt: string;
  isDemoData: boolean;
}}

export const SEED_INQUIRIES: InquirySeed[] = {json.dumps(final_inquiries, indent=2, ensure_ascii=False)};
"""

with open(os.path.join(OUTPUT_DIR, 'inquiriesSeed.ts'), 'w', encoding='utf-8') as f:
    f.write(inquiries_ts)
print(f"Generated server/data/inquiriesSeed.ts ({len(final_inquiries)} inquiries)")

# 3. PROCESS SCENARIOS
scenarios_ts = f"""export interface DemoScenario {{
  id: string;
  title: string;
  subtitle: string;
  artisanId: string;
  artisanName: string;
  craft: string;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  productId: string;
  productName: string;
  inquiryId: string;
  pitch: string;
  suggestedQuestions: string[];
  keyHighlights: string[];
}}

export const SEED_SCENARIOS: DemoScenario[] = {json.dumps(DEMO_SCENARIOS, indent=2, ensure_ascii=False)};
"""

with open(os.path.join(OUTPUT_DIR, 'scenariosSeed.ts'), 'w', encoding='utf-8') as f:
    f.write(scenarios_ts)
print(f"Generated server/data/scenariosSeed.ts ({len(DEMO_SCENARIOS)} scenarios)")
print("ALL SEEDS GENERATED SUCCESSFULLY!")
