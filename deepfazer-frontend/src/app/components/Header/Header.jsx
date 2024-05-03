"use client";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import "./Header.css";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
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
const Header = () => {
  const [user, setUser] = useState(null);
  const [userXP, setUserXP] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  //  const router = useRouter();
  function toggleActive() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user's XP from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserXP(userData.xp);
          setUserXP(userData.xp || 0); // Set XP to 0 if userData.xp is undefined
        } else {
          // Handle case where user document doesn't exist
          setUserXP(0);
        }
      } else {
        setUser(null);
        // Reset user's XP if not logged in
      }
    });
    return () => unsubscribe();
  }, []);
  const handlelogonewut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        setUser(null);

        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <>
      <Analytics />
      <div
        className={`text-gray-950 w-full p-4 md:p-6 flex justify-between items-center max-md:mt-4`}
      >
        <div className="flex md:mx-12 items-center gap-2">
          <a href="/" className="flex items-center">
            {user ? (
              <img
                src={`${user.photoURL}`}
                alt=""
                height={30}
                width={30}
                className="mr-4 rounded-full"
              />
            ) : (
              <img
                src="/logonew.png"
                alt=""
                height={30}
                width={30}
                className="mr-4"
              />
            )}
            <h1 className="md:block font-bold text-xl max-md:text-sm">
              {user ? `Welcome, ${user.displayName}` : "deepfazer"}
            </h1>
          </a>

          {user && (
            <span className="text-sm flex font-bold px-4 py-1 rounded-full border border-black">
              XP: {userXP}
            </span>
          )}

          {user ? (
            <button onClick={handlelogonewut}>
              <img src="/exit.png" height={30} width={30} alt="" />
            </button>
          ) : (
            ""
          )}
        </div>
        <ul className="list-none gap-12 my-4 md:mx-12 text-md text-gray-800 md:flex items-center justify-between">
          {!user ? (
            <li>
              <a
                href="/login"
                className="rounded-full px-4 py-2 -ml-4 text-gray-100 bg-black hover:bg-white hover:text-black transition duration-300 ease-in-out"
              >
                Login
              </a>
            </li>
          ) : (
            <>
              <li>
                <a
                  href="/deepscan"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  DeepScan
                </a>
              </li>
              <li>
                <a
                  href="/nutricon"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Connect
                </a>
              </li>
              <li>
                <a
                  href="/pricings"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Pricing
                </a>
              </li>
              {/* <li>
                <a
                  href="/wearos"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  WearOS
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/nutricon"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  NutriCon
                </a>
              </li> */}
              <li>
                <a
                  href="/scoreboard"
                  className="max-md:hidden rounded-full px-2 py-2 -ml-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Scoreboard
                </a>
              </li>
            </>
          )}
        </ul>
        <div
          className={`menu-btn-1 md:hidden mx-6 z-20 ${
            isActive ? "active" : ""
          } ${router.pathname === "/" ? "block" : "hidden"}`}
          onClick={toggleActive}
        >
          <span></span>
        </div>
      </div>
      {isActive && <HamBurger />}
    </>
  );
};
export default Header;

const HamBurger = () => {
  return (
    <>
      <div className="absolute mt-2 rounded-lg border border-gray-50/20 z-10 bg-gray-50 drop-shadow-2xl backdrop-filter backdrop-blur-[6px] w-[96%] p-2">
        <ul className="list-none gap-12 my-4 text-xs flex flex-col items-center justify-between">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
        </ul>
      </div>
    </>
  );
};
