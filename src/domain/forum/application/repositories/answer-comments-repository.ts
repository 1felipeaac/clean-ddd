import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
    findById(id: string):Promise<AnswerComment | null>
    create(question: AnswerComment): Promise<void>
    delete(question: AnswerComment): Promise<void>
    findManyByAnswerId(questionId: string, params: PaginationParams):Promise<AnswerComment[]>
}