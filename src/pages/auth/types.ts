import { z } from "zod";

const CredentialSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const LoginSchema = z.object({
  accessToken: z.string(),
});

export type Credentials = z.infer<typeof CredentialSchema>;

export type Login = z.infer<typeof LoginSchema>;
