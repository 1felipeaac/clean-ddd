import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/in-memory-question-comments-repository'
import { CommentOnQuestionsUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: CommentOnQuestionsUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new CommentOnQuestionsUseCase(inMemoryQuestionsRepository,inMemoryQuestionCommentsRepository)
  })
  it('should be able to comment on question', async () => {
      
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)
  
    
    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário da Questão'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('Comentário da Questão')
  
  })

})
