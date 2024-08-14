"use client";

import app from "@/lib/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBytes, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const ClaimImageItem = ({ image }: any) => {
  const [imager, setImager] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<any | null>(null);

  const storage = getStorage(app);
  const storageRef = ref(storage, image);

  const getImage = async () => {
    try {
      const arrayBuffer = await getBytes(storageRef);
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      const file = new File([blob], "filename.jpg", { type: "image/jpeg" });
      setCurrentFile(file);
      console.log("inside component __________", url);
      setImager(url);
    } catch (err) {
      setImager("/cars.png");
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader: any = new FileReader();
      reader.onloadend = () => resolve(reader?.result?.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(null);

  const generateDescription = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_KEY as string
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Describe this picture`;
      const imagePart: any = await fileToGenerativePart(currentFile);
      const result: any = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const description = await response.text();
      setDescription(description);
      setLoading(false);
      //   for await (const chunk of result.stream) {
      //     const chunkText = chunk.text();
      //     console.log(chunkText);
      //     setAnswer((prev: string) => {
      //       return prev + chunkText;
      //     });
      //   }
    } catch (err) {
      setLoading(false);
      console.log(JSON.stringify(err));
    }
  };

  return (
    <div className="p-2">
      <img src={imager} alt="image n/a" className="w-full h-full" />
      {description ? null : (
        <button
          disabled={loading}
          className={`bg-black mx-auto ${
            loading ? "animate-pulse" : "animate-none"
          } block my-2 text-white py-1 px-2 rounded-md`}
          onClick={generateDescription}
        >
          {loading ? "Loading..." : "Generate AI Description"}
        </button>
      )}
      <div>
        {description ? (
          <p className="text-md font-pMedium">{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ClaimImageItem;
