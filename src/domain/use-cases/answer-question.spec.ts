import {test, expect} from 'vitest'
import { AnswerQuestionsUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswerRepository = {
    create: async (answer: Answer) =>{
        return;
    }
}

test('create answer', async () => {
    const answerQuestion = new AnswerQuestionsUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '1',
        content: 'Nova resposta'
    })

    if(answer){
        expect(answer.content).toEqual('Nova resposta')
    }
})