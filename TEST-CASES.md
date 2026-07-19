# Requirements Traceability and Test Cases

| ID | Requirement / risk | Test procedure | Expected result | Result | Evidence |
|---|---|---|---|---|---|
| TC-001 | Authorized user can access the application | Log in as STEVE and open the application home page | Application loads with dashboard cards and navigation | Pass | `homePage.png` |
| TC-002 | Dashboard navigation remains inside the application | Open Home, New Employee, Task Pages, Workflow Pages, and Administration | Each card/menu opens its configured application destination | Pass after fix | BUG-004; `homePage.png` |
| TC-003 | New employee form exposes required onboarding inputs | Open New Employee - Onboarding | Required employee, type, department, manager, and date fields are available | Pass | `newEMPLOYEEONBOARDINGBEFORESUBMIT.png` |
| TC-004 | Valid employee submission starts onboarding | Enter valid unique employee data and select Create | Row is created and onboarding is initiated | Pass | `successMESSAGEAFTERONBOARDING.png` |
| TC-005 | Created employee is stored and reportable | Open Administration → Employees after submission | New employee appears with correct type, department, manager, role, and date | Pass | Private execution evidence retained; public screenshot omitted for privacy |
| TC-006 | New hire receives onboarding notification | Submit a valid personal email and inspect its inbox | Welcome email is received with expected onboarding content | Pass | `onboardingEmail.png` |
| TC-007 | IT work is created and assigned correctly | As STEVE inspect initiated tasks; as AMY claim/open IT Setup | IT task contains correct employee details and both IT actions | Pass | `myTASK.png`, `itSETUPTASKDETAILS.png` |
| TC-008 | IT action buttons pass the employee ID correctly | Select Create Email and Allocate Laptop | Action pages open without item-resolution errors | Pass after fix | BUG-001; historical `image(342).png` |
| TC-009 | Duplicate email is handled safely | Attempt to create/update an employee using an existing email | Duplicate is rejected with a user-friendly validation message | Fail — improvement open | BUG-002; historical `image(348).png` |
| TC-010 | Full-time employees receive applicable training | Complete IT task for a Full Time employee and inspect MONICA’s tasks | Three Full Time trainings are assigned and Allocate Trainings appears | Pass after fix | BUG-003; `actualRESULTAFTERFIX.png`, `trainingDETAILS.png` |
| TC-011 | Assigned work can be completed | Complete the IT and training task actions | Task completion confirmation appears and workflow advances | Pass | `taskCOMPLETED.png` |
| TC-012 | End-to-end onboarding completes | Finish all role-based tasks and inspect workflow details | Every activity and the parent workflow show Completed | Pass | `workflowCompleted.png` |

## Regression set

Run TC-002, TC-004, TC-006, TC-008, TC-010, TC-011, and TC-012 after any change to navigation, task actions, workflows, procedures, or training reference data.

## Recommended automation candidates

1. Playwright end-to-end happy path for employee creation and navigation.
2. Playwright negative test asserting duplicate-email validation.
3. API/SQL integration check for employee and training record creation.
4. Parameterized data test covering `Full Time`, `Part Time`, `Intern`, and unsupported employee types.
5. Accessibility scan for forms, dialogs, cards, task lists, and validation messages.
