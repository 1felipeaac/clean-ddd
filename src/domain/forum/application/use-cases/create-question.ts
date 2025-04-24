import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateQuestionsUseCaseRequest {
  authorId: string,
  title: string,
  content: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class CreateQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    authorId,
    title, content
  }: CreateQuestionsUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionRepository.create(question)

    return {question}
  }
}
