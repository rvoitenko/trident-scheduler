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

The setup is based on automation written in cypress which basically emulates login into your Apex fusion, and click Trident buttons `Start Test`->`Combined/Alkalinity`. 
Automatic run is performed by GitHub Actions as [cron schedule](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events).
Free GitHub account is enough to run this automation.
Apex fusion username and password stored securely as GitHub Secrets.
Schedule time is defined in UTC time. But real test run can delay 5-30 minutes. It's because how GitHub cron schedule works for free accounts. 
There are two separate workflow files which are responsible for combined and alkalinity tests schedule:
 - [cron-alkalinity.yml](.github/workflows/cron-alkalinity.yml)
 - [cron-combined.yml](.github/workflows/cron-combined.yml)

### How to setup

Fork the repo by clicking `Fork` button in upper right corner.
Go to newly forked repo settings -> `Secrets`. Add two secrets - `USERNAME` with your Apex fusion username and `PASSWORD` with your Apex fusion password.
By default Combined test is running at 6AM UTC time once per day and additional Alkalinity test runs at 4PM UTC time.
If you want to customize these schedule edit the following files: 
- [cron-alkalinity.yml](.github/workflows/cron-alkalinity.yml)
- [cron-combined.yml](.github/workflows/cron-combined.yml)  

and push changes to the repo.
  
If you don't want to run separate Alkalinity test you can remove the file [cron-alkalinity.yml](.github/workflows/cron-alkalinity.yml).

All this automation is on your own risk.

