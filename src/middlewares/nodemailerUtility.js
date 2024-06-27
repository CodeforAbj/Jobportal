import nodemailer from "nodemailer";
const mailFunction = async (receiver, message) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj",
    },
  });

  const mailConfig = {
    from: "codingninjas2k16@gmail.com",
    to: receiver,
    subject: message.subject,
    text: message.body,
  };

  try {
    const result = await transpoter.sendMail(mailConfig);
    console.log(`Success: Email sent to ${receiver}`);
  } catch (error) {
    console.log(error);
  }
};

export { mailFunction };
