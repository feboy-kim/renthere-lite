import { css } from "lit";

export const masterDetail = css`
    .master-detail {
        display: flex;
        column-gap: 0.4rem;
        margin: 0.8rem;
    }
    .drawer {
        display: none;
    }
    .master, .detail {
        flex: 1;
    }
    .detail-svg {
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
        .detail-svg {
            flex: 3;
            display: flex;
            place-items: center;
        }
    }
    @media(min-width: 960px) {
        .master, .drawer {
            flex: 3;
        }
        .detail, .detail-svg {
            flex: 5;
        }
    }

`
