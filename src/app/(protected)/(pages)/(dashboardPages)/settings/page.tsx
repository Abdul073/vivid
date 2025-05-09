import { onAuthenticateUser } from "@/actions/user";
import React from "react";

const Page = async () => {
  const chechUser = await onAuthenticateUser();
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
          Settings
        </h1>
        <p className="text-base font-normal dark:text-secondary">
          All your settings
        </p>
      </div>
    </div>
  );
};

export default Page;
