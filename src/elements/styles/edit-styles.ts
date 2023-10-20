import { css } from "lit";

export const bottomRight = css`
    .bottom-right {
        position: fixed;
        bottom: 0.5rem;
        right: 0.5rem;
    }

    .bottom-right > input[type='submit'] {
        font-size: inherit;
        cursor: pointer;
        padding: 0.1rem 0.6rem;
        color: silver;
    }

    @media (prefers-color-scheme: light) {
        .bottom-right > input[type='submit'] {
            color: darkslategray;
        }
    }


`
export const flexButton = css`
    .flex-button {
        display: inline-flex; 
        font-size: inherit;
        padding: 0.1rem 0.6rem;
    }
`

export const smallStyles = css`
    small {
        opacity: 0.7;
    }
`

export const inputStyles = css`
    input {
        padding: 0.4rem 0.6rem;
    }
`
