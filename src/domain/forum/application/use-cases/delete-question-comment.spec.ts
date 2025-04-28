import { DeleteQuestionCommentsUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/in-memory-question-comments-repository'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
//system under test
let sut: DeleteQuestionCommentsUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  it('should be able to delete a question comment', async () => {
      
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)
  
    if (questionComment) {
      await sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: questionComment.authorId.toString()
      })

      expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
    }
  })

  it('should not be able to delete a another user question comment', async () => {
      
    const questionComment = makeQuestionComment({authorId: new UniqueEntityID('author-1')})

    await inMemoryQuestionCommentsRepository.create(questionComment)
  
    if (questionComment) {
        await expect(()=>{
            return sut.execute({
              questionCommentId: questionComment.id.toString(),
              authorId: 'author-2'
            })

        }).rejects.toBeInstanceOf(Error)
    }
  })

})
