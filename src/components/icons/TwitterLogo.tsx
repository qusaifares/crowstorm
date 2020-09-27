import React from 'react';

interface Props {}

const TwitterLogo: React.FC<Props> = () => {
  return (
    <svg className='authLogo' viewBox='0 0 128 128'>
      <path
        fill='#47a3da'
        d='M40.58 115.3c47.64 0 73.69-39.47 73.69-73.69 0-1.12 0-2.24-.07-3.35a52.7 52.7 0 0012.92-13.41 51.7 51.7 0 01-14.87 4.08 26 26 0 0011.38-14.33 51.9 51.9 0 01-16.45 6.29 25.92 25.92 0 00-44.13 23.62A73.53 73.53 0 019.67 17.45a25.92 25.92 0 008 34.58A25.71 25.71 0 016 48.78v.33A25.91 25.91 0 0026.73 74.5a25.86 25.86 0 01-11.7.44 25.93 25.93 0 0024.2 18A52 52 0 017.06 104a52.72 52.72 0 01-6.18-.36 73.32 73.32 0 0039.7 11.63'
        className='cls-1'
        transform='translate(-.88 -12.7)'
      ></path>
    </svg>
  );
};

export default TwitterLogo;
