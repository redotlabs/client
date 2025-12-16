import { useParams } from 'react-router-dom';
import {
  CustomerForm,
  CustomerDetailHeader,
  CustomerAppListSection,
} from './_sections';
import { useCustomer } from '@/shared/api/queries/customer';
import Loading from '@/pages/loading';
import NotFound from '@/pages/not-found';
import z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
});

const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: customer, isFetching } = useCustomer(id ? +id : null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer?.name,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        name: customer.name,
      });
    }
  }, [customer]);

  return (
    <main className="p-10 container mx-auto flex-1 min-h-0 flex flex-col overflow-y-auto">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <CustomerDetailHeader customer={customer} />

          {(() => {
            if (isFetching) return <Loading layout="section" />;
            if (!customer) return <NotFound layout="section" />;
            return (
              <>
                <CustomerForm customer={customer} />
                <hr className="my-10 border-gray-200 bg-gray-200" />
                <CustomerAppListSection customerId={customer?.id} />
              </>
            );
          })()}
        </form>
      </FormProvider>
    </main>
  );
};

export default CustomerDetailPage;
