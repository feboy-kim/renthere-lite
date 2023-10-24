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
    li.selected {
        font-size: large;
        background-color: #4169e13F;
        border-radius: 4px;
    }
    li:hover {
        border: 2px solid #80808080;
        border-radius: 4px;
    }
    @media (prefers-color-scheme: light) {
        li.selected {
            background-color: #4169e12F;
        }
    }

`
