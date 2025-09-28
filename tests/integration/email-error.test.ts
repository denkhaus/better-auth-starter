import { describe, it, expect, vi } from 'vitest';
import { sendEmail } from '../../src/lib/email';
import { TransactionalEmailsApi } from '@getbrevo/brevo';

vi.mock('@getbrevo/brevo', () => {
  const mockSendTransacEmail = vi.fn(() => Promise.reject({ body: { code: 'failure', message: 'Invalid API key' } }));
  const mockTransactionalEmailsApi = vi.fn(() => ({
    authentications: { apiKey: { apiKey: '' } },
    sendTransacEmail: mockSendTransacEmail,
  }));
  return { TransactionalEmailsApi: mockTransactionalEmailsApi, SendSmtpEmail: vi.fn() };
});

describe('sendEmail error handling', () => {
  it('should handle invalid API key gracefully', async () => {
    process.env.BREVO_API_KEY = 'invalid-api-key';
    process.env.BREVO_SENDER_EMAIL = 'test@example.com';

    const payload = {
      to: 'recipient@example.com',
      subject: 'Test Subject',
      text: 'Test Text',
    };

    // Mock console.error to check if it's called
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await sendEmail(payload);

    expect(result).toBe(false);
    expect(TransactionalEmailsApi).toHaveBeenCalledTimes(1);
    const instance = (TransactionalEmailsApi as any).mock.results[0].value;
    expect(instance.sendTransacEmail).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error sending email:",
      { code: 'failure', message: 'Invalid API key' }
    );

    consoleErrorSpy.mockRestore(); // Restore original console.error
  });
});