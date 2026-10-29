import nodemailer from "nodemailer";

// Configuración del transporte

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const FROM = process.env.MAIL_FROM || "noreply@celulartech.com";
const ADMIN_EMAIL = process.env.MAIL_ADMIN || "admin@celulartech.com";

// Helper para enviar mails con manejo de errores
const enviar = async (opciones) => {
  try {
    const info = await transporter.sendMail(opciones);
    console.log(`📧 Mail enviado a ${opciones.to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al enviar mail a ${opciones.to}:`, error.message);
    return false;
  }
};

// Mail de Bienvenida

export const enviarBienvenida = async (cliente) => {
  return enviar({
    from: FROM,
    to: cliente.email,
    subject: "¡Bienvenido a CelularTech!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">¡Hola ${cliente.nombre}!</h1>
        <p>Gracias por registrarte en <strong>CelularTech</strong>.</p>
        <p>Tu cuenta fue creada exitosamente. Ya podés empezar a comprar en nuestra tienda.</p>
        <a href="http://localhost:5173/catalogo" 
           style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px;">
          Ver catálogo
        </a>
        <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
          Este es un mail automático. Por favor, no respondas.
        </p>
      </div>
    `,
  });
};

//  Mail de Confirmación de Pedido (al cliente)

export const enviarConfirmacionPedido = async (orden, cliente) => {
  const itemsHtml = (orden.items || [])
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
            ${item.PRODUCTO?.nombre || `Producto #${item.productoId}`}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">
            ${item.cantidad}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">
            $${Number(item.precioUnitario).toLocaleString("es-AR")}
          </td>
        </tr>
      `
    )
    .join("");

  return enviar({
    from: FROM,
    to: cliente.email,
    subject: `Pedido #${orden.id} confirmado - CelularTech`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">¡Gracias por tu compra, ${cliente.nombre}!</h1>
        <p>Tu pedido <strong>#${orden.id}</strong> fue registrado correctamente.</p>
        <h2 style="color: #334155; font-size: 18px;">Detalle del pedido</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="padding: 8px; text-align: left;">Producto</th>
              <th style="padding: 8px; text-align: center;">Cantidad</th>
              <th style="padding: 8px; text-align: right;">Precio</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 8px; font-weight: bold; text-align: right;">Total:</td>
              <td style="padding: 8px; font-weight: bold; text-align: right;">
                $${Number(orden.total).toLocaleString("es-AR")}
              </td>
            </tr>
          </tfoot>
        </table>
        <h2 style="color: #334155; font-size: 18px; margin-top: 24px;">Envío</h2>
        <p>${orden.direccionEnvio}</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
          Estado actual: <strong>${orden.estado}</strong>
        </p>
      </div>
    `,
  });
};

//
//  Mail de Nuevo Pedido (al admin)
export const enviarNuevoPedidoAdmin = async (orden, cliente) => {
  return enviar({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Nuevo pedido #${orden.id} - ${cliente.nombre}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">Nuevo pedido recibido</h1>
        <p><strong>Pedido:</strong> #${orden.id}</p>
        <p><strong>Cliente:</strong> ${cliente.nombre} ${cliente.apellido || ""} (${cliente.email})</p>
        <p><strong>Total:</strong> $${Number(orden.total).toLocaleString("es-AR")}</p>
        <p><strong>Envío:</strong> ${orden.direccionEnvio}</p>
        ${orden.notas ? `<p><strong>Notas:</strong> ${orden.notas}</p>` : ""}
        <a href="http://localhost:5173/admin/ordenes" 
           style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px;">
          Ver en el panel Admin
        </a>
      </div>
    `,
  });
};

//  Mail de Cambio de Estado (al cliente)
export const enviarCambioEstado = async (orden, cliente, nuevoEstado) => {
  return enviar({
    from: FROM,
    to: cliente.email,
    subject: `Tu pedido #${orden.id} cambió de estado`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">¡Hola ${cliente.nombre}!</h1>
        <p>Tu pedido <strong>#${orden.id}</strong> cambió de estado.</p>
        <p style="font-size: 20px; padding: 16px; background: #f0fdfa; border-radius: 8px; text-align: center;">
          Nuevo estado: <strong style="text-transform: uppercase; color: #0f766e;">${nuevoEstado}</strong>
        </p>
        <p><strong>Total:</strong> $${Number(orden.total).toLocaleString("es-AR")}</p>
        <p><strong>Envío:</strong> ${orden.direccionEnvio}</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
          Si tenés alguna duda, contactanos respondiendo este mail.
        </p>
      </div>
    `,
  });
};


//  Mail de Recuperación de Contraseña

export const enviarRecuperacionPassword = async (cliente, token) => {
  const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

  return enviar({
    from: FROM,
    to: cliente.email,
    subject: "Recuperación de contraseña - CelularTech",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">Recuperación de contraseña</h1>
        <p>Hola ${cliente.nombre},</p>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Hacé click en el siguiente botón para crear una nueva:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px;">
          Restablecer contraseña
        </a>
        <p style="color: #64748b; font-size: 12px; margin-top: 16px;">
          Este link expira en 1 hora.
        </p>
        <p style="color: #64748b; font-size: 12px;">
          Si no solicitaste este cambio, ignorá este mail.
        </p>
      </div>
    `,
  });
};