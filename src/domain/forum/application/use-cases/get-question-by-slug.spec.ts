import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to get a question by slug', async () => {

    const newQuestion = makeQuestion({slug: Slug.create('nova-pergunta')})

    inMemoryQuestionsRepository.create(newQuestion)

    // console.log("question: " + JSON.stringify(inMemoryQuestionsRepository.items[0]))
      
    const result = await sut.execute({
      slug: 'nova-pergunta'
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)

  })

})

