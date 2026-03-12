import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useCreateFragranceMutation = (
  options:
    | Omit<
        UseMutationOptions<
          any,
          Error,
          any,
          unknown
        >,
        'mutationKey' | 'mutationFn'
      >
    | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fragrances', 'create'],
    mutationFn: async (values: any) => {
      return fetch('/admin/fragrances', {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fragrances',
      });

      if (options?.onSuccess) {
        return options.onSuccess(...args);
      }
    },
  });
};

export const useUpdateFragranceMutation = (
  id: string,
  options:
    | Omit<
        UseMutationOptions<
          any,
          Error,
          any,
          unknown
        >,
        'mutationKey' | 'mutationFn'
      >
    | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fragrances', id, 'update'],
    mutationFn: async (values: any) => {
      return fetch(`/admin/fragrances/${id}`, {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fragrances',
      });

      if (options?.onSuccess) {
        return options.onSuccess(...args);
      }
    },
  });
};

export const useDeleteFragranceMutation = (
  id: string,
  options:
    | Omit<
        UseMutationOptions<
          any,
          Error,
          void,
          unknown
        >,
        'mutationKey' | 'mutationFn'
      >
    | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fragrances', id, 'delete'],
    mutationFn: async () => {
      return fetch(`/admin/fragrances/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      }).then((res) => res.json());
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fragrances',
      });

      if (options?.onSuccess) {
        return options.onSuccess(...args);
      }
    },
  });
};
