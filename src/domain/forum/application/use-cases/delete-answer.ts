import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";

interface DeleteAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswersUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if(authorId !== answer.authorId.toString()){
        throw new Error ('Not allowed')
    }

    await this.answerRepository.delete(answer);

    return { answer };
  }
}
