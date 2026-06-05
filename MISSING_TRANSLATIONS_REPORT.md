# Missing Translation Keys Report

## Summary
This report identifies ALL missing translation keys needed for the `/price` page to display exactly like project 2.

---

## CRITICAL MISSING KEYS

### 1. COMPARISON TABLE KEYS
**Status**: COMPLETELY MISSING from SimpleLanguageContext

#### Missing Keys:
- `comparison.badge` ✗
- `comparison.title` ✗
- `comparison.subtitle` ✗
- `comparison.unlimited` ✗

#### Missing Category Keys:
- `comparison.categories.scaleAndLimits` ✗
- `comparison.categories.dashboardPllan` ✗
- `comparison.categories.cropManagement` ✗
- `comparison.categories.tasksRecommendations` ✗
- `comparison.categories.inventoryPurchasing` ✗
- `comparison.categories.laborFinance` ✗
- `comparison.categories.productionSales` ✗
- `comparison.categories.finance` ✗
- `comparison.categories.hrAssets` ✗
- `comparison.categories.reports` ✗
- `comparison.categories.settings` ✗
- `comparison.categories.integrationData` ✗

#### Missing Feature Keys (ALL 50+ features):
- `comparison.features.organization` ✗
- `comparison.features.farmCount` ✗
- `comparison.features.area` ✗
- `comparison.features.storage` ✗
- `comparison.features.aiAssistant` ✗
- `comparison.features.farmDashboard` ✗
- `comparison.features.gisView` ✗
- `comparison.features.gisEdit` ✗
- `comparison.features.gisSpatial` ✗
- `comparison.features.zones` ✗
- `comparison.features.soilNutrition` ✗
- `comparison.features.labData` ✗
- `comparison.features.waterSource` ✗
- `comparison.features.dailyTasks` ✗
- `comparison.features.recommendations` ✗
- `comparison.features.consumables` ✗
- `comparison.features.warehouseManagement` ✗
- `comparison.features.purchasing` ✗
- `comparison.features.laborManagement` ✗
- `comparison.features.incomeExpense` ✗
- `comparison.features.seasonManagement` ✗
- `comparison.features.harvestManagement` ✗
- `comparison.features.retailTreeList` ✗
- `comparison.features.retailB2C` ✗
- `comparison.features.wholesaleB2B` ✗
- `comparison.features.crm` ✗
- `comparison.features.cashFund` ✗
- `comparison.features.farmBudget` ✗
- `comparison.features.paymentRequest` ✗
- `comparison.features.advanceList` ✗
- `comparison.features.hrProfile` ✗
- `comparison.features.attendanceSummary` ✗
- `comparison.features.overtimeSummary` ✗
- `comparison.features.leaveSummary` ✗
- `comparison.features.payrollSheet` ✗
- `comparison.features.paymentHistory` ✗
- `comparison.features.assetManagement` ✗
- `comparison.features.inventoryReport` ✗
- `comparison.features.soilQualityReport` ✗
- `comparison.features.waterQualityReport` ✗
- `comparison.features.incomeExpenseReport` ✗
- `comparison.features.operatingCostReport` ✗
- `comparison.features.customReport` ✗
- `comparison.features.unitDeclaration` ✗
- `comparison.features.cropVariety` ✗
- `comparison.features.userPermissions` ✗
- `comparison.features.warehouseDeclaration` ✗
- `comparison.features.recommendationApproval` ✗
- `comparison.features.purchaseApproval` ✗
- `comparison.features.taskPricing` ✗
- `comparison.features.shiftConfig` ✗
- `comparison.features.harvestQuality` ✗
- `comparison.features.assetTypeConfig` ✗
- `comparison.features.dataSync` ✗
- `comparison.features.apiIntegration` ✗

#### Missing Value Keys:
- `comparison.values.org1` ✗
- `comparison.values.org2` ✗
- `comparison.values.farm1` ✗
- `comparison.values.farm2` ✗
- `comparison.values.farm5perOrg` ✗
- `comparison.values.areaStarter` ✗
- `comparison.values.areaPro` ✗
- `comparison.values.areaBusiness` ✗
- `comparison.values.areaEnterprise` ✗
- `comparison.values.storage500mb` ✗
- `comparison.values.storage5gb` ✗
- `comparison.values.storage20gb` ✗
- `comparison.values.ai20` ✗
- `comparison.values.ai100` ✗
- `comparison.values.ai500` ✗

---

### 2. ADDONS SECTION KEYS
**Status**: PARTIALLY MISSING

#### Missing Keys:
- `addons.badge` ✗
- `addons.title` ✗
- `addons.subtitle` ✗
- `addons.detail` ✗ (CRITICAL - used for all detail buttons)

#### Missing Addon-Specific Keys:
- `addons.aiAnalytics.name` ✗
- `addons.aiAnalytics.priceSuffix` ✗
- `addons.aiAnalytics.priceLabel` ✗
- `addons.aiAnalytics.description` ✗
- `addons.aiAnalytics.shortDesc` ✗
- `addons.aiAnalytics.longDesc` ✗
- `addons.aiAnalytics.features` ✗ (array)

- `addons.aiAssistant.name` ✗
- `addons.aiAssistant.priceLabel` ✗
- `addons.aiAssistant.description` ✗
- `addons.aiAssistant.shortDesc` ✗
- `addons.aiAssistant.longDesc` ✗
- `addons.aiAssistant.features` ✗ (array)

