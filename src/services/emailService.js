import nodemailer from 'nodemailer';

// CONFIGURACIÓN

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  
  tls: { rejectUnauthorized: false }, //  SOLO PARA DESARROLLO LOCAL (evita error por antivirus)
});

const FROM_EMAIL = process.env.MAIL_FROM || process.env.MAIL_USER;
const ADMIN_EMAIL = process.env.MAIL_ADMIN || process.env.MAIL_USER;


// FUNCIÓN BASE

const enviarMail = async (destinatario, asunto, contenidoHtml) => {
  try {
    const info = await transporter.sendMail({
      from: `"CelularTech" <${FROM_EMAIL}>`,
      to: destinatario,
      subject: asunto,
      html: contenidoHtml,
    });
    console.log(` Mail enviado a ${destinatario}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al enviar mail a ${destinatario}:`, error.message);
    return false;
  }
};


//  MAIL DE BIENVENIDA

export const enviarBienvenida = async (cliente) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>¡Hola ${cliente.nombre}!</h2>
      <p>Gracias por registrarte en <strong>CelularTech</strong>.</p>
      <p>Tu cuenta fue creada exitosamente. Ya podes ingresar a tu cuenta y realizar compras en nuestra tienda web.</p>
    </div>
  `;
  return enviarMail(cliente.email, "Bienvenido a CelularTech", html);
};


// MAIL DE CONFIRMACIÓN DE PEDIDO 

export const enviarConfirmacionPedido = async (orden, cliente) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2> Gracias por tu compra, ${cliente.nombre}!</h2>
      <p>Recibimos tu pedido <b>#${orden.id}</b>.</p>
      <p>Monto total: <b>$${Number(orden.total).toLocaleString("es-AR")}</b></p>
      <p>Envío a: ${orden.direccionEnvio}</p>
      <p>Te avisaremos cuando el pedido cambie de estado.</p>
    </div>
  `;
  return enviarMail(cliente.email, `Confirmación de pedido #${orden.id}`, html);
};


//  MAIL DE NUEVO PEDIDO AL ADMIN 

export const enviarNuevoPedidoAdmin = async (orden, cliente) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Nuevo pedido recibido</h2>
      <p>Se generó la orden de compra <b>#${orden.id}</b>.</p>
      <p>Cliente: ${cliente.nombre} ${cliente.apellido || ""} (${cliente.email})</p>
      <p>Total: $${Number(orden.total).toLocaleString("es-AR")}</p>
    </div>
  `;
  return enviarMail(ADMIN_EMAIL, `Nueva venta #${orden.id}`, html);
};


// MAIL DE CAMBIO DE ESTADO

export const enviarCambioEstado = async (orden, cliente, nuevoEstado) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Actualización de tu pedido #${orden.id}</h2>
      <p>El estado de tu pedido cambió a: <b style="text-transform: uppercase; color: #0d9488;">${nuevoEstado}</b>.</p>
      <p>Total: $${Number(orden.total).toLocaleString("es-AR")}</p>
    </div>
  `;
  return enviarMail(cliente.email, `Actualización de pedido #${orden.id}`, html);
};


//  MAIL DE RECUPERACIÓN DE CONTRASEÑA 

export const enviarRecuperacionPassword = async (cliente, token) => {
  const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Recuperación de contraseña</h2>
      <p>Hola ${cliente.nombre},</p>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Hace click en el siguiente enlace para crear una nueva contraseña:</p>
      <p><a href="${resetUrl}" style="background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Restablecer contraseña</a></p>
      <p>Si no solicitaste este cambio, ignorá este mail.</p>
    </div>
  `;
  return enviarMail(cliente.email, "Recuperación de contraseña - CelularTech", html);
};