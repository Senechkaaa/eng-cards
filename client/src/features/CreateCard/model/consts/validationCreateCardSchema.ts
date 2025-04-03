import { ValidationCreateCardSchemaType } from '../types/ValidationCreateCardSchemaType';
import { z, ZodType } from 'zod';

export type TypeErrorNameCreateCards = z.infer<typeof validationCreateCardSchema>;

export const validationCreateCardSchema: ZodType<ValidationCreateCardSchemaType> = z.object({
    engWord: z.string().min(1, { message: 'Write word necessarily' }),
    ruWord: z.string().min(1, { message: 'Write word necessarily' }),
    example: z.string().optional()
});

