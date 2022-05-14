import axios from 'axios';
import { z } from 'zod';
import { SendMessage, GetMessage, SendRawMessage } from './schemas';
import type {
    PostalHash,
    PostalMessage,
    PostalError,
    PostalResponse,
} from './types';

class Postal {
    #hostname: string;
    #apiKey: string;

    constructor({ hostname, apiKey }: { hostname: string; apiKey: string }) {
        this.#hostname = hostname;
        this.#apiKey = apiKey;

        if (!hostname) {
            throw new Error('Hostname is required');
        }

        if (!apiKey) {
            throw new Error('API Key is required');
        }
    }

    async #sendRequest(
        controller: string,
        action: string,
        parameters: Record<string, any>,
    ): Promise<PostalError | PostalHash | PostalMessage> {
        return new Promise((resolve, reject) => {
            axios
                .post<PostalResponse>(
                    `${this.#hostname}/api/v1/${controller}/${action}`,
                    JSON.stringify(parameters),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Server-API-Key': this.#apiKey,
                        },
                    },
                )
                .then(({ data: { status, data } }) => {
                    if (status === 'error') {
                        reject(data);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    async sendMessage(
        payload: z.infer<typeof SendMessage>,
    ): Promise<PostalHash> {
        const data = SendMessage.safeParse(payload);

        if (!data.success) {
            throw new Error(JSON.stringify(data.error.format()));
        }

        return (await this.#sendRequest(
            'send',
            'message',
            data.data,
        )) as PostalHash;
    }

    async sendRawMessage(
        payload: z.infer<typeof SendRawMessage>,
    ): Promise<PostalHash> {
        const data = SendRawMessage.safeParse(payload);

        if (!data.success) {
            throw new Error(JSON.stringify(data.error.format()));
        }

        return (await this.#sendRequest(
            'send',
            'raw',
            data.data,
        )) as PostalHash;
    }

    async getMessage(
        payload: z.infer<typeof GetMessage>,
    ): Promise<PostalMessage> {
        const data = GetMessage.safeParse(payload);

        if (!data.success) {
            throw new Error(JSON.stringify(data.error.format()));
        }

        return (await this.#sendRequest(
            'messages',
            'message',
            data.data,
        )) as PostalMessage;
    }
}

export default Postal;
