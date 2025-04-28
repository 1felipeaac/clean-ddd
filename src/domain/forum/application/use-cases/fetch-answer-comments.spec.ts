import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { FetchAnswerCommentUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
//system under test
let sut: FetchAnswerCommentUseCase

describe('Fecth Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))

    const {answerComments} = await sut.execute({answerId: 'answer-1',page: 1})

    expect(answerComments).toHaveLength(3)
  })
  it('should be able to fetch recent answer comments', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))

    }

    const {answerComments} = await sut.execute({answerId: 'answer-1', page: 2})

    expect(answerComments).toHaveLength(2)
  })
})

