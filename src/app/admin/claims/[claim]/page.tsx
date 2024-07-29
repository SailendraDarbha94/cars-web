"use client";

import ClaimImageItem from "@/components/ClaimImageItem";
import app from "@/lib/firebase";
import { child, get, getDatabase, ref, remove } from "firebase/database";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { claim } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [claimDetails, setClaimDetails] = useState<any>(null);

  const fetchClaimDetails = async () => {
    setLoading(true);
    try {
      const db = getDatabase(app);
      const dbRef = await ref(db);
      const data = await get(child(dbRef, `claims/${claim}`));
      if (data.exists()) {
        const claimDetails = await data.val();
        setClaimDetails(claimDetails);
        setLoading(false);
      }
    } catch (err) {
      JSON.stringify(err);
      setLoading(false);
    }
  };

  const deleteClaim = async () => {
    setLoading(true)
    try {
      const db = getDatabase(app);
      const postRef = ref(db, `claims/${claim}`);
      await remove(postRef);
      setLoading(false);
      router.push("/admin")
    } catch (err) {
      setLoading(false);
      console.log(JSON.stringify(err))
    }
  }

  useEffect(() => {
    fetchClaimDetails();
  }, []);
  return (
    <div className="min-h-screen">
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
      ) : (
        <div className="flex flex-col p-4 md:p-8 lg:p-12">
          <h1 className="my-2 text-xl md:text-3xl font-pExtraBold underline">
            Claim Details
          </h1>
          <div className="fixed left-0 top-2">
            <button
              className="bg-red-500 text-white font-pBold p-2 rounded-r-lg"
              onClick={() => router.push("/admin")}
            >
              Back
            </button>
          </div>
          {claimDetails ? (
            <div className="flex flex-row flex-wrap">
              <div className="w-1/2">
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Full Name
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Date of Birth
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Email Address
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Phone Number
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Policy Number
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Adjuster
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Risk Type
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  Island
                </h2>
              </div>
              <div className="w-1/2">
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.first_name +
                    " " +
                    claimDetails.middle_name +
                    " " +
                    claimDetails.last_name}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.date_of_birth
                    ? new Date(claimDetails.date_of_birth).toUTCString()
                    : "N/A"}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.email ? claimDetails.email : "N/A"}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.mobile_number
                    ? claimDetails.mobile_number
                    : "N/A"}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.policy_number
                    ? claimDetails.policy_number
                    : "N/A"}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.adjuster ? claimDetails.adjuster : "N/A"}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.risk_type ? claimDetails.risk_type : "N/A"}
                </h2>
                <h2 className="font-pSemiBold text-lg p-2 border-b-2 border-black">
                  {claimDetails.island ? claimDetails.island : "N/A"}
                </h2>
              </div>
              <div className="w-full p-2">
                <button className="mx-auto block bg-red-500 text-white p-2 rounded-xl font-bold mt-4" onClick={deleteClaim}>DELETE</button>
              </div>
            </div>
          ) : null}
          <div>
            {claimDetails ? (
              <div className="flex flex-wrap justify-evenly">
                {claimDetails.images.map((claim: any, idx: any) => {
                  return (
                    <div
                      key={idx}
                      className="w-[45%] max-h-fit rounded-xl overflow-hidden my-10"
                    >
                      <ClaimImageItem image={claim} />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
