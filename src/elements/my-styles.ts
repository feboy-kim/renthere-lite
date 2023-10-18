import { css } from "lit";

export const listStyles = css`
    ul {
        list-style: none;
    }

`

export const linkStyles = css`
    a {
        font-weight: 500;
        padding: 0.3rem 0.6rem;
        color: #646cff;
        text-decoration: inherit;
    }
    a:hover {
        color: #535bf2;
    }

    @media (prefers-color-scheme: light) {
        a:hover {
            color: #747bff;
        }
    }

`

export const smallStyles = css`
    small {
        opacity: 0.7;
    }
`

export const inputStyles = css`
    input {
        padding: 0.3rem 0.6rem;
    }
`
