const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.verify = async (transporter) => {
  const connection = await transporter.verify();
  if (connection) {
    console.log("Server is already to take your message");
  }
};

exports.welcome = ({ name, email }) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: "Bienvenido a MakeUpp",
    html: `<div style="
    background-color: #59a7a7;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/clontrello/image/upload/v1656625031/test-preset/trello-logo_vj8xgw.png"
    alt="Logo de trello"
    width="250"
    style="margin-top: 16px"
  />
  <h2>
    ¡Hola! <strong>${name}</strong>, gracias por registrarte en nuestra APP.
  </h2>
  <p>
    Esperamos que tu experiencia en MakeUpp sea única y encuentres todo lo que buscas!
  </p>
</div>`,
    text: `Hola! <strong>${name}</strong>, gracias por registrarte en nuestra APP.
    Esperamos que tu experiencia en MakeUpp sea única y encuentres todo lo que buscas!`,
  };
};
