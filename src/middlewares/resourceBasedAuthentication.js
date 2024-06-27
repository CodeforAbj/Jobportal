// ====================================================== //
// ========= Authenticating right to operations ========= //
// ====================================================== //
const resourceBasedAuthentication = (req, res, next) => {
  let user = req.session.user;
  let job = JobModel.getJobById(req.params.jobId);
  if (!job) {
    // Case of wrong job ID
    res.status(404).render("errorPage", {
      errorMessage: "No such Job exists",
      loginStatus: 0,
    });
  }
  if (job.recruiterId === user) {
    next();
  } else {
    res.status(403).render("errorPage", {
      errorMessage: "User Not authrised to delete",
      loginStatus: 0,
    });
  }
};
export { resourceBasedAuthentication };
