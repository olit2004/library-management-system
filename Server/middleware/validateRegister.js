import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  address: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  phone: z.string().optional()
});

// Middleware
export const validateRegister = (req, res, next) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }
  req.validatedData = parsed.data; // pass validated data forward
  next();
};