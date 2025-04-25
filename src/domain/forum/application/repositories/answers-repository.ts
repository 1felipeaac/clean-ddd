import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  create(answer: Answer): Promise<void>;
  delete(answerId: Answer): Promise<void>;
}
