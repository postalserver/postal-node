type PostalHash = {
    message_id: string;
    messages: {
        [key: string]: {
            id: number;
            token: string;
        };
    };
};

type PostalMessage = {
    id: number;
    token: string;
    status?: {
        status:
            | 'Pending'
            | 'Sent'
            | 'Held'
            | 'SoftFail'
            | 'HardFail'
            | 'Bounced';
        last_delivery_attempt: number;
        held: boolean;
        hold_expiry: number | null;
    };
    details?: {
        rcpt_to: string;
        mail_from: string;
        subject: string;
        message_id: string;
        timestamp: number;
        direction: 'incoming' | 'outgoing';
        // This should return a number, but API returns a string for some reason
        size: string;
        bounce: 0 | 1;
        bounce_for_id: number;
        tag: string | null;
        received_with_ssl: 0 | 1;
    };
    inspection?: {
        inspected: boolean;
        spam: boolean;
        spam_score: number;
        threat: boolean;
        threat_details: string | null;
    };
    plain_body?: string | null;
    html_body?: string | null;
    attachments?: Array<{
        data: string;
        content_type: string;
        name: string;
    }>;
    headers?: Record<string, Array<string>>;
    raw_message?: string;
    activity_entries?: {
        // TODO: Determine the types for loads and clicks
        loads: Array<any>;
        clicks: Array<any>;
    };
};

type PostalError = {
    code: string;
    message: string;
};

type PostalResponse = {
    status: 'parameter-error' | 'error' | 'success';
    time: number;
    flags: Record<string, any>;
    data: PostalError;
};

export type { PostalHash, PostalMessage, PostalError, PostalResponse };
