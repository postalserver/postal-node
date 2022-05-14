import { z } from 'zod';

const SendMessage = z.object({
    subject: z.string(),
    from: z.string(),
    sender: z.string().optional(),
    to: z.array(z.string()).max(50).optional(),
    cc: z.array(z.string()).max(50).optional(),
    bcc: z.array(z.string()).max(50).optional(),
    reply_to: z.string().optional(),
    plain_body: z.string().optional(),
    html_body: z.string().optional(),
    tag: z.string().optional(),
    bounce: z.boolean().optional(),
    headers: z.record(z.string()).optional(),
    attachments: z
        .array(
            z.object({
                content_type: z.string(),
                data: z.string(),
                name: z.string(),
            }),
        )
        .optional(),
});

const SendRawMessage = z.object({
    mail_from: z.string(),
    rcpt_to: z.array(z.string()),
    data: z.string(),
    bounce: z.boolean().optional(),
});

const GetMessage = z.object({
    id: z.number(),
    _expansions: z
        .enum([
            'status',
            'details',
            'inspection',
            'plain_body',
            'html_body',
            'attachments',
            'headers',
            'raw_message',
        ])
        .array()
        .or(z.literal(true))
        .optional(),
});

export { SendMessage, SendRawMessage, GetMessage };
