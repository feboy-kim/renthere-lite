import { css } from "lit";

export const listStyles = css`
    ul {
        list-style: decimal;
    }

    li {
        cursor: pointer;
        padding: 0.4rem 0.6rem;
        margin: 0.2rem;
        text-align: center;
    }
    li:hover {
        border: 2px solid #80808080;
        border-radius: 4px;
    }

`

export const sectionView = css`
    section {
        display: flex;
        align-items: center;
    }
    section strong {
        font-size: large;
    }
    section small {
        opacity: 0.7;
    }

`
