import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import PageLayout from "../../../layouts/PageLayout";
import HistoryTable from "./HistoryTable";
import { redirect } from "utils/router";

interface IProps {
  getMeetingsCounts: () => void;
  meetingsCount?: number;
  maxMeetingsCount?: number;
}

const History: React.FC<IProps> = (props: IProps) => {
  const intl = useIntl();

  useEffect(() => {
    props.getMeetingsCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPageName = () => {
    return intl.formatMessage(
      { id: "meetingHistory.label.meetingHistory" },
      {
        meetingsCount: props.meetingsCount,
        maxMeetingsCount: props.maxMeetingsCount,
      }
    );
  };

  return (
    <PageLayout
      pageName={getPageName()}
      footer={{
        leftSection: [
          {
            config: "prevButtonConfig",
            onClick: () => redirect("/"),
          },
        ],
      }}
    >
      <HistoryTable />
    </PageLayout>
  );
};

export default History;
