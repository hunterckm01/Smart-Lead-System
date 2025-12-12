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
If another cycle or worker tries to sync the same lead at the same time, the update will fail the condition and be skipped
No race conditions and no duplicate CRM send events
This atomic update is the core of the idempotency guarantee.

Result: Duplicate-Proof Syncing
With these three layers working together:
A name is picked only once
A name is synced only once
A name is permanently marked after syncing
