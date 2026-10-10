# BuildSmart

BuildSmart is a quiz and learning app served by an Express backend.

## Run locally

```sh
npm install
npm start
```

Open the frontend at <http://localhost:3000/>. The backend health endpoint is
<http://localhost:3000/api/health>.

## Configure the admin account

Set `ADMIN_PASSWORD` before starting the server. The server creates the
`admin@buildsmart.com` account on first startup, or updates its password to the
configured value on later startups. If the variable is not set, a new admin
account is not created.

In PowerShell:

```powershell
$env:ADMIN_PASSWORD = "replace-with-a-strong-password"
npm start
```

The SQLite database and local leaderboard data are kept out of version control.
