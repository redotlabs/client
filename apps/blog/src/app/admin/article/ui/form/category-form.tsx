'use client';

import { useCategories } from '@/shared/api/queries/category';
import { RHFRadio } from '@repo/ui';
import { Controller, useFormContext } from 'react-hook-form';

const CategoryForm = () => {
  const { control } = useFormContext();
  const { data: categories } = useCategories();

  return (
    <section>
      <h2 className="text-lg font-semibold">카테고리</h2>

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <div className="p-4 flex items-center gap-4">
            {categories?.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <RHFRadio
                  size="md"
                  name={field.name}
                  value={category.id}
                  id={category.id.toString()}
                  checked={field.value === category.id}
                  onChange={(e) => field.onChange(+e.target.value)}
                  onBlur={field.onBlur}
                  label={category.name}
                />
              </div>
            ))}
          </div>
        )}
      />
    </section>
  );
};

export default CategoryForm;
