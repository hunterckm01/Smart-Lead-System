### Tech Stack
* **Frontend:** React, Vite, React Router DOM, Tailwind CSS
* **Backend:** Node.js, Express, Dotenv, cors, mongoose, nodemon, node-cron

To ensure that each lead is synced exactly once during the background CRM automation, the system implements a multi-layer idempotency mechanism. This prevents issues where the same lead could be processed multiple times if the background job runs repeatedly or if multiple workers overlap.
1. isSynced Flag on Each Lead
Every lead record contains an isSynced boolean field:
false → Lead has never been synced
true → Lead has already been processed and should not be synced again
This field acts as a permanent indicator of whether the lead has been sent to the CRM.

2. Worker Only Selects Unsynced Leads
The scheduled CRM sync process specifically queries:
status = "Verified" AND isSynced = false
This ensures the worker only processes leads that have never been synced before, filtering out duplicates at the query level.

3. Atomic Update to Guarantee Idempotency
During the sync operation, each record is updated using an atomic database call:

This ensures:
Only one worker can update a name from isSynced: false → true
If another cycle or worker tries to sync the same lead 
at the same time, the update will fail the condition and be skipped
No race conditions and no duplicate CRM send events

This atomic update is the core of the idempotency guarantee.

Result: Duplicate-Proof Syncing

With these three layers working together:
A name is picked only once
A name is synced only once
A name is permanently marked after syncing

<img width="1919" height="959" alt="Screenshot 2025-12-13 005434" src="https://github.com/user-attachments/assets/d651c43b-01d2-4ebb-9077-026a38850bed" />
<img width="1919" height="959" alt="Screenshot 2025-12-13 005452" src="https://github.com/user-attachments/assets/3ca36283-4757-4427-9e3b-e540012ead84" />
<img width="1919" height="962" alt="Screenshot 2025-12-13 005503" src="https://github.com/user-attachments/assets/b3c97cfe-aff3-42ed-b925-f72ed7ce205f" />
<img width="1466" height="837" alt="Screenshot 2025-12-13 010024" src="https://github.com/user-attachments/assets/e64076b1-b128-4295-a81a-b1eda15df98d" />
<img width="1469" height="893" alt="Screenshot 2025-12-13 010034" src="https://github.com/user-attachments/assets/a3d33b35-0131-4371-8742-90f64758d9a5" />

