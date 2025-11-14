# Trident-scheduler
The [Trident](https://www.neptunesystems.com/products/expansion-modules/trident/) is great automated testing system that regularly tests alkalinity, calcium, and magnesium in your saltwater aquarium.
By default it allows you to run minimum 4 tests per day at pre-defined time: 

| Time  | Test                             |
| ----- | -------------------------------- |
| 00:00 |	Alkalinity, Calcium, Magnesium |
| 06:00 |	Alkalinity                     |
| 12:00 |	Alkalinity, Calcium, Magnesium |
| 18:00 |	Alkalinity                     |

In order to have ability to customize amount of tests and desired run time I have created this simple automation based on  [cypress](https://www.cypress.io/) test tool.
Basically it emulates human behavior by running Trident tests manually via APEX web interface at desired time.
This way you can run only one combined test per day(if you run test less often you get APEX Trident alert `there is no test done in last 24 hours`). 
This can prolong life of your Neptune Trident unit plus reagent consumption will be 2x time longer.
I found running tests once per day useful for already established tanks. 
If you need more frequent tests you can tune tests schedule to any desired time and  frequency.

### How it works

The setup is based on automation written in Cypress (v13.6.6) which emulates login into your Apex Fusion and clicks Trident buttons `Start Test`->`Combined/Alkalinity`.
Automatic runs are performed by GitHub Actions as [cron schedule](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events).
A free GitHub account is enough to run this automation.
Apex Fusion username and password are stored securely as GitHub Secrets.
Schedule time is defined in UTC time, but actual test runs may delay 5-30 minutes due to how GitHub cron schedules work for free accounts.

All tests are managed by a single workflow file: [trident-tests.yml](.github/workflows/trident-tests.yml)

**Features:**
- Automatic retries on test failure (2 retries)
- Login validation and error handling
- Screenshots on failure for troubleshooting
- Manual trigger option via workflow_dispatch

### How to setup

1. Fork the repo by clicking the `Fork` button in the upper right corner
2. Go to your forked repo: `Settings` → `Secrets and variables` → `Actions`
3. Add two repository secrets:
   - `USERNAME`: Your Apex Fusion username
   - `PASSWORD`: Your Apex Fusion password

**Default Schedule (UTC time):**

| UTC Time  | Test                             |
| --------- | -------------------------------- |
| 06:00     | Alkalinity, Calcium, Magnesium   |
| 16:00     | Alkalinity only                  |

**To customize the schedule:**
- Edit [trident-tests.yml](.github/workflows/trident-tests.yml)
- Modify the cron expressions under the `schedule` section
- Convert your local time to UTC using [this documentation](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events)

**Manual Testing:**
- Go to `Actions` tab → `Trident Tests` → `Run workflow`
- Select test type: `combined`, `alkalinity`, or `both`

**Verify Setup:**
Check the `Actions` tab after a scheduled run. Successful runs show a green checkmark. If tests fail, check the logs and screenshots (if available).

All this automation is on your own risk.

