"use client"
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
export default function Home() {
  
  return (
    <>
    <main className="flex flex-col items-center justify-between px-4">
      <Hero />
      
    </main>
    <div className="bottom-navigation bottom-0 fixed w-full p-4 md:hidden bg-gradient-to-b from-white to-transparent backdrop-blur-md shadow-2xl h-fit">
        <div className="flex items-center justify-around md:hidden">
          <div className="flex flex-col items-center">
            <a href="/deepscan">
              <img
                src="/scan.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-100`}
              />
              <div className="text-xs text-center">DeepScan</div>
            </a>
          </div>
          <div className="flex flex-col items-center">
            <a href="/connect">
              <img
                src="/connect.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-40 hover:opacity-100`}
              />
              <div className="text-xs text-center">Connect</div>
            </a>
          </div>
          <div className="flex flex-col items-center">
            <a href="/pricings">
              <img
                src="/pricings.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-40 active:opacity-100`}
              />
              <div className="text-xs text-center">Pricings</div>
            </a>
          </div>

          <div className="flex flex-col items-center">
            <a href="/scoreboard">
              <img
                src="/leaderboard.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-40`}
              />
              <div className="text-xs text-center">Scoreboard</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
