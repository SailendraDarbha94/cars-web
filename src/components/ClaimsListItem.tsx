"use client";

import app from "@/lib/firebase";
import { getBytes, getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import ClaimImageItem from "./ClaimImageItem";
import { useRouter } from "next/navigation";

const ClaimsListItem = ({ claim, claimId }: any) => {

  const router = useRouter();

  return (
    <div className="flex flex-row flex-wrap max-w-full font-pMedium bg-blue-400">
      <div className="flex flex-col w-1/2">
        <h1 className="text-lg">First Name : {claim.first_name}</h1>
        <h1 className="text-lg">Middle Name : {claim.middle_name}</h1>
        <h1 className="text-lg">Last Name : {claim.last_name}</h1>
        <h1 className="text-lg">Email : {claim.email}</h1>
        <br />
        <br />
        <button onClick={() => router.push(`/admin/claims/${claimId}`)} className="bg-primaryMore text-white text-lg p-2 rounded-md max-w-sm mx-auto">View Details</button>
      </div>
      <div className="bg-purple-300 w-1/2 flex flex-row flex-wrap">
      {/* {JSON.stringify(claim.images)} */}
        {claim.images
          ? claim.images.map((claim: any, idx:any) => {
              return (
                <div key={idx} className="w-52 h-52 m-2 p-4 bg-red-400 inline overflow-hidden">
                  <ClaimImageItem image={claim} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ClaimsListItem;
