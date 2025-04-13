import { z } from 'zod'

export const wordSchema = z
  .string()
  .min(3)
  .max(14)
  .refine((val) => !val.includes(' '))
