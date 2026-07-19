# QA Test Strategy

## Objective

Validate that the Employee Onboarding application reliably moves a new employee through creation, notification, IT provisioning, role-based training, and workflow completion while preserving correct data and task ownership.

## Scope

### In scope

- Home-page navigation and dashboard cards
- New employee form validation and submission
- Employee record creation
- Onboarding email delivery and content
- IT setup task creation, assignment, and completion
- Employment-type training selection
- New-hire training task creation and completion
- Parent/child workflow status and recovery
- Employee and training database records
- Negative testing for duplicate email addresses

### Out of scope

- Production load and endurance testing
- Enterprise SSO penetration testing
- External email-provider availability
- Mobile-device coverage beyond responsive visual inspection

## Risk-based priorities

| Risk | Impact | Priority | Coverage |
|---|---|---:|---|
| Workflow stops during a cross-role hand-off | Onboarding cannot complete | Critical | End-to-end and fault-recovery tests |
| Wrong employee or task parameter is passed | Records may be updated incorrectly | Critical | UI, workflow detail, and SQL verification |
| Training reference data does not match employee type | New hire receives no training | High | Boundary/reference-data testing |
| Duplicate employee email is accepted or poorly handled | Data integrity or poor UX | High | Negative test |
| Email is not delivered | New hire misses onboarding information | High | Integration test |
| Navigation points outside the application | Users cannot perform assigned work | Medium | Navigation smoke test |

## Test approach

- **Smoke testing:** application launch, cards, navigation, and primary pages.
- **Functional testing:** form submission, task actions, and workflow transitions.
- **Role-based testing:** STEVE initiates, AMY completes IT work, and MONICA completes training.
- **Integration testing:** Oracle APEX workflow, database records, and outbound email.
- **Negative testing:** duplicate email address and mismatched reference values.
- **Exploratory testing:** inspect faulted workflows, parameters, error messages, and unexpected task visibility.
- **Regression testing:** repeat the affected flow after every fix, then complete the full onboarding journey.

## Entry criteria

- Application imports and runs in Oracle APEX.
- Required tables, procedures, task definitions, and workflows exist.
- Workflow definition is active and participants are configured.
- Test users and training catalog data are available.

## Exit criteria

- All critical-path scenarios pass.
- High-severity defects are fixed and retested.
- Email delivery is confirmed.
- Database records agree with the UI and workflow parameters.
- Parent onboarding workflow reaches `Completed`.

## Evidence standards

Each important result is supported by one or more of the following:

- UI screenshot showing role, state, or message
- Workflow activity and parameter detail
- SQL result validating stored data
- Email delivery screenshot
- Before/after evidence for a corrected defect
