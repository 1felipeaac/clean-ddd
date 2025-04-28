import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from './errors/not-allowed-error'

interface CommentOnAnswersUseCaseRequest {
  authorId: string,
  answerId: string,
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<NotAllowedError, {
    answerComment: AnswerComment
}>

export class CommentOnAnswersUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
    ) {}
  async execute({
    authorId,
    answerId, 
    content
  }: CommentOnAnswersUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if(!answer){
      return left(new NotAllowedError())
    }

    const answerComment = AnswerComment.create({
        authorId: new UniqueEntityID(authorId),
        answerId: new UniqueEntityID(answerId),
        content
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({answerComment})
  }
}
