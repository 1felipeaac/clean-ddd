import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository implements NotificationsRepository {
  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === notification.id);

    this.items[itemIndex] = notification;
  }
  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id);

    if (!notification) {
      return null;
    }

    return notification;
  }
  public items: Notification[] = [];


  async create(notification: Notification) {
    this.items.push(notification);
  }


}
