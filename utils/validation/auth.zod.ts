// validations for auth done with zod

import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type signupType = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  token: z.string(),
});

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type changePasswordType = z.infer<typeof changePasswordSchema>;

export const changeEmailSchema = z.object({
  email: z.string().email(),
});

export type changeEmailType = z.infer<typeof changeEmailSchema>;

export const changeUsernameSchema = z.object({
  username: z.string(),
});

export type changeUsernameType = z.infer<typeof changeUsernameSchema>;
