import React from "react";

export type ActivityType = {
  price: () => JSX.Element;
  type: () => JSX.Element;
  from: () => JSX.Element | string;
  to: () => JSX.Element | string;
  status: () => JSX.Element | string;
};

type ColumnWidths = {
  price?: string;
  type?: string;
  from?: string;
  to?: string;
  status?: string;
};

type ActivityTableProps = {
  activity: ActivityType[];
  columnWidths?: ColumnWidths; // 这里添加新的props来设定宽度
};

export default function ActivityTable({
  activity,
  columnWidths,
}: ActivityTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-[#2C2D31]">
        <tr>
          {/* 设置th的style来响应props中传入的width */}
          <th
            className="px-4 py-2.5 text-start"
            style={{ width: columnWidths?.price }}
          >
            Price
          </th>
          <th
            className="px-4 py-2.5 text-start"
            style={{ width: columnWidths?.type }}
          >
            Type
          </th>
          <th
            className="px-4 py-2.5 text-start"
            style={{ width: columnWidths?.from }}
          >
            From
          </th>
          <th
            className="px-4 py-2.5 text-start"
            style={{ width: columnWidths?.to }}
          >
            To
          </th>
          <th
            className="px-4 py-2.5 text-start"
            style={{ width: columnWidths?.status }}
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {activity.map((item, index) => (
          <tr key={index} className="border-b-[#52525B] border-b">
            <td className={`px-4 py-6`}>{item.price()}</td>
            <td>{item.type()}</td>
            <td>{item.from()}</td>
            <td>{item.to()}</td>
            <td>{item.status()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
