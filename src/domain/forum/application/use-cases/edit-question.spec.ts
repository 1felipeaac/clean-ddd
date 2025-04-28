import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionsUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: EditQuestionsUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question', async () => {

    const question = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(question)
      
    await sut.execute({
        questionId: question.id.toValue(), 
        authorId: 'author-1',
        content: 'Conteudo teste',
        title: 'Pergunta teste'
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
        content: 'Conteudo teste',
        title: 'Pergunta teste'
    })

  })

  it('should not be able to edit a question from another user', async () => {

    const question = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toValue(), 
      authorId: 'author-2',
      content: 'Conteudo teste',
      title: 'Pergunta teste'
    })
      
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })

})

