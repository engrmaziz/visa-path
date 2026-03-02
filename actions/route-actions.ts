"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const saveRouteSchema = z.object({
    name: z.string().min(1, "Name is required"),
    passport_country: z.string(),
    destinations: z.array(z.string()),
    optimized_order: z.any(),
    optimization_goal: z.string(),
})

export async function saveRoute(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name") as string,
            passport_country: formData.get("passportCountry") as string,
            destinations: JSON.parse(formData.get("destinations") as string || "[]"),
            optimized_order: JSON.parse(formData.get("optimizedOrder") as string || "[]"),
            optimization_goal: formData.get("optimizationGoal") as string,
        }

        const validated = saveRouteSchema.safeParse(rawData)

        if (!validated.success) {
            return { error: "Validation failed", details: validated.error.flatten() }
        }

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return { error: "Not authenticated" }

        const { error } = await supabase.from("saved_routes").insert({
            user_id: user.id,
            ...validated.data
        })

        if (error) throw error

        revalidatePath("/dashboard/routes")
        return { success: true, message: "Route saved successfully!" }
    } catch (error: any) {
        console.error("Save route error:", error)
        return { error: error.message || "Failed to save route" }
    }
}
