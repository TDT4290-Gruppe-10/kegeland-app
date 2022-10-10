declare module 'react-native-game-engine' {
  import * as React from 'react';
  import * as Matter from 'matter-js';
  import {StyleProp, ViewStyle, ScaledSize} from 'react-native';

  interface DefaultRendererOptions {
    state: any;
    screen: ScaledSize;
  }

  export interface DispatchEvent {
    type: string;
    data?: any;
  }

  export type TouchEventType =
    | 'start'
    | 'end'
    | 'move'
    | 'press'
    | 'long-press';

  export interface TouchEvent {
    event: {
      changedTouches: Array<TouchEvent>;
      identifier: number;
      locationX: number;
      locationY: number;
      pageX: number;
      pageY: number;
      target: number;
      timestamp: number;
      touches: Array<TouchEvent>;
    };
    id: number;
    type: TouchEventType;
    delta?: {
      locationX: number;
      locationY: number;
      pageX: number;
      pageY: number;
      timestamp: number;
    };
  }

  export interface EntityProps {
    body: Matter.Body;
  }

  export interface Entity<T extends EntityProps> extends T {
    body: Matter.Body;
    pos: {
      x: number;
      y: number;
    };
    renderer: (props: T) => React.ReactNode;
  }

  export interface Entities {
    physics?: {
      engine: Matter.Engine;
      world: Matter.World;
    };
    [key: string]: Entity;
  }

  export function DefaultRenderer(
    defaultRendererOptions: DefaultRendererOptions,
  ): any;

  export class DefaultTimer {}

  interface TouchProcessorOptions {
    triggerPressEventBefore: number;
    triggerLongPressEventAfter: number;
    moveThreshold: number;
  }

  export function DefaultTouchProcessor(
    touchProcessorOptions?: TouchProcessorOptions,
  ): any;

  export interface TimeUpdate {
    current: number;
    delta: number;
    previous: number;
    previousDelta: number;
  }

  export interface GameEngineUpdateEventOptionType {
    dispatch: (event: any) => void;
    events: Array<any>;
    screen: ScaledSize;
    time: TimeUpdate;
    touches: Array<TouchEvent>;
  }

  export type GameEngineSystem = (
    entities: any,
    update: GameEngineUpdateEventOptionType,
  ) => any;

  export interface GameEngineProperties {
    systems?: any[];
    entities?: Entities | Promise<Entities>;
    renderer?: any;
    touchProcessor?: any;
    timer?: any;
    running?: boolean;
    onEvent?: (event: DispatchEvent) => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }

  export class GameEngine extends React.Component<GameEngineProperties> {
    clear: () => void;
    start: () => void;
    stop: () => void;
    swap: (data: Entities | Promise<Entities>) => void;
  }

  interface GameLoopUpdateEventOptionType {
    touches: TouchEvent[];
    screen: ScaledSize;
    time: TimeUpdate;
  }

  export interface GameLoopProperties {
    touchProcessor?: any;
    timer?: any;
    running?: boolean;
    onUpdate?: (args: GameLoopUpdateEventOptionType) => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }

  export class GameLoop extends React.Component<GameLoopProperties> {}
}
