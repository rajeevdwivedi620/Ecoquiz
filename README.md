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



### 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Sundramkumar33033302">
        <img src="https://github.com/Sundramkumar33033302.png" width="100px;" alt="Sundram Kumar"/><br />
        <sub><b>Sundram Kumar</b></sub>
      </a><br />
      <sub> Quiz designer </sub>
    </td>
    <td align="center">
      <a href="https://github.com/rajeevdwivedi620">
        <img src="https://github.com/rajeevdwivedi620.png" width="100px;" alt="Rajeev Dwivedi"/><br />
        <sub><b>Rajeev Dwivedi</b></sub>
      </a><br />
      <sub> Lead developer </sub>
    </td>
    <td align="center">
      <a href="https://github.com/prabhjotsingh200888">
        <img src="https://github.com/prabhjotsingh200888.png" width="100px;" alt="Prabhjot Singh"/><br />
        <sub><b>Prabhjot Singh</b></sub>
      </a><br />
      <sub> Website designer</sub>
    </td>
  </tr>
</table>
