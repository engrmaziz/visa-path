import { AuthLayout } from "@/components/auth/auth-layout"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Welcome back</h1>
                    <p className="text-[var(--color-text-secondary)] text-sm">Enter your credentials to access your account</p>
                </div>

                <LoginForm />
            </div>
        </AuthLayout>
    )
}
