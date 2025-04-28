import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Either, right } from '@/core/either'

interface AnswerQuestionsUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUsecaseResponse = Either<null, {
  answer: Answer
}>

export class AnswerQuestionsUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionsUseCaseRequest): Promise<AnswerQuestionUsecaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answerRepository.create(answer)

    return right({answer})
  }
}
