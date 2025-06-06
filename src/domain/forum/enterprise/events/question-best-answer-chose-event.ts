import { DomainEvent } from "@/core/events/domain-event";
import { Question } from "../entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class QuestionBestAnswetChoseEvent implements DomainEvent{
    public ocurredAt: Date;
    public question: Question
    public bestAnswerId: UniqueEntityID

    constructor(question: Question, bestAnswerId: UniqueEntityID){
        this.question = question
        this.ocurredAt = new Date()
        this.bestAnswerId = bestAnswerId
    }
    getAggregateId(): UniqueEntityID {
       return this.question.id
    }
}