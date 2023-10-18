import { css } from "lit";

export const masterDetail = css`
    .container {
        display: flex;
        column-gap: 0.4rem;
        margin: 0.8rem;
    }
    .master {
        display: none;
    }
    .detail, .drawer {
        flex: 1;
    }
    .detail > svg {
        display: none;
    }
    @media(min-width: 640px) {
        .master, .drawer {
            display: block;
            flex: 2;
        }
        .detail {
            flex: 3;
        }
        .detail > svg {
            display: block;
        }
    }
    @media(min-width: 960px) {
        .master, .drawer {
            flex: 3;
        }
        .detail {
            flex: 5;
        }
    }

`
