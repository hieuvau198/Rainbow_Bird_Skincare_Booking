import React from "react";
import HomeBanner from "./partials/HomeBanner";
import HomePopularService from "./partials/HomePopularService";
import HomeSpecialService from "./partials/HomeSpeicalService";
import HomeBestTherapists from "./partials/HomeBestTherapists";
import HomeCategories from "./partials/HomeCategories";
import HomeCenterNews from "./partials/HomeCeterNews";
import HomeRecentBlogs from "./partials/HomeRecentBlogs";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomePopularService />
      <HomeSpecialService />
      <HomeBestTherapists />
      <HomeCategories />
      <HomeRecentBlogs />
      <HomeCenterNews />
    </>
  );
}