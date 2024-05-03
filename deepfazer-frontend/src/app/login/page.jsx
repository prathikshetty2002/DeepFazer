"use client";
import { Analytics } from "@vercel/analytics/react";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyCh3FXH9ggmwQwOvGwV7hgfONNG0_W0AyQ",
  authDomain: "deepfazer-193f2.firebaseapp.com",
  databaseURL: "https://deepfazer-193f2-default-rtdb.firebaseio.com",
  projectId: "deepfazer-193f2",
  storageBucket: "deepfazer-193f2.appspot.com",
  messagingSenderId: "496079065415",
  appId: "1:496079065415:web:b582ecc1bc183b29d1bc62",
  measurementId: "G-RJNJ5ZL1PW"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const LoginWithGoogle = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        saveUserDataToFirestore(authUser);
        setUser(authUser);
        // Store user data in Firestore

        router.push("/deepscan");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // User signed in
        const user = result.user;
        setUser(user);
        saveUserDataToFirestore(user);
        //   console.log("User data successfully stored in Firestore!");
        // }
        sessionStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const saveUserDataToFirestore = async (user) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          // You can add more user data as needed
        });
        console.log("User data successfully stored in Firestore!");
      } else {
        console.log("User already exists in Firestore!");
      }
    } catch (error) {
      console.error("Error storing user data: ", error);
    }
  };

  const handlelogonewut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        sessionStorage.removeItem("user"); // Remove user data from session storage
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  {
    /* <button onClick={handlelogonewut}>logonewut</button> */
  }

  return (
    // <div>
    //   {user ? (
    //     <div>
    //       <h1>Welcome, {user.displayName}</h1>
    //     </div>
    //   ) : (
    //     <div>
    //       <h1>Login with Google</h1>
    //       <button onClick={handleGoogleLogin}>Login</button>
    //     </div>
    //   )}
    // </div>

    <div className="flex items-center justify-center p-8 min-h-screen -mt-24">
      <div className="w-[400px] bg-white border border-gray-300 shadow-2xl rounded-lg h-fit p-4">
        <div className="border-gray-300 px-4 py-4">
          <div className="text-2xl font-semibold mb-6">
            <Analytics />
            Sign in{" "}
            <span className="text-gray-600 font-normal text-xl">
              to Unlock Best Features of{" "}
            </span>
            DeepFazer
          </div>
          {/* {loading ? <Spinner /> : ""} */}

          <div
            onClick={handleGoogleLogin}
            className="w-full mt-4 text-center text-black font-medium px-4 py-3 border-gray-900 border-2 rounded-full items-center flex hover:bg-black hover:text-white cursor-pointer transition-all"
          >
            <img
              src="/google.svg"
              alt=""
              className="mr-12 max-sm:mr-4 "
              height={20}
              width={20}
            />
            Continue with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithGoogle;
