import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Either, left, right } from "@/core/either";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";

interface EditAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
    answer: Answer
}>

export class EditAnswersUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
    ) {}
  async execute({
    answerId,
    authorId, 
    content,
    attachmentsIds
  }: EditAnswersUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== answer.authorId.toString()){
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const questionAttachmentList = new AnswerAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id
      })
    })

    questionAttachmentList.update(questionAttachments)

    answer.attachments = questionAttachmentList
    answer.content = content

    await this.answerRepository.save(answer);

    return right({ answer });
  }
}
