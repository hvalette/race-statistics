import { Card } from '@/components/ui/card';
import { getResults } from '../../../../lib/results';
import { DataTable } from './data-table';
import { columns } from './columns';

export default async function Dashboard({
  params,
}: {
  params: { year: string; race: string };
}) {
  const results = await getResults('lille', params.year, params.race);
  const times = results.map((res) => res.time.getTime());
  const averageTime = new Date(times.reduce((a, b) => a + b, 0) / times.length);
  const average = Intl.DateTimeFormat(undefined, {
    timeStyle: 'medium',
    hour12: false,
  }).format(averageTime);

  const distance = 21.1;
  const pace =
    (averageTime.getHours() * 60 +
      averageTime.getMinutes() +
      averageTime.getSeconds() / 60) /
    distance;
  const paceMinutes = Math.floor(pace);
  const paceSeconds = Math.floor((pace - paceMinutes) * 60);

  return (
    <div className="container mx-auto py-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold capitalize">
        {params.race} Lille {params.year}
      </h1>

      <section className="flex gap-4">
        <Card className="basis-1/4 h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Participants</span>
          <div className="text-2xl font-bold">{results.length}</div>
        </Card>
        <Card className="basis-1/4 h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Temps moyen</span>
          <div className="text-2xl font-bold">{average}</div>
        </Card>
        <Card className="basis-1/4 h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Allure moyenne</span>
          <div className="text-2xl font-bold">
            {paceMinutes}.{paceSeconds} min/km
          </div>
        </Card>
        <Card className="basis-1/4 h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Plus de statistics</span>
        </Card>
      </section>
      <section>
        <DataTable columns={columns} data={results} />
      </section>
    </div>
  );
}
