import { InMemoryAnswerCommentsRepository } from 'test/in-memory-answer-comments-repository'
import { DeleteAnswerCommentsUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
//system under test
let sut: DeleteAnswerCommentsUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to delete a answer comment', async () => {
      
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)
  
    if (answerComment) {
      await sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: answerComment.authorId.toString()
      })

      expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
    }
  })

  it('should not be able to delete a another user answer comment', async () => {
      
    const answerComment = makeAnswerComment({authorId: new UniqueEntityID('author-1')})

    await inMemoryAnswerCommentsRepository.create(answerComment)
  
    if (answerComment) {
      const result = await sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2'
      })

      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(NotAllowedError)
    }
  })

})
