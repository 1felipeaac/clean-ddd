import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { FecthRecentQuestionUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: FecthRecentQuestionUseCase

describe('Fecth Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FecthRecentQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2025, 3, 23)}))
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2025, 3, 25)}))
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2025, 3, 24)}))

    const {questions} = await sut.execute({page: 1})

    expect(questions).toEqual([
      expect.objectContaining({createdAt: new Date(2025, 3, 25)}),
      expect.objectContaining({createdAt: new Date(2025, 3, 24)}),
      expect.objectContaining({createdAt: new Date(2025, 3, 23)}),
    ])
  })
  it('should be able to fetch recent paginated questions', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryQuestionsRepository.create(makeQuestion())

    }

    const {questions} = await sut.execute({page: 2})

    expect(questions).toHaveLength(2)
  })
})

