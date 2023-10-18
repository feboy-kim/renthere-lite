import { css } from "lit";

export const smallSvg = css`
    .small-svg {
        opacity: 0.75;
        fill: none;
    }
    .small-svg > path {
        stroke: currentColor;
        stroke-width: 2px;
    }
`
export const largeSvg = css`
    .large-svg {
        opacity: 0.50;
        fill: none;
        transform-origin: left;
        transform: scale(2)
    }
    .large-svg > path {
        stroke: currentColor;
        stroke-width: 2px;
    }
    @media(min-width: 640px) {
        .large-svg {
            transform: scale(4)
        }
    }
    @media(min-width: 960px) {
        .large-svg {
            transform: scale(6)
        }
    }

`
