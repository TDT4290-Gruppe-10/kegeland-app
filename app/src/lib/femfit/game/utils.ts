import Matter from 'matter-js';

export const getCenteredBodyPosition = (body: Matter.Body) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.x - body.bounds.min.x;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  return {x, y};
};
