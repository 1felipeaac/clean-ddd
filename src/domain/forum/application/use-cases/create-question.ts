import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'

interface CreateQuestionsUseCaseRequest {
  authorId: string,
  title: string,
  content: string
  attachmentsIds: string []
}

type CreateQuestionUseCaseResponse = Either<null, {
    question: Question
}>

export class CreateQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    authorId,
    title, 
    content,
    attachmentsIds
  }: CreateQuestionsUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })
    const questionsAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })

    question.attachments = new QuestionAttachmentList(questionsAttachments)

    await this.questionRepository.create(question)

    return right({question})
  }
}
