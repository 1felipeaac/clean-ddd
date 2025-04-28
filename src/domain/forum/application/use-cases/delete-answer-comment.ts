
import { left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentsUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}
  async execute({
    answerCommentId,
    authorId
  }: DeleteAnswerCommentsUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerCommentId);

    if (!answerComment) {
      return left("Answer not found");
    }

    if(authorId !== answerComment.authorId.toString()){
        return left('Not allowed')
    }

    await this.answerCommentRepository.delete(answerComment);

    return right({});
  }
}
