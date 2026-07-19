# Oracle APEX Employee Onboarding — QA Portfolio

This portfolio documents manual, exploratory, workflow, database, email, and regression testing performed against an Oracle APEX Employee Onboarding application.

## Project outcome

The application was tested from new-hire creation through IT provisioning, training assignment, notification, and workflow completion. Four defects were identified, investigated, corrected, and retested. The final onboarding workflow completed successfully.

## What this demonstrates

- Risk-based test design for a multi-role business workflow
- Functional and exploratory web testing
- Cross-page navigation and role/task hand-off validation
- Oracle SQL data validation
- Workflow fault diagnosis and recovery testing
- Email notification verification
- Defect reporting with reproducible evidence
- Fix verification and end-to-end regression testing

## System under test

- Platform: Oracle APEX
- Application: Employee Onboarding Application (App 46960)
- Primary roles: STEVE (initiator/admin), AMY (IT), MONICA (new hire)
- Core flow: create employee → send onboarding email → create IT/HR records → complete IT tasks → assign training by employee type → complete training → send completion email → close workflow

## Results summary

| Metric | Result |
|---|---:|
| Test scenarios | 12 |
| Passed after regression | 12 |
| Defects identified | 4 |
| High-severity defects | 2 |
| Final workflow result | Completed |

## Portfolio contents

- [QA Test Strategy](QA-TEST-STRATEGY.md)
- [Requirements Traceability and Test Cases](TEST-CASES.md)
- [Defect Log](DEFECT-LOG.md)
- [Test Execution Summary](TEST-EXECUTION-SUMMARY.md)
- [GitHub Publishing Checklist](GITHUB-PUBLISHING-CHECKLIST.md)
- [Evidence](evidence/) — screenshots supporting test execution and defect retesting

## Key result

The completed workflow evidence shows every major activity completed: onboarding email, IT/HR record creation, onboarding tasks, employment-type tasks, completion email, and workflow end.

![Completed employee onboarding workflow](evidence/workflowCompleted.png)

## Notes

Test data uses fictional employees. Personal recipient information in email evidence is redacted. This project was created as a hands-on QA case study and does not represent production company data.
