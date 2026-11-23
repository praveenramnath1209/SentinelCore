# SentinelCore — SecureOps Platform

A centralized Security Operations Center (SOC) and infrastructure monitoring system built for modern engineering teams. **SentinelCore** combines real-time hardware telemetry, automatic network asset discovery, security alert triage, and incident response into a single, intuitive cyber-themed dashboard.

---

## 💡 Why SentinelCore?

Managing IT infrastructure and security across dispersed machines, clouds, and subnets often involves jumping between disjointed tools. SentinelCore solves this by providing:

1. **Visibility**: Know what hardware is running, which subnets have active hosts, and how resources (CPU, RAM, disk, network) are performing in real time.
2. **Actionable Security**: Detect vulnerabilities (CVEs), track incoming security alerts, and guide incidents from discovery to resolution.
3. **Operational Clarity**: Export audit-ready reports (PDF & Excel) and enforce role-based access control for administrators, security analysts, and team members.

---

## ⚡ What SentinelCore Does

### 1. Unified SOC Command Center
* **Live System Telemetry**: Streams real-time CPU, RAM, disk, and network stats via OSHI (hardware & OS scanning).
* **High-Level Security Health**: Instant glance at healthy vs. critical devices, active alerts, and incident trends.
* **Modern Cyber Interface**: High-contrast, dark-mode SOC layout designed for long hours of monitoring without eye strain.

### 2. Network & Asset Inventory
* **Subnet Scanning**: Automatically discovers active devices and hostnames across local subnets.
* **Shared-IP Device Tracking**: Accurately manages virtual machines, containers, and appliances sharing host addresses.
* **Asset Lifecycle**: Track specifications, OS versions, health scores, and department assignments.

### 3. Alert Triage & Incident Handling
* **Severity Levels**: Prioritize alerts across Critical, High, Medium, and Low risk thresholds.
* **Incident Lifecycle**: Progress cases smoothly through `New` ➔ `In Progress` ➔ `Mitigated` ➔ `Resolved`.
* **Investigation Notes**: Keep chronological logs and forensic notes linked directly to each incident.

### 4. Vulnerabilities & Cloud Governance
* **CVE Tracking**: Track vulnerable components, review CVSS scores, and follow recommended remediation steps.
* **Cloud Infrastructure**: Monitor cloud posture and instances across AWS, Azure, and Google Cloud.

### 5. Automated Reporting & Export
* Download filtered asset lists, incident summaries, and system logs in **PDF** or **Excel (.xlsx)** with one click.

---

## 🛠️ Built With

* **Frontend**: React 18, Vite, React Router, Recharts, Framer Motion, React Icons
* **Backend**: Java 17, Spring Boot 3, Spring Security 6, JWT (JSON Web Tokens), Spring Data JPA
* **System Telemetry**: OSHI (Operating System and Hardware Information)
* **Database**: PostgreSQL
* **API Documentation**: SpringDoc OpenAPI / Swagger

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
* **Node.js** (v18 or newer) & **npm**
* **Java Development Kit (JDK)** (version 17+)
* **PostgreSQL** (version 15+)

---

### Step 1 — Database Setup

Create the database in PostgreSQL via `psql` or pgAdmin:

```sql
CREATE DATABASE secureopsprojectes;
```

---

### Step 2 — Run the Backend (Spring Boot)

1. Open a terminal and enter the backend directory:
   ```bash
   cd Secops
   ```

2. *(Optional)* Configure your credentials:
   Create a `.env` file (or copy from `.env.example`) to customize database credentials, JWT secret, or ports. If skipped, default development settings will be used.

3. Start the server:
   ```bash
   # On Windows
   ./mvnw.cmd spring-boot:run

   # On Linux / macOS
   ./mvnw spring-boot:run
   ```

   The backend will be running at: **`http://localhost:8080`**  
   Interactive API docs (Swagger): **`http://localhost:8080/swagger-ui.html`**

---

### Step 3 — Run the Frontend (React + Vite)

1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd "my frontend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

   Open your browser at: **`http://localhost:5173`**

---

## 🔒 Configuration & Environment Variables

Sensitive credentials (passwords, JWT signing keys, mail secrets) are kept out of Git. Both projects support environment variables with built-in development defaults:

| Variable | Scope | Purpose |
|---|---|---|
| `SPRING_DATASOURCE_URL` | Backend | PostgreSQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | Backend | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Backend | Database password |
| `JWT_SECRET` | Backend | Secret string used to sign JWT auth tokens |
| `SERVER_PORT` | Backend | Port for Spring Boot (default: `8080`) |
| `VITE_API_BASE_URL` | Frontend | Target API address for Axios (default: `http://localhost:8080/api`) |

Templates are provided in:
* Root: `.env.example`
* Backend: `Secops/.env.example`
* Frontend: `my frontend/.env.example`

---

## 👥 Access Control (Roles)

SentinelCore supports role-based permissions:

| Role | Access Scope |
|---|---|
| **ADMIN** | Full system access — user management, asset creation/deletion, system settings, threat overrides. |
| **ITSM** | Operations access — asset creation, incident management, alert review, and report generation. |
| **USER** | Read-only view of dashboard stats, assigned alerts, and personal profile settings. |

---

## 📄 License

This project was developed as a collaborative team project and is distributed under the [MIT License](LICENSE).
