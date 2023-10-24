import { css } from "lit";

export const bottomFixed = css`
    .bottom-left {
        position: fixed;
        bottom: 0.5rem;
        left: 0.5rem;
    }
    .bottom-right {
        position: fixed;
        bottom: 0.5rem;
        right: 0.5rem;
    }

`
export const smallStyles = css`
    small {
        opacity: 0.75;
        margin: 0.1rem;
    }
`

export const inputStyles = css`
    input {
        padding: 0.4rem 0.6rem;
        font-size: inherit;
    }
    input:invalid {
        border-color: crimson tomato;
    }

`
export const submitStyles = css`
    input[type='submit'] {
        font-size: inherit;
        padding: 0.2rem 0.6rem;
        color: skyblue;
        background-color: midnightblue;
    }
    input[type='submit']:hover {
        color: thistle;
    }

    @media (prefers-color-scheme: light) {
        input[type='submit'] {
            color: saddlebrown;
            background-color: beige;
        }
        input[type='submit']:hover {
            color: slateblue;
        }
    }

`
