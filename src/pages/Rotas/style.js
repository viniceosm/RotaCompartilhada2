import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    listFilter: {
        flexDirection: "row",
        marginHorizontal: 16,
        marginVertical: 5,
    },
    filter: {
        backgroundColor: '#ECF1F4',
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 30,
        marginRight: 5,
    },
    filterSelected: {
        backgroundColor: '#EB722F',
    },
    listRota: {
        backgroundColor: '#ECF1F4',
        padding: 20,
        height: 150,
        borderRadius: 30,
        marginVertical: 5,
        marginHorizontal: 16,
    }
});

export default styles;