import React from 'react';
import Tube from './Tube';

export function Tubes({ allthecurves }) {
  return (
    <>
      {allthecurves.map((curve, i) => (
        <Tube key={i} curve={curve} />
      ))}
    </>
  );
}