- `addons.buyTree.name` ✗
- `addons.buyTree.priceLabel` ✗
- `addons.buyTree.description` ✗
- `addons.buyTree.shortDesc` ✗
- `addons.buyTree.longDesc` ✗
- `addons.buyTree.features` ✗ (array)

- `addons.vector.name` ✗
- `addons.vector.priceSuffix` ✗
- `addons.vector.priceLabel` ✗
- `addons.vector.description` ✗
- `addons.vector.shortDesc` ✗
- `addons.vector.longDesc` ✗
- `addons.vector.features` ✗ (array)

---

### 3. HARDWARE SECTION KEYS
**Status**: PARTIALLY MISSING

#### Missing Keys:
- `hardware.buyDesc` ✗ (CRITICAL)
- `hardware.rentDesc` ✗ (CRITICAL)
- `hardware.perUnit` ✗ (CRITICAL)
- `hardware.perUnitMonth` ✗ (CRITICAL)
- `hardware.detail` ✗ (CRITICAL - used for all detail buttons)

#### Missing Hardware-Specific Keys:
For EACH hardware item (drone, robot, soilSensor, waterSensor, rtk):
- `hardware.drone.description` ✗
- `hardware.drone.specs` ✗ (array - CRITICAL for checkmarks)
- `hardware.drone.longDesc` ✗
- `hardware.drone.features` ✗ (array)

- `hardware.robot.description` ✗
- `hardware.robot.specs` ✗ (array - CRITICAL)
- `hardware.robot.longDesc` ✗
- `hardware.robot.features` ✗ (array)

- `hardware.soilSensor.description` ✗
- `hardware.soilSensor.specs` ✗ (array - CRITICAL)
- `hardware.soilSensor.longDesc` ✗
- `hardware.soilSensor.features` ✗ (array)

- `hardware.waterSensor.description` ✗
- `hardware.waterSensor.specs` ✗ (array - CRITICAL)
- `hardware.waterSensor.longDesc` ✗
- `hardware.waterSensor.features` ✗
- `hardware.waterSensor.features` ✗ (array)

- `hardware.rtk.description` ✗
- `hardware.rtk.specs` ✗ (array - CRITICAL)
- `hardware.rtk.longDesc` ✗
- `hardware.rtk.features` ✗ (array)

---

### 4. FAQ SECTION KEYS
**Status**: COMPLETELY MISSING

#### Missing Keys:
- `faq.badge` ✗
- `faq.title` ✗
- `faq.subtitle` ✗
- `faq.items` ✗ (array of {q, a} objects - CRITICAL)

---

### 5. CTA SECTION KEYS
**Status**: COMPLETELY MISSING

#### Missing Keys:
- `cta.title` ✗
- `cta.subtitle` ✗
- `cta.freeTrial` ✗
- `cta.contactConsult` ✗

---

### 6. FOOTER KEYS
**Status**: PARTIALLY MISSING

#### Missing Keys:
- `footer.copyright` ✗

---

### 7. COST ESTIMATOR KEYS
**Status**: PARTIALLY PRESENT (some exist, but incomplete)

#### Missing Keys:
- `costEstimator.title` ✗
- `costEstimator.subtitle` ✗
- `costEstimator.cta` ✗

---

## JAPANESE TRANSLATIONS

### Status: COMPLETELY MISSING
All Japanese translations for the pricing page are MISSING, including:
- All `plans.*.features` arrays for Japanese
- All comparison table keys
- All addon keys
- All hardware keys
- All FAQ items
- All CTA keys

---

## IMPACT ANALYSIS

### Why Features Don't Display:
1. **Feature Lists with Checkmarks Missing**: The `plans.*.features` arrays exist in EN/VI but the comparison table features are completely missing
2. **Hardware Specs Missing**: The `hardware.*.specs` arrays are missing, so no spec badges display
3. **FAQ Items Missing**: The `faq.items` array is missing, so no FAQ accordion displays
4. **Addon/Hardware Details Missing**: The `addons.detail` and `hardware.detail` keys are missing, so detail buttons show undefined

### Critical Missing Arrays:
1. `comparison.features.*` - 50+ feature keys
2. `comparison.values.*` - 15+ value keys
3. `hardware.*.specs` - 5 hardware items × 4 specs each
4. `hardware.*.features` - 5 hardware items × 6-8 features each
5. `addons.*.features` - 4 addons × 6 features each
6. `faq.items` - 7 FAQ items

---

## NEXT STEPS

### Step 1: Add ALL Comparison Table Keys
Add ~80+ keys for comparison table (categories, features, values)

### Step 2: Add ALL Addon Keys
Add ~30+ keys for addons (names, descriptions, features arrays)

### Step 3: Add ALL Hardware Keys
Add ~40+ keys for hardware (descriptions, specs arrays, features arrays)

### Step 4: Add FAQ Items Array
Add `faq.items` array with 7 Q&A objects

### Step 5: Add CTA Keys
Add 4 CTA section keys

### Step 6: Add Japanese Translations
Add ALL missing Japanese translations for pricing page

---

## TOTAL MISSING KEYS: ~250+ keys across 3 languages
