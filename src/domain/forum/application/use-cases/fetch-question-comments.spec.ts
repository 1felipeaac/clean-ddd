import { FetchQuestionAnswersUseCase } from './fetch-question-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { FetchQuestionCommentUseCase } from './fetch-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
//system under test
let sut: FetchQuestionCommentUseCase

describe('Fecth Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))

    const {questionComments} = await sut.execute({questionId: 'question-1',page: 1})

    expect(questionComments).toHaveLength(3)
  })
  it('should be able to fetch recent question comments', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))

    }

    const {questionComments} = await sut.execute({questionId: 'question-1', page: 2})

    expect(questionComments).toHaveLength(2)
  })
})

