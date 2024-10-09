import {generateText} from 'ai';
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import { ApiHandler } from '@/lib/apiHandler';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { HabitModel } from '@/models/habit';

const google = createGoogleGenerativeAI({apiKey : process.env.GOOGLE_GENERATIVE_AI_API_KEY});
const model = google('gemini-1.5-flash');

export async function POST(request : Request) {
    try {
        
        const session = await getServerSession(authOptions);

        const {prompt} = await request.json();

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"));
        }
       
        
        const response = await generateText({
            model : google("gemini-1.5-flash"),
            prompt : prompt,
        });

        const text = response.text;


      



        return Response.json(new ApiHandler(true,"response generated successfully",text),{status:200})

    } catch (error) {
        console.log("error while generating response from ai: ",error);
    }
}