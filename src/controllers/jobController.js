import { generateId } from "../middlewares/idGenerator.js";
import JobModel from "../model/job.model.js";

const showAllJobs = (req, res) => {
  const jobs = JobModel.getAllJobs();
  res.render(`seeker/Jobs`, {
    logValue: "Log Out",
    loginStatus: "seeker",
    jobs: jobs,
  });
};

const showDashboard = (req, res) => {
  const user = req.session.user;

  if (req.session.typeOfUser == "recruiter") {
    const jobs = JobModel.getJobsByRecruiter(user);
    res.render(`recruiter/Dashboard`, {
      logValue: "Log Out",
      loginStatus: "recruiter",
      jobs: jobs,
    });
  } else if (req.session.typeOfUser == "recruiter") {
    res.redirect("/seeker/dashboard");
  } else {
    res.redirect("/");
  }
};

const showCreateJobForm = (req, res) => {
  res.render("recruiter/createJobForm", {
    logValue: "Log Out",
    loginStatus: "recruiter",
  });
};

const addJob = (req, res) => {
  let id = generateId();

  // formating the requirements arrat
  let formData = { ...req.body };
  const wordsArray = formData.requirements.split(/[\s,]+/); // Text Area to Array
  const requirements = wordsArray.filter((word) => word.length > 0); // Filter empty words

  formData.requirements = requirements;

  // formating the date
  const dateParts = formData.deadline.split("-");
  formData.deadline = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  JobModel.addJob({ id: id, ...formData, recruiterId: req.session.user });
  res.redirect("/dashboard");
};
export { showAllJobs, showCreateJobForm, showDashboard, addJob };
