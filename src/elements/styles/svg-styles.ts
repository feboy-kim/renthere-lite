import { css } from "lit";

export const smallSvg = css`
    .small-svg {
        opacity: 0.75;
        fill: none;
        transform: scale(0.8);
    }
    .small-svg > path {
        stroke: currentColor;
        stroke-width: 2px;
    }
`
export const largeSvg = css`
    .large-svg {
        opacity: 0.5;
        fill: none;
        display: none;
        transform: scale(2);
    }
    .large-svg > path {
        stroke: currentColor;
        stroke-width: 2px;
    }
    @media(min-width: 640px) {
        .large-svg {
            display: inline-block;
            transform: scale(4);
        }
    }
    @media(min-width: 960px) {
        .large-svg {
            transform: scale(6);
        }
    }

`
