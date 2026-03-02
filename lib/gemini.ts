import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined')
}

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// The model instance
export const geminiModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-pro',
})

// Prompt Builders
export const buildVisaCheckPrompt = (passportCountry: string, destinationCountry: string) => {
    return `You are a visa intelligence engine with current knowledge of global visa policies. For a ${passportCountry} passport holder traveling to ${destinationCountry}, provide:
1. Visa requirement type (visa-free/visa on arrival/e-visa/visa required)
2. Maximum stay allowed
3. Required documents (array)
4. Approximate cost in USD
5. Processing time
6. Official government/embassy URL
7. 2-3 practical insider tips
Respond ONLY in valid JSON matches this exact TypeScript interface:
{ visaType: string, maxStay: string, requiredDocs: string[], fees: string, processingTime: string, officialLink: string, tips: string[] }`
}

export const buildRouteOptimizerPrompt = (passport: string, destinations: string[], goal: string) => {
    return `You are a visa expert. Given a ${passport} passport and destinations ${destinations.join(', ')}, optimize the travel route to ${goal}. 
Return JSON with exactly this structure: { "optimizedRoute": string[], "visasRequired": number, "estimatedCost": number, "reasoning": string, "steps": [{ "country": string, "visaStatus": string, "duration": string, "tips": string }] }`
}

export const buildUpgradeRoadmapPrompt = (passport: string, goal: string) => {
    return `You are an immigration pathway expert. Current passport: ${passport}. Goal: ${goal}. Create a realistic step-by-step roadmap of immigration milestones that is legally sound.
Respond ONLY in valid JSON matching this interface:
{ totalEstimatedTime: string, totalEstimatedCost: string, milestones: [{ title: string, description: string, whyItMatters: string, estimatedTime: string, estimatedCost: string, difficulty: 'Easy'|'Medium'|'Hard', resources: [{ title: string, url: string }], newCountriesUnlocked: string[] }], projectedOutcome: string }`
}
