import { ValidationAuthSchemaType } from '../types/ValidationAuthSchema';
import { z, ZodType } from 'zod';

export type TypeErrorNameAuth = z.infer<typeof validationAuthSchema>;

export const validationAuthSchema: ZodType<ValidationAuthSchemaType> = z
    .object({
        username: z.string().min(1, { message: 'Username is required' }),
        email: z.string().email('Email incorrect'),
        password: z.string().min(8, { message: 'Password is short. Min 8' }),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
