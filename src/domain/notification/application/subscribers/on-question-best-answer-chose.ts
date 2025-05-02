import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationsUseCase } from "../use-cases/send-notification";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswetChoseEvent } from "@/domain/forum/enterprise/events/question-best-answer-chose-event";

export class OnQuestionBestAnswerChose implements EventHandler{

    constructor(
        private answersRepository: AnswersRepository,
        private sendNotification: SendNotificationsUseCase
        ){
        this.setupSubscriptions()
    }
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendQuestionBestAnswerNotification.bind(this), 
            QuestionBestAnswetChoseEvent.name
            )
    }

    private async sendQuestionBestAnswerNotification({question, bestAnswerId}: QuestionBestAnswetChoseEvent){
        const answer = await this.answersRepository.findById(bestAnswerId.toString())
        
        if(answer){
            await this.sendNotification.execute({
                recipientId: answer.authorId.toString(),
                title: `Sua Resposta foi escolhida`,
                content: `A resposta que você enviou em "${question.title.substring(0,20).concat('...')}" foi escolhida pelo autor`
            })
        }
    }

}