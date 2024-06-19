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
    recruiterId
  ) {
    this.id = id;
    this.companyName = companyName;
    this.postTitle = postTitle;
    this.requirements = requirements;
    this.ctc = ctc;
    this.location = location;
    this.description = description;
    this.deadline = deadline;
    this.noOfApplicants = 0;

    // For custom date format

    let currentDate = new Date();
    let day = currentDate.getDate().toString().padStart(2, "0");
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    let year = currentDate.getFullYear();

    this.postedOn = `${day}-${month}-${year}`;
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
      recruiterId
    );
    jobs.push(newJob);
    console.log(JobModel.getAllJobs());
  }

  static getJobsByRecruiter(recruiterId) {
    return jobs.filter((job) => job.recruiterId === recruiterId);
  }

  static getAllJobs() {
    return jobs;
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
    deadline: "31-5-2024",
    noOfApplicants: 0,
    postedOn: "07-04-2024",
    recruiterId: "demoRec@account.com",
  },
  {
    id: "KQC0f",
    companyName: "XYZ Corporation",
    postTitle: "Frontend Developer",
    requirements: ["HTML", "CSS", "JavaScript"],
    ctc: 60000,
    location: "San Francisco",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "15-05-2024",
    noOfApplicants: 0,
    postedOn: "10-04-2024",
    recruiterId: "demoRec@account.com",
  },
  {
    id: "ZeWMZ",
    companyName: "PQR Inc.",
    postTitle: "Backend Developer",
    requirements: ["Python", "Django", "Flask"],
    ctc: 75000,
    location: "Chicago",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "01-07-2024",
    noOfApplicants: 0,
    postedOn: "17-06-2024",
    recruiterId: "demoRec@account.com",
  },
  {
    id: "SgkAM",
    companyName: "LMN Ltd.",
    postTitle: "Full Stack Developer",
    requirements: ["JavaScript", "React", "Node.js", "Python", "Django"],
    ctc: 90000,
    location: "Boston",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "10-03-2024",
    noOfApplicants: 0,
    postedOn: "17-02-2024",
    recruiterId: "demoRec@account.com",
  },
  {
    id: "L43sM",
    companyName: "RST Corp.",
    postTitle: "Data Scientist",
    requirements: ["Python", "R", "Mathematics"],
    ctc: 85000,
    location: "Seattle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    deadline: "01-04-2024",
    noOfApplicants: 0,
    postedOn: "17-03-2024",
    recruiterId: "demoRec@account.com",
  },
];
