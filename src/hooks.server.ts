import { SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/core/providers/credentials"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import {
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from "$env/static/private"

export const handle = SvelteKitAuth({
  providers: [
    Credentials({
      credentials:{
        email:{label:'Email', type:'text'},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials)
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "coba@example.com" }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }) as any,
    Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }) as any,
  ],
})
