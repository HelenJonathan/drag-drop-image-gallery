import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials';
import Credentials from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "ztext@",
                    placeholder: "Enter your username"
            },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Enter your password"
                }
        },
        async authorize(Credentials) {
            // This is where you needd to retrieve user data from the backend to verify with credentials
            // reference docs: https://next-auth.js.org/configuration/providers/credentials
            const user = { id: "42", email: "user@example.com", password: "1Password"}
            
            if (Credentials?.email === user.email && Credentials?.password === user.password) {
                return user
            } else {
                return null
            }
        }
        }),
    ]
}