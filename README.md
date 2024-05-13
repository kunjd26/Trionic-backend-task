# Project Setup Instructions

Follow these steps to set up the project:

1. **Clone the GitHub repository**

```bash
git clone https://github.com/kunjd26/Trionic-backend-task.git
```

2. **Install dependencies**
Navigate to the project directory and run the following command:

```bash
npm install
```

3. **Set up the environment variables**
Create a `.env` file in the root directory of the project. Copy all fields from `.env.example` and fill them with the appropriate values.

4. **Import the SQL file**
Import the provided `event_management.sql` file into your MySQL or MariaDB database.

5. **Run the application**
You can start the application by running one of the following commands:

```bash
node app.js
```

```bash
nodemon app.js
```

After starting the application, open a web browser and navigate to [`localhost:65535`](http://localhost:65535) to view the project.

6. **API Documentation**
For a better understanding of the APIs, refer to the [API Documentation](https://documenter.getpostman.com/view/27040755/2sA3JNbLda).
