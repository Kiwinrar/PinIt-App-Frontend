export const YtEmbedder = (urlString: string | null | undefined): string | null => {
    const embedded = (v: string) => `https://www.youtube.com/embed/${v}`;
    if (!urlString) return null;
    try {
        const url = new URL(urlString);
        const v = url.searchParams.get('v');
        if ((url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') && v) {
            return embedded(v);
        }
        if (url.hostname === 'youtu.be') {
            return embedded(url.pathname.slice(1));
        }
    } catch {
        return null;
    }
    return null;
};