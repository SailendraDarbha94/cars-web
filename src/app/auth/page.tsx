"use client";
import app from "@/lib/firebase";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Form from "./Form";

interface LoginUser {
  email: string;
  password: string;
}
const Page = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState<boolean>(false);

  const loginUser = async (userDetails: LoginUser) => {
    setLoading(true);
    try {
      setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithEmailAndPassword(
          auth,
          userDetails.email,
          userDetails.password
        ).then((cb) => {
          console.log(cb);
          if (cb.user) {
            //setTimeout(() => {
            router.push("/admin");
            //}, 300);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setLoading(false);
      console.log("Error Occured", err);
    }
  };

  return (
    <main className="min-h-screen">
      <section className=" dark:bg-gray-900 font-pMedium p-4">
        <div className="flex flex-col items-center justify-center mx-auto md:min-h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="/majestic.png" alt="logo" />
            CARS
          </a>
          {loading ? (
            <span className="block mx-auto text-3xl animate-pulse">
              Loading...
            </span>
          ) : (
            <Form loginUser={loginUser} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
