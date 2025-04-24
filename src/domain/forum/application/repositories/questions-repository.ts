import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  findbySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
