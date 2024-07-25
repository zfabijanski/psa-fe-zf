/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import PruTable, {
  SpanGreen,
  SpanRed,
} from "../../../../components/UI/PruTable/PruTable";
import { IColumn } from "../../../../components/UI/PruTable/types";
import { formatDuration } from "../../../../utils/formatters";
import { IMeeting } from "../types";

const Container = styled.div`
  max-width: 100%;
  margin: auto;
  padding: 48px;
`;

const NoMeetings = styled.div`
  color: ${({ theme }) => theme.newColors.gray60};
  font-size: 40px;
  line-height: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface IProps {
  getMeetings: () => void;
  data: IMeeting[];
  onRowDelete: (row: IMeeting) => void;
  onRowSelect: (row: IMeeting) => void;
}

const HistoryTable = (props: IProps) => {
  const intl = useIntl();

  useEffect(() => {
    props.getMeetings();
  }, []);

  const dateFormat = "DD.MM.YYYY";
  const columns: Array<IColumn<IMeeting>> = [
    {
      field: "name",
      width: "25%",
      render: (record) =>
        record.age
          ? `${record.name}, ${formatDuration(record.age, "y")}`
          : `${record.name}`,
      sorter: (a, b) => a.name.localeCompare(b.name),
      title: intl.formatMessage({ id: "meetingHistory.table.meetingWith" }),
    },
    {
      field: "statusDescription",
      width: "31%",
      sorter: (a, b) => a.statusDescription.localeCompare(b.statusDescription),
      title: intl.formatMessage({ id: "meetingHistory.table.meetingStatus" }),
    },
    {
      field: "createDate",
      width: "14%",
      render: (record) => `${moment(record.createDate).format(dateFormat)}`,
      sorter: (a, b) => b.createDate.getTime() - a.createDate.getTime(),
      title: intl.formatMessage({ id: "meetingHistory.table.meetingDate" }),
    },
    {
      field: "lastAccessDate",
      width: "18%",
      render: (record) => `${moment(record.lastAccessDate).format(dateFormat)}`,
      sorter: (a, b) =>
        b.lastAccessDate.getTime?.() - a.lastAccessDate.getTime?.(),
      title: intl.formatMessage({ id: "meetingHistory.table.lastOpenedDate" }),
    },
    {
      field: "state",
      width: "180px",
      render: (record) => {
        if (record.state === "Aktualne") {
          return <SpanGreen>{record.state}</SpanGreen>; // TODO: zmienić na słownik
        } else {
          return <SpanRed>{record.state}</SpanRed>; // TODO: zmienić na słownik
        }
      },
      sorter: (a, b) => a.state.localeCompare(b.state),
      title: intl.formatMessage({ id: "meetingHistory.table.status" }),
    },
  ];

  return (
    <Container>
      {props.data.length ? (
        <PruTable<IMeeting>
          primaryKey={"meetingNo"}
          columns={columns}
          data={props.data}
          defaultSorting={{ field: "lastAccessDate", order: "descend" }}
          onRowSelect={props.onRowSelect}
          onRowDelete={props.onRowDelete}
        />
      ) : (
        <NoMeetings>
          <FormattedMessage id={"meetingHistory.noMeetings"} />
        </NoMeetings>
      )}
    </Container>
  );
};

export default HistoryTable;
