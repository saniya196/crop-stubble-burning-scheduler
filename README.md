# 🌾 StubbleSched - Crop Stubble Burning Scheduler

A production-grade full-stack web application for optimizing crop stubble burning using intelligent scheduling algorithms. This system helps farmers choose the most effective and environmentally-friendly clearing methods while respecting deadline constraints and budget limitations.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Algorithms](#-algorithms)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 **Authentication**
- Secure login system with email validation
- Session persistence using localStorage
- Demo account for quick testing
- Logout functionality with auto-redirect

### 📊 **Multi-Page Dashboard**
- Interactive dashboard with quick stats
- Real-time algorithm status monitoring
- Navigation sidebar with 8 different sections
- Responsive design for all devices

### 🧮 **Three Optimization Algorithms**

1. **Greedy Algorithm** ⚡
   - Time Complexity: **O(n log n)**
   - Fastest execution
   - Good approximation for real-time decisions
   - Sorts farms by time window and selects lowest-pollution feasible method

2. **Dynamic Programming** 📊
   - Time Complexity: **O(n × B)** (B = budget dimension)
   - Polynomial time solution
   - Optimal for medium-sized problem instances
   - Knapsack-based approach for minimum pollution

3. **Backtracking** 🔍
   - Time Complexity: **O(4^n)** (exponential)
   - Most accurate exhaustive search
   - Intelligent pruning to reduce search space
   - Tracks pruning statistics for optimization insights

### 🎯 **Features by Page**

- **Dashboard**: Quick overview, algorithm status, top assignments
- **Results**: Detailed algorithm outputs, assignment tables, comparisons
- **Gantt Chart**: Visual timeline of farm clearing schedules
- **Complexity Analysis**: Time/space complexity graphs and comparisons
- **Algorithm Comparison**: Side-by-side algorithm results
- **Extras & AI**: Risk heatmaps, AI recommendations, charts
- **Algorithm Trace**: Step-by-step execution logs
- **Settings**: Farm management, budget configuration, import/export

### 📤 **Data Management**
- Export configurations as JSON
- Import previously saved configurations
- Reset to default sample data
- Real-time farm editing with validation

### 🔔 **User Experience**
- Toast notifications for all actions
- Input validation with error messages
- Loading indicators on buttons
- Responsive error handling
- Helpful tooltips and descriptions

---

## 🛠️ Tech Stack

### **Frontend**
```
React 18.3.1                - UI framework
Vite 5.4.21                 - Build tool & dev server
Tailwind CSS 3.4.14         - Styling
React Router DOM            - Multi-page routing
Axios 1.8.4                 - HTTP client
Recharts 2.13.3             - Data visualization
html2canvas 1.4.1           - PNG export
jsPDF 2.5.1                 - PDF export
```

### **Backend**
```
Java 17                     - Programming language
Spring Boot 3.3.4           - Framework
Spring Web MVC              - REST API
Maven 3.9.9                 - Build tool
Tomcat 10.1.30              - Embedded server
SpringDoc OpenAPI 2.6.0     - Swagger documentation
Validation Starter          - Input validation
```

### **DevOps**
```
Docker                      - Containerization
Docker Compose              - Multi-container orchestration
```

---

## 🧠 Algorithms

### **Sample Data**
- **Farms**: 8 farms (F-01 to F-08) with harvest dates and deadlines
- **Budget**: ₹15,000 available
- **Clearing Methods**:
  1. **Burning**: 1 day, ₹0 cost, 100 pollution units
  2. **Mulching**: 3 days, ₹3000 cost, 0 pollution
  3. **Bio-decomposer**: 7 days, ₹500 cost, 5 pollution
  4. **Manual Removal**: 5 days, ₹1500 cost, 10 pollution

### **Greedy Approach**
```
1. Sort farms by time window (deadline - harvest day)
2. For each farm, try methods in order of pollution (ascending)
3. Select first method that fits within budget and deadline
4. Mark as UNASSIGNED if no feasible method exists
```

### **Dynamic Programming**
```
1. Create DP table: dp[farm][budget] = min pollution
2. For each farm and budget combination, try all methods
3. Track minimum pollution achievable
4. Backtrack to recover actual assignments
```

### **Backtracking**
```
1. Recursively try all 4 methods for each farm
2. Prune branches that exceed:
   - Budget limit
   - Deadline constraint
   - Pollution upper bound
3. Track visited nodes and prune rate
4. Return best feasible solution found
```

---

## 📁 Project Structure

```
BurningScheduler/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Titlebar, Sidebar, Statusbar
│   │   │   ├── tabs/           # Result, Gantt, Complexity, etc.
│   │   │   ├── ui/             # KPI, Cards, Charts, Tables
│   │   │   ├── Navigation.jsx  # Sidebar navigation
│   │   │   ├── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # Login/logout logic
│   │   │   ├── ToastContext.jsx # Notifications
│   │   ├── pages/              # Page components (8 pages)
│   │   ├── hooks/
│   │   │   ├── useScheduler.js # State management
│   │   ├── api/
│   │   │   ├── scheduler.js    # API calls
│   │   ├── App.jsx             # Main router
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                     # Spring Boot application
│   ├── src/main/java/com/scheduler/
│   │   ├── models/             # Farm, ClearingMethod, Assignment, etc.
│   │   ├── solvers/            # GreedySolver, DPSolver, BacktrackingSolver
│   │   ├── controller/         # SchedulerController
│   │   ├── config/             # OpenAPI configuration
│   │   └── StubbleSchedApplication.java
│   ├── src/test/java/          # Unit tests
│   ├── pom.xml
│   └── application.properties
│
├── docker-compose.yml          # Run both services
├── .gitignore
└── README.md
```

---

## 🚀 Setup & Installation

### **Prerequisites**
- Java 17 or higher
- Node.js 18+ and npm
- Maven 3.9+
- Docker (optional)

### **Clone Repository**
```bash
git clone https://github.com/YOUR_USERNAME/burning-scheduler.git
cd BurningScheduler
```

### **Frontend Setup**
```bash
cd frontend
npm install
```

### **Backend Setup**
```bash
cd backend
mvn clean install
```

---

## ▶️ Running the Application

### **Option 1: Run Individually (Development)**

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
# Server runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### **Option 2: Docker (Production)**
```bash
# From root directory
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### **Testing Credentials**
- **Email**: farmer@example.com
- **Password**: password123
- Click "Demo Login" for quick access

---

## 📚 API Documentation

### **Base URL**
```
http://localhost:8080/api/schedule
```

### **Endpoints**

#### **Run Greedy Algorithm**
```
POST /api/schedule/greedy
Content-Type: application/json

{
  "farms": [
    {"id": "F-01", "harvestDay": 1, "deadline": 4},
    {"id": "F-02", "harvestDay": 2, "deadline": 9}
  ],
  "budget": 15000
}

Response:
{
  "algorithmName": "Greedy",
  "assignments": [...],
  "totalCost": 5000,
  "totalPollution": 120,
  "feasible": true,
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "stepTrace": [...]
}
```

#### **Run Dynamic Programming**
```
POST /api/schedule/dp
```

#### **Run Backtracking**
```
POST /api/schedule/backtrack
```

#### **Run All Algorithms**
```
POST /api/schedule/all

Response:
{
  "greedy": {...},
  "dp": {...},
  "backtrack": {...},
  "bestAlgorithm": "dp"
}
```

### **Swagger UI**
```
http://localhost:8080/swagger-ui/index.html
```

---

## 💡 Usage Guide

### **1. Login**
- Enter email and password
- Or click "Demo Login" for quick test

### **2. Dashboard**
- View overview and quick stats
- See algorithm execution status
- Click "Run All Algorithms" to execute

### **3. Settings (Farm Management)**
- Add/remove/edit farms
- Set budget amount
- Import/export configurations
- Reset to defaults

### **4. Results**
- View detailed algorithm outputs
- See farm assignments and costs
- Compare algorithm results
- Export to CSV, PDF, or JSON

### **5. Gantt Chart**
- Visualize farm schedule timeline
- See duration and overlap
- Export chart as PNG

### **6. Complexity Analysis**
- Compare time complexity
- View space complexity
- Understand algorithm trade-offs

### **7. Comparison**
- Side-by-side algorithm results
- See how methods differ per farm
- Cost and pollution comparison

---

## 🔧 Configuration

### **Environment Variables**
Create `.env` files in frontend and backend directories:

**Frontend `.env`**
```
VITE_API_URL=http://localhost:8080/api
VITE_PORT=3000
```

**Backend `application.properties`**
```
server.port=8080
server.servlet.context-path=/
spring.application.name=stubblesched
```

---

## 🤝 Contributing

### **How to Contribute**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**
- Follow existing code style
- Add tests for new features
- Update documentation
- Use descriptive commit messages

---

## 📝 Project Status

✅ **Completed**
- Core algorithm implementations
- Full-stack architecture
- Authentication system
- Multi-page UI with routing
- Toast notifications
- Input validation
- Export functionality
- Responsive design

🔄 **Future Enhancements**
- Backend API authentication (JWT)
- Database integration (PostgreSQL)
- User profiles and saved schedules
- Advanced filtering and search
- Real-time collaboration
- Mobile app version
- Cloud deployment (AWS/GCP)
- Machine learning recommendations

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💻 Author

**StubbleSched Development Team**
- Full-stack web application for crop management
- Built with React, Spring Boot, and modern DevOps practices

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing [GitHub Issues](https://github.com/YOUR_USERNAME/burning-scheduler/issues)
2. Create a new issue with detailed description
3. Include screenshots or error logs

---

## 🙏 Acknowledgments

- Spring Boot documentation
- React community
- Tailwind CSS
- All contributors

---

**Last Updated**: April 22, 2026  
**Version**: 1.0.0
