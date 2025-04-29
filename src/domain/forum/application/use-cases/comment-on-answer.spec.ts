import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/in-memory-answer-comments-repository'
import { CommentOnAnswersUseCase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/in-memory-answer-attachments-repository'


let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
//system under test
let sut: CommentOnAnswersUseCase

describe('Comment on answer', () => {
  beforeEach(() => {

    inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
    sut = new CommentOnAnswersUseCase(inMemoryAnswersRepository,inMemoryAnswerCommentsRepository)
  })
  it('should be able to comment on answer', async () => {
      
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)
  
    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário da Questão'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('Comentário da Questão')
    
  })

})
