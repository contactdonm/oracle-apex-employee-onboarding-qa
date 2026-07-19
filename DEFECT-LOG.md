# Defect Log

## Summary

| ID | Title | Type | Severity | Status |
|---|---|---|---|---|
| BUG-001 | IT task actions fail because target item contains trailing whitespace | Functional/configuration | High | Fixed and passed |
| BUG-002 | Duplicate email exposes raw Oracle constraint error | Validation/UX | Medium | Open improvement |
| BUG-003 | Full-time training workflow faults because reference values differ | Workflow/data | High | Fixed and passed |
| BUG-004 | Home cards missing and parent navigation routes incorrectly | Navigation/configuration | Medium | Fixed and passed |

---

## BUG-001 — IT task actions fail because target item contains trailing whitespace

**Severity:** High  
**Status:** Fixed and regression passed

### Preconditions

- IT Setup task exists for an employee.
- User opens the task detail and selects Create Email or Allocate Laptop.

### Actual result

APEX displays `ERR-1002 Unable to find item ID for item "P11_EMPLOYEE_ID "`. Both IT actions are blocked.

### Expected result

The action dialog opens and receives the employee identifier.

### Root cause

The Page 8 action target referenced `P11_EMPLOYEE_ID` with an invisible trailing space, so APEX attempted to resolve a different item name.

### Fix

Removed the trailing whitespace and retained the valid Page 11 target item.

### Retest

Both Create Email and Allocate Laptop opened successfully and the IT task could be completed.

### Evidence

- Before: `evidence/image(342).png`
- After: `evidence/itSETUPTASKDETAILS.png`, `evidence/taskCOMPLETED.png`

---

## BUG-002 — Duplicate email exposes raw Oracle constraint error

**Severity:** Medium  
**Status:** Open improvement; database integrity control works

### Steps to reproduce

1. Open an IT Create Email action or employee form.
2. Enter an email already stored in `EMPLOYEES.EMAIL`.
3. Submit.

### Actual result

The database rejects the duplicate, but the UI exposes `ORA-00001` and the internal unique-constraint name.

### Expected result

Submission is rejected before processing with a message such as: “This email address is already assigned to an employee.”

### Root cause

The unique database constraint is working, but no application-level duplicate-email validation translates the exception into a user-friendly message.

### Recommended fix

Add server-side validation using a case-insensitive email lookup and provide a friendly inline error. Retain the database constraint as the final integrity safeguard.

### Evidence

- `evidence/image(348).png`

---

## BUG-003 — Full-time training workflow faults because reference values differ

**Severity:** High  
**Status:** Fixed and regression passed

### Actual result

The child Employment Type Workflow faults with `ORA-20001: No trainings found for employee type: Full Time`. MONICA receives no Allocate Trainings task.

### Expected result

A Full Time employee receives the three applicable courses and an Allocate Trainings task.

### Root cause

The employee/workflow value was `Full Time`, while `TRAINING_CATALOG.TARGET_AUDIENCE` stored `Full-Time`. Exact matching returned zero courses.

### Fix

Standardized the catalog audience value to `Full Time`, then retried the faulted child and parent workflows.

### Retest

MONICA received Allocate Trainings, completed the assigned work, and the parent Employee Onboarding workflow reached Completed.

### Evidence

- Before: Private workflow fault evidence retained; public screenshot omitted because it contains a personal email alias
- Reference data: `evidence/trainingDETAILS.png`
- After: `evidence/actualRESULTAFTERFIX.png`, `evidence/workflowCompleted.png`

---

## BUG-004 — Home cards missing and parent navigation routes incorrectly

**Severity:** Medium  
**Status:** Fixed and smoke test passed

### Actual result

The home page initially displayed an empty content area. After adding cards, parent entries such as Task Pages, Workflow Pages, and Administration navigated away from the intended application destination.

### Expected result

The home page displays functional cards, and parent menu entries expand or navigate only to valid in-application destinations.

### Root cause

The Home page did not contain the expected cards region, and hierarchical list entries were not consistently configured as non-navigating parent entries with correct child targets.

### Fix

Added the Home cards region, reorganized navigation hierarchy, and verified page targets.

### Retest

All visible dashboard cards and menu groups render correctly and application navigation remains usable.

### Evidence

- After: `evidence/homePage.png`

## Defect metrics

- Fix verification pass rate: 3/3 fixed defects
- Open product improvement: 1
- High-severity closure rate: 2/2
- Escaped defects observed during final end-to-end test: 0
