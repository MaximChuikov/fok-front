// Типы для событий (если понадобятся в будущем)
export type Event = {
    event_id: number
    start_time: Date
    end_time: Date
    publication_date_title: string
    event_description: string
}

export type FutureEvents = {
    title: string,
    events: Event[]
}[]