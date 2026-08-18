import { api } from "./api";

export const NOTIFICATION_CATEGORIES = ['INFO', 'WARNING', 'ERROR'] as const;

export type NotificationCategory = typeof NOTIFICATION_CATEGORIES[number];

export interface Notification {
    _id : string;
    header: string;
    category: string;
    isClosed: boolean;
    userId: string;
    date: number;
}

export interface CreateNotificationDto {
    header: string;
    body: string;
    category: NotificationCategory;
    date:number;
}

export interface UpdateNotificationDto {
    header: string;
    body: string;
    category: NotificationCategory;
    isClosed: boolean;
    date: number
}

export const notificationService = {
    async findAll(): Promise<Notification[]> {
        const response = await api.get<Notification[]>('/notifications')
        return response.data;
    },

    async findOne(id: string): Promise<Notification> {
        const response = await api.get<Notification>(`/notifications/${id}`)
        return response.data;
    },

    async create(createDto: CreateNotificationDto): Promise<Notification> {
        const response = await api.post<Notification>('/notifications', createDto);
        return response.data;
    },

    async update(id: string, updateDto: UpdateNotificationDto): Promise<Notification> {
        const response = await api.put<Notification>(`/notifications/${id}`, updateDto);
        return response.data;
    },

    async remove(id: string): Promise<{message:string}> {
        const response = await api.delete<{message:string}>(`notifications/${id}`)
        return response.data
    },

 }