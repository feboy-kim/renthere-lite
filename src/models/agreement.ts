export type Article = {
    subtitle: string;
    contents: string[];
}

export type Agreement = {
    firstext: string;
    articles: Article[];
}
