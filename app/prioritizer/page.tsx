// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// interface GitHubUser {
//   login: string;
//   location:string
//   email: string;
//   username:string;
// }
// interface GitHubRepository {
//   id: number;
//   username: string;
// }

// const Prioritizer = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [userData, setUserData] =  useState<GitHubUser | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<GitHubRepository[]>([]);
  
//   useEffect(() => {
//     // Redirect to login if not authenticated
//     if (!session) {
//       router.push('/login');
//     }

//     // Fetch GitHub user details after successful authentication
//     if (session?.user) {
//       fetch(`https://api.github.com/users/${session.user.email}`)
//         .then((response) => response.json())
//         .then((data) => setUserData(data))
//         .catch((error) => console.error('Error fetching GitHub user details:', error));
//     }
//   }, [session, router]);

//   const handleSignOut = async () => {
//     await signOut({ redirect: false });
//     router.push('/');
//   };

//   const handleSearch = async () => {
//     if(session?.user === undefined ){
//       console.log('no session found');
//       return;
//     }
//     try {
//       const response = await fetch(
//         `https://api.github.com/search/repositories?q=${searchTerm}+user:${session.user.name}`
//       );

//       if (!response.ok) {
//         console.error('Error fetching GitHub repositories:', response.statusText);
//         return;
//       }

//       const data = await response.json();
//       setSearchResults(data.items);
//     } catch (error) {
//       console.error('Error fetching GitHub repositories:', error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h2>{userData?.login }'s GitHub Profile</h2>
//         <p>Email: {userData?.email}</p>
//         <p>Username:{userData?.username}</p>

//         <div>
//           <input
//             type="text"
//             placeholder="Search Repositories"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>

//         <ul>
//           {/* Display search results here */}
//           {searchResults.map((repo) => (
//             <li key={repo?.id}>{repo?.username}</li>
//           ))}
//         </ul>

//         <button onClick={handleSignOut}>Sign Out</button>
//       </div>
//     </div>
//   );
// };

// export default Prioritizer;
import { getServerSession } from "next-auth";
import { authOptions } from '../auth';

export default async function Prioritizer() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
                <div>
                  <img
                    // src={user.image ? user.image : "/images/default.png"}
                    className="max-h-36"
                    alt={`profile photo of ${user.name}`}
                  />
                </div>
                <div className="mt-8">
                  <p className="mb-3">Name: {user.name}</p>
                  <p className="mb-3">Email: {user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}