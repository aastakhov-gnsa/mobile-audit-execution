import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

interface SpinnerProps {
    inProgress: boolean
}

function Spinner({inProgress}: SpinnerProps) {
    if (!inProgress) {
        return null
    }
    return <Modal transparent={true} animationType={'none'}
           visible={inProgress}>
        <View style={{
            flex: 1, alignItems: 'center', flexDirection: 'column',
            justifyContent: 'space-around'
        }}>
            <ActivityIndicator size="large"/>
        </View>
    </Modal>
}

export default React.memo(Spinner)
