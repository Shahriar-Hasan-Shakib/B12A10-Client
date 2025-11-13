import { Layout } from "@src/components/ui/Layout";
import { SearchIcon } from "@src/assets/icons";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
    const searchData = {
        div: {
            label: <label htmlFor="search" className="sr-only">Search Models</label>,
            input: (
                <input
                    id="search"
                    type="text"
                    placeholder="Search models by name..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="input input-bordered input-primary w-full text-lg pl-14"
                />
            ),
            icon: (
                <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-base-content/40 pointer-events-none" />
            ),
        },
    };

    const searchStyle = {
        container: "mb-6",
        div: {
            container: "relative",
            input: "pl-14",
        },
    };

    return <Layout tag="div" data={searchData} style={searchStyle} />;
};
