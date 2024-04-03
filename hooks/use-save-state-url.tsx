import { useRouter } from "next/router";

export function useSaveStateToUrl() {
    const router = useRouter();

    function saveStateToUrl(state: Record<string, string>) {
        const query = { ...router.query, ...state };
        router.push({ query });
    }

    return {
        saveStateToUrl,
    };
}
