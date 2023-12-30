import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Result } from '@/lib/results';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface DataTableCategoriesFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableCategoriesFilter<TData>({
  table,
}: DataTableCategoriesFilterProps<Result>) {
  const categoriesF = [
    'JUF',
    'ESF',
    'SEF',
    'M0F',
    'M1F',
    'M2F',
    'M3F',
    'M4F',
    'M5F',
    'M6F',
    'M7F',
    'M8F',
    'M9F',
    'M10F',
  ];
  const categoriesM = [
    'JUM',
    'ESM',
    'SEM',
    'M0M',
    'M1M',
    'M2M',
    'M3M',
    'M4M',
    'M5M',
    'M6M',
    'M7M',
    'M8M',
    'M9M',
    'M10M',
  ];

  const getIsChecked = (category: string) => {
    return !!(
      table.getColumn('category_name')?.getFilterValue() as string[]
    )?.includes(category);
  };

  const handleOnCheckedChange = (category: string, checked: boolean) => {
    const filterValue =
      (table.getColumn('category_name')?.getFilterValue() as string[]) ?? [];

    if (checked) {
      table
        .getColumn('category_name')
        ?.setFilterValue([...filterValue, category]);
    } else {
      table
        .getColumn('category_name')
        ?.setFilterValue(filterValue.filter((cat) => cat !== category));
    }
  };

  const filterValuesLength = (
    table.getColumn('category_name')?.getFilterValue() as string[]
  )?.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          Catégories
          {filterValuesLength && (
            <>
              <Separator orientation="vertical" />
              <Badge variant="secondary">{filterValuesLength}</Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-6 w-52">
        {[categoriesM, categoriesF].map((categories, index) => (
          <div key={index} className="flex flex-col gap-2 basis-full">
            {categories.map((category) => (
              <div
                key={`cat-${category}`}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={category}
                  checked={getIsChecked(category)}
                  onCheckedChange={(checked) =>
                    handleOnCheckedChange(category, !!checked)
                  }
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
