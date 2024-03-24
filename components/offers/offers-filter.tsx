const OffersFilters = () => {
    return (
        <div>
            <h2>Filters</h2>
            <div>
                <input type="text" placeholder="Search..." />
            </div>
            <div>
                <label>
                    <input type="checkbox" />
                    Show only active
                </label>
            </div>
        </div>
    );
};

export default OffersFilters;
