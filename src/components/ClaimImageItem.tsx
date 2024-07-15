"use client";

import app from "@/lib/firebase";
import { getBytes, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const ClaimImageItem = ({ image }: any) => {
  const [imager, setImager] = useState<string>("");
  const storage = getStorage(app);
  const storageRef = ref(storage, image);

  const getImage = async () => {
    try {
        const arrayBuffer = await getBytes(storageRef);
        const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        console.log("inside component __________", url)
        setImager(url);
    } catch (err) {
        setImager("/cars.png")
        console.log(JSON.stringify(err))
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
        <img src={imager} alt="image n/a" className="w-full h-full" />
  );
};

export default ClaimImageItem;
