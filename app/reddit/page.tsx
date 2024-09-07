"use client";

import { useEffect } from "react";
import { useTumblrStore } from "@/lib/providers/tumblr-provider";

export default function RedditPage() {
  const tumblrStore = useTumblrStore((state) => state);

  useEffect(() => {
    if (
      tumblrStore.consumerKey &&
      tumblrStore.consumerSecret &&
      tumblrStore.token &&
      tumblrStore.tokenSecret
    ) {
      console.log(tumblrStore.consumerKey);
      console.log(tumblrStore.consumerSecret);
      console.log(tumblrStore.token);
      console.log(tumblrStore.tokenSecret);
    }
  }, [tumblrStore]);

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <p>hello</p>
    </div>
  );
}
