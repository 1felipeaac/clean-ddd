import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";

interface DeleteQuestionsUseCaseRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    questionId,
    authorId
  }: DeleteQuestionsUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if(authorId !== question.authorId.toString()){
        throw new Error ('Not allowed')
    }

    await this.questionRepository.delete(question);

    return { question };
  }
}
