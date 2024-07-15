"use client";

import app from "@/lib/firebase";
import { getBytes, getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import ClaimImageItem from "./ClaimImageItem";

const ClaimsListItem = ({ claim }: any) => {
  const [imager, setImager] = useState<any[]>([]);

  const storage = getStorage(app);
  const getImage = async (params: any) => {
    try {
      let storageRef = ref(storage, params);
      const arrayBuffer = await getBytes(storageRef);
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImager((prev) => {
        return [...prev, url];
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const getImageComponent = async (params: any) => {
    let storageRef = ref(storage, params);
    try {
      const arrayBuffer = await getBytes(storageRef);
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      if (!url) {
        return <h1>Error Occured in fetching image</h1>;
      } else {
        return <img src={url} alt="claim image" className="w-full h-full" />;
      }
    } catch (err) {
      return <h1>Error Occured in fetching image</h1>;
    }
  };

  const tryingAgain = async () => {
    let newImages:any[] = [];

    for(let i = 0; i <= claim.images.length; i++){
      const downloadUrl = await getDownloadURL(ref(storage, claim.images[0]));
      const url = downloadUrl + ".jpeg"
      newImages.push(url)
    }

    setImager(newImages);
  };

  // const fetchImages = async () => {
  //   if (claim.images.length > 0) {
  //     claim.images.forEach((c: string) => getImage(c));
  //   }
  // };

  useEffect(() => {
    tryingAgain();
  }, [claim]);

  //const claimData = JSON.parse(claim)
  return (
    <div className="flex flex-row flex-wrap max-w-full font-pMedium bg-blue-400">
      <div className="flex flex-col w-1/2">
        <h1 className="text-lg">First Name : {claim.first_name}</h1>
        <h1 className="text-lg">Middle Name : {claim.middle_name}</h1>
        <h1 className="text-lg">Last Name : {claim.last_name}</h1>
        <h1 className="text-lg">Email : {claim.email}</h1>
        <h1 className="text-lg">Risk Type : {claim.risk_type}</h1>
        <h1 className="text-lg">Island : {claim.island}</h1>
        <h1 className="text-lg">Policy Number: {claim.policy_number}</h1>
        <h1 className="text-lg">Adjuster : {claim.adjuster}</h1>
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
