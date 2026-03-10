export type DocumentItem = {
  /** Файл в `public/fok-documents/` */
  fileName: string;
  /** Отображаемое название на сайте (можно менять как угодно) */
  title: string;
};

/**
 * Список документов.
 * - Файлы лежат в `public/fok-documents/`
 * - Чтобы переименовать название на сайте — меняйте `title`
 * - Чтобы заменить файл — положите новый PDF в `public/fok-documents/` и обновите `fileName`
 */
export const DOCUMENTS: DocumentItem[] = [
  { fileName: "постановление.pdf", title: "Стоимость услуг" },
  { fileName: "ЕГРН.pdf", title: "ЕГРН" },
  { fileName: "ОГРН.pdf", title: "ОГРН" },
  { fileName: "устав фок.pdf", title: "Устав ФОК" },
  { fileName: "изменения в Устав.pdf", title: "Изменения в Устав" },
  { fileName: "единый государственный реестр юр.лиц.pdf", title: "ЕГРЮЛ (выписка)" },
  { fileName: "заключение.pdf", title: "Заключение" },
  { fileName: "распоряжение.pdf", title: "Распоряжение" },
  { fileName: "сертификат  соответствия.pdf", title: "Сертификат соответствия" },
];


