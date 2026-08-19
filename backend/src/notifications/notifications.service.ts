import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, Types } from 'mongoose';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(
    createDto: CreateNotificationDto,
    userId: string,
  ): Promise<Notification> {
    const newNotification = new this.notificationModel({
      ...createDto,
      userId: new Types.ObjectId(userId),
      date: Date.now(),
    });
    return newNotification.save();
  }

  async findAll(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ date: -1 })
      .exec();
  }

  async findOne(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Id format');
    }

    const notification = await this.notificationModel.findById(id).exec();

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId.toString() !== userId) {
      throw new UnauthorizedException(
        'This notification does not belong to you',
      );
    }

    return notification;
  }

  async update(
    id: string,
    updateDto: UpdateNotificationDto,
    userId: string,
  ): Promise<Notification> {
    const notification = (await this.findOne(
      id,
      userId,
    )) as NotificationDocument;
    Object.assign(notification, updateDto);
    return notification.save();
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    (await this.findOne(id, userId)) as NotificationDocument;

    await this.notificationModel.findByIdAndDelete(id).exec();

    return { message: 'Notification deleted successfully' };
  }
}
