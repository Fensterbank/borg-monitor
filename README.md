# BORG MONITOR

Borg monitor is a web application listing a history of [BorgBackup](https://www.borgbackup.org/) runs.  
Frontend is powered by Next.js, React, react-query and Tailwind CSS.
Backend is powered by Strapi.  

## How it works

For my own servers and several customers I implemented a backup script using Borg and [BorgBase](https://www.borgbase.com/).  
While I see connections and date and time of the latest successful backup in BorgBase, I don't know anything about started backups and if started backups do really finish.  
This is especially relevant for customers, where I don't have access to the actual log file.

With Borg Monitor, my backup script makes a `POST` request before and after every backup run, also transmitting the last few lines of the log file containing the summary provided by the `--stats` parameter.  
The metadata of each run is saved in the backend and listed by the frontend.

## So where's the script

The script is not yet Open Source. Technically every machine has its own script version with other variables and so on.  
Long-term target would be to have an auto-update functionality and it would be nice, if the script for each machine could be created by **Borg Monitor** itself.  
For now, this is a hand-crafted personal solution for my backup scripts.

## Author

Made with ❤️ by Frédéric Bolvin, f-bit software.