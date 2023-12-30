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
  const average = Intl.DateTimeFormat(undefined, {
    timeStyle: 'medium',
    hour12: false,
  }).format(new Date(times.reduce((a, b) => a + b, 0) / times.length));

  return (
    <div>
      <Card>
        <h1>Average</h1>
        <div>{average}</div>
      </Card>
      <section className="container mx-auto py-10">
        <DataTable columns={columns} data={results} />
      </section>
    </div>
  );
}
