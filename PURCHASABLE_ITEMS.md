# Purchasable Items - AgriBeacon Pricing

This document lists all items that can be purchased on the pricing page, requiring "Details" and "Add to Cart" buttons.

---

## 1. SaaS Plans (4 items)

### 1.1 Starter Plan
- **Price**: Free (0₫)
- **Billing**: Monthly/Yearly
- **Target**: Under 1 ha farms
- **Current Button**: "Start for Free" / "Bắt đầu miễn phí" / "無料で始める"
- **Needs**: 
  - ❌ Details button (not needed)
  - ✅ Add to Cart button

### 1.2 Professional Plan
- **Price**: 599,000₫/month (479,200₫/month yearly)
- **Billing**: Monthly/Yearly
- **Target**: 1-10 ha farms
- **Current Button**: "14-day Free Trial" / "Dùng thử 14 ngày" / "14日間無料トライアル"
- **Needs**: 
  - ❌ Details button (not needed)
  - ✅ Add to Cart button

### 1.3 Business Plan
- **Price**: 2,400,000₫/month (1,920,000₫/month yearly)
- **Billing**: Monthly/Yearly
- **Target**: 10-50 ha farms
- **Current Button**: "14-day Free Trial" / "Dùng thử 14 ngày" / "14日間無料トライアル"
- **Needs**: 
  - ❌ Details button (not needed)
  - ✅ Add to Cart button

### 1.4 Enterprise Plan
- **Price**: Contact Us (Custom pricing)
- **Billing**: Custom
- **Target**: Over 50 ha farms
- **Current Button**: "Contact Sales" / "Liên hệ tư vấn" / "お問合せ"
- **Needs**: 
  - ❌ Details button (not needed)
  - ⚠️ Add to Cart button (may redirect to contact form instead)

---

## 2. Add-on Modules (4 items)

### 2.1 AI Analytics
- **Key**: `aiAnalytics`
- **Price**: 120,000₫/month (96,000₫/month yearly)
- **Billing**: Monthly/Yearly
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 2.2 AI Farm Assistant (Tiểu Thần Nông)
- **Key**: `aiAssistant`
- **Price**: From 130,000₫ (per 50 queries pack)
- **Billing**: Pay-per-pack
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 2.3 Buy Tree
- **Key**: `buyTree`
- **Price**: From 5% revenue share
- **Billing**: Revenue-based
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 2.4 Farm Vectorization Service
- **Key**: `vector`
- **Price**: From 3,000₫/m²
- **Billing**: Per area
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

---

## 3. Hardware - Buy Outright (5 items)

### 3.1 Autonomous Farm Monitor Drone
- **Key**: `drone`
- **Price**: 62,000,000₫ (one-time)
- **Billing**: One-time purchase
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 3.2 Teleoperated Autonomous Sprayer (TAS)
- **Key**: `robot`
- **Price**: 136,000,000₫ (one-time)
- **Billing**: One-time purchase
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 3.3 7in1 Soil Sensor
- **Key**: `soilSensor`
- **Price**: 4,200,000₫ (one-time)
- **Billing**: One-time purchase
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 3.4 5in1 Water Quality Sensor
- **Key**: `waterSensor`
- **Price**: 16,000,000₫ (one-time)
- **Billing**: One-time purchase
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

### 3.5 RTK Base Station
- **Key**: `rtk`
- **Price**: 25,000,000₫ (one-time)
- **Billing**: One-time purchase
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

---

## 4. Hardware - Rent Bundle (1 item)

### 4.1 Teleoperated Autonomous Sprayer (TAS) - Rental
- **Key**: `robot` (rental option)
- **Price**: 9,900,000₫/month (7,920,000₫/month yearly)
- **Billing**: Monthly/Yearly rental
- **Current Button**: "Details" / "Chi tiết" / "詳細"
- **Needs**: 
  - ✅ Details button (already exists)
  - ✅ Add to Cart button

---

## Summary

**Total Purchasable Items**: 18 items
- SaaS Plans: 4 items
- Add-on Modules: 4 items
- Hardware (Buy): 5 items
- Hardware (Rent): 1 item

**Button Requirements**:
- All items need "Add to Cart" button added
- Most items already have "Details" button
- SaaS Plans need both buttons added

---

## Implementation Notes

1. **SaaS Plans**: Currently have CTA buttons like "Start for Free" or "14-day Free Trial". Need to add:
   - "Add to Cart" button (new)
   - Keep existing CTA or replace with Add to Cart button

2. **Add-ons**: Already have "Details" button. Need to add:
   - "Add to Cart" button (new)

3. **Hardware**: Already have "Details" button. Need to add:
   - "Add to Cart" button (new)

4. **Translation Keys Needed**:
   - `plans.*.detail` or use existing `addons.detail` / `hardware.detail`
   - `plans.*.addToCart` / `addons.*.addToCart` / `hardware.*.addToCart`
   - Or use generic: `common.detail` and `common.addToCart`
