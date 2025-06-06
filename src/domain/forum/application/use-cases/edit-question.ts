import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface EditQuestionsUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
    question: Question
}>

export class EditQuestionsUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
    ) {}
  async execute({
    questionId,
    authorId, 
    content,
    title, 
    attachmentsIds
  }: EditQuestionsUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== question.authorId.toString()){
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
