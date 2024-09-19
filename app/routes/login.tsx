import { SyntheticEvent } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth as clientAuth } from "~/firebase.client";
import { Form } from "@remix-run/react";

import type { ActionFunctionArgs } from "@remix-run/node";
import { auth as serverAuth } from "~/firebase.server";
import { useFetcher } from "@remix-run/react";

export async function action({
    request,
  }: ActionFunctionArgs) {
    console.log("Try to load the action");
    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
    console.log("idToken", idToken);

    if (!idToken) {
        return new Response("No idToken provided", { status: 400 });
    }

    // // Verify the idToken is actually valid
    await serverAuth.verifyIdToken(idToken);

    const jwt = await serverAuth.createSessionCookie(idToken, {
        // 5 days - can be up to 2 weeks
        expiresIn: 60 * 60 * 24 * 5 * 1000,
    });
    console.log("jwt", jwt);
}
  

export default function Login() {
    const fetcher = useFetcher();


//   async function handleSubmit(e: SyntheticEvent) {
//     e.preventDefault();
//     const target = e.target as typeof e.target & {
//       email: { value: string };
//       password: { value: string };
//     };

//     const email = target.email.value;
//     const password = target.password.value;

//     try {
//       const credential = await signInWithEmailAndPassword(clientAuth, email, password);
//       const idToken = await credential.user.getIdToken();
//         // Trigger a POST request which the action will handle
//         fetcher.submit({ idToken }, { method: "post", action: "/login" });
//       // TODO: Handle idToken
//     } catch (e: unknown) {
//       // Handle errors...
//     }
//   }

  /**
     * 구글 로그인
     */
  const handleGoogleLogin = async () => {
    
    try {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        // 구글 자동 로그인 비활성화 
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        // setErrorMsg(null);
        let credential = await signInWithPopup(clientAuth, provider); // popup을 이용한 signup
        console.log(credential.user);
        // result.user.getIdTokresulten().then((idToken) => {
        //     // idToken을 이용한 로그인
        //      // login(idToken);
        //     console.log(idToken);
        // });
        const idToken = await credential.user.getIdToken();
        // Trigger a POST request which the action will handle
        fetcher.submit({ idToken }, { method: "post", action: "/login" });
    }
    catch (error) {
        console.log(error);
        // setErrorMsg(error.message);
    }
}

  return (
    <Form onSubmit={handleGoogleLogin} method="post">
      <input name="email" type="text" />
      <input name="password" type="text" />
      <button type="submit">Login</button>
    </Form>
  );

}