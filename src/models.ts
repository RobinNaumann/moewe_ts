export interface AppConfig{
    id: string,
    name: string,
    config: {[key: string]: string | number | boolean}
}

export interface PushMeta {
    platform: string,
    device: string,
    appVersion: string
}

export interface PushEvent {
    type: string,
    key: string,
    meta: PushMeta,
    data: {[key: string]: any}
}