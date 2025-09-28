import { describe, it, expect, vi } from 'vitest';
import { sendEmail } from '../../src/lib/email';
import { TransactionalEmailsApi } from '@getbrevo/brevo';

vi.mock('@getbrevo/brevo', () => {
  const mockSendTransacEmail = vi.fn(() => Promise.resolve({ body: { messageId: 'mock-message-id' } }));
  const mockTransactionalEmailsApi = vi.fn(() => ({
    authentications: { apiKey: { apiKey: '' } },
    sendTransacEmail: mockSendTransacEmail,
  }));
  return { TransactionalEmailsApi: mockTransactionalEmailsApi, SendSmtpEmail: vi.fn() };
});

describe('sendEmail', () => {
  it('should send an email successfully using Brevo API', async () => {
    process.env.BREVO_API_KEY = 'test-api-key';
    process.env.BREVO_SENDER_EMAIL = 'test@example.com';

    const payload = {
      to: 'recipient@example.com',
      subject: 'Test Subject',
      text: 'Test Text',
    };

    const result = await sendEmail(payload);

    expect(result).toBe(true);
    expect(TransactionalEmailsApi).toHaveBeenCalledTimes(1);
    const instance = (TransactionalEmailsApi as any).mock.results[0].value;
    expect(instance.sendTransacEmail).toHaveBeenCalledTimes(1);
    expect(instance.sendTransacEmail).toHaveBeenCalledWith(expect.objectContaining({
      subject: 'Test Subject',
      textContent: 'Test Text',
      sender: { name: 'Better Auth', email: 'test@example.com' },
      to: [{ email: 'recipient@example.com' }],
    }));
  });
});