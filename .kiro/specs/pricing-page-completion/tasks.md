# Implementation Plan: Pricing Page Translation Completion

## Overview

This plan implements a one-time data migration task to verify and complete translation values for the pricing page. The implementation extracts translation keys from Price.tsx, validates completeness across all three languages (vi, en, ja), and fills missing values from the source project (agribeacon-pricing-builder).

## Tasks

- [ ] 1. Set up translation extraction and validation utilities
  - Create TypeScript utility functions for key extraction from Price.tsx
  - Create validation functions to check translation completeness
  - Set up data structures for tracking missing translations
  - _Requirements: 1.1, 1.2, 1.3, 1.6_

- [ ]* 1.1 Write property test for key extraction
  - **Property 1: Complete Language Coverage**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.6**

- [ ] 2. Extract translation keys from Price.tsx
  - [ ] 2.1 Parse Price.tsx to identify all t() function calls
    - Extract direct string literals (e.g., t("hero.badge"))
    - Extract template literal keys (e.g., t(\`plans.${key}.name\`))
    - Identify array-type keys (e.g., t("faq.items"))
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [ ] 2.2 Generate comprehensive list of all translation keys used
    - Create structured list with key names and types (string vs array)
    - Document usage context for each key
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Validate current translations in SimpleLanguageContext.tsx
  - [ ] 3.1 Load and parse SimpleLanguageContext.tsx translation objects
    - Extract vi, en, and ja translation objects
    - Build lookup structure for fast validation
    - _Requirements: 1.1, 1.2, 1.3, 1.6_
  
  - [ ] 3.2 Compare extracted keys against existing translations
    - Check each key exists in all three languages
    - Identify undefined or empty values
    - Detect incomplete arrays
    - Generate validation report
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

- [ ]* 3.3 Write property test for translation validation
  - **Property 4: No Undefined Values**
  - **Validates: Requirements 1.6**

- [ ] 4. Checkpoint - Review validation report
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Extract source translations from agribeacon-pricing-builder
  - [ ] 5.1 Load source translation files (vi.ts, en.ts, ja.ts)
    - Parse TypeScript export default objects
    - Build nested object structure for each language
    - _Requirements: 1.4, 1.7_
  
  - [ ] 5.2 Map source keys to target flat structure
    - Convert nested objects to dot-notation keys
    - Preserve array structures
    - Handle type consistency (string vs array)
    - _Requirements: 1.4, 1.5, 1.7_

- [ ]* 5.3 Write property test for source consistency
  - **Property 2: Source Consistency**
  - **Validates: Requirements 1.4, 1.7**

- [ ]* 5.4 Write property test for array completeness
  - **Property 3: Array Completeness**
  - **Validates: Requirements 1.5**

- [ ] 6. Fill missing translations in SimpleLanguageContext.tsx
  - [ ] 6.1 Merge source translations into target structure
    - For each missing key, retrieve value from source
    - Handle nested key resolution (dot-notation paths)
    - Preserve existing non-pricing translations
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 6.2 Update SimpleLanguageContext.tsx with complete translations
    - Write updated translation objects back to file
    - Maintain code formatting and structure
    - Preserve TypeScript types
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7_

- [ ]* 6.3 Write unit tests for translation filler
    - Test correct value retrieval from source files
    - Test nested key resolution
    - Test array structure preservation
    - Test handling of missing source keys
    - _Requirements: 1.4, 1.5, 1.7_

- [ ] 7. Verify translation completeness
  - [ ] 7.1 Re-run validation against updated translations
    - Confirm all keys have values in vi, en, ja
    - Verify no undefined values remain
    - Check array completeness
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_
  
  - [ ] 7.2 Generate final validation report
    - Document all changes made
    - List any keys requiring manual review
    - Confirm semantic meaning preservation
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [ ] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- This is a one-time data migration task, not a runtime feature
- All translation keys used in Price.tsx must have corresponding values in vi, en, and ja
- Source project structure (nested objects) differs from target structure (flat dot-notation)
