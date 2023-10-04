import React from 'react';
import JokesList from './JokesList';
import NavButton from './NavButton';
import RandomJokeButton from './RandomJokeButton';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-y-5">
      <RandomJokeButton />
      <p>Here are a few more jokes to check out:</p>
      <JokesList />
      <NavButton href="/jokes/new">Add your own</NavButton>
    </div>
  );
}
