import { useSelector } from "react-redux";

export const useUser = () => useSelector(({ user }) => user);
export const useWaiter = () => useSelector(({ waiter }) => waiter);
export const useLoader = () => useSelector(({ loader }) => loader);
export const useRoom = () => useSelector(({ rooms }) => rooms);
export const useProduct = () => useSelector(({product})=>product)
