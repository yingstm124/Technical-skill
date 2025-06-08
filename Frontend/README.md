# Project Setup & Development Guide

## 📋 Prerequisites

Before getting started, ensure you have the following installed on your system:

- **Docker** - [Download & Install Docker](https://www.docker.com/get-started/)
- **.NET 9 SDK** - [Download .NET 9](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Node.js 20+** - [Download Node.js](https://nodejs.org/)

### Verify Installation
```bash
# Check versions
docker --version
dotnet --version
node --version
npm --version
```

---
### Run with Docker Compose
```bash
cd ./Backend
docker-compose up -d
```

## Update Database

### Initial Database Migration
```bash
dotnet ef database update --project Backend/Backend.csproj
```

## 🖥️ Backend (.NET 9 API)

### API Endpoints
- **HTTP**: `http://localhost:5000/api`
- **HTTPS**: `https://localhost:5001/api`

### 🚀 Running the Backend

#### Create .env
```bash
MSSQL_SA_PASSWORD=Str0ng!P@ssw0rd
MSSQL_SA_USERNAME=sa
```

#### Option 1: Command Line
```bash
# Clean, build, and run
dotnet clean Backend/Backend.csproj
dotnet build Backend/Backend.csproj
dotnet run --project Backend/Backend.csproj
```

#### Option 2: Visual Studio
1. Open the solution in Visual Studio
2. Set `Backend` as startup project
3. Click **▶️ Run** (HTTP) or **🔒 Run** (HTTPS)

#### Option 3: Visual Studio Code
```bash
# Install C# extension if not already installed
# Press F5 or use integrated terminal
dotnet run --project Backend/Backend.csproj
```

---

## 🌐 Frontend (Node.js/React)

### Create .ENV
```bash
VITE_API_URL=https://localhost:5001/api
VITE_APP_NAME=Techinical Skill App
VITE_APP_VERSION=1.0.0

```

### 🚀 Running the Frontend

```bash
cd ./Frontend

npm install

npm run dev
```

### 📱 Frontend Access
- **Development**: `http://localhost:5174` (or check console output)
- **Network**: `http://[your-ip]:5174`

---
