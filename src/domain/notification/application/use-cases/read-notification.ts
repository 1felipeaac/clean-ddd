import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ReadNotificationsUseCaseRequest {
  recipientId: string,
  notificationId: string,
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    notification: Notification
}>

export class ReadNotificationsUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute({
    recipientId,
    notificationId, 
  }: ReadNotificationsUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

    const notification = await this.notificationRepository.findById(notificationId)

    if (!notification) {
        return left(new ResourceNotFoundError())
    }

    if(recipientId !== notification.recipientId.toString()){
        return left(new NotAllowedError())
    }
    
    notification.read()

    await this.notificationRepository.save(notification)

    return right({notification})
  }
}
