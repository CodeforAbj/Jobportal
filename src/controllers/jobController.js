import { generateId } from "../middlewares/idGenerator.js";
import JobModel from "../model/job.model.js";
import UserModel from "../model/user.model.js";
import { mailFunction } from "../middlewares/nodemailerUtility.js";
import { application } from "express";

// ====================================================== //
// ============== function to show all jobs ============= //
// ====================================================== //
const showAllJobs = (req, res) => {
  const jobs = JobModel.getAllJobs();

  // -------------- pagination ------------- //
  const page = parseInt(req.query.page) || 1; // Current page number, default to 1
  const pageSize = 3; // Number of jobs per page
  const totalJobs = jobs.length; // Total number of jobs
  const totalPages = Math.ceil(totalJobs / pageSize); // Total number of pages

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedJobs = jobs.slice(start, end);

  res.render("seeker/jobs", {
    jobs: paginatedJobs,
    currentPage: page,
    totalPages: totalPages,
    loginStatus: "seeker",
    user: req.session.user,
    resumeFlag: req.session.resumeFlag,
  });
};

// ====================================================== //
// == function to show dashboard according to user type = //
// ====================================================== //

const showDashboard = (req, res) => {
  const user = req.session.user;

  if (req.session.typeOfUser == "recruiter") {
    //  Recruiter Dash Board Shows what Jobs they have posted with CRUD Operations //
    const jobs = JobModel.getJobsByRecruiter(user);
    res.render(`recruiter/dashboard`, {
      loginStatus: "recruiter",
      jobs: jobs,
      user: req.session.user,
    });
  } else if (req.session.typeOfUser == "seeker") {
    //  Applicant Dash Board Shows what Jobs they applied for  //
    const userData = UserModel.getUserByEmail(user);
    const jobs = [];
    userData.jobsRelated.forEach((jobId) => {
      jobs.push(JobModel.getJobById(jobId));
    });
    res.render(`seeker/dashboard`, {
      loginStatus: "seeker",
      jobs: jobs,
      user: req.session.user,
    });
  } else {
    // -------------- safety case -------------- //
    res.redirect("/");
  }
};

// ====================================================== //
// ==== function to show create job form to recruiter === //
// ====================================================== //

const showCreateJobForm = (req, res) => {
  res.render("recruiter/createJobForm", {
    loginStatus: req.session.typeOfUser,
  });
};

// ====================================================== //
// ======== function to add job from create form ======== //
// ====================================================== //

const addJob = (req, res) => {
  let id = generateId();

  // formating the requirements array
  let formData = { ...req.body };
  const wordsArray = formData.requirements.split(/[\s,]+/); // Text Area to Array
  const requirements = wordsArray.filter((word) => word.length > 0); // Filter empty words

  formData.requirements = requirements;
  JobModel.addJob({ id: id, ...formData, recruiterId: req.session.user });
  res.redirect("/dashboard");
};

// ====================================================== //
// =============== function to delete job =============== //
// ====================================================== //

const deleteJob = (req, res) => {
  JobModel.deleteJob(req.params.jobId);
  res.redirect("/dashboard");
};

// ====================================================== //
//  function to show the details of the job to be edited or updated  //
// ====================================================== //

const showUpdateJobFrom = (req, res) => {
  const job = JobModel.getJobById(req.params.jobId);
  res.render("recruiter/updateJobForm", {
    job: job,
    loginStatus: req.session.typeOfUser,
  });
};

// ====================================================== //
// ======= function to edit or update the job data ====== //
// ====================================================== //

const updateJobHandler = (req, res) => {
  let jobId = req.params.jobId;
  let newData = { ...req.body };
  JobModel.updateJob(jobId, newData);
  res.redirect("/dashboard");
};

// ====================================================== //
//  function that shows more details of job and applicants that applied  //
// ====================================================== //

