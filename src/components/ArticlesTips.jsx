import React from "react";
import TipsCard from "./TipsCard";

const ArticlesTips = () => {
  return (
    <div className="max-w-6xl m-auto my-20">
      <div className="m-2 mb-6">
        <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
          Articles & Tips
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Browse offers with great prices!
        </p>
      </div>
      <ul className="mt-20 grid xs:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card-1 */}
        <TipsCard
          img={
            "https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
          }
          title={" Skills That You Can Learn In The Real Estate Market"}
          profilePic={
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          profileName={"Ali Tufan"}
          date={"9 October 2022"}
        />

        {/* Card-2 */}
        <TipsCard
          img={
            "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          title={" Bedroom Colors You’ll Never Regret"}
          profilePic={
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          profileName={"Mary Carlson"}
          date={"8 November 2022"}
        />

        {/* Card-3 */}
        <TipsCard
          img={
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          title={" Skills That You Can Learn In The Real Estate Market"}
          profilePic={
            "https://images.unsplash.com/photo-1540683512676-41ee1d5883df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          profileName={"Sam Drake"}
          date={"19 January 2023"}
        />
      </ul>
    </div>
  );
};

export default ArticlesTips;
