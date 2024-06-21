import { generateId } from "../middlewares/idGenerator.js";
import JobModel from "../model/job.model.js";
import UserModel from "../model/user.model.js";
const showAllJobs = (req, res) => {
  const jobs = JobModel.getAllJobs();
  // ------------------------ //
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
    lastVisit: req.session.lastVisit,
  });

  // ------------------------ //
};

const showDashboard = (req, res) => {
  const user = req.session.user;

  if (req.session.typeOfUser == "recruiter") {
    const jobs = JobModel.getJobsByRecruiter(user);
    res.render(`recruiter/Dashboard`, {
      loginStatus: "recruiter",
      jobs: jobs,
      lastVisit: req.session.lastVisit,
    });
  } else if (req.session.typeOfUser == "recruiter") {
    res.redirect("/job/all");
  } else {
    res.redirect("/");
  }
};

const showCreateJobForm = (req, res) => {
  res.render("recruiter/createJobForm", {
    loginStatus: "recruiter",
    lastVisit: req.session.lastVisit,
  });
};

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

const deleteJob = (req, res) => {
  JobModel.deleteJob(req.params.jobId);
  res.redirect("/dashboard");
};

const showUpdateJobFrom = (req, res) => {
  const job = JobModel.getJobById(req.params.jobId);
  res.render("recruiter/updateJobForm", {
    job: job,
    loginStatus: "recruiter",
    lastVisit: req.session.lastVisit,
  });
};

const updateJobHandler = (req, res) => {
  let jobId = req.params.jobId;
  let newData = { ...req.body };
  JobModel.updateJob(jobId, newData);
  res.redirect("/dashboard");
};

const showJobDetails = (req, res) => {
  const job = JobModel.getJobById(req.params.jobId);

  let applicants = getListOfApplicants(job.applicants);
  res.render("recruiter/jobDetailsView", {
    job: job,
    applicants: applicants,
    loginStatus: "recruiter",
    lastVisit: req.session.lastVisit,
  });
};

const getListOfApplicants = (applicantsEmailArray) => {
  let applicants = [];
  for (let i = 0; i < applicantsEmailArray.length; i++) {
    let applicant = UserModel.getUserByEmail(applicantsEmailArray[i]);
    applicants.push(applicant);
  }
  return applicants;
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
};
