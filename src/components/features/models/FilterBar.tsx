import { Layout } from "@src/components/ui/Layout";

interface FilterBarProps {
    selectedFramework: string;
    onFrameworkChange: (framework: string) => void;
    frameworks: string[];
}

export const FilterBar = ({
    selectedFramework,
    onFrameworkChange,
    frameworks,
}: FilterBarProps) => {
    const filterData = {
        div: {
            label: (
                <label htmlFor="framework" className="font-semibold text-base-content mr-4">
                    Filter by Framework:
                </label>
            ),
            select: (
                <select
                    id="framework"
                    value={selectedFramework}
                    onChange={(e) => onFrameworkChange(e.target.value)}
                    className="select select-bordered select-primary"
                >
                    <option value="">All Frameworks</option>
                    {frameworks.map((fw) => (
                        <option key={fw} value={fw}>
                            {fw}
                        </option>
                    ))}
                </select>
            ),
        },
    };

    const filterStyle = {
        container: "mb-6",
        div: {
            container: "flex items-center flex-wrap gap-2",
        },
    };

    return <Layout tag="div" data={filterData} style={filterStyle} />;
};
