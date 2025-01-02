# Project Name: News Aggregator

This project is a News Aggregator application that fetches and displays news articles from multiple APIs, including NewsAPI, The Guardian, and The New York Times. It is fully Dockerized to simplify setup and deployment.

## Prerequisites

- Docker: Ensure you have Docker installed on your machine.
- Docker Compose: Verify that Docker Compose is available.

## Project Structure

- **Frontend**: React.js-based frontend application.
- **Docker Configuration**: Docker and Docker Compose files for easy setup.

## Installation and Setup

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone <https://github.com/Amoka12-tech/news-aggregator.git>
cd <news-aggregator>
```

### 2. Environment Configuration

#### Frontend

1. . Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies (optional if not using Docker for dependency management):

   ```bash
   npm install
   ```

### 3. Build and Run the Project with Docker

1. Navigate to the root directory of the project.

2. Run the following command to build app for docker:

   ```bash
   docker build -t amoka-news-aggregator .
   ```
3. Run the following command to start all local services:

    ```bash
    docker run -p 3000:80 amoka-news-aggregator
    ```

4. The frontend will be accessible at [http://localhost:3000](http://localhost:3000).

### 4. Access the Application

- **Frontend**: Access the React app at `http://localhost:3000`.

## Testing the Setup

- **Frontend**: Open a browser and navigate to `http://localhost:3000`.

