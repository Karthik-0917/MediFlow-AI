function TopSpecialties({ patients }) {
 const specialtyCounts = {};

patients.forEach((patient) => {
  const specialty = patient.recommendedSpecialty;

  if (
    specialty &&
    specialty !== "Not Assigned"
  ) {
    specialtyCounts[specialty] =
      (specialtyCounts[specialty] || 0) + 1;
  }
});

const totalSpecialties = Object.values(
  specialtyCounts
).reduce((sum, count) => sum + count, 0);

const specialties = Object.entries(
  specialtyCounts
).map(([name, count]) => ({
  name,
  percentage:
    totalSpecialties > 0
      ? Math.round((count / totalSpecialties) * 100)
      : 0,
}));

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Top Medical Specialties
      </h2>

      <div className="flex justify-center mb-8">

        <div className="relative w-44 h-44">

          <div className="absolute inset-0 rounded-full border-[20px] border-cyan-400"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <p className="text-4xl font-bold text-slate-800">
  {specialties.length}
</p>

            <p className="text-sm text-slate-500">
              Departments
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-5">

        {specialties.map((item) => (

          <div key={item.name}>

            <div className="flex justify-between mb-1">

              <span className="font-medium text-slate-700">
                {item.name}
              </span>

              <span className="text-slate-600 font-semibold">
                {item.percentage}%
              </span>

            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full">

              <div
                className="h-2 bg-cyan-500 rounded-full"
                style={{
                  width: `${item.percentage}%`,
                }}
              ></div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopSpecialties;