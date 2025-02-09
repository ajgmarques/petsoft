import { z } from 'zod';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name is required with at least 2 characteres long' }),
  ownerName: z.string().trim().min(1, {
    message: 'Owner name is required with at least a charactere long',
  }),
  imageUrl: z.union([
    z.literal(''),
    z.string().url({ message: 'Image url must be a valid url' }),
  ]),
  age: z.coerce.number().int().positive().max(30),
  notes: z.union([z.literal(''), z.string().trim().max(1000)]),
});

// * se usarmos onSubmit no form funciona e podemos transformar os dados
// .transform((data) => ({
//   ...data,
//   imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
// }));

// * tipando com a schema do zod, não precisamos duplicar
export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TAuth = z.infer<typeof authSchema>;
