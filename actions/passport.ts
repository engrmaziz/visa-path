"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const addPassportSchema = z.object({
    countryCode: z.string().min(2),
    countryName: z.string().min(2),
})

export async function addPassport(prevState: any, formData: FormData) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return { error: "Unauthorized" }

        const rawData = {
            countryCode: formData.get("countryCode") as string,
            countryName: formData.get("countryName") as string,
        }

        const validated = addPassportSchema.safeParse(rawData)

        if (!validated.success) return { error: "Invalid data", details: validated.error.flatten() }

        const { error } = await supabase.from("user_passports").insert({
            user_id: user.id,
            country_code: validated.data.countryCode,
            country_name: validated.data.countryName,
        })

        if (error) throw error

        revalidatePath("/dashboard")
        return { success: true, message: "Passport added successfully!" }
    } catch (error: any) {
        console.error("Add passport error:", error)
        return { error: error.message || "Failed to add passport" }
    }
}

export async function deletePassport(id: string) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return { error: "Unauthorized" }

        const { error } = await supabase.from("user_passports").delete().eq("id", id).eq("user_id", user.id)

        if (error) throw error

        revalidatePath("/dashboard")
        return { success: true }
    } catch (error: any) {
        console.error("Delete passport error:", error)
        return { error: "Failed to delete passport" }
    }
}
