
import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface DeleteAnswerCommentsUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError, 
  {}
>

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}
  async execute({
    answerCommentId,
    authorId
  }: DeleteAnswerCommentsUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if(authorId !== answerComment.authorId.toString()){
        return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment);

    return right({});
  }
}