const showJobDetails = (req, res) => {
  const job = JobModel.getJobById(req.params.jobId);
  if (!job) {
    res.status(404).render("404", {
      errorMessage: "No Such Job Details Found",
      loginStatus: 0,
    });
    return;
  }
  // Getting details of applicants that applied
  let applicants = getListOfApplicants(job.applicants);
  res.render("recruiter/jobDetailsView", {
    job: job,
    applicants: applicants,
    loginStatus: req.session.typeOfUser,
  });
};

// ====================================================== //
// = Helper fn to get details of applicants that applied  //
// ====================================================== //
const getListOfApplicants = (applicantsEmailArray) => {
  let applicants = [];
  for (let i = 0; i < applicantsEmailArray.length; i++) {
    let applicant = UserModel.getUserByEmail(applicantsEmailArray[i]);
    applicants.push(applicant);
  }
  return applicants;
};
// ====================================================== //
//  function that shows details of job details and apply feature  //
// ====================================================== //
const showApplyView = (req, res) => {
  const job = JobModel.getJobById(req.params.jobId);
  if (!job) {
    res.status(404).render("404", {
      errorMessage: "No Such Job Details Found",
      loginStatus: 0,
    });
    return;
  }
  res.render("seeker/applyPage", {
    job: job,
    loginStatus: "seeker",
    user: req.session.user,
    resumeFlag: req.session.resumeFlag, // This helps in ejs to show easy apply or upload resume button
  });
};

// ====================================================== //
// ========= function to handle Job application ========= //
// ====================================================== //

const handleJobApplication = (req, res) => {
  // Should add appicant to job and job to applicant and email
  const jobId = req.params.jobId;
  const useremail = req.params.user;
  const user = UserModel.getUserByEmail(useremail);
  const job = JobModel.getJobById(jobId);
  if (!job || !user) {
    res
      .status(404)
      .render("404", {
        errorMessage: "No Such Job Details Found",
        loginStatus: 0,
      });
    return;
  }

  if (user.jobsRelated.includes(jobId)) {
    // User already Applied
    res.status(404).render("errorPage", {
      errorMessage: "User Already Applied to this job",
      loginStatus: 0,
    });
    return;
  }

  user.jobsRelated.push(jobId);
  job.applicants.push(useremail);

  // ---- Sending mail for confirmation ---- //
  const mailmessage = {
    subject: `Application Success at ${job.companyName}`,
    body: `Dear ${user.name},

  Thank you for your interest in the ${job.postTitle} position at ${job.companyName}.
  We received your application.
  We look forward to hearing from you soon.

  Sincerely,

  The ${job.companyName} Hiring Team`,
  };

  mailFunction(useremail, mailmessage);

  res.render("seeker/successPage", {
    loginStatus: req.session.typeOfUser,
  });
};

// ====================================================== //
// ========== function to handle resume upload ========== //
// ====================================================== //

const handleUploadResume = (req, res) => {
  const applicant = UserModel.getUserByEmail(req.body.user);
  if (applicant == -1) {
    // case of error, should not reach here ever
    res.status(404).render("errorPage", {
      errorMessage: "User Not Found",
      loginStatus: 0,
    });
    return;
  }
  applicant.resumeFileName = req.file.filename;
  req.session.resumeFlag = true;
  res.render("seeker/successPage", {
    loginStatus: "seeker",
  });
};

// ====================================================== //
// ========== function to handle search feature ========= //
// ====================================================== //

const searchJobs = (req, res) => {
  const searchQuery = req.body.searchQuery.trim();
  const allJobs = JobModel.getAllJobs();
  const resultJob = [];
  allJobs.forEach((job) => {
    if (
      job.companyName == searchQuery ||
      job.postTitle == searchQuery ||
      job.location == searchQuery
    ) {
      resultJob.push(job);
    }
  });
  res.render("seeker/searchResults", {
    jobs: resultJob,
    loginStatus: "seeker",
    user: req.session.user,
    resumeFlag: req.session.resumeFlag,
  });
};

export {
  showAllJobs,
  showCreateJobForm,
  showDashboard,
  addJob,
  deleteJob,
  showUpdateJobFrom,
  updateJobHandler,
  showJobDetails,
  showApplyView,
  handleJobApplication,
  handleUploadResume,
  searchJobs,
};
