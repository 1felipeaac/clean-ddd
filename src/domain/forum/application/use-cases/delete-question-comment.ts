import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentsUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}
  async execute({
    questionCommentId,
    authorId
  }: DeleteQuestionCommentsUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question Comment not found");
    }

    if(authorId !== questionComment.authorId.toString()){
        throw new Error ('Not allowed')
    }

    await this.questionCommentRepository.delete(questionComment);

    return { };
  }
}
