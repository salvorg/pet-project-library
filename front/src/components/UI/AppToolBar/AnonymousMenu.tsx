import React from 'react';
import Link from 'next/link';

const AnonymousMenu = () => {
  return (
    <div>
      <Link href="/authorization">
        <button>Login</button>
      </Link>
      <Link href="/register">
        <button>Sign up</button>
      </Link>
    </div>
  );
};

export default AnonymousMenu;
