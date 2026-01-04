import {DecryptedObj} from "../types";

function decodeBase64Url(base64url: string): string {
    let base64 = base64url
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }

    return base64;
}

async function decryptObject(base64, password) {
    const a = await encryptObject({pid: 1, fio: 'Зантария Ролан Джудулиевич', d: '10.11.2025', msg: 'С началом нового этапа технологий!'}, import.meta.env.VITE_PWD)
    console.log({a})

    console.log({base64, password})
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const iv = bytes.slice(0, 12);
    const data = bytes.slice(12);

    const encoder = new TextEncoder();
    return await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        {name: "PBKDF2"},
        false,
        ["deriveKey"]
    ).then(baseKey =>
        crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: encoder.encode("fixed-salt"),
                iterations: 100000,
                hash: "SHA-256",
            },
            baseKey,
            {name: "AES-GCM", length: 256},
            false,
            ["decrypt"]
        )
    ).then(aesKey =>
        crypto.subtle.decrypt(
            {name: "AES-GCM", iv},
            aesKey,
            data
        ).then(decrypted => {
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decrypted));
        })
    );
}

export default async function parseUrl(encryptedData: string): Promise<DecryptedObj> {
    if (!encryptedData) {
        throw new Error('No encrypted data provided');
    }

    // Проверяем что мы в браузере
    if (typeof window === 'undefined' || !window.crypto?.subtle) {
        throw new Error('Crypto API not available');
    }

    if (!import.meta.env.VITE_PWD) {
        throw new Error('VITE_PWD environment variable is not defined');
    }

    const base64 = decodeBase64Url(encryptedData);
    return await decryptObject(base64, import.meta.env.VITE_PWD) as DecryptedObj
}


// ===== Утилиты для URL-безопасного base64 =====
function encodeBase64Url(base64: string): string {
    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// ===== Шифрование =====
export async function encryptObject(obj: any, password: string): Promise<string> {
    const text = JSON.stringify(obj);
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Генерация ключа из пароля
    const baseKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        {name: "PBKDF2"},
        false,
        ["deriveKey"]
    );

    const aesKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("fixed-salt"),
            iterations: 100000,
            hash: "SHA-256",
        },
        baseKey,
        {name: "AES-GCM", length: 256},
        false,
        ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        {name: "AES-GCM", iv},
        aesKey,
        data
    );

    const encryptedArray = new Uint8Array(encrypted);
    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    const base64 = btoa(String.fromCharCode(...combined));
    return encodeBase64Url(base64); // Возвращаем URL-безопасную версию
}