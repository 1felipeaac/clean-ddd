import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository'
import { ChooseQusetBestAnswersUseCase } from './choose-question-best-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/in-memory-answer-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
//system under test
let sut: ChooseQusetBestAnswersUseCase

describe('Choose Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
    sut = new ChooseQusetBestAnswersUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
  })
  it('should be able to choose the question best answer', async () => {

    const question = makeQuestion()
    const answer = makeAnswer({questionId: question.id})

    inMemoryAnswersRepository.create(answer)
    inMemoryQuestionsRepository.create(question)
      
    await sut.execute({answerId: answer.id.toString(), authorId: question.authorId.toString()})

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)

  })

  it('should not be able to choose another user question best answer', async () => {

    const question = makeQuestion({authorId: new UniqueEntityID('author-1')})
    const answer = makeAnswer({questionId: question.id})

    inMemoryAnswersRepository.create(answer)
    inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({answerId: answer.id.toString(), authorId: 'author-2'})

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })

})

