import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: false,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  tls: { rejectUnauthorized: false },
});

const FROM = process.env.MAIL_FROM || "noreply@celulartech.com";

const enviarMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({ from: FROM, to, subject, html });
    console.log(`📧 Mail enviado a ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error mail a ${to}:`, error.message);
  }
};

export const enviarConfirmacionCuenta = async (cliente, token) => {
  const url = `http://localhost:5173/confirmar-email?token=${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>¡Hola ${cliente.nombre}!</h2>
      <p>Para activar tu cuenta en CelularTech, hacé click en el botón:</p>
      <a href="${url}" style="background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar mi cuenta</a>
    </div>`;
  return enviarMail(cliente.email, "Confirma tu cuenta - CelularTech", html);
};

export const enviarRecuperacionPassword = async (cliente, token) => {
  const url = `http://localhost:5173/reset-password?token=${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>¡Hola ${cliente.nombre}!</h2>
      <p>Recibimos una solicitud para restablecer tu contraseña en CelularTech.</p>
      <p>Hacé click en el siguiente botón (el enlace vence en 1 hora):</p>
      <a href="${url}" style="background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
      <p style="margin-top: 16px; color: #666; font-size: 12px;">Si no pediste este cambio, ignorá este correo.</p>
    </div>`;
  return enviarMail(cliente.email, "Recuperar contraseña - CelularTech", html);
};