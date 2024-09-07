"use client";

import { useTumblrStore } from "@/lib/providers/tumblr-provider";
import { useState, useEffect, type FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export default function AvatarSignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [localConsumerKey, setLocalConsumerKey] = useState("");
  const [localConsumerSecret, setLocalConsumerSecret] = useState("");
  const [localToken, setLocalToken] = useState("");
  const [localTokenSecret, setLocalTokenSecret] = useState("");

  const {
    consumerKey,
    consumerSecret,
    token,
    tokenSecret,
    userInfo,
    setConsumerKey,
    setConsumerSecret,
    setToken,
    setTokenSecret,
    setUserInfo,
  } = useTumblrStore((state) => state);

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setConsumerKey(localConsumerKey);
    setConsumerSecret(localConsumerSecret);
    setToken(localToken);
    setTokenSecret(localTokenSecret);
    setIsOpen(false);
  };

  const handleSignout = () => {
    setConsumerKey("");
    setConsumerSecret("");
    setToken("");
    setTokenSecret("");
    setUserInfo(null);
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }
  }, [userInfo]);

  if (userInfo) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar style={{ cursor: "pointer" }}>
            <AvatarImage
              src={userInfo!.blogs[0].avatar[0].url}
              alt="User avatar"
            />
            <AvatarFallback>{userInfo!.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={(ev) => ev.preventDefault()}>
            {userInfo!.name}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignout}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSignIn}>
          <DialogHeader>
            <DialogTitle>Tumblr Sign In</DialogTitle>
            <DialogDescription>
              Enter your Tumblr API credentials to sign in.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="consumerKey" className="text-left">
                Consumer Key
              </Label>
              <Input
                id="consumerKey"
                value={localConsumerKey}
                onChange={(e) => setLocalConsumerKey(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="consumerSecret" className="text-left">
                Consumer Secret
              </Label>
              <Input
                id="consumerSecret"
                value={localConsumerSecret}
                onChange={(e) => setLocalConsumerSecret(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token" className="text-left">
                Token
              </Label>
              <Input
                id="token"
                value={localToken}
                onChange={(e) => setLocalToken(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tokenSecret" className="text-left">
                Token Secret
              </Label>
              <Input
                id="tokenSecret"
                value={localTokenSecret}
                onChange={(e) => setLocalTokenSecret(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Sign In</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
