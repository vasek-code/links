export const reloadIframe = () => {
  (
    document?.getElementById("iframe-ref") as HTMLIFrameElement
  ).contentWindow?.location.reload();
};
