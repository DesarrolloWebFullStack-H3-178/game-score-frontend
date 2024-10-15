'use client';
import React from "react";

export default function Dashboard() {
  return (
    <>
      Sidebar aquí
      <div className="relative md:ml-64 bg-blueGray-100">
        NavBar Admin
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
          Gráficos de líneas aquí
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardBarChart /> */}
          Gráficos de barras aquí
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
          Otros Gráficos aquí
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
          Otros Gráficos aquí
        </div>
      </div>
         Footer admin
        </div>
      </div>

      
    </>
  );
}
