import { useForm, FormProvider } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RHFInput, { type RHFInputProps } from '../rhf-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import userEvent from '@testing-library/user-event';

const TestInput = (props: Omit<RHFInputProps, 'name'>) => {
  const schema = z.object({
    test: z.string().min(1, 'test-error-message'),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      test: '',
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <RHFInput name="test" {...props} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('RHFInput', () => {
  it('should render with label', () => {
    render(<TestInput label="text-label" />);

    expect(screen.getByLabelText('text-label')).toBeDefined();
  });

  it('should render with error', async () => {
    render(<TestInput />);

    const submitButton = screen.getByText('Submit');

    await userEvent.click(submitButton);

    expect(screen.getByText('test-error-message')).toBeDefined();
  });
});
