import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findbySlug(slug)

    if(!question){
        throw new Error('Question Not Found!')
    }

    return {question}
  }
}
