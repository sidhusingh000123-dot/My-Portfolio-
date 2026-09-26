# Portfolio Website — Spring Boot + MySQL + HTML/CSS/JS

A full-stack personal portfolio: static HTML/CSS/JS frontend served by a Spring Boot
backend, with project data and contact-form messages stored in MySQL.

## Project Structure
```
portfolio/
├── pom.xml
├── src/main/java/com/portfolio/portfolio/
│   ├── PortfolioApplication.java      (main class + sample data seeding)
│   ├── model/          (Project.java, ContactMessage.java)
│   ├── repository/     (JPA repositories)
│   └── controller/     (REST endpoints)
└── src/main/resources/
    ├── application.properties         (MySQL config)
    └── static/
        ├── index.html
        ├── css/style.css
        └── js/script.js
```

## 1. Set up MySQL
Make sure MySQL Server is installed and running locally, then create the database
(the app can also auto-create it, but doing it manually confirms your credentials work):

```sql
CREATE DATABASE portfolio_db;
```

## 2. Configure your credentials
Open `src/main/resources/application.properties` and update:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```
Use whatever MySQL username/password you normally connect with (e.g. via MySQL Workbench).

## 3. Open in IntelliJ
1. `File → Open` → select the `portfolio` folder (the one with `pom.xml`).
2. IntelliJ will detect it as a Maven project and download dependencies automatically
   (this needs internet access on first import).
3. Open `PortfolioApplication.java` and click the green ▶ run button next to
   `public class PortfolioApplication`.
4. Wait for the log to show `Tomcat started on port 8080` and `Started PortfolioApplication`.

## 4. View the site
Open your browser at:
```
http://localhost:8080
```

You should see the portfolio homepage. The **Projects** section loads data live from
`GET /api/projects` (seeded automatically on first run), and the **Contact** form
posts to `POST /api/contact`, saving each message into the `contact_messages` table.

## 5. Customize it
- **Your info**: edit `index.html` — name, role, bio, social links.
- **Your projects**: edit the sample list inside `seedData()` in
  `PortfolioApplication.java`, or just insert rows directly into the `projects`
  table in MySQL once it's created.
- **Styling/colors**: edit the CSS variables at the top of `style.css` (`:root { ... }`).
- **Add a resume/photo**: drop files into `src/main/resources/static/` and link them
  from `index.html` (e.g. `static/resume.pdf`, `static/images/profile.jpg`).

## API Endpoints
| Method | Endpoint          | Description                     |
|--------|-------------------|----------------------------------|
| GET    | `/api/projects`   | List all projects                |
| POST   | `/api/projects`   | Add a new project (JSON body)    |
| DELETE | `/api/projects/{id}` | Delete a project by id        |
| POST   | `/api/contact`    | Submit a contact form message    |

## Troubleshooting
- **"Communications link failure" / can't connect to MySQL**: confirm MySQL is
  running (`mysql -u root -p` should connect) and the port in `application.properties`
  (default 3306) matches your install.
- **Table not created**: `spring.jpa.hibernate.ddl-auto=update` auto-creates/updates
  tables on startup — just make sure the app actually connects successfully first.
- **Port 8080 already in use**: change `server.port` in `application.properties`.
