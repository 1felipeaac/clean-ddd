import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQusetBestAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQusetBestAnswerUseCaseResponse {
    question: Question
}

export class ChooseQusetBestAnswersUseCase {
  constructor(private answerRepository: AnswersRepository, private questionRepository: QuestionsRepository) {}
  async execute({
    answerId,
    authorId,
  }: ChooseQusetBestAnswersUseCaseRequest): Promise<ChooseQusetBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);
    
    if (!answer) {
        throw new Error("Answer not found");
    }

    const question = await this.questionRepository.findById(answer.questionId.toString());

    if (!question) {
        throw new Error("Question not found");
    }

    if(authorId !== question.authorId.toString()){
        throw new Error ('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question);

    return { question };
  }
}
