import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let model: any;

  beforeEach(async () => {
    model = jest.fn();
    model.find = jest.fn();
    model.findById = jest.fn();
    model.findByIdAndDelete = jest.fn();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: getModelToken(Notification.name), useValue: model },
      ],
    }).compile();

    service = moduleRef.get(NotificationsService);
  });

  describe('create', () => {
    it('builds a notification for the user and saves it', async () => {
      const userId = new Types.ObjectId().toHexString();
      const dto: CreateNotificationDto = {
        header: 'Server maintenance',
        body: 'Down at midnight',
        category: 'WARNING',
      };
      const saved = { _id: new Types.ObjectId().toHexString(), ...dto };

      const save = jest.fn().mockResolvedValue(saved);
      model.mockImplementation((doc: any) => ({ ...doc, save }));

      const result = await service.create(dto, userId);

      expect(model).toHaveBeenCalledTimes(1);

      const constructedWith = model.mock.calls[0][0];
      expect(constructedWith).toMatchObject({
        header: dto.header,
        body: dto.body,
        category: dto.category,
      });
      expect(constructedWith.userId).toBeInstanceOf(Types.ObjectId);
      expect(constructedWith.userId.toString()).toBe(userId);
      expect(typeof constructedWith.date).toBe('number');

      expect(save).toHaveBeenCalledTimes(1);
      expect(result).toBe(saved);
    });
  });

  describe('findAll', () => {
    it('queries by the user id and sorts newest first', async () => {
      const userId = new Types.ObjectId().toHexString();
      const docs = [{ _id: '1' }, { _id: '2' }];

      const exec = jest.fn().mockResolvedValue(docs);
      const sort = jest.fn().mockReturnValue({ exec });
      model.find.mockReturnValue({ sort });

      const result = await service.findAll(userId);

      const filter = model.find.mock.calls[0][0];
      expect(filter.userId).toBeInstanceOf(Types.ObjectId);
      expect(filter.userId.toString()).toBe(userId);
      expect(sort).toHaveBeenCalledWith({ date: -1 });
      expect(result).toBe(docs);
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException for an invalid id format', async () => {
      await expect(service.findOne('not-an-id', 'user')).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findById).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when no notification exists', async () => {
      const id = new Types.ObjectId().toHexString();
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(id, 'user')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws UnauthorizedException when the notification belongs to someone else', async () => {
      const id = new Types.ObjectId().toHexString();
      const notification = { _id: id, userId: new Types.ObjectId() };
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(notification),
      });

      await expect(
        service.findOne(id, new Types.ObjectId().toHexString()),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('returns the notification when it belongs to the user', async () => {
      const owner = new Types.ObjectId();
      const id = new Types.ObjectId().toHexString();
      const notification = { _id: id, userId: owner };
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(notification),
      });

      const result = await service.findOne(id, owner.toHexString());

      expect(result).toBe(notification);
    });
  });

  describe('remove', () => {
    it('deletes an owned notification and returns a success message', async () => {
      const owner = new Types.ObjectId();
      const id = new Types.ObjectId().toHexString();
      const notification = { _id: id, userId: owner };

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(notification),
      });
      model.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(notification),
      });

      const result = await service.remove(id, owner.toHexString());

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ message: 'Notification deleted successfully' });
    });
  });
});
