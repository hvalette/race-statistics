import { Card } from '@/components/ui/card';
import { getResults } from '../../../../lib/results';
import { DataTable } from './data-table';
import { columns } from './columns';
import Link from 'next/link';
import { formatTimeInSeconds } from '@/lib/utils';

export default async function Results({
  params,
}: {
  params: { year: string; race: string };
}) {
  const results = await getResults('lille', params.year, params.race);
  const times = results.map((res) => res.time);
  const averageTime = Math.trunc(
    times.reduce((a, b) => a + b, 0) / times.length
  );
  const average = formatTimeInSeconds(averageTime);

  const distance = 21.1;
  const pace = averageTime / 60 / distance;
  const paceMinutes = Math.trunc(pace);
  const paceSeconds = Math.trunc((pace - paceMinutes) * 60).toLocaleString(
    undefined,
    {
      minimumIntegerDigits: 2,
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold capitalize">
        {params.race} Lille {params.year}
      </h1>

      <section
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
        }}
      >
        <Card className=" h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Participants</span>
          <div className="text-2xl font-bold">{results.length}</div>
        </Card>
        <Card className=" h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Temps moyen</span>
          <div className="text-2xl font-bold">{average}</div>
        </Card>
        <Card className=" h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <span>Allure moyenne</span>
          <div className="text-2xl font-bold">
            {paceMinutes}.{paceSeconds} min/km
          </div>
        </Card>
        <Card className=" h-40 py-4 px-8 flex flex-col justify-center items-center gap-2">
          <Link href={`/results/${params.year}/${params.race}/statistics`}>
            <span>Plus de statistics</span>
          </Link>
        </Card>
      </section>
      <section>
        <DataTable columns={columns} data={results} />
      </section>
    </div>
  );
}
