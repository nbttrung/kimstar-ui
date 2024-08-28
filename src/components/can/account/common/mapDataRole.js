
export const mapDataRole = (data) => {
    if (!data) {
        return [];
    }
    return data?.map((item) => {
        return {
            id: undefined,
            module: item.weighingStationCode,
            moduleName: "     " + item.weighingStationName,
            roleView: true,
            roleCreate: false
        }
    });
}
