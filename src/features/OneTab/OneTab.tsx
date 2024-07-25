/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageDescriptor } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import ErrorMessage from "../../components/UI/ErrorMessage";

const channelName = "OneTab";
const responseTimeout = 100;

enum OTStatus {
  Starting = "Starting",
  FirstTab = "FirstTab",
  SecondTab = "SecondTab",
}

const msgOneTabOnly: MessageDescriptor = {
  id: "login.error.oneTabOnly",
};

const tabUuid = uuidv4();

const OneTab: React.FC<PropsWithChildren<{}>> = (props) => {
  const [status, setStatus] = useState<OTStatus>(OTStatus.Starting);

  const statusRef = useRef<OTStatus>(status);
  statusRef.current = status;

  const postMessage = (message: string) => {
    if (message) {
      const msg = JSON.stringify({
        message,
        tabUuid,
      });
      window.localStorage.setItem(channelName, msg);
      window.localStorage.removeItem(channelName);
    }
  };

  const isResponseFromOtherTab = (e: StorageEvent) =>
    e.newValue !== null && JSON.parse(e.newValue).tabUuid !== tabUuid;

  const handleOtherTabResponse = useCallback(
    (e: StorageEvent) => {
      if (e.key === channelName && isResponseFromOtherTab(e)) {
        if (statusRef.current === OTStatus.Starting) {
          setStatus(OTStatus.SecondTab);
        }
        if (statusRef.current === OTStatus.FirstTab) {
          postMessage("YES");
        }
      }
    },
    [status, statusRef]
  );

  const handleWaitingForResponseTimeout = useCallback(() => {
    if (statusRef.current === OTStatus.Starting) {
      setStatus(OTStatus.FirstTab);
    }
  }, [status, statusRef]);

  useEffect(() => {
    window.addEventListener("storage", handleOtherTabResponse);
    postMessage("AYT?");
    const timer = setTimeout(handleWaitingForResponseTimeout, responseTimeout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleOtherTabResponse);
    };
  }, []);

  return (
    <>
      {status === OTStatus.FirstTab && props.children}
      {status === OTStatus.SecondTab && (
        <ErrorMessage message={msgOneTabOnly} />
      )}
    </>
  );
};

export default OneTab;
