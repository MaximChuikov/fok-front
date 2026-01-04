export interface DecryptedObj {
    // id Шаблона
    pid: number;
    // Сообщение - текст
    msg: string;
    // Дата в формате строки
    d?: string;
    // ФИО, кому предназначено
    fio?: string;
    // Призовое место
    p?: number;
}