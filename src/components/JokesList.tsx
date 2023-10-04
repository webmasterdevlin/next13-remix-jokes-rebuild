import Link from 'next/link';
import React from 'react';
import { prisma } from '@/db';

export default async function JokesList() {
  const jokes = await prisma.joke.findMany();

  return (
    <ul>
      {jokes.map(({ id, name }) => {
        return (
          <li key={id}>
            <Link href={`/jokes/${id}`}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
