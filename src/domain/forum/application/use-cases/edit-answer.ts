import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { Either, left, right } from "@/core/either";

interface EditAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
    answer: Answer
}>

export class EditAnswersUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId, 
    content,
  }: EditAnswersUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== answer.authorId.toString()){
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer);

    return right({ answer });
  }
}
