
# Jobshala 

Jobshala is a comprehensive job portal designed to connect recruiters and job seekers. Recruiters can post job listings, perform secure CRUD (Create, Read, Update, Delete) operations on their postings, and view applications and resumes from potential candidates. Job seekers can browse and search for job opportunities, apply for positions, and upload their resumes to enhance their job applications. The platform aims to streamline the job application process and provide a secure and efficient environment for both recruiters and job seekers.
## Features

- Redirection to landing page if not logged in or to Your Dashboard if logged in.
- Tracking user's last visit with cookies.
- Registration with front-end and back-end validation.

### Recruiter Features
- Create new jobs.
- View details of each job and applicants, with resumes available for download.
- Edit or update job details.
- Delete jobs after confirmation.
- Resource-based authentication to ensure only the recruiter who posted the job can delete or update it.

### Job Seeker Features
- View all jobs in a paginated manner.
- Easy apply if the resume is already uploaded, otherwise, an upload resume button is available.
- Dashboard to view applied jobs.
- Search the jobs based on various factors.
## Technical Details

**Architecture:**  
Jobshala follows the MVC (Model-View-Controller) architecture in Node.js, ensuring a structured approach to application design.

**Dependencies:**  
- **cookie-parser:** "^1.4.6" - Parses cookies attached to the client request object.
- **ejs:** "^3.1.10" - Templating engine for generating HTML markup with JavaScript.
- **express:** "^4.19.2" - Fast, unopinionated, minimalist web framework for Node.js.
- **express-ejs-layouts:** "^2.5.1" - Layout support for ejs templates in Express.
- **express-session:** "^1.18.0" - Simple session middleware for Express.
- **express-validator:** "^7.1.0" - Middleware for input validation and sanitization in Express.
- **method-override:** "^3.0.0" - Middleware for HTTP method override in Express.
- **multer:** "^1.4.5-lts.1" - Middleware for handling multipart/form-data, used for file uploads.
- **nodemailer:** "^6.9.14" - Module for sending emails from Node.js applications.

These dependencies are crucial for ensuring functionality, security, and performance within the Jobshala application.

## Run Locally

Clone the project

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## Website
Visit [Jobshala](https://jobshala.onrender.com/) deployed at render.com to explore the live platform.



## Author

- Github [@CodeforAbj](https://www.github.com/@CodeforAbj)
- Twitter/X [@CodeforAbj](https://twitter.com/codeforabj)

## Acknowledgements

 - [Readme Editor](https://readme.so/editor)
