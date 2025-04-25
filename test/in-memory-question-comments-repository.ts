import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository{
    public items: QuestionComment[] = []
    async findById(id: string) {
        const questionComment = this.items.find((item) => item.id.toString() === id);
    
        if (!questionComment) {
          return null;
        }
    
        return questionComment;
      }
    async delete(question: QuestionComment){
        const itemIndex = this.items.findIndex((item) => item.id === question.id);

        this.items.splice(itemIndex, 1);
    }
    async create(question: QuestionComment){
        this.items.push(question)
    }
}