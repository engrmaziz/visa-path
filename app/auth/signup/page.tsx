import { AuthLayout } from "@/components/auth/auth-layout"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Create an account</h1>
                    <p className="text-[var(--color-text-secondary)] text-sm">Open the door to borderless mobility.</p>
                </div>

                <SignupForm />
            </div>
        </AuthLayout>
    )
}
