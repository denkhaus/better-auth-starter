import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const emailAPI = new TransactionalEmailsApi();
(emailAPI as any).authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async (payload: {
  to: string;
  subject: string;
  text: string;
}) => {
  // Check if Brevo is configured
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (
    !apiKey ||
    apiKey === "your-brevo-api-key" ||
    !senderEmail ||
    senderEmail === "your-sender-email@example.com"
  ) {
    console.log("Email would be sent (Brevo not configured for development):");
    console.log(`   To: ${payload.to}`);
    console.log(`   Subject: ${payload.subject}`);
    console.log(`   Content: ${payload.text}`);
    return true; // Return success for development
  }

  try {
    const message = new SendSmtpEmail();
    message.subject = payload.subject;
    message.textContent = payload.text;
    message.sender = {
      name: "Better Auth",
      email: senderEmail,
    };
    message.to = [{ email: payload.to }];

    const response = await emailAPI.sendTransacEmail(message);

    console.log("Email sent successfully:", response);

    if (response?.body) return true;
    return false;
  } catch (error: any) {
    console.error("Error sending email:", error.body || error);
    return false;
  }
};
