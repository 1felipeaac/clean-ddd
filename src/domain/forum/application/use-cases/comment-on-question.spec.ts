import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/in-memory-question-comments-repository'
import { CommentOnQuestionsUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: CommentOnQuestionsUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionsUseCase(inMemoryQuestionsRepository,inMemoryQuestionCommentsRepository)
  })
  it('should be able to comment on question', async () => {
      
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)
  
    if (question) {
      await sut.execute({
        questionId: question.id.toString(),
        authorId: question.authorId.toString(),
        content: 'Comentário da Questão'
      })

      expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('Comentário da Questão')
    }
  })

})
