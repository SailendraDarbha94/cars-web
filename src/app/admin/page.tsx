"use client";
import app from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { User } from "@/constants/interfaces";
import { useRouter } from "next/navigation";
import { child, get, getDatabase, ref } from "firebase/database";
import ClaimsListItem from "@/components/ClaimsListItem";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | any) => {
      if (!user) {
        router.push("/");
      }
      setUser(user);
    });
    fetchClaims()
  }, []);

  const [claims, setClaims] = useState<any>(null)
  const [claimsIndices, setClaimsIndices] = useState<any[] | null>(null)
  const fetchClaims = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = await ref(db);
      const data = await get(child(dbRef, "claims"));
      if (data.exists()) {
        const claims = await data.val();
        const indices = Object.keys(claims);
        setClaims(claims);
        setClaimsIndices(indices);
      }
    } catch (err) {
      JSON.stringify(err)
    }
  }

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="font-pBold text-2xl text-center my-2 p-2">
        Admin Dashboard
      </h1>
      {loading ? (
        <div className="w-full min-h-96 flex justify-center items-center">
          <div
            role="status"
            className="flex
                    min-h-96
                    max-h-full
                    justify-center
                    items-center"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
      <div>
        {user ? (
          <div>
            <h1 className="text-cl font-pSemiBold">Email : {user.email}</h1>
            {/* <h1>Id : {user.uid}</h1>
            <h1>Verified : {user.emailVerified ? "true" : "false"}</h1>
            <h1>Anonymous : {user.isAnonymous ? "true" : "false"}</h1> */}
          </div>
        ) : null}
      </div>
      <div>
        {claimsIndices && claims ? (
          <div>
            {claimsIndices?.map((claim:any) => {
              return (
                <div key={claim}>
                  <ClaimsListItem claim={claims[claim]} />
                  <br />
                  <br />
                </div>
              )
            })}
          </div>
        ):null}
      </div>
    </div>
  );
};

export default Page;
