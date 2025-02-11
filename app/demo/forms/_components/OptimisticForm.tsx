'use client';

import React, { useOptimistic } from 'react';
import Button from '@/components/Button';
import type { JokeSchemaType } from '@/validations/jokeSchema';
import JokesList from '../../_components/JokesList';
import { createJokeOptimistic } from '../_actions/createJokeOptimistic';
import type { Joke } from '@prisma/client';

export default function OptimisticForm({ jokes }: { jokes: Joke[] }) {
  const [optimisticJokes, addOptimisticJoke] = useOptimistic(
    jokes,
    (state: JokeSchemaType[], newJoke: JokeSchemaType) => {
      return [...state, newJoke];
    },
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    const newJoke: JokeSchemaType = {
      content: formData.get('content')?.valueOf() as string,
      createdAt: new Date(),
      name: formData.get('name')?.valueOf() as string,
    };
    addOptimisticJoke(newJoke);
    formRef.current?.reset();
    await createJokeOptimistic(newJoke);
  };

  return (
    <>
      <form ref={formRef} autoComplete="off" action={action}>
        <label>
          Name:
          <input name="name" type="text" />
        </label>
        <label>
          Content:
          <textarea name="content" />
        </label>
        <div className="flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </form>
      <JokesList jokes={optimisticJokes} />
    </>
  );
}
