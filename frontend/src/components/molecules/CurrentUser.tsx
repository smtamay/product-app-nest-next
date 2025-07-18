'use client';
import React, { FC, PropsWithChildren, use, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@/api/frontendApi";
import { setUserId } from "@/redux/userSlice";

const CurrentUser: FC <PropsWithChildren> = ({children}) => {
  const { data: user, isLoading } = useGetCurrentUserQuery(undefined);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    if (user) {
        dispatch(setUserId(user.id));
    }
  }, [user]);
  return <>{children}</>;
};

export default CurrentUser;
