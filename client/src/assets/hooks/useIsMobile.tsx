import { useWindowSize } from "./useWindowSize";

export const useIsMobile = () => {
    const { width: windowWidth } = useWindowSize();
    const isBrowserMobile = !!windowWidth && windowWidth < 640;
    return isBrowserMobile;
};