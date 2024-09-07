"use client";

import { useTumblrStore } from "@/lib/providers/tumblr-provider";
import { getUserInfo, getUserLimits, TumblrUserInfo } from "@/lib/tumblr";
import { useEffect } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

export default function UserInfo() {
  const {
    consumerKey,
    consumerSecret,
    token,
    tokenSecret,
    userInfo,
    setUserInfo,
  } = useTumblrStore((state) => state);

  const handleGetInfo = async () => {
    console.log(
      await getUserInfo({
        consumerKey,
        consumerSecret,
        token,
        tokenSecret,
      })
    );
  };
  const handleGetLimits = async () => {
    console.log(
      await getUserLimits({
        consumerKey,
        consumerSecret,
        token,
        tokenSecret,
      })
    );
  };

  useEffect(() => {
    const login = async () => {
      if (consumerKey && consumerSecret && token && tokenSecret) {
        const user = await getUserInfo({
          consumerKey,
          consumerSecret,
          token,
          tokenSecret,
        })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            const err = error as Error;
            console.log(err);
            return null;
          });

        if (!user || ("error" in user && user.error === true)) {
          console.log(user);
          // Parse the data object from error
          let msg = "An error occured";
          const err = user!.msg!.substring(user!.msg!.indexOf("~") + 1);
          if (err.startsWith('{"meta"')) {
            const obj = JSON.parse(err);
            if ("meta" in obj && "msg" in obj.meta) {
              msg += `: ${obj.meta.msg}`;
            }
          }
          toast.error(msg);
          return;
        }

        setUserInfo(user as unknown as TumblrUserInfo);
      }
    };

    login();
  }, [consumerKey, consumerSecret, token, tokenSecret, setUserInfo]);

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      {userInfo !== null && (
        <>
          <div>
            <Button onClick={handleGetInfo}>Get User Info</Button>
            <Button onClick={handleGetLimits}>Get User Limits</Button>
          </div>
        </>
      )}
    </div>
  );
}
