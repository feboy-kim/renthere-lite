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
export const inputStyles = css`
    input {
        padding: 0.2rem 0.5rem;
        font-size: inherit;
    }
    input:invalid {
        border-color: tomato;
    }

`
export const submitStyles = css`
    input[type='submit'] {
        font-size: inherit;
        padding: 0.2rem 0.5rem;
        border: 1px solid;
        border-radius: 4px;
        color: skyblue;
        background-color: midnightblue;
        text-decoration: inherit;
    }
    input[type='submit']:hover {
        color: thistle;
        text-decoration: underline;
        text-underline-offset: 6px;
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
