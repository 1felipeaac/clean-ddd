import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'

interface AnswerQuestionsUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionsUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionsUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
