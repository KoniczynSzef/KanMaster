import { create } from 'zustand';
import { Notification } from '@prisma/client';

type NotificationStore = {
    notifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;

    dismissNotification: (id: string) => void;
    getNotification: (id: string) => Notification | undefined;
    getNotifications: () => Notification[];

    clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    setNotifications(notifications) {
        set(() => ({
            notifications,
        }));
    },

    addNotification(notification) {
        set((state) => ({
            notifications: [...state.notifications, notification],
        }));
    },

    dismissNotification(id) {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
    },

    getNotification(id) {
        return this.notifications.find((n) => n.id === id);
    },

    getNotifications() {
        return this.notifications;
    },

    clearNotifications() {
        set(() => ({
            notifications: [],
        }));
    },
}));
