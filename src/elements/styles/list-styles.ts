import { css } from "lit";

export const listStyles = css`
    ul {
        list-style: none;
    }

    li {
        cursor: pointer;
        padding: 0.2rem 0.5rem;
        margin: 0.5rem;
        text-align: center;
    }
    li.selected {
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
