'use client';
import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const ProviderRedux: FC <PropsWithChildren> = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderRedux;
