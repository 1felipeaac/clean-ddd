import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "./errors/not-allowed-error";

interface EditQuestionsUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
    question: Question
}>

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
      return left(new ResourceNotFoundError())
    }

    if(authorId !== question.authorId.toString()){
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question);

    return right({ question });
  }
}
