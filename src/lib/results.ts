import { promises as fs } from 'fs';

export type Result = {
  bibNumber: string;
  time: Date;
  rank: string;
  name: string;
  gender: {
    position: number;
    category: string;
  };
  category: {
    position: number;
    name: string;
  };
  countryCode: string;
};

export async function getResults(
  city: string,
  year: string,
  race: string
): Promise<Result[]> {
  const file = await fs.readFile(
    `${process.cwd()}/data/${city}/${year}/${race}/results.json`,
    'utf8'
  );
  return JSON.parse(file, (key, value) => {
    if (key === 'time') {
      const [hours, minutes, seconds] = value.split(':');
      const time = new Date();
      time.setHours(Number(hours));
      time.setMinutes(Number(minutes));
      time.setSeconds(Number(seconds));
      return time;
    }
    return value;
  });
}
