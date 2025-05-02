import { InMemoryAnswerAttachmentsRepository } from "test/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "test/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/in-memory-questions-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/in-memory-question-attachments-repository";
import { InMemoryNotificationsRepository } from "test/in-memory-notifications-repository";
import { SendNotificationsUseCase } from "../use-cases/send-notification";
import { makeQuestion } from "test/factories/make-question";

import {MockInstance} from 'vitest'
import { waitFor } from "test/utils/wait-for";
import { OnQuestionBestAnswerChose } from "./on-question-best-answer-chose";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationsUseCase: SendNotificationsUseCase

let sendNotificationExecuteSpy: MockInstance

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sendNotificationsUseCase = new SendNotificationsUseCase(inMemoryNotificationsRepository)

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationsUseCase, 'execute')

        new OnQuestionBestAnswerChose(inMemoryAnswerRepository, sendNotificationsUseCase)
    })

    it('should send a notification when question has new best answer chosen', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({questionId: question.id})
        
        inMemoryQuestionsRepository.create(question)
        inMemoryAnswerRepository.create(answer)

        question.bestAnswerId = answer.id

        inMemoryQuestionsRepository.save(question)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })

      
    })
})