import React from 'react';
import Link from 'next/link';

const AnonymousMenu = () => {
  return (
    <div>
      <Link href="/authorization">
        <button className="auth-button">Login</button>
      </Link>
      <Link href="/register">
        <button className="auth-button">Sign up</button>
      </Link>
    </div>
  );
};

export default AnonymousMenu;
