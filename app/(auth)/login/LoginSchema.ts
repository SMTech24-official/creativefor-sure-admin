import { z } from 'zod';

// Zod schema for form validation
const loginFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

// Type for the form data
type LoginFormValues = z.infer<typeof loginFormSchema>;

export { type LoginFormValues, loginFormSchema };
