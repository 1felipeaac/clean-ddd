import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface FecthRecentQuestionUseCaseRequest {
  page: number
}

interface FecthRecentQuestionUseCaseResponse {
    questions: Question[]
}

export class FecthRecentQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    page
  }: FecthRecentQuestionUseCaseRequest): Promise<FecthRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({page})

    return {questions}
  }
}
