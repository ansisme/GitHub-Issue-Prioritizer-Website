// 'use client';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export const LoginForm = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // const callbackUrl = '/prioritizer'; // Set your desired callback URL

//   const handleGitHubSignIn = async () => {
//     try {
//       setLoading(true);

//       const res = await signIn('github', { callbackUrl: '/prioritizer' });

//       setLoading(false);

//       console.log('GitHub Sign In Response:', res);

//       if (!res?.error) {
//         router.push('/prioritizer');
//       } else {
//         setError('GitHub authentication failed');
//       }
//     } catch (error: any) {
//       setLoading(false);
//       setError(error);
//     }
//   };

//   return (
//     <div>
//       {error && (
//         <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
//       )}

//       <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
//         <p className="text-center font-semibold mx-4 mb-0">OR</p>
//       </div>

//       <button
//         className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
//         style={{ backgroundColor: '#55acee' }}
//         onClick={handleGitHubSignIn}
//       >
//         Continue with GitHub
//       </button>
//     </div>
//   );
// };

// "use client";
// import { signIn } from "next-auth/react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { ChangeEvent, useState } from "react";

// export const LoginForm = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/prioritizer";

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setFormValues({ email: "", password: "" });

//       const res = await signIn("credentials", {
//         redirect: false,
//         email: formValues.email,
//         password: formValues.password,
//         callbackUrl,
//       });

//       setLoading(false);

//       console.log(res);
//       if (!res?.error) {
//         router.push(callbackUrl);
//       } else {
//         setError("invalid email or password");
//       }
//     } catch (error: any) {
//       setLoading(false);
//       setError(error);
//     }
//   };

//   const input_style =
//     "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

//   return (
//     <form onSubmit={onSubmit}>
//       {error && (
//         <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
//       )}
//       <a
//         className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
//         style={{ backgroundColor: "#55acee" }}
//         onClick={() => signIn("github", { callbackUrl })}
//         role="button"
//       >
//         <img
//           className="pr-2"
//           style={{ height: "2.2rem" }}
//         />
//         Continue with GitHub
//       </a>
//     </form>
//   );
// };
'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react';

export default function LoginForm() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        <p>welcome {session.user?.name}</p>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>

          Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}