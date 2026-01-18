import React, { useState, useMemo } from 'react';
import { encryptObject } from '~/shared/lib/parseUrl';
import { DecryptedObj } from '~/shared/types/response/DecryptedObjType';
import getPattern from '~/pages/OnlineCertificate/getPattern';

const CertificateDebug: React.FC = () => {
    const [formData, setFormData] = useState<DecryptedObj>({
        pid: 1,
        fio: '',
        msg: '',
        d: new Date().toLocaleDateString('ru-RU'),
        p: undefined,
    });

    const [encryptedHash, setEncryptedHash] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Получаем пароль из переменных окружения
    const password = import.meta.env.VITE_PWD || '';

    const handleInputChange = (field: keyof DecryptedObj, value: string | number | undefined) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        // Не очищаем хеш при изменении полей, чтобы можно было видеть предпросмотр
        setError('');
    };

    const generateHash = async () => {
        if (!password) {
            setError('Пароль VITE_PWD не установлен в переменных окружения');
            return;
        }

        if (!formData.fio) {
            setError('Заполните все обязательные поля (ФИО)');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const hash = await encryptObject(formData, password);
            setEncryptedHash(hash);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка при генерации хеша');
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = async () => {
        if (!encryptedHash) return;

        try {
            await navigator.clipboard.writeText(encryptedHash);
        } catch (err) {
            setError('Не удалось скопировать в буфер обмена');
        }
    };

    const previewUrl = useMemo(() => {
        if (!encryptedHash) return '';
        return `${window.location.origin}/certificate?d=${encryptedHash}`;
    }, [encryptedHash]);

    // Рендерим грамоту сразу на основе данных формы, без необходимости хеша
    const certificatePreview = useMemo(() => {
        if (!formData.fio) return null;
        return getPattern(formData);
    }, [formData]);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Отладочная страница для создания грамот</h1>

            <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px',
                justifyContent: 'space-between',
                width: '100%',
                flexWrap: 'wrap',
            }}>
                <div style={{ flex: 1 }}>
                    <h2>Поля для заполнения</h2>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            ID шаблона (pid):
                        </label>
                        <input
                            type="number"
                            value={formData.pid || ''}
                            onChange={(e) => handleInputChange('pid', parseInt(e.target.value) || 1)}
                            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            ФИО (обязательно):
                        </label>
                        <input
                            type="text"
                            value={formData.fio || ''}
                            onChange={(e) => handleInputChange('fio', e.target.value)}
                            placeholder="Введите ФИО"
                            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Сообщение:
                        </label>
                        <textarea
                            value={formData.msg || ''}
                            onChange={(e) => handleInputChange('msg', e.target.value)}
                            placeholder="Введите сообщение для грамоты (необязательно)"
                            rows={4}
                            style={{ width: '100%', padding: '8px', fontSize: '14px', resize: 'vertical', whiteSpace: 'pre-wrap' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Дата (d):
                        </label>
                        <input
                            type="text"
                            value={formData.d || ''}
                            onChange={(e) => handleInputChange('d', e.target.value)}
                            placeholder="Например: 10.11.2025"
                            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Призовое место (p):
                        </label>
                        <input
                            type="number"
                            value={formData.p || ''}
                            onChange={(e) => handleInputChange('p', e.target.value ? parseInt(e.target.value) : undefined)}
                            placeholder="Необязательно"
                            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                        />
                    </div>

                    {!password && (
                        <div style={{
                            marginBottom: '15px',
                            padding: '10px',
                            backgroundColor: '#fff3cd',
                            color: '#856404',
                            borderRadius: '4px',
                            border: '1px solid #ffc107'
                        }}>
                            ⚠️ Пароль VITE_PWD не установлен. Установите его в файле .env для работы шифрования.
                        </div>
                    )}

                    <button
                        onClick={generateHash}
                        disabled={isGenerating}
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isGenerating ? 'not-allowed' : 'pointer',
                            opacity: isGenerating ? 0.6 : 1
                        }}
                    >
                        {isGenerating ? 'Генерация...' : 'Сгенерировать хеш'}
                    </button>

                    {error && (
                        <div style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            borderRadius: '4px'
                        }}>
                            {error}
                        </div>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h2>Результат</h2>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Зашифрованный хеш:
                        </label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <textarea
                                value={encryptedHash}
                                readOnly
                                rows={6}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    resize: 'vertical',
                                    backgroundColor: '#f5f5f5'
                                }}
                            />
                        </div>
                        <button
                            onClick={copyToClipboard}
                            disabled={!encryptedHash}
                            style={{
                                marginTop: '10px',
                                padding: '8px 16px',
                                fontSize: '14px',
                                backgroundColor: encryptedHash ? '#28a745' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: encryptedHash ? 'pointer' : 'not-allowed'
                            }}
                        >
                            📋 Копировать хеш
                        </button>
                    </div>

                    {previewUrl && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                URL для предпросмотра:
                            </label>
                            <input
                                type="text"
                                value={previewUrl}
                                readOnly
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    backgroundColor: '#f5f5f5'
                                }}
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(previewUrl);
                                }}
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    backgroundColor: '#17a2b8',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                📋 Копировать URL
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '40px', borderTop: '2px solid #ddd', paddingTop: '20px' }}>
                <h2>Предпросмотр грамоты</h2>
                {certificatePreview ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {certificatePreview}
                    </div>
                ) : (
                    <div style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#666',
                        fontStyle: 'italic'
                    }}>
                        Заполните ФИО и Сообщение, чтобы увидеть предпросмотр грамоты
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificateDebug;

