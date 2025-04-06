import { ValidationAuthSchemaType } from '../types/ValidationAuthSchema';
import { z, ZodType } from 'zod';

// export type TypeErrorNameAuth = z.infer<typeof validationAuthSchema>;

export const createValidationSChema = (isLoginForm: boolean) => {
    const validationAuthSchema: ZodType<ValidationAuthSchemaType> = isLoginForm
        ? z.object({
              email: z.string().email('Email incorrect'),
              password: z.string().min(1, { message: 'Password is required' }),
          })
        : z
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

    return validationAuthSchema;
};
