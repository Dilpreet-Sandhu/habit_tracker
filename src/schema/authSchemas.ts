import {z} from 'zod';


export const usernameValidation = z
            .string()
            .min(2,"username should be atleast 2 characters")
            .max(20,"username should not exceed 20 characters")
            .regex(/^[a-zA-Z0-9_]+$/,"usename must not contain special characters");


            
export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message : "invalid email adress"}),
    password : z.string().min(6,"password must be at least 6 characters long")
});


export const signInSchema = z.object({
    identifier : z.string().email(),
    password : z.string().min(6,"password must be at least 6 characters long")
})