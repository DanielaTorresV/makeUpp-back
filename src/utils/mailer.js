const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  service: "gmail",
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
    background-color: #BE5260;
    color: #F3DFD1;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/dannytorres/image/upload/v1657574124/Logo_ahoxqv.png"
    alt="Logo de MakeUpp"
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

exports.mailChangePassword = ({ name, email }) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: "Cambio de contraseña EXITOSO",
    html: `<div style="
    background-color: #BE5260;
    color: #F3DFD1;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/dannytorres/image/upload/v1657574124/Logo_ahoxqv.png"
    alt="Logo de MakeUpp"
    width="250"
    style="margin-top: 16px"
  />
  <h2 >
    ¡Hola! <strong>${name}</strong>.
  </h2>
  <p>
    Te informamos que el cambio realizado de la contraseña en nuestra página web, fue exitoso!
  </p>
</div>`,
    text: `<strong>${name}</strong>, Recuerda visitarnos para seguir completando todas tus tareas`,
  };
};

exports.mailRecoveredPassword = ({ name, email }, token) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: "Recuperación contraseña en MakeUpp",
    html: `<div style="
    background-color: #BE5260;
    color: #F3DFD1;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/dannytorres/image/upload/v1657574124/Logo_ahoxqv.png"
    alt="Logo de MakeUpp"
    width="250"
    style="margin-top: 16px"
  />
  <h2>
    ¡Hola! <strong>${name}</strong>.
  </h2>
  <p>
    Te informamos que para recuperar la contraseña debes entrar al siguiente link.
  </p>
  <a href="${process.env.URL_FRONT}/rec-password/${token}" style="color:#044d4d;">Link para recuperar tu contraseña</a>
</div>`,
    text: `Recuperando contraseña de: <strong>${name}</strong>, Recuerda visitarnos para seguir completando todas tus tareas`,
  };
};
