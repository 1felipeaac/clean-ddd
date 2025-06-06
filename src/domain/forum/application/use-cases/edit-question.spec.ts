import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionsUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
//system under test
let sut: EditQuestionsUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new EditQuestionsUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
  })
  it('should be able to edit a question', async () => {

    const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1')
      })
    ),
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2')
      })
    )
      
    await sut.execute({
        questionId: newQuestion.id.toValue(), 
        authorId: 'author-1',
        content: 'Conteudo teste',
        title: 'Pergunta teste',
        attachmentsIds: ['1', '3']
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
        content: 'Conteudo teste',
        title: 'Pergunta teste'
    })
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({attachmentId: new UniqueEntityID('1')}),
      expect.objectContaining({attachmentId: new UniqueEntityID('3')})
    ])

  })

  it('should not be able to edit a question from another user', async () => {

    const question = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toValue(), 
      authorId: 'author-2',
      content: 'Conteudo teste',
      title: 'Pergunta teste',
      attachmentsIds: []
    })
      
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })

})

