"use server";

import { OAuth } from "oauth";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

function makeRequest<T>(
  path: string,
  credentials: TumblrCredentials
): Promise<T | Error> {
  const creds = {
    auth: "oauth1",
    consumer_key: credentials.consumerKey,
    consumer_secret: credentials.consumerSecret,
    token: credentials.token,
    token_secret: credentials.tokenSecret,
  };
  const oauth = new OAuth(
    "",
    "",
    creds.consumer_key,
    creds.consumer_secret,
    "1.0",
    null,
    "HMAC-SHA1",
    32,
    {
      "user-agent": USER_AGENT,
    }
  );

  return new Promise((resolve, reject) => {
    oauth.get(
      path,
      creds.token,
      creds.token_secret,
      async (error, data, response) => {
        if (error) {
          console.log(error);
          const err = new Error(`An error occured~${error.data}`);
          reject(err);
        }

        const parsedData = JSON.parse(data as string);
        resolve(parsedData);
      }
    );
  });
}

export async function getUserInfo(credentials: TumblrCredentials) {
  try {
    const req = (await makeRequest<
      TumblrBaseResponse<UserWrappedT<TumblrUserInfo>>
    >(
      "https://api.tumblr.com/v2/user/info",
      credentials
    )) as TumblrBaseResponse<UserWrappedT<TumblrUserInfo>>;
    return req.response.user;
  } catch (error) {
    const err = error as Error;
    return { error: true, msg: err.message };
  }
}

export async function getUserLimits(credentials: TumblrCredentials) {
  try {
    const req = (await makeRequest<
      TumblrBaseResponse<UserWrappedT<TumblrUserLimits>>
    >(
      "https://api.tumblr.com/v2/user/limits",
      credentials
    )) as TumblrBaseResponse<UserWrappedT<TumblrUserLimits>>;
    return req.response.user;
  } catch (error) {
    const err = error as Error;
    return { error: true, msg: err.message };
  }
}

export type TumblrBaseResponse<T> = {
  meta: {
    msg: string;
    status: number;
  };
  response: T;
};

type UserWrappedT<T> = { user: T };

export type TumblrUserInfo = {
  blogs: TumblrUserBlog[];
  default_post_format: "html" | "markdown" | "raw";
  following: number;
  likes: number;
  name: string;
};

export type TumblrUserBlog = {
  avatar: [
    {
      width: 512;
      height: 512;
      url: string;
      accessories: [];
    },
    {
      width: 128;
      height: 128;
      url: string;
      accessories: [];
    },
    {
      width: 96;
      height: 96;
      url: string;
      accessories: [];
    },
    {
      width: 64;
      height: 64;
      url: string;
      accessories: [];
    }
  ];
  name: string;
  title: string;
};

export type TumblrUserLimits = {
  blogs: {
    description: "the number of secondary blogs you can create per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  follows: {
    description: "the number of blogs you can follow per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  likes: {
    description: "the number of posts you can like per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  photos: {
    description: "the number of photos you can upload per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  posts: {
    description: "the number of posts you can create per day, not including those in communities";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  community_posts: {
    description: "the number of posts in communities you can create per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  video_seconds: {
    description: "the number of seconds of video content you can upload per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
  videos: {
    description: "the number of video files you can upload per day";
    limit: number;
    remaining: number;
    reset_at: number;
  };
};

export type TumblrCredentials = {
  consumerKey: string;
  consumerSecret: string;
  token: string;
  tokenSecret: string;
};
