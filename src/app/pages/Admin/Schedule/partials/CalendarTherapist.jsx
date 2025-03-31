// pages/Admin/Schedule/partials/CalendarTherapist.jsx
// this page is for therapist role to see only
// it helps therapist to view the calendar and specific info like slot we assign to work in, bookings

import { Calendar, Tag } from 'antd';
import React from 'react';
import StatusColor from '../../../../components/StatusColor';

export default function CalendarTherapist({ slots }) {
  // Extract all working dates with at least one slot
  const slotDatesSet = new Set(slots.map(slot => slot.workingDate));

  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const dateStr = current.format('YYYY-MM-DD');
      const hasSlot = slotDatesSet.has(dateStr);

      return (
        <div
          className={`relative rounded-sm transition-all duration-200 ${
            hasSlot ? 'bg-lime-100 border border-lime-400' : ''
          }`}
        >
          {info.originNode}
        </div>
      );
    }
    return info.originNode;
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Therapist Working Schedule</h2>
      <Calendar cellRender={cellRender} fullscreen />
    </div>
  );
}
