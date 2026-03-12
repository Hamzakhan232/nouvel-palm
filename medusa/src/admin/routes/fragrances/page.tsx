import * as React from 'react';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import {
  PencilSquare,
  EllipsisHorizontal,
  Trash,
  Swatch,
} from '@medusajs/icons';
import {
  Container,
  Heading,
  Table,
  Button,
  IconButton,
  Text,
  Drawer,
  DropdownMenu,
  Prompt,
} from '@medusajs/ui';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { useCreateFragranceMutation, useDeleteFragranceMutation, useUpdateFragranceMutation } from '../../hooks/fragrances';
import { Form } from '../../components/Form/Form';
import { InputField } from '../../components/Form/InputField';
import { withQueryClient } from '../../components/QueryClientProvider';

const fragranceFormSchema = z.object({
  name: z.string().min(1),
  gender: z.string().min(1),
  top_notes: z.string().min(1),
  heart_notes: z.string().min(1),
  base_notes: z.string().min(1),
  background_color: z.string().min(1),
  order: z.preprocess((val) => Number(val), z.number()),
});

const DeleteFragrancePrompt: React.FC<{
  id: string;
  name: string;
  children: React.ReactNode;
}> = ({ id, name, children }) => {
  const deleteFragranceMutation = useDeleteFragranceMutation(id);
  const [isPromptOpen, setIsPromptOpen] = React.useState(false);

  return (
    <Prompt open={isPromptOpen} onOpenChange={setIsPromptOpen}>
      <Prompt.Trigger asChild>{children}</Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete {name}?</Prompt.Title>
          <Prompt.Description>
            Are you sure you want to delete the fragrance {name}?
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action
            onClick={() => {
              deleteFragranceMutation.mutate();
            }}
          >
            Delete
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const FragrancesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [editingFragrance, setEditingFragrance] = React.useState<any>(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['fragrances'],
    queryFn: async () => {
      return fetch(`/admin/fragrances`, {
        credentials: 'include',
      }).then((res) => res.json());
    },
  });

  const createFragranceMutation = useCreateFragranceMutation();
  const updateFragranceMutation = useUpdateFragranceMutation(editingFragrance?.id);

  return (
    <Container className="px-0">
      <div className="px-6 flex flex-row gap-6 justify-between items-center mb-4">
        <Heading level="h2">Fragrances</Heading>
        <Drawer open={isCreateModalOpen || !!editingFragrance} onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setEditingFragrance(null);
          }
        }}>
          <Drawer.Trigger asChild>
            <Button variant="secondary" size="small" onClick={() => setIsCreateModalOpen(true)}>
              Create
            </Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{editingFragrance ? 'Edit' : 'Create'} Fragrance</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Form
                schema={fragranceFormSchema}
                onSubmit={async (values) => {
                  if (editingFragrance) {
                    await updateFragranceMutation.mutateAsync(values);
                  } else {
                    await createFragranceMutation.mutateAsync(values);
                  }
                  setIsCreateModalOpen(false);
                  setEditingFragrance(null);
                }}
                formProps={{
                  id: 'fragrance-form',
                }}
                defaultValues={editingFragrance || {
                  name: '',
                  gender: '',
                  top_notes: '',
                  heart_notes: '',
                  base_notes: '',
                  background_color: '#FDF2F0',
                  order: 0,
                }}
              >
                <InputField name="name" label="Name" inputProps={{ placeholder: "e.g. Elise" }} />
                <InputField name="gender" label="Gender" inputProps={{ placeholder: "e.g. Female" }} />
                <InputField name="top_notes" label="Top Notes" inputProps={{ placeholder: "e.g. Grapefruit, Quince" }} />
                <InputField name="heart_notes" label="Heart Notes" inputProps={{ placeholder: "e.g. Jasmine, Hyacinth" }} />
                <InputField name="base_notes" label="Base Notes" inputProps={{ placeholder: "e.g. White Musk, Iris, Amber" }} />
                <InputField name="background_color" label="Background Color (Hex)" inputProps={{ placeholder: "#FDF2F0" }} />
                <InputField name="order" label="Sort Order" type="number" />
              </Form>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Drawer.Close>
              <Button
                type="submit"
                form="fragrance-form"
                isLoading={createFragranceMutation.isPending || updateFragranceMutation.isPending}
              >
                {editingFragrance ? 'Save' : 'Create'}
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Order</Table.HeaderCell>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={4}>
                <Text>Loading...</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isSuccess && data.fragrances.map((fragrance: any) => (
            <Table.Row key={fragrance.id}>
              <Table.Cell>{fragrance.name}</Table.Cell>
              <Table.Cell>{fragrance.gender}</Table.Cell>
              <Table.Cell>{fragrance.order}</Table.Cell>
              <Table.Cell className="text-right">
                <DropdownMenu>
                  <DropdownMenu.Trigger asChild>
                    <IconButton>
                      <EllipsisHorizontal />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={() => setEditingFragrance(fragrance)} className="flex gap-2">
                      <PencilSquare className="h-4 w-4" /> Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DeleteFragrancePrompt id={fragrance.id} name={fragrance.name}>
                      <DropdownMenu.Item className="flex gap-2">
                        <Trash className="h-4 w-4 text-red-500" /> Delete
                      </DropdownMenu.Item>
                    </DeleteFragrancePrompt>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default withQueryClient(FragrancesPage);

export const config = defineRouteConfig({
  label: 'Fragrances',
  icon: Swatch,
});
