'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './pet-form';
import { useState } from 'react';
import { flushSync } from 'react-dom';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout';
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function PetButton({
  actionType,
  children,
  disabled,
  onClick,
}: PetButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (actionType === 'checkout') {
    return (
      <Button
        variant='secondary'
        disabled={disabled}
        onClick={onClick}
        className='bg-black/90 text-white/90'
      >
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size={'icon'}>
            <PlusIcon className='h-6 w-6' />
          </Button>
        ) : (
          <Button variant={'secondary'}>{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new Pet' : 'Edit Pet'}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsDialogOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
