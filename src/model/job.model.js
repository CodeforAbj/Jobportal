export default class JobModel {
  constructor(
    id,
    companyName,
    postTitle,
    requirements,
    ctc,
    location,
    description,
    deadline,
    recruiterId,
    noOfOpenings
  ) {
    this.id = id;
    this.companyName = companyName;
    this.postTitle = postTitle;
    this.requirements = requirements;
    this.ctc = ctc;
    this.location = location;
    this.description = description;
    this.deadline = deadline;
    this.applicants = [];
    this.noOfOpenings = noOfOpenings;

    // For custom date format

    let currentDate = new Date();
    let day = currentDate.getDate().toString().padStart(2, "0");
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    let year = currentDate.getFullYear();

    this.postedOn = `${year}-${month}-${day}`;
    this.recruiterId = recruiterId;
  }
  static addJob(job) {
    const {
      id,
      companyName,
      postTitle,
      requirements,
      ctc,
      location,
      description,
      deadline,
      recruiterId,
      noOfOpenings,
    } = job;
    const newJob = new JobModel(
      id,
      companyName,
      postTitle,
      requirements,
      ctc,
      location,
      description,
      deadline,
      recruiterId,
      noOfOpenings
    );
    jobs.push(newJob);
    console.log(JobModel.getAllJobs());
  }

  static getJobsByRecruiter(recruiterId) {
    return jobs.filter((job) => job.recruiterId === recruiterId);
  }

  static getJobById(jobId) {
    return jobs.find((job) => job.id === jobId);
  }

  static getAllJobs() {
    return jobs;
  }

  static deleteJob(jobId) {
    const index = jobs.findIndex((job) => job.id === jobId);
    if (index !== -1) {
      jobs.splice(index, 1);
    }
  }

  static updateJob(jobId, newData) {
    const index = jobs.findIndex((job) => job.id === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...newData };
    }
  }
}
var jobs = [
  {
    id: "V3ZoP",
    companyName: "ABC Company",
    postTitle: "Software Engineer",
    requirements: ["JavaScript", "React", "Node.js"],
    ctc: 80000,
    location: "New York",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "2024-05-31",
    applicants: ["demoSeek@account.com", "priyaKapoor@account.com"],
    postedOn: "2024-04-07",
    recruiterId: "demoRec@account.com",
    noOfOpenings: 2,
  },
  {
    id: "KQC0f",
    companyName: "XYZ Corporation",
    postTitle: "Frontend Developer",
    requirements: ["HTML", "CSS", "JavaScript"],
    ctc: 60000,
    location: "San Francisco",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "2024-05-15",
    applicants: [],
    postedOn: "2024-04-10",
    recruiterId: "demoRec@account.com",
    noOfOpenings: 1,
  },
  {
    id: "ZeWMZ",
    companyName: "PQR Inc.",
    postTitle: "Backend Developer",
    requirements: ["Python", "Django", "Flask"],
    ctc: 75000,
    location: "Chicago",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "2024-07-01",
    applicants: ["priyaKapoor@account.com"],
    postedOn: "2024-06-17",
    recruiterId: "demoRec@account.com",
    noOfOpenings: 5,
  },
  {
    id: "SgkAM",
    companyName: "LMN Ltd.",
    postTitle: "Full Stack Developer",
    requirements: ["JavaScript", "React", "Node.js", "Python", "Django"],
    ctc: 90000,
    location: "Boston",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "2024-03-12",
    applicants: [],
    postedOn: "2024-02-17",
    recruiterId: "demoRec@account.com",
    noOfOpenings: 3,
  },
  {
    id: "L43sM",
    companyName: "RST Corp.",
    postTitle: "Data Scientist",
    requirements: ["Python", "R", "Mathematics"],
    ctc: 85000,
    location: "Seattle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "2024-04-01",
    applicants: ["rahulSharma@account.com", "aishaKhan@account.com"],
    postedOn: "2024-03-15",
    recruiterId: "demoRec@account.com",
    noOfOpenings: 2,
  },
];
