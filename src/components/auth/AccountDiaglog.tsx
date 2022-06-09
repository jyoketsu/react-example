import Dialog from "@mui/material/Dialog";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webview from "../common/Webview";

export default function AccountDiaglog(props: {
  open: boolean;
  handleClose: () => void;
}) {
  const navigate = useNavigate();
  const { open, handleClose } = props;
  const redirect = "/login";
  const logo = "https://notes.qingtime.cn/icons/logo2.svg";
  const APP = import.meta.env.VITE_APP;
  const APP_HIGH = import.meta.env.VITE_APP_HIGH;
  const url = `https://account.qingtime.cn?app=${APP}&apphigh=${APP_HIGH}&logo=${logo}&redirect=${redirect}&t=${new Date().getTime()}`;

  useEffect(() => {
    function handle(e: any) {
      if (e.data.eventName === "redirect") {
        navigate(e.data.data);
      }
    }
    window.addEventListener("message", handle, false);
    return () => {
      window.removeEventListener("message", handle);
    };
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Webview uri={url} style={{ width: "360px", height: "680px" }} />
    </Dialog>
  );
}
