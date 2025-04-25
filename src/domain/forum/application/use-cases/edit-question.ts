import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

interface EditQuestionsUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string
}

interface EditQuestionUseCaseResponse {
    question: Question
}

export class EditQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    questionId,
    authorId, 
    content,
    title
  }: EditQuestionsUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if(authorId !== question.authorId.toString()){
        throw new Error ('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question);

    return { question };
  }
}
