'use client';

import { useCategories } from '@/shared/api/queries/category';
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
              <div
                key={category.id}
                className="flex items-center gap-2 font-medium"
              >
                <input
                  name={field.name}
                  type="radio"
                  value={category.id}
                  id={category.id.toString()}
                  checked={field.value === category.id}
                  onChange={(e) => field.onChange(+e.target.value)}
                  onBlur={field.onBlur}
                />
                <label htmlFor={category.id.toString()}>{category.name}</label>
              </div>
            ))}
          </div>
        )}
      />
    </section>
  );
};

export default CategoryForm;
