import {animate, style, transition, trigger} from '@angular/animations';

export const fadeIn = [
  trigger(
    'fadeIn', [
      transition('* <=> *', [
        style({opacity: 0}),
        animate('.25s ease-in')
      ])
    ]
  ),
];
