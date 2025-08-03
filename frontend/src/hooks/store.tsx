import { useContext } from "react";
import { StoreContext } from "../providers/store-provider";

export  default function useStore()  {
    return useContext(StoreContext)
}