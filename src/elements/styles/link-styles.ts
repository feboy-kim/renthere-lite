import { css } from "lit";

export const linkStyles = css`
    a {
        font-weight: 500;
        padding: 0.2rem 0.4rem;
        color: skyblue;
        text-decoration: inherit;
    }
    a:hover {
        color: thistle;
        text-decoration: underline;
        text-underline-offset: 0.4rem;
    }

    a.rounded-flex {
        border: 1px solid gray;
        border-radius: 4px;
        display: inline-flex;
    }

    @media (prefers-color-scheme: light) {
        a {
            color: saddlebrown;
        }
        a:hover {
            color: slateblue;
        }
    }

`
