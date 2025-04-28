import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswersUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    
    if(authorId !== answer.authorId.toString()){
        return left(new NotAllowedError())
    }

    await this.answerRepository.delete(answer);
    
    return right({ answer });
  }
}
