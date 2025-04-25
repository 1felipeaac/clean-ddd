import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface EditAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string
}

interface EditAnswerUseCaseResponse {
    answer: Answer
}

export class EditAnswersUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId, 
    content,
  }: EditAnswersUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if(authorId !== answer.authorId.toString()){
        throw new Error ('Not allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer);

    return { answer };
  }
}
