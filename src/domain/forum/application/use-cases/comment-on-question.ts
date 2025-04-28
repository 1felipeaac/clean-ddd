import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface CommentOnQuestionsUseCaseRequest {
  authorId: string,
  questionId: string,
  content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionsUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
    ) {}
  async execute({
    authorId,
    questionId, 
    content
  }: CommentOnQuestionsUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if(!question){
        throw new Error('Question Not Found')
    }

    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityID(authorId),
        questionId: new UniqueEntityID(questionId),
        content
    })

    await this.questionCommentsRepository.create(questionComment)

    return {questionComment}
  }
}
