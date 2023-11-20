const forecast = [1, 2, 3];

export default function Loading() {
  return (
    <main className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16 ">
      <div className="dark:bg-zinc-900 bg-gray-100 rounded-lg p-6 flex-1">
        <div className="p-2 mb-4  w-full text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-500 h-10 animate-pulse" />

        <h2 className="text-2xl font-semibold mb-4">Today's Weather</h2>

        <div className="flex items-start gap-4">
          <h3 className="text-xl font-medium bg-slate-500 animate-pulse h-24 w-24 rounded" />
          <p className="text-sm w-16 h-10 animate-pulse bg-slate-500 mt-auto mb-auto rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h4 className="text-lg font-medium">Temperature</h4>
            <p className="text-2xl h-8 w-8 rounded bg-slate-500 animate-pulse" />
            <p className="text-2xl h-8 w-8 rounded bg-slate-500 animate-pulse mt-1" />
          </div>
          <div>
            <h4 className="text-lg font-medium">Humidity</h4>

            <p className="text-2xl bg-slate-500 w-8 h-8 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="dark:bg-zinc-900 bg-gray-100 rounded-lg p-6 flex-1">
        <h2 className="text-2xl font-semibold mb-4">Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecast.map((item: number, index: number) => (
            <div className="flex items-center gap-4" key={index}>
              <div className=" w-12 h-12" />

              <div>
                <>
                  <h3 className="text-lg font-medium w-20 h-20 rounded animate-pulse bg-slate-500" />
                  <p className="text-sm h-8 w-12 bg-slate-500 animate-pulse rounded mt-2" />
                  <p className="text-sm h-8 w-12 bg-slate-500 animate-pulse rounded mt-2" />
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
