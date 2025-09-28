import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const emailAPI = new TransactionalEmailsApi();
(emailAPI as any).authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async (payload: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    const message = new SendSmtpEmail();
    message.subject = payload.subject;
    message.textContent = payload.text;
    message.sender = {
      name: "Better Auth",
      email: process.env.BREVO_SENDER_EMAIL || "no-reply@example.com",
    };
    message.to = [{ email: payload.to }];

    const response = await emailAPI.sendTransacEmail(message);

    console.log("Email sent successfully:", response);

    if (response?.body) return true;
    return false;
  } catch (error: any) {
    console.error("Error sending email:", error.body);
    return false;
  }
};
