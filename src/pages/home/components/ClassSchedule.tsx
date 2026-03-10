export default function ClassSchedule() {
  const schedule = [
    { time: '08:00 - 10:00', monday: null, tuesday: { class: 'Yin Yoga', instructor: 'Victoria Nyberg' }, wednesday: null, thursday: null, friday: null, saturday: { class: 'Power Yoga', instructor: 'Charlotta Isaksson' }, sunday: { class: 'Power Yoga', instructor: 'Charlotta Isaksson' } },
    { time: '10:00 - 12:00', monday: { class: 'Hatha Yoga', instructor: 'Caroline Berggren' }, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: { class: 'Hatha Yoga', instructor: 'Caroline Berggren' } },
    { time: '12:00 - 14:00', monday: null, tuesday: { class: 'Yin Yoga', instructor: 'Victoria Nyberg' }, wednesday: null, thursday: null, friday: null, saturday: null, sunday: { class: 'Yin Yoga', instructor: 'Victoria Nyberg' } },
    { time: '14:00 - 16:00', monday: null, tuesday: null, wednesday: { class: 'Barre Fusion', instructor: 'Eva Samuelsson' }, thursday: null, friday: { class: 'Barre Fusion', instructor: 'Eva Samuelsson' }, saturday: null, sunday: { class: 'Barre Fusion', instructor: 'Eva Samuelsson' } },
    { time: '16:00 - 18:00', monday: { class: 'Hatha Yoga', instructor: 'Caroline Berggren' }, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: { class: 'Hatha Yoga', instructor: 'Caroline Berggren' } },
    { time: '18:00 - 20:00', monday: null, tuesday: null, wednesday: null, thursday: { class: 'Barre Fusion', instructor: 'Eva Samuelsson' }, friday: null, saturday: null, sunday: { class: 'Barre Fusion', instructor: 'Eva Samuelsson' } }
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <section id="schedule" className="py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h4 className="text-sm font-semibold text-teal-500 mb-3">Discover More</h4>
            <h2 className="text-4xl font-bold tracking-tight">Classes</h2>
          </div>
          <p className="text-gray-600 lg:max-w-md">
            From beginner to advanced, find the perfect fit for your journey.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold text-sm text-gray-900">Time</th>
                {dayLabels.map((day) => (
                  <th key={day} className="text-left p-4 font-semibold text-sm text-gray-900">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-700">{row.time}</td>
                  {days.map((day) => {
                    const classInfo = row[day as keyof typeof row] as { class: string; instructor: string } | null;
                    return (
                      <td key={day} className="p-4">
                        {classInfo ? (
                          <div className="bg-teal-50 rounded-lg p-3 hover:bg-teal-100 transition-colors cursor-pointer">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{classInfo.class}</h4>
                            <p className="text-xs text-gray-600">{classInfo.instructor}</p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-300 text-xs">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